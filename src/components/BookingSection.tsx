import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { NFYVE_CONTACT } from '../data/nfyveData';
import { luxuryEase } from '../utils/animations';

interface BookingSectionProps {
  preselectedService?: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    service: preselectedService || 'Full 5-Pillar Transformation Package',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (08:00 AM – 12:00 PM)',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedBooking, setSubmittedBooking] = useState<{
    referenceId: string;
    data: FormState;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    // Phone validation (digits, minimum 10 digits)
    const phoneClean = formData.phone.replace(/[\s-()+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for concierge confirmation.';
    } else if (phoneClean.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number.';
    }

    // Email validation if entered
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }

    if (!formData.service) {
      newErrors.service = 'Please select your primary pillar of interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real submission handling
    setTimeout(() => {
      const randomRef = 'NFYVE-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedBooking({
        referenceId: randomRef,
        data: { ...formData },
      });
      setIsSubmitting(false);
    }, 600);
  };

  const shouldReduceMotion = useReducedMotion();

  const handleReset = () => {
    setSubmittedBooking(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: 'Full 5-Pillar Transformation Package',
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Morning (08:00 AM – 12:00 PM)',
      notes: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-8 md:py-10 lg:py-12 bg-gradient-to-b from-[#211A18] to-[#401724] relative text-[#FFFAF4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Verified Contact Information */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: luxuryEase }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div className="inline-flex items-center gap-1.5 text-[#F0C46B] text-[10px] font-bold tracking-wider uppercase">
              <Calendar className="w-3.5 h-3.5 text-[#D6B16A]" />
              <span>Begumpet Concierge</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFFAF4] leading-tight">
              Begin Your Change Today.
            </h2>

            <p className="text-xs sm:text-sm text-[#E8D9C7] leading-relaxed">
              Schedule your comprehensive transformation assessment. Our consultants will evaluate your skin, body composition, hair profile, and fitness milestones to draft a bespoke protocol.
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                className="flex items-center gap-3 p-3 rounded-xl bg-[#211A18]/70 border border-[#D6B16A]/30 hover:border-[#D6B16A] transition-all group"
                href={`tel:${NFYVE_CONTACT.phone}`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#401724] border border-[#D6B16A]/50 text-[#F0C46B] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#E8D9C7]/80 block font-medium">Direct Sanctuary Phone</span>
                  <span className="font-serif text-sm sm:text-base text-[#FFFAF4] font-bold tabular-nums">
                    {NFYVE_CONTACT.phoneDisplay}
                  </span>
                </div>
              </a>

              <a
                className="flex items-center gap-3 p-3 rounded-xl bg-[#211A18]/70 border border-[#D6B16A]/30 hover:border-[#D6B16A] transition-all group"
                href={`mailto:${NFYVE_CONTACT.email}`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#401724] border border-[#D6B16A]/50 text-[#F0C46B] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#E8D9C7]/80 block font-medium">Email Inquiries</span>
                  <span className="font-serif text-sm sm:text-base text-[#FFFAF4] font-bold">
                    {NFYVE_CONTACT.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#211A18]/70 border border-[#D6B16A]/30">
                <div className="w-9 h-9 rounded-lg bg-[#401724] border border-[#D6B16A]/50 text-[#F0C46B] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#E8D9C7]/80 block font-medium">Flagship Location</span>
                  <span className="text-xs text-[#FFFAF4] font-medium leading-snug block">
                    {NFYVE_CONTACT.address}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#211A18]/70 border border-[#D6B16A]/30">
                <div className="w-9 h-9 rounded-lg bg-[#401724] border border-[#D6B16A]/50 text-[#F0C46B] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#E8D9C7]/80 block font-medium">Operating Hours</span>
                  <span className="text-xs text-[#FFFAF4] font-medium">
                    {NFYVE_CONTACT.hours}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Booking Form or Confirmation Card with Subtle Entrance */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.15, ease: luxuryEase }}
            className="lg:col-span-7"
          >
            <div className="bg-[#242426] rounded-2xl p-5 sm:p-6 md:p-7 border border-[#D6B16A]/50 shadow-2xl relative">
              {submittedBooking ? (
                /* Successful Submission Confirmation Card */
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="text-center">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#F0C46B]">
                      Request Received
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FFFAF4] mt-1">
                      Consultation Scheduled
                    </h3>
                    <p className="text-xs text-[#E8D9C7] mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-[#FFFAF4]">{submittedBooking.data.fullName}</strong>. Your sanctuary consultation request has been logged.
                    </p>
                  </div>

                  {/* Booking Voucher Summary */}
                  <div className="bg-[#211A18] rounded-2xl p-5 border border-[#D6B16A]/40 space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-[#D6B16A]/20">
                      <span className="text-[#E8D9C7]/70">Reference ID</span>
                      <span className="font-mono text-[#F0C46B] font-bold tracking-wider">
                        {submittedBooking.referenceId}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-[#D6B16A]/20">
                      <span className="text-[#E8D9C7]/70">Service Requested</span>
                      <span className="text-[#FFFAF4] font-medium text-right max-w-[200px] truncate">
                        {submittedBooking.data.service}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-[#D6B16A]/20">
                      <span className="text-[#E8D9C7]/70">Contact Number</span>
                      <span className="text-[#FFFAF4] font-medium tabular-nums">
                        {submittedBooking.data.phone}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-[#D6B16A]/20">
                      <span className="text-[#E8D9C7]/70">Preferred Window</span>
                      <span className="text-[#FFFAF4] font-medium">
                        {submittedBooking.data.timeSlot}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#E8D9C7]/70">Sanctuary Location</span>
                      <span className="text-[#F0C46B] font-medium">4th Floor, Kura Towers, Begumpet</span>
                    </div>
                  </div>

                  <div className="bg-[#401724]/60 p-4 rounded-xl border border-[#D6B16A]/30 text-xs text-[#E8D9C7] leading-relaxed">
                    📞 Our concierge will connect via <strong className="text-[#FFFAF4]">+91 9000023050</strong> shortly to finalize your diagnostic appointment and private room allocation.
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`tel:${NFYVE_CONTACT.phone}`}
                      className="flex-1 py-3 px-5 rounded-full bg-[#D6B16A] text-[#211A18] text-xs font-bold hover:bg-[#F0C46B] transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Speak with Concierge Now</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="py-3 px-5 rounded-full bg-[#211A18] text-[#E8D9C7] border border-[#D6B16A]/40 hover:bg-[#401724] hover:text-[#FFFAF4] transition-colors text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Book Another Appointment</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Booking Form */
                <>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FFFAF4] mb-0.5 font-semibold">
                    Book a Sanctuary Consultation
                  </h3>
                  <p className="text-xs text-[#E8D9C7] mb-3.5">
                    Select your initial service interest and preferred appointment slot.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-semibold text-[#FFFAF4] mb-1">
                          Your Full Name <span className="text-[#F0C46B]">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                          }}
                          placeholder="e.g. Ananya Rao"
                          className={`w-full bg-[#FFFAF4] text-[#211A18] placeholder-[#211A18]/50 border rounded-lg px-3.5 py-2 sm:py-2.5 text-xs outline-none transition-all ${
                            errors.fullName
                              ? 'border-rose-400 ring-2 ring-rose-400/30'
                              : 'border-[#D6B16A]/40 focus:border-[#F0C46B] focus:ring-2 focus:ring-[#D6B16A]/30'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-rose-300 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-[#FFFAF4] mb-1">
                          Phone Number <span className="text-[#F0C46B]">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="+91 98765 43210"
                          className={`w-full bg-[#FFFAF4] text-[#211A18] placeholder-[#211A18]/50 border rounded-lg px-3.5 py-2 sm:py-2.5 text-xs outline-none transition-all ${
                            errors.phone
                              ? 'border-rose-400 ring-2 ring-rose-400/30'
                              : 'border-[#D6B16A]/40 focus:border-[#F0C46B] focus:ring-2 focus:ring-[#D6B16A]/30'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-rose-300 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email & Primary Pillar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[#FFFAF4] mb-1">
                          Email Address <span className="text-xs text-[#E8D9C7]/60">(Optional)</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="ananya@example.com"
                          className={`w-full bg-[#FFFAF4] text-[#211A18] placeholder-[#211A18]/50 border rounded-lg px-3.5 py-2 sm:py-2.5 text-xs outline-none transition-all ${
                            errors.email
                              ? 'border-rose-400 ring-2 ring-rose-400/30'
                              : 'border-[#D6B16A]/40 focus:border-[#F0C46B] focus:ring-2 focus:ring-[#D6B16A]/30'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-rose-300 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-xs font-semibold text-[#FFFAF4] mb-1">
                          Primary Pillar of Interest <span className="text-[#F0C46B]">*</span>
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#FFFAF4] text-[#211A18] border border-[#D6B16A]/40 rounded-lg px-3.5 py-2 sm:py-2.5 text-xs focus:border-[#F0C46B] focus:ring-2 focus:ring-[#D6B16A]/30 outline-none transition-all cursor-pointer"
                        >
                          <option value="Salon & Hair Care (Keratin, Nanoplastia, Balayage)">
                            Salon &amp; Hair Care (Keratin, Nanoplastia, Balayage)
                          </option>
                          <option value="Clinical Skin Aesthetics (HydraFacial, Carbon Laser, PRP)">
                            Clinical Skin Aesthetics (HydraFacial, Carbon Laser, PRP)
                          </option>
                          <option value="Slimming & Fat Loss (Cryolipolysis, Inch Loss)">
                            Slimming &amp; Fat Loss (Cryolipolysis, Inch Loss)
                          </option>
                          <option value="Gym & Performance Fitness (MaxFit Coaching)">
                            Gym &amp; Performance Fitness (MaxFit Coaching)
                          </option>
                          <option value="Nutri Food Cafe & Macro Meal Subscriptions">
                            Nutri Food Cafe &amp; Macro Meal Subscriptions
                          </option>
                          <option value="Full 5-Pillar Transformation Package">
                            Full 5-Pillar Transformation Package
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Date & Time Window */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="date" className="block text-xs font-semibold text-[#FFFAF4] mb-1">
                          Preferred Date
                        </label>
                        <input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-[#FFFAF4] text-[#211A18] border border-[#D6B16A]/40 rounded-lg px-3.5 py-2 sm:py-2.5 text-xs focus:border-[#F0C46B] focus:ring-2 focus:ring-[#D6B16A]/30 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="timeSlot" className="block text-xs font-semibold text-[#FFFAF4] mb-1">
                          Preferred Time Window
                        </label>
                        <select
                          id="timeSlot"
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full bg-[#FFFAF4] text-[#211A18] border border-[#D6B16A]/40 rounded-lg px-3.5 py-2 sm:py-2.5 text-xs focus:border-[#F0C46B] focus:ring-2 focus:ring-[#D6B16A]/30 outline-none transition-all cursor-pointer"
                        >
                          <option value="Morning (08:00 AM – 12:00 PM)">Morning (08:00 AM – 12:00 PM)</option>
                          <option value="Afternoon (12:00 PM – 04:00 PM)">Afternoon (12:00 PM – 04:00 PM)</option>
                          <option value="Evening (04:00 PM – 08:30 PM)">Evening (04:00 PM – 08:30 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Goals / Notes */}
                    <div>
                      <label htmlFor="notes" className="block text-xs font-semibold text-[#FFFAF4] mb-1">
                        Special Goals / Aesthetic Concerns
                      </label>
                      <textarea
                        id="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us what you would like to achieve (e.g. hair frizz control, 5kg inch-loss, acne glow)..."
                        className="w-full bg-[#FFFAF4] text-[#211A18] placeholder-[#211A18]/50 border border-[#D6B16A]/40 rounded-lg px-3.5 py-2 text-xs focus:border-[#F0C46B] focus:ring-2 focus:ring-[#D6B16A]/30 outline-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold hover:bg-[#571f31] transition-all duration-300 shadow-lg bloom-shadow flex items-center justify-center gap-2 border border-[#D6B16A] active:scale-98 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <span>Confirm Appointment Request</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#F0C46B]" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-[10px] text-[#E8D9C7]/70 mt-1.5">
                      🔒 Doctor-patient and client confidentiality strictly maintained. No spam guaranteed.
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
