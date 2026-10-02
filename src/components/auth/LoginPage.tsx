import React, { useState } from 'react';
import {
  User,
  Shield,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { NFYVE_CONTACT } from '../../data/nfyveData';

interface LoginPageProps {
  onNavigate: (path: string) => void;
  redirectUrl?: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, redirectUrl }) => {
  const { login, register, isAuthenticated, user } = useAuth();

  // Active portal tab: 'customer' or 'staff'
  const [activeTab, setActiveTab] = useState<'customer' | 'staff'>('customer');
  // For customer: 'login' or 'register'
  const [customerMode, setCustomerMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Customer register states
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // UI state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<string | null>(null);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'customer') {
        onNavigate(redirectUrl || '/account');
      } else {
        onNavigate('/admin');
      }
    }
  }, [isAuthenticated, user, onNavigate, redirectUrl]);

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login({
      email: email.trim(),
      password,
      loginType: 'customer',
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage('Welcome back! Loading your wellness dashboard...');
      setTimeout(() => {
        if (result.role === 'customer') {
          onNavigate(redirectUrl || '/account');
        } else {
          onNavigate('/admin');
        }
      }, 500);
    } else {
      setErrorMessage(result.error || 'Failed to sign in. Please verify your email and password.');
    }
  };

  const handleCustomerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!regFullName.trim() || regFullName.trim().length < 2) {
      setErrorMessage('Please provide your full legal name (minimum 2 characters).');
      return;
    }

    if (!regPhone.trim() || regPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for concierge notifications.');
      return;
    }

    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your confirmation password.');
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      fullName: regFullName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      password: regPassword,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage('Account created successfully! Welcome to NFYVE Sanctuary.');
      setTimeout(() => {
        onNavigate(redirectUrl || '/account');
      }, 600);
    } else {
      setErrorMessage(result.error || 'Could not complete registration. Please check your details.');
    }
  };

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter your staff/admin email and credentials.');
      return;
    }

    setIsSubmitting(true);
    const result = await login({
      email: email.trim(),
      password,
      loginType: 'staff',
    });

    setIsSubmitting(false);

    if (result.success) {
      if (result.role === 'customer') {
        // Backend prevents this, but extra client guard
        setErrorMessage('Access denied. Customer accounts cannot access the Staff / Admin portal.');
        return;
      }
      setSuccessMessage('Authentication verified. Accessing NFYVE Admin Command Center...');
      setTimeout(() => {
        onNavigate('/admin');
      }, 500);
    } else {
      setErrorMessage(result.error || 'Invalid credentials or unauthorized access level.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });
      const data = await res.json();
      setForgotStatus(data.message || 'Password reset link sent to your registered email.');
    } catch {
      setForgotStatus('Password reset link dispatched.');
    }
  };

  // Demo account quick fillers
  const fillDemo = (type: 'customer' | 'staff' | 'admin') => {
    setErrorMessage(null);
    if (type === 'customer') {
      setActiveTab('customer');
      setCustomerMode('login');
      setEmail('customer@example.com');
      setPassword('CustomerPassword123!');
    } else if (type === 'staff') {
      setActiveTab('staff');
      setEmail('staff@nfyve.com');
      setPassword('StaffPassword123!');
    } else if (type === 'admin') {
      setActiveTab('staff');
      setEmail('admin@nfyve.com');
      setPassword('AdminPassword123!');
    }
  };

  return (
    <div className="min-h-screen bg-[#211A18] text-[#FFFAF4] flex flex-col selection:bg-[#D6B16A] selection:text-[#211A18]">
      {/* Top Bar / Branding */}
      <div className="w-full border-b border-[#D6B16A]/30 bg-[#211A18]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus-visible:outline focus-visible:outline-[#F0C46B]"
          >
            <div className="w-8 h-8 rounded-full bg-[#401724] border border-[#D6B16A]/50 flex items-center justify-center p-1.5 shadow-md">
              <img
                alt="NFYVE Emblem"
                className="w-full h-full object-contain filter brightness-110"
                src={NFYVE_CONTACT.logoUrl}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-[#FFFAF4] font-medium group-hover:text-[#F0C46B] transition-colors leading-none">
                NFYVE
              </span>
              <span className="text-[9px] tracking-widest text-[#D6B16A] uppercase font-semibold mt-0.5">
                The Change
              </span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#D6B16A] hover:text-[#F0C46B] transition-colors px-3 py-1.5 rounded-full border border-[#D6B16A]/40 hover:border-[#F0C46B] bg-[#401724]/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sanctuary</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-xl">
          {/* Header Block */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#401724]/80 border border-[#D6B16A]/40 text-[#F0C46B] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hyderabad's Integrated Luxury Sanctuary</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FFFAF4] tracking-tight font-light mb-2">
              Welcome to <span className="text-[#D6B16A] font-medium">NFYVE</span>
            </h1>
            <p className="text-sm sm:text-base text-[#D4C3B3]">
              Sign in to continue your wellness journey.
            </p>
          </div>

          {/* Tab Selector: Option A (Customer) vs Option B (Staff / Admin) */}
          <div className="grid grid-cols-2 p-1.5 bg-[#171211] rounded-2xl border border-[#D6B16A]/30 mb-6 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setActiveTab('customer');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'customer'
                  ? 'bg-[#401724] text-[#FFFAF4] border border-[#D6B16A]/60 shadow-lg font-semibold'
                  : 'text-[#D4C3B3] hover:text-[#FFFAF4] hover:bg-[#211A18]/50'
              }`}
            >
              <User className="w-4 h-4 text-[#F0C46B]" />
              <span>Customer Login</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('staff');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'staff'
                  ? 'bg-[#401724] text-[#FFFAF4] border border-[#D6B16A]/60 shadow-lg font-semibold'
                  : 'text-[#D4C3B3] hover:text-[#FFFAF4] hover:bg-[#211A18]/50'
              }`}
            >
              <Shield className="w-4 h-4 text-[#F0C46B]" />
              <span>Staff / Admin Login</span>
            </button>
          </div>

          {/* Login Card Container */}
          <div className="bg-[#1C1513]/90 backdrop-blur-md rounded-2xl border border-[#D6B16A]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D6B16A]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#401724]/40 rounded-full blur-3xl pointer-events-none" />

            {/* Error Notification */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </motion.div>
            )}

            {/* Success Notification */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{successMessage}</span>
              </motion.div>
            )}

            {/* OPTION A: Customer Login & Register */}
            {activeTab === 'customer' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between border-b border-[#D6B16A]/20 pb-4">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl text-[#FFFAF4]">
                        Customer Login
                      </h2>
                      <p className="text-xs sm:text-sm text-[#D4C3B3] mt-1">
                        Book appointments and manage your wellness journey.
                      </p>
                    </div>

                    {/* Customer sub-mode toggle: Login vs Register */}
                    <div className="inline-flex rounded-lg bg-[#211A18] p-1 border border-[#D6B16A]/30 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomerMode('login');
                          setErrorMessage(null);
                        }}
                        className={`px-3 py-1 rounded-md transition-colors ${
                          customerMode === 'login'
                            ? 'bg-[#401724] text-[#F0C46B] font-semibold'
                            : 'text-[#D4C3B3] hover:text-[#FFFAF4]'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomerMode('register');
                          setErrorMessage(null);
                        }}
                        className={`px-3 py-1 rounded-md transition-colors ${
                          customerMode === 'register'
                            ? 'bg-[#401724] text-[#F0C46B] font-semibold'
                            : 'text-[#D4C3B3] hover:text-[#FFFAF4]'
                        }`}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-view: Customer Login */}
                {customerMode === 'login' && (
                  <form onSubmit={handleCustomerLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B] focus:ring-1 focus:ring-[#F0C46B] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotEmail(email);
                            setForgotPasswordOpen(true);
                          }}
                          className="text-xs text-[#D6B16A] hover:text-[#F0C46B] underline transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B] focus:ring-1 focus:ring-[#F0C46B] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4C3B3] hover:text-[#F0C46B] transition-colors p-1"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3 rounded-full bg-[#401724] hover:bg-[#531e2f] text-[#FFFAF4] font-semibold text-sm border border-[#D6B16A] bloom-shadow flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg"
                    >
                      {isSubmitting ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <span>Sign In to Customer Account</span>
                          <ArrowRight className="w-4 h-4 text-[#F0C46B]" />
                        </>
                      )}
                    </button>

                    <div className="pt-4 text-center border-t border-[#D6B16A]/20">
                      <p className="text-xs text-[#D4C3B3]">
                        Don’t have an account yet?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setCustomerMode('register');
                            setErrorMessage(null);
                          }}
                          className="text-[#F0C46B] font-semibold hover:underline"
                        >
                          Create Account
                        </button>
                      </p>
                    </div>

                    {/* Demo shortcut */}
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => fillDemo('customer')}
                        className="w-full py-2 px-3 rounded-lg bg-[#211A18]/60 hover:bg-[#211A18] text-[#D6B16A] text-xs border border-[#D6B16A]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#F0C46B]" />
                        <span>Quick Demo: Autofill Customer Account</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Sub-view: Customer Registration */}
                {customerMode === 'register' && (
                  <form onSubmit={handleCustomerRegister} className="space-y-3.5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold mb-1">
                        Full Legal Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                        <input
                          type="text"
                          required
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          placeholder="e.g. Priya Reddy"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                          <input
                            type="tel"
                            required
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            placeholder="+91 98490 00000"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                          <input
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="priya@domain.com"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Min 6 characters"
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4C3B3]"
                          >
                            {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="Re-type password"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B]"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#A8988B] leading-relaxed pt-1">
                      By registering, you gain access to appointment management, clinical notes, and bespoke transformation programs at NFYVE Begumpet.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3 rounded-full bg-[#401724] hover:bg-[#531e2f] text-[#FFFAF4] font-semibold text-sm border border-[#D6B16A] bloom-shadow flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg"
                    >
                      {isSubmitting ? (
                        <span>Creating Account...</span>
                      ) : (
                        <>
                          <span>Create Customer Account</span>
                          <CheckCircle2 className="w-4 h-4 text-[#F0C46B]" />
                        </>
                      )}
                    </button>

                    <div className="pt-3 text-center border-t border-[#D6B16A]/20">
                      <p className="text-xs text-[#D4C3B3]">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setCustomerMode('login');
                            setErrorMessage(null);
                          }}
                          className="text-[#F0C46B] font-semibold hover:underline"
                        >
                          Sign In here
                        </button>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* OPTION B: Staff / Admin Login */}
            {activeTab === 'staff' && (
              <div>
                <div className="mb-6">
                  <div className="border-b border-[#D6B16A]/20 pb-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D6B16A]/10 border border-[#D6B16A]/30 text-[#F0C46B] text-[11px] font-semibold uppercase tracking-wider mb-2">
                      <Shield className="w-3 h-3" />
                      <span>Authorized Personnel Only</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#FFFAF4]">
                      Staff / Admin Login
                    </h2>
                    <p className="text-xs sm:text-sm text-[#D4C3B3] mt-1">
                      Secure access for authorized NFYVE doctors, coordinators, and administrators.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleStaffLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold mb-1.5">
                      Staff / Admin Official Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="staff@nfyve.com or admin@nfyve.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B] focus:ring-1 focus:ring-[#F0C46B] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs uppercase tracking-wider text-[#D6B16A] font-semibold">
                        Access Key / Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(email);
                          setForgotPasswordOpen(true);
                        }}
                        className="text-xs text-[#D6B16A] hover:text-[#F0C46B] underline transition-colors"
                      >
                        Help?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#211A18]/80 border border-[#D6B16A]/40 text-[#FFFAF4] placeholder-[#807065] text-sm focus:outline-none focus:border-[#F0C46B] focus:ring-1 focus:ring-[#F0C46B] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4C3B3] hover:text-[#F0C46B] transition-colors p-1"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#211A18]/60 border border-[#D6B16A]/20 text-[11px] text-[#C4B3A3] flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#F0C46B] shrink-0 mt-0.5" />
                    <span>
                      Customer credentials will be rejected. Only authorized staff and administrators are allowed entry.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 rounded-full bg-[#401724] hover:bg-[#531e2f] text-[#FFFAF4] font-semibold text-sm border border-[#D6B16A] bloom-shadow flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg"
                  >
                    {isSubmitting ? (
                      <span>Verifying Authority...</span>
                    ) : (
                      <>
                        <span>Access Admin Dashboard</span>
                        <ArrowRight className="w-4 h-4 text-[#F0C46B]" />
                      </>
                    )}
                  </button>

                  {/* Fast testing demo fillers */}
                  <div className="pt-4 border-t border-[#D6B16A]/20 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => fillDemo('staff')}
                      className="py-2 px-2.5 rounded-lg bg-[#211A18]/70 hover:bg-[#211A18] text-[#D6B16A] text-xs border border-[#D6B16A]/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-[#F0C46B]" />
                      <span>Autofill Staff</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemo('admin')}
                      className="py-2 px-2.5 rounded-lg bg-[#211A18]/70 hover:bg-[#211A18] text-[#D6B16A] text-xs border border-[#D6B16A]/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#F0C46B]" />
                      <span>Autofill Admin</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#211A18] border border-[#D6B16A] rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setForgotStatus(null);
                }}
                className="absolute top-4 right-4 text-[#D4C3B3] hover:text-[#FFFAF4] p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-[#F0C46B]" />
                <h3 className="font-serif text-lg text-[#FFFAF4]">Reset Password</h3>
              </div>

              <p className="text-xs text-[#D4C3B3] mb-4">
                Enter your registered NFYVE email address. We will verify your account and dispatch reset instructions.
              </p>

              {forgotStatus ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{forgotStatus}</span>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="client@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171211] border border-[#D6B16A]/40 text-[#FFFAF4] text-sm focus:outline-none focus:border-[#F0C46B]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(false)}
                      className="px-4 py-2 rounded-full border border-[#D6B16A]/40 text-xs text-[#D4C3B3] hover:text-[#FFFAF4]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-[#401724] text-xs font-semibold text-[#FFFAF4] border border-[#D6B16A] bloom-shadow hover:bg-[#521e2f]"
                    >
                      Send Instructions
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
