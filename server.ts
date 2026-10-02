import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ==========================================
// Types & Data Models
// ==========================================
export type UserRole = 'customer' | 'staff' | 'admin';

export interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  passwordHash: string;
  salt: string;
  createdAt: string;
  tier?: string;
}

export interface AppointmentRecord {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';
  createdAt: string;
  staffNotes?: string;
}

export interface SessionRecord {
  token: string;
  userId: string;
  role: UserRole;
  createdAt: number;
  expiresAt: number;
}

// In-Memory Database Store (persistent across hot reloads)
const users = new Map<string, UserRecord>();
const sessions = new Map<string, SessionRecord>();
const appointments: AppointmentRecord[] = [];

// ==========================================
// Cryptography Helpers
// ==========================================
function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  const hash = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

function createSession(user: UserRecord): string {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days

  sessions.set(token, {
    token,
    userId: user.id,
    role: user.role,
    createdAt: now,
    expiresAt,
  });

  return token;
}

function sanitizeUser(user: UserRecord) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    tier: user.tier || 'NFYVE Gold Member',
    createdAt: user.createdAt,
  };
}

// ==========================================
// Pre-Seed Demo Accounts & Consultations
// ==========================================
function seedDatabase() {
  const adminSalt = crypto.randomBytes(16).toString('hex');
  const adminUser: UserRecord = {
    id: 'usr_admin_001',
    fullName: 'Dr. Shravan Rao',
    email: 'admin@nfyve.com',
    phone: '+91 99661 14455',
    role: 'admin',
    passwordHash: hashPassword('AdminPassword123!', adminSalt),
    salt: adminSalt,
    createdAt: new Date('2025-01-01').toISOString(),
    tier: 'Medical Director & Founder',
  };
  users.set(adminUser.email.toLowerCase(), adminUser);

  const staffSalt = crypto.randomBytes(16).toString('hex');
  const staffUser: UserRecord = {
    id: 'usr_staff_002',
    fullName: 'Pooja Reddy',
    email: 'staff@nfyve.com',
    phone: '+91 99661 14456',
    role: 'staff',
    passwordHash: hashPassword('StaffPassword123!', staffSalt),
    salt: staffSalt,
    createdAt: new Date('2025-01-15').toISOString(),
    tier: 'Senior Wellness Coordinator',
  };
  users.set(staffUser.email.toLowerCase(), staffUser);

  const customerSalt = crypto.randomBytes(16).toString('hex');
  const customerUser: UserRecord = {
    id: 'usr_cust_003',
    fullName: 'Ananya Sharma',
    email: 'customer@example.com',
    phone: '+91 98490 12345',
    role: 'customer',
    passwordHash: hashPassword('CustomerPassword123!', customerSalt),
    salt: customerSalt,
    createdAt: new Date('2025-02-10').toISOString(),
    tier: 'Diamond Wellness Club',
  };
  users.set(customerUser.email.toLowerCase(), customerUser);

  // Seed sample initial appointments
  appointments.push(
    {
      id: 'NFYVE-849201',
      userId: customerUser.id,
      customerName: customerUser.fullName,
      customerEmail: customerUser.email,
      customerPhone: customerUser.phone,
      service: 'Full 5-Pillar Transformation Package',
      date: '2025-10-15',
      timeSlot: 'Morning (08:00 AM – 12:00 PM)',
      notes: 'Initial comprehensive consultation with Dr. Shravan Rao and nutritionist consultation.',
      status: 'Confirmed',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      staffNotes: 'VIP Suite reserved. Dietary questionnaire prepared.',
    },
    {
      id: 'NFYVE-612403',
      userId: customerUser.id,
      customerName: customerUser.fullName,
      customerEmail: customerUser.email,
      customerPhone: customerUser.phone,
      service: 'Clinical Aesthetics & Skin Health',
      date: '2025-10-22',
      timeSlot: 'Afternoon (12:00 PM – 04:00 PM)',
      notes: 'Follow-up HydraFacial MD & Laser Skin Rejuvenation.',
      status: 'Confirmed',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: 'NFYVE-790154',
      userId: 'usr_cust_demo_01',
      customerName: 'Vikramaditya Roy',
      customerEmail: 'vikram.roy@outlook.com',
      customerPhone: '+91 98765 43210',
      service: 'Medical Weight Loss & Body Contouring',
      date: '2025-10-14',
      timeSlot: 'Morning (08:00 AM – 12:00 PM)',
      notes: 'InBody 770 composition assessment & cryolipolysis body contouring consultation.',
      status: 'Confirmed',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      staffNotes: 'Doctor pre-screened file.',
    },
    {
      id: 'NFYVE-324891',
      userId: 'usr_cust_demo_02',
      customerName: 'Dr. Meera Nambiar',
      customerEmail: 'meera.nambiar@gmail.com',
      customerPhone: '+91 97000 88221',
      service: 'Luxury Salon Artistry & Hair Spa',
      date: '2025-10-12',
      timeSlot: 'Evening (04:00 PM – 08:00 PM)',
      notes: 'Bespoke hair spa treatment and organic color glossing.',
      status: 'Completed',
      createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
      staffNotes: 'Client expressed high satisfaction; rebooked for next month.',
    }
  );

  console.log('[NFYVE Auth] Seeded default users: admin@nfyve.com, staff@nfyve.com, customer@example.com');
}

seedDatabase();

// ==========================================
// Authentication Middleware & RBAC Guard
// ==========================================
interface AuthenticatedRequest extends Request {
  user?: UserRecord;
  session?: SessionRecord;
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please sign in to continue.' });
  }

  const token = authHeader.split(' ')[1];
  const session = sessions.get(token);

  if (!session) {
    return res.status(401).json({ error: 'Session invalid or expired. Please sign in again.' });
  }

  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return res.status(401).json({ error: 'Session expired. Please sign in again.' });
  }

  // Find user by ID
  let userRecord: UserRecord | undefined;
  for (const user of users.values()) {
    if (user.id === session.userId) {
      userRecord = user;
      break;
    }
  }

  if (!userRecord) {
    sessions.delete(token);
    return res.status(401).json({ error: 'User account not found.' });
  }

  req.user = userRecord;
  req.session = session;
  next();
}

function requireRoles(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access Denied. This resource requires ${allowedRoles.join(' or ')} privileges.`,
        requiredRoles: allowedRoles,
        currentRole: req.user.role,
      });
    }

    next();
  };
}

// ==========================================
// Auth API Endpoints
// ==========================================

// 1. Customer Registration
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name (minimum 2 characters).' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    if (users.has(cleanEmail)) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide a valid 10-digit phone number.' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters in length.' });
    }

    // Role is ALWAYS enforced as 'customer' for public registration
    const salt = crypto.randomBytes(16).toString('hex');
    const newUser: UserRecord = {
      id: `usr_cust_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      role: 'customer',
      passwordHash: hashPassword(password, salt),
      salt,
      createdAt: new Date().toISOString(),
      tier: 'NFYVE Gold Member',
    };

    users.set(cleanEmail, newUser);
    const token = createSession(newUser);

    return res.status(201).json({
      message: 'Account created successfully. Welcome to NFYVE!',
      token,
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error while creating account.' });
  }
});

// 2. Login (Customer OR Staff/Admin)
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password, loginType } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const cleanEmail = (email as string).trim().toLowerCase();
    const user = users.get(cleanEmail);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    const isValidPassword = verifyPassword(password, user.salt, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    // Role Enforcement based on Login Portal
    if (loginType === 'staff') {
      if (user.role === 'customer') {
        return res.status(403).json({
          error: 'Access Denied. Only authorized staff and sanctuary administrators can access the Staff / Admin portal. Please use the Customer Login.',
          code: 'UNAUTHORIZED_PORTAL',
        });
      }
    }

    const token = createSession(user);

    return res.json({
      message: `Welcome back, ${user.fullName}!`,
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during authentication.' });
  }
});

// 3. Current Authenticated User Session
app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  return res.json({
    user: sanitizeUser(req.user),
  });
});

// 4. Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    sessions.delete(token);
  }
  return res.json({ message: 'Signed out successfully.' });
});

// 5. Password Reset Request
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  // Always return success to prevent email enumeration attacks
  return res.json({
    message: 'If an account exists with this email address, password reset instructions have been dispatched.',
  });
});

// ==========================================
// Customer Account & Appointment Endpoints
// ==========================================

// Get logged-in user's own appointments
app.get('/api/account/appointments', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  // Customers only see their own appointments
  const userAppointments = appointments.filter(
    (app) => app.userId === user.id || app.customerEmail.toLowerCase() === user.email.toLowerCase()
  );
  return res.json({ appointments: userAppointments });
});

// Create new appointment (Requires authentication as customer or staff)
app.post('/api/appointments', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user!;
    const { service, date, timeSlot, notes, phone, fullName } = req.body;

    if (!service || !date) {
      return res.status(400).json({ error: 'Please specify the service pillar and requested date.' });
    }

    const referenceId = `NFYVE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newAppointment: AppointmentRecord = {
      id: referenceId,
      userId: user.id,
      customerName: fullName?.trim() || user.fullName,
      customerEmail: user.email,
      customerPhone: phone?.trim() || user.phone,
      service,
      date,
      timeSlot: timeSlot || 'Morning (08:00 AM – 12:00 PM)',
      notes: notes?.trim() || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    appointments.unshift(newAppointment);

    return res.status(201).json({
      message: 'Consultation appointment scheduled successfully.',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Appointment creation error:', error);
    return res.status(500).json({ error: 'Failed to create appointment.' });
  }
});

// ==========================================
// Admin & Staff Endpoints (Protected by RBAC)
// ==========================================

// List all appointments across sanctuary (Staff or Admin only)
app.get(
  '/api/admin/appointments',
  requireAuth,
  requireRoles(['staff', 'admin']),
  (req: AuthenticatedRequest, res: Response) => {
    return res.json({ appointments });
  }
);

// Update appointment status / staff notes (Staff or Admin only)
app.patch(
  '/api/admin/appointments/:id',
  requireAuth,
  requireRoles(['staff', 'admin']),
  (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { status, staffNotes } = req.body;

    const aptIndex = appointments.findIndex((apt) => apt.id === id);
    if (aptIndex === -1) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    const apt = appointments[aptIndex];
    if (status && ['Confirmed', 'Completed', 'Cancelled', 'Rescheduled'].includes(status)) {
      apt.status = status;
    }
    if (staffNotes !== undefined) {
      apt.staffNotes = staffNotes;
    }

    return res.json({
      message: `Appointment ${id} updated successfully.`,
      appointment: apt,
    });
  }
);

// Admin / Staff Overview Metrics
app.get(
  '/api/admin/stats',
  requireAuth,
  requireRoles(['staff', 'admin']),
  (req: AuthenticatedRequest, res: Response) => {
    const total = appointments.length;
    const confirmed = appointments.filter((a) => a.status === 'Confirmed').length;
    const completed = appointments.filter((a) => a.status === 'Completed').length;
    const cancelled = appointments.filter((a) => a.status === 'Cancelled').length;
    const uniqueClients = new Set(appointments.map((a) => a.customerEmail.toLowerCase())).size;

    return res.json({
      totalAppointments: total,
      confirmedAppointments: confirmed,
      completedAppointments: completed,
      cancelledAppointments: cancelled,
      totalClients: uniqueClients + users.size - 2, // exclude admin/staff
      pillarBreakdown: {
        aesthetics: appointments.filter((a) => a.service.includes('Aesthetics')).length,
        weightLoss: appointments.filter((a) => a.service.includes('Weight')).length,
        fitness: appointments.filter((a) => a.service.includes('Fitness') || a.service.includes('Gym')).length,
        salon: appointments.filter((a) => a.service.includes('Salon') || a.service.includes('Hair')).length,
        nutrition: appointments.filter((a) => a.service.includes('Nutri') || a.service.includes('Nutrition')).length,
        fivePillar: appointments.filter((a) => a.service.includes('5-Pillar')).length,
      },
    });
  }
);

// List All Users (Admin only!)
app.get(
  '/api/admin/users',
  requireAuth,
  requireRoles(['admin']),
  (req: AuthenticatedRequest, res: Response) => {
    const list = Array.from(users.values()).map(sanitizeUser);
    return res.json({ users: list });
  }
);

// ==========================================
// Vite Integration & Static Serving
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[NFYVE Sanctuary Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
