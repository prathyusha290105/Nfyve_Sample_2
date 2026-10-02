import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCustomer: boolean;
  isStaff: boolean;
  isAdmin: boolean;
  login: (credentials: {
    email: string;
    password: string;
    loginType?: 'customer' | 'staff';
  }) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'nfyve_auth_token';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate session token on mount or token change
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setUser(data.user);
          }
        } else {
          // Token is invalid or expired
          if (isMounted) {
            setUser(null);
            setToken(null);
            try {
              localStorage.removeItem(TOKEN_KEY);
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        console.error('Failed to verify session:', err);
        // Do not immediately wipe if network temporary hiccup, but mark not loading
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async ({
    email,
    password,
    loginType = 'customer',
  }: {
    email: string;
    password: string;
    loginType?: 'customer' | 'staff';
  }): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, loginType }),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Authentication failed. Please check your credentials.',
        };
      }

      setToken(data.token);
      setUser(data.user);
      try {
        localStorage.setItem(TOKEN_KEY, data.token);
      } catch {
        // ignore
      }

      return {
        success: true,
        role: data.user.role,
      };
    } catch (err) {
      console.error('Login error:', err);
      return {
        success: false,
        error: 'Unable to connect to NFYVE Sanctuary authentication server.',
      };
    }
  };

  const register = async ({
    fullName,
    email,
    phone,
    password,
  }: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Registration failed. Please review your details.',
        };
      }

      setToken(data.token);
      setUser(data.user);
      try {
        localStorage.setItem(TOKEN_KEY, data.token);
      } catch {
        // ignore
      }

      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      return {
        success: false,
        error: 'Unable to connect to NFYVE Sanctuary registration server.',
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setToken(null);
      try {
        localStorage.removeItem(TOKEN_KEY);
      } catch {
        // ignore
      }
    }
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  const isCustomer = user?.role === 'customer';
  const isStaff = user?.role === 'staff' || user?.role === 'admin';
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        isCustomer,
        isStaff,
        isAdmin,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
