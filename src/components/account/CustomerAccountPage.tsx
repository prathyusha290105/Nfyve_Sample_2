import React, { useState, useEffect } from 'react';
import {
  User,
  Calendar,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ArrowLeft,
  Plus,
  RefreshCw,
  Award,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Appointment } from '../../types/auth';
import { NFYVE_CONTACT } from '../../data/nfyveData';

interface CustomerAccountPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { user, token, logout, isLoading, isAuthenticated } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      onNavigate('/login?redirect=/account');
    }
  }, [isLoading, isAuthenticated, onNavigate]);

  const loadAppointments = async () => {
    if (!token) return;
    setIsFetching(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/account/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || []);
      } else {
        setFetchError('Failed to retrieve consultation history.');
      }
    } catch (err) {
      console.error(err);
      setFetchError('Unable to connect to NFYVE Sanctuary appointment server.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadAppointments();
    }
  }, [token]);

  const handleSignOut = async () => {
    await logout();
    onNavigate('/');
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#211A18] text-[#FFFAF4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#D6B16A] border-t-transparent rounded-full animate-spin" />
          <p className="font-serif text-[#D6B16A] text-sm">Accessing NFYVE Sanctuary Profile...</p>
        </div>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Rescheduled');
  const pastAppointments = appointments.filter((a) => a.status === 'Completed' || a.status === 'Cancelled');

  return (
    <div className="min-h-screen bg-[#211A18] text-[#FFFAF4] flex flex-col font-sans selection:bg-[#D6B16A] selection:text-[#211A18]">
      {/* Top Navbar */}
      <header className="bg-[#211A18]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#D6B16A]/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
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
                <span className="font-serif text-lg tracking-tight text-[#FFFAF4] font-medium leading-none">
                  NFYVE
                </span>
                <span className="text-[9px] tracking-widest text-[#D6B16A] uppercase font-semibold mt-0.5">
                  The Change
                </span>
              </div>
            </button>

            <span className="hidden sm:inline-block text-[#D6B16A]/40 text-sm">/</span>
            <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-[#D6B16A]">
              Customer Sanctuary Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#D4C3B3] hover:text-[#FFFAF4] px-3 py-1.5 rounded-full border border-[#D6B16A]/30 hover:border-[#D6B16A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sanctuary Website</span>
            </button>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-xs text-[#E8D9C7] hover:text-red-400 px-3.5 py-1.5 rounded-full bg-[#401724]/60 hover:bg-[#401724] border border-[#D6B16A]/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#32121C] via-[#281318] to-[#1F1416] border border-[#D6B16A]/40 p-6 sm:p-10 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6B16A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6B16A]/15 border border-[#D6B16A]/40 text-[#F0C46B] text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>{user.tier || 'NFYVE Gold Member'}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl text-[#FFFAF4] font-light">
                Welcome, <span className="font-medium text-[#D6B16A]">{user.fullName}</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#D4C3B3] max-w-xl">
                Your bespoke wellness journey at Hyderabad’s Begumpet Sanctuary. Manage your appointments, consultation notes, and multi-pillar transformation plans.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onNavigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }}
                className="px-5 py-2.5 rounded-full bg-[#401724] hover:bg-[#521e2f] text-[#FFFAF4] text-xs sm:text-sm font-semibold border border-[#D6B16A] bloom-shadow flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#F0C46B]" />
                <span>Book New Consultation</span>
              </button>

              <button
                onClick={loadAppointments}
                className="p-2.5 rounded-full bg-[#211A18] hover:bg-[#2c2320] border border-[#D6B16A]/40 text-[#D6B16A] transition-colors"
                title="Refresh Appointments"
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Appointments List (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Consultations */}
            <div className="bg-[#1C1513]/90 rounded-2xl border border-[#D6B16A]/30 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-[#D6B16A]/20 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F0C46B]" />
                  <h2 className="font-serif text-lg sm:text-xl text-[#FFFAF4]">
                    Upcoming Consultations
                  </h2>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#401724] border border-[#D6B16A]/40 text-[#D6B16A] font-semibold">
                  {upcomingAppointments.length} Active
                </span>
              </div>

              {isFetching ? (
                <div className="py-8 text-center text-xs text-[#D4C3B3]">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#D6B16A]" />
                  <span>Loading your booked consultations...</span>
                </div>
              ) : fetchError ? (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>{fetchError}</span>
                </div>
              ) : upcomingAppointments.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#2B1B1E] border border-[#D6B16A]/30 flex items-center justify-center mx-auto text-[#D6B16A]">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base text-[#FFFAF4]">No upcoming consultations</h3>
                  <p className="text-xs text-[#A8988B] max-w-sm mx-auto">
                    Experience our integrated 5-pillar approach across Clinical Aesthetics, Medical Weight Loss, Fitness, Salon Artistry, and Bespoke Nutrition.
                  </p>
                  <button
                    onClick={() => {
                      onNavigate('/');
                      setTimeout(() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#401724] text-xs font-semibold text-[#FFFAF4] border border-[#D6B16A] bloom-shadow"
                  >
                    <span>Schedule Sanctuary Visit</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#F0C46B]" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-5 rounded-xl bg-[#211A18] border border-[#D6B16A]/30 hover:border-[#D6B16A]/60 transition-all shadow-md group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#D6B16A] bg-[#401724] px-2.5 py-0.5 rounded border border-[#D6B16A]/40 font-semibold">
                            {apt.id}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>{apt.status}</span>
                          </span>
                        </div>
                        <div className="text-xs text-[#D6B16A] flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{apt.date}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{apt.timeSlot}</span>
                          </span>
                        </div>
                      </div>

                      <h4 className="font-serif text-base text-[#FFFAF4] group-hover:text-[#F0C46B] transition-colors">
                        {apt.service}
                      </h4>

                      {apt.notes && (
                        <p className="text-xs text-[#C2B1A2] mt-2 italic bg-[#171211]/60 p-2.5 rounded-lg border border-[#D6B16A]/10">
                          “{apt.notes}”
                        </p>
                      )}

                      {apt.staffNotes && (
                        <div className="mt-3 text-xs text-[#F0C46B] bg-[#401724]/40 p-2.5 rounded-lg border border-[#D6B16A]/30 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#F0C46B] shrink-0 mt-0.5" />
                          <span><strong>Concierge Note:</strong> {apt.staffNotes}</span>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-[#D6B16A]/20 flex items-center justify-between text-xs">
                        <span className="text-[#A8988B]">
                          Location: Begumpet Sanctuary, Hyderabad
                        </span>
                        <a
                          href={`tel:${NFYVE_CONTACT.phone}`}
                          className="text-[#D6B16A] hover:text-[#F0C46B] font-medium flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Reschedule via Concierge</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Consultations */}
            {pastAppointments.length > 0 && (
              <div className="bg-[#1C1513]/70 rounded-2xl border border-[#D6B16A]/20 p-6">
                <div className="flex items-center gap-2 mb-4 border-b border-[#D6B16A]/10 pb-3">
                  <Clock className="w-4 h-4 text-[#D6B16A]" />
                  <h3 className="font-serif text-base text-[#E8D9C7]">
                    Past Consultations & Treatments
                  </h3>
                </div>

                <div className="space-y-3">
                  {pastAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3.5 rounded-xl bg-[#211A18]/60 border border-[#D6B16A]/15 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-medium text-[#FFFAF4]">{apt.service}</p>
                        <p className="text-[11px] text-[#A8988B] mt-0.5">
                          {apt.date} • {apt.timeSlot}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] bg-[#401724]/50 border border-[#D6B16A]/30 text-[#D6B16A]">
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Profile & Sanctuary Membership */}
          <div className="space-y-6">
            {/* Membership Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#2B151C] to-[#1C1416] border border-[#D6B16A]/40 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-widest text-[#D6B16A] uppercase font-bold">
                  NFYVE Sanctuary Pass
                </span>
                <Sparkles className="w-4 h-4 text-[#F0C46B]" />
              </div>

              <div className="mb-4">
                <p className="text-xs text-[#A8988B]">Member Name</p>
                <p className="font-serif text-lg text-[#FFFAF4] font-medium">{user.fullName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div>
                  <p className="text-[#A8988B] text-[11px]">Member ID</p>
                  <p className="font-mono text-[#D6B16A]">{user.id.substring(0, 14)}</p>
                </div>
                <div>
                  <p className="text-[#A8988B] text-[11px]">Sanctuary</p>
                  <p className="text-[#FFFAF4]">Begumpet, HYD</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D6B16A]/20 flex items-center justify-between text-[11px]">
                <span className="text-[#D4C3B3]">Status: Active Member</span>
                <span className="text-[#F0C46B] font-semibold">{user.tier}</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="bg-[#1C1513]/90 rounded-2xl border border-[#D6B16A]/30 p-6 shadow-xl space-y-4">
              <h3 className="font-serif text-base text-[#FFFAF4] border-b border-[#D6B16A]/20 pb-2">
                Personalized Profile
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D6B16A] shrink-0" />
                  <div>
                    <p className="text-[#A8988B] text-[11px]">Registered Email</p>
                    <p className="text-[#FFFAF4] font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D6B16A] shrink-0" />
                  <div>
                    <p className="text-[#A8988B] text-[11px]">Concierge Mobile</p>
                    <p className="text-[#FFFAF4] font-medium">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#D6B16A] shrink-0" />
                  <div>
                    <p className="text-[#A8988B] text-[11px]">Dedicated Sanctuary</p>
                    <p className="text-[#FFFAF4]">Begumpet, Hyderabad, Telangana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Concierge Assistance */}
            <div className="bg-[#211A18] rounded-2xl border border-[#D6B16A]/30 p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#F0C46B]">
                <Heart className="w-4 h-4" />
                <h4 className="font-serif text-sm font-semibold">Concierge Support</h4>
              </div>
              <p className="text-xs text-[#C2B1A2] leading-relaxed">
                Need to reschedule, customize a dietary regimen, or book a private VIP suite? Our concierge team is available daily 06:00 AM – 10:00 PM.
              </p>
              <a
                href={`tel:${NFYVE_CONTACT.phone}`}
                className="w-full py-2.5 rounded-full bg-[#401724] hover:bg-[#521e2f] text-[#FFFAF4] text-xs font-semibold border border-[#D6B16A] flex items-center justify-center gap-2 transition-colors block text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#F0C46B]" />
                <span>Call {NFYVE_CONTACT.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
