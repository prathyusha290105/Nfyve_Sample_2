import React, { useState, useEffect } from 'react';
import {
  Shield,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Search,
  Filter,
  LogOut,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  Users,
  BarChart3,
  TrendingUp,
  FileText,
  Plus,
  RefreshCw,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Appointment, AdminStats } from '../../types/auth';
import { NFYVE_CONTACT } from '../../data/nfyveData';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { user, token, logout, isLoading, isStaff, isAdmin } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'appointments' | 'clients' | 'overview'>('appointments');

  // Selected appointment modal
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [editNotes, setEditNotes] = useState('');

  // New Booking Modal (Phone-in / Walk-in)
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newService, setNewService] = useState('Full 5-Pillar Transformation Package');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTimeSlot, setNewTimeSlot] = useState('Morning (08:00 AM – 12:00 PM)');
  const [newNotes, setNewNotes] = useState('');

  // Load appointments and stats
  const fetchData = async () => {
    if (!token) return;
    setIsFetching(true);
    setErrorMessage(null);
    try {
      const [aptRes, statsRes] = await Promise.all([
        fetch('/api/admin/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (aptRes.ok && statsRes.ok) {
        const aptData = await aptRes.json();
        const statsData = await statsRes.json();
        setAppointments(aptData.appointments || []);
        setStats(statsData);
      } else if (aptRes.status === 403 || statsRes.status === 403) {
        setErrorMessage('Access Forbidden: You do not possess staff or administrator authority.');
      } else {
        setErrorMessage('Failed to load sanctuary command center records.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error while connecting to sanctuary server.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (token && (isStaff || isAdmin)) {
      fetchData();
    }
  }, [token, isStaff, isAdmin]);

  // Handle appointment status update
  const handleUpdateStatus = async (
    aptId: string,
    newStatus: 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled',
    staffNotes?: string
  ) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/appointments/${aptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, staffNotes }),
      });

      if (res.ok) {
        const data = await res.json();
        setAppointments((prev) =>
          prev.map((a) => (a.id === aptId ? data.appointment : a))
        );
        if (selectedApt?.id === aptId) {
          setSelectedApt(data.appointment);
        }
        setActionMessage(`Consultation ${aptId} updated to ${newStatus}.`);
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setActionMessage('Failed to update status.');
    }
  };

  // Handle Walk-in / Phone-in booking creation
  const handleCreateWalkInBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newClientName || !newClientEmail) return;

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: newClientName,
          phone: newClientPhone,
          service: newService,
          date: newDate,
          timeSlot: newTimeSlot,
          notes: `[Phone/Walk-in by Staff ${user?.fullName}]: ${newNotes}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAppointments((prev) => [data.appointment, ...prev]);
        setNewBookingModalOpen(false);
        setNewClientName('');
        setNewClientEmail('');
        setNewClientPhone('');
        setNewNotes('');
        setActionMessage(`New consultation created: ${data.appointment.id}`);
        setTimeout(() => setActionMessage(null), 3500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    await logout();
    onNavigate('/login');
  };

  // Guard: Not logged in or customer trying to access
  if (!isLoading && (!user || (!isStaff && !isAdmin))) {
    return (
      <div className="min-h-screen bg-[#211A18] text-[#FFFAF4] flex items-center justify-center p-6 selection:bg-[#D6B16A]">
        <div className="max-w-md w-full bg-[#1C1513] border border-red-500/40 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/50 flex items-center justify-center mx-auto text-red-400">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl text-red-300">Access Restricted</h2>
          <p className="text-xs sm:text-sm text-[#D4C3B3] leading-relaxed">
            {user
              ? `You are signed in as a customer (${user.email}). Only verified NFYVE medical directors, practitioners, and administrators are authorized to access this portal.`
              : 'You must be signed in with staff or administrative credentials to access the NFYVE command center.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            {user ? (
              <button
                onClick={() => onNavigate('/account')}
                className="flex-1 py-2.5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold border border-[#D6B16A]"
              >
                Go to Customer Account
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/login')}
                className="flex-1 py-2.5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold border border-[#D6B16A]"
              >
                Go to Staff Login
              </button>
            )}
            <button
              onClick={() => onNavigate('/')}
              className="flex-1 py-2.5 rounded-full border border-[#D6B16A]/40 text-xs text-[#D4C3B3] hover:text-[#FFFAF4]"
            >
              Public Sanctuary
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.customerPhone.includes(searchTerm) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesService =
      serviceFilter === 'All' || apt.service.toLowerCase().includes(serviceFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="min-h-screen bg-[#171211] text-[#FFFAF4] flex flex-col font-sans selection:bg-[#D6B16A] selection:text-[#211A18]">
      {/* Top Admin Command Header */}
      <header className="bg-[#211A18] border-b border-[#D6B16A]/40 sticky top-0 z-40 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#401724] border border-[#D6B16A]/50 flex items-center justify-center p-1.5 shadow-md">
                <img
                  alt="NFYVE Emblem"
                  className="w-full h-full object-contain filter brightness-110"
                  src={NFYVE_CONTACT.logoUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-tight text-[#FFFAF4] font-medium leading-none">
                  NFYVE
                </span>
                <span className="text-[9px] tracking-widest text-[#D6B16A] uppercase font-semibold mt-0.5">
                  Command Center
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#401724]/80 border border-[#D6B16A]/50 text-[#F0C46B] text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#F0C46B]" />
              <span>{isAdmin ? 'Sanctuary Administrator' : 'Staff Coordinator'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#D4C3B3] hover:text-[#FFFAF4] px-3.5 py-1.5 rounded-full border border-[#D6B16A]/30 hover:border-[#D6B16A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sanctuary Website</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-[#D6B16A]/20">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-semibold text-[#FFFAF4]">{user?.fullName}</p>
                <p className="text-[10px] text-[#D6B16A]">{user?.email}</p>
              </div>

              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 text-xs text-[#E8D9C7] hover:text-red-400 px-3 py-1.5 rounded-full bg-[#401724]/60 hover:bg-[#401724] border border-[#D6B16A]/30 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Action Notification Banner */}
      <AnimatePresence>
        {actionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-900/90 border-b border-emerald-500 text-emerald-200 px-6 py-2.5 text-xs flex items-center justify-center gap-2 font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Admin View */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Top KPI Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#211A18] border border-[#D6B16A]/30 shadow-lg">
              <div className="flex items-center justify-between text-[#A8988B] text-xs mb-2">
                <span>Total Bookings</span>
                <Calendar className="w-4 h-4 text-[#D6B16A]" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-[#FFFAF4] font-medium">
                {stats.totalAppointments}
              </p>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Begumpet Center Active</span>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#211A18] border border-[#D6B16A]/30 shadow-lg">
              <div className="flex items-center justify-between text-[#A8988B] text-xs mb-2">
                <span>Confirmed</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-[#FFFAF4] font-medium">
                {stats.confirmedAppointments}
              </p>
              <p className="text-[11px] text-[#D4C3B3] mt-1">Pending Consultation</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#211A18] border border-[#D6B16A]/30 shadow-lg">
              <div className="flex items-center justify-between text-[#A8988B] text-xs mb-2">
                <span>Completed</span>
                <Sparkles className="w-4 h-4 text-[#F0C46B]" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-[#FFFAF4] font-medium">
                {stats.completedAppointments}
              </p>
              <p className="text-[11px] text-[#D6B16A] mt-1">Transformed Clients</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#211A18] border border-[#D6B16A]/30 shadow-lg">
              <div className="flex items-center justify-between text-[#A8988B] text-xs mb-2">
                <span>Client Database</span>
                <Users className="w-4 h-4 text-[#D6B16A]" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-[#FFFAF4] font-medium">
                {stats.totalClients}
              </p>
              <p className="text-[11px] text-[#D4C3B3] mt-1">Registered Profiles</p>
            </div>
          </div>
        )}

        {/* Section Header & Sub-Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B16A]/20 pb-4">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl text-[#FFFAF4]">Consultation Management</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#401724] border border-[#D6B16A]/40 text-[#D6B16A] font-semibold">
              {filteredAppointments.length} Found
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setNewBookingModalOpen(true)}
              className="px-4 py-2 rounded-full bg-[#401724] hover:bg-[#521e2f] text-[#FFFAF4] text-xs font-semibold border border-[#D6B16A] bloom-shadow flex items-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#F0C46B]" />
              <span>Schedule Walk-In / Phone Booking</span>
            </button>

            <button
              onClick={fetchData}
              className="p-2 rounded-full bg-[#211A18] hover:bg-[#2c2320] border border-[#D6B16A]/40 text-[#D6B16A] transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B16A]/70" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client, ID, phone, or service..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#211A18] border border-[#D6B16A]/30 text-xs sm:text-sm text-[#FFFAF4] placeholder-[#807065] focus:outline-none focus:border-[#F0C46B]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A8988B] shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#211A18] border border-[#D6B16A]/30 text-xs sm:text-sm text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A8988B] shrink-0">Pillar:</span>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#211A18] border border-[#D6B16A]/30 text-xs sm:text-sm text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
            >
              <option value="All">All Pillars</option>
              <option value="5-Pillar">5-Pillar Transformation</option>
              <option value="Aesthetics">Aesthetics & Skin</option>
              <option value="Weight">Medical Weight Loss</option>
              <option value="Fitness">Fitness & Gym</option>
              <option value="Salon">Salon Artistry</option>
              <option value="Nutri">Nutri Food</option>
            </select>
          </div>
        </div>

        {/* Appointments Table / Grid */}
        <div className="bg-[#211A18] rounded-2xl border border-[#D6B16A]/30 overflow-hidden shadow-xl">
          {isFetching ? (
            <div className="py-16 text-center text-xs text-[#D4C3B3]">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#D6B16A]" />
              <span>Fetching sanctuary records...</span>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#A8988B]">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-[#D6B16A]/50" />
              <span>No consultations match the selected search and filter criteria.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#D6B16A]/20 bg-[#171211]/80 text-[#D6B16A] uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 font-semibold">Ref ID</th>
                    <th className="py-3 px-4 font-semibold">Client Name</th>
                    <th className="py-3 px-4 font-semibold">Service Pillar</th>
                    <th className="py-3 px-4 font-semibold">Scheduled Date & Time</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B16A]/10">
                  {filteredAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="hover:bg-[#281F1D] transition-colors cursor-pointer group"
                      onClick={() => {
                        setSelectedApt(apt);
                        setEditNotes(apt.staffNotes || '');
                      }}
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-[#F0C46B]">
                        {apt.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-[#FFFAF4]">{apt.customerName}</p>
                        <p className="text-[11px] text-[#A8988B]">{apt.customerPhone}</p>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-[#E8D9C7]">
                        {apt.service}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-[#FFFAF4] font-medium">{apt.date}</p>
                        <p className="text-[11px] text-[#D6B16A]">{apt.timeSlot}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                              : apt.status === 'Completed'
                              ? 'bg-[#401724] border-[#D6B16A]/60 text-[#F0C46B]'
                              : apt.status === 'Rescheduled'
                              ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                              : 'bg-red-950/80 border-red-500/50 text-red-300'
                          }`}
                        >
                          {apt.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3" />}
                          {apt.status === 'Completed' && <Sparkles className="w-3 h-3" />}
                          {apt.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                          {apt.status === 'Rescheduled' && <RotateCcw className="w-3 h-3" />}
                          <span>{apt.status}</span>
                        </span>
                      </td>
                      <td
                        className="py-3.5 px-4 text-right space-x-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {apt.status === 'Confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                            className="px-2.5 py-1 rounded bg-[#401724] hover:bg-[#531e2f] border border-[#D6B16A]/40 text-[#F0C46B] text-[11px] font-semibold transition-colors"
                            title="Mark as Completed"
                          >
                            Complete
                          </button>
                        )}
                        {apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Cancelled')}
                            className="px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-300 text-[11px] transition-colors"
                            title="Cancel Booking"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedApt(apt);
                            setEditNotes(apt.staffNotes || '');
                          }}
                          className="px-2.5 py-1 rounded bg-[#211A18] hover:bg-[#2f2421] border border-[#D6B16A]/40 text-[#D6B16A] text-[11px] transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Appointment Detail & Status Update Modal */}
      <AnimatePresence>
        {selectedApt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#211A18] border border-[#D6B16A] rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedApt(null)}
                className="absolute top-4 right-4 text-[#D4C3B3] hover:text-[#FFFAF4] p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm font-bold text-[#F0C46B] bg-[#401724] px-2.5 py-0.5 rounded border border-[#D6B16A]/50">
                  {selectedApt.id}
                </span>
                <span className="text-xs text-[#D6B16A] uppercase font-semibold">
                  Consultation Record
                </span>
              </div>

              <h3 className="font-serif text-xl text-[#FFFAF4] mb-4">
                {selectedApt.service}
              </h3>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#171211] border border-[#D6B16A]/20 text-xs mb-4">
                <div>
                  <p className="text-[#A8988B] text-[11px]">Client Name</p>
                  <p className="font-semibold text-[#FFFAF4]">{selectedApt.customerName}</p>
                </div>
                <div>
                  <p className="text-[#A8988B] text-[11px]">Mobile Phone</p>
                  <a
                    href={`tel:${selectedApt.customerPhone}`}
                    className="text-[#D6B16A] hover:underline flex items-center gap-1 font-mono"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{selectedApt.customerPhone}</span>
                  </a>
                </div>
                <div>
                  <p className="text-[#A8988B] text-[11px]">Email Address</p>
                  <p className="text-[#E8D9C7] truncate">{selectedApt.customerEmail}</p>
                </div>
                <div>
                  <p className="text-[#A8988B] text-[11px]">Scheduled Schedule</p>
                  <p className="text-[#F0C46B]">{selectedApt.date} • {selectedApt.timeSlot}</p>
                </div>
              </div>

              {selectedApt.notes && (
                <div className="mb-4">
                  <p className="text-[11px] uppercase text-[#D6B16A] font-semibold mb-1">
                    Client's Requested Focus
                  </p>
                  <p className="text-xs text-[#D4C3B3] bg-[#171211] p-3 rounded-lg border border-[#D6B16A]/10 italic">
                    “{selectedApt.notes}”
                  </p>
                </div>
              )}

              {/* Status Selector & Staff Notes */}
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                    Update Consultation Status
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['Confirmed', 'Completed', 'Rescheduled', 'Cancelled'] as const).map(
                      (st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(selectedApt.id, st, editNotes)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-colors border ${
                            selectedApt.status === st
                              ? 'bg-[#401724] border-[#F0C46B] text-[#F0C46B]'
                              : 'bg-[#171211] border-[#D6B16A]/20 text-[#D4C3B3] hover:border-[#D6B16A]'
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                    Staff & Practitioner Notes
                  </label>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Enter doctor recommendations, room reservation, or concierge notes..."
                    className="w-full p-2.5 rounded-xl bg-[#171211] border border-[#D6B16A]/30 text-xs text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
                  />
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedApt.id, selectedApt.status, editNotes)
                    }
                    className="mt-2 px-4 py-1.5 rounded-lg bg-[#401724] hover:bg-[#521e2f] border border-[#D6B16A]/50 text-xs font-semibold text-[#F0C46B] transition-colors"
                  >
                    Save Staff Notes
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-[#D6B16A]/20">
                <button
                  onClick={() => setSelectedApt(null)}
                  className="px-5 py-2 rounded-full border border-[#D6B16A]/40 text-xs text-[#D4C3B3] hover:text-[#FFFAF4]"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Walk-in / Phone-in Consultation Booking Modal */}
      <AnimatePresence>
        {newBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#211A18] border border-[#D6B16A] rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setNewBookingModalOpen(false)}
                className="absolute top-4 right-4 text-[#D4C3B3] hover:text-[#FFFAF4] p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Plus className="w-5 h-5 text-[#F0C46B]" />
                <h3 className="font-serif text-lg text-[#FFFAF4]">
                  Schedule Walk-In / Phone Consultation
                </h3>
              </div>

              <p className="text-xs text-[#D4C3B3] mb-4">
                Record a direct booking taken over the phone or in person at the Begumpet Sanctuary desk.
              </p>

              <form onSubmit={handleCreateWalkInBooking} className="space-y-3.5">
                <div>
                  <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Srikant Verma"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#171211] border border-[#D6B16A]/30 text-xs text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newClientPhone}
                      onChange={(e) => setNewClientPhone(e.target.value)}
                      placeholder="+91 99000 00000"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#171211] border border-[#D6B16A]/30 text-xs text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={newClientEmail}
                      onChange={(e) => setNewClientEmail(e.target.value)}
                      placeholder="client@domain.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#171211] border border-[#D6B16A]/30 text-xs text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                    Primary Service Pillar
                  </label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#171211] border border-[#D6B16A]/30 text-xs text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
                  >
                    <option value="Full 5-Pillar Transformation Package">
                      Full 5-Pillar Transformation Package
                    </option>
                    <option value="Clinical Aesthetics & Skin Health">
                      Clinical Aesthetics & Skin Health
                    </option>
                    <option value="Medical Weight Loss & Body Contouring">
                      Medical Weight Loss & Body Contouring
                    </option>
                    <option value="Elite Gym & Functional Fitness">
                      Elite Gym & Functional Fitness
                    </option>
                    <option value="Luxury Salon Artistry & Hair Spa">
                      Luxury Salon Artistry & Hair Spa
                    </option>
                    <option value="Nutri Food & Precision Wellness Diet">
                      Nutri Food & Precision Wellness Diet
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                      Consultation Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#171211] border border-[#D6B16A]/30 text-xs text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#171211] border border-[#D6B16A]/30 text-xs text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
                    >
                      <option value="Morning (08:00 AM – 12:00 PM)">Morning (08:00 AM – 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM – 04:00 PM)">Afternoon (12:00 PM – 04:00 PM)</option>
                      <option value="Evening (04:00 PM – 08:00 PM)">Evening (04:00 PM – 08:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#D6B16A] font-semibold mb-1">
                    Internal Staff Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Specific requests, allergies, medical history notes..."
                    className="w-full p-2.5 rounded-xl bg-[#171211] border border-[#D6B16A]/30 text-xs text-[#FFFAF4] focus:outline-none focus:border-[#F0C46B]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#D6B16A]/20">
                  <button
                    type="button"
                    onClick={() => setNewBookingModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-[#D6B16A]/40 text-xs text-[#D4C3B3] hover:text-[#FFFAF4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#401724] hover:bg-[#521e2f] text-xs font-semibold text-[#FFFAF4] border border-[#D6B16A] bloom-shadow"
                  >
                    Confirm & Reserve
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
