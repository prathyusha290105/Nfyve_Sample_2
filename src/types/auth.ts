export type UserRole = 'customer' | 'staff' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  tier: string;
  createdAt: string;
}

export interface Appointment {
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

export interface AdminStats {
  totalAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalClients: number;
  pillarBreakdown: {
    aesthetics: number;
    weightLoss: number;
    fitness: number;
    salon: number;
    nutrition: number;
    fivePillar: number;
  };
}
