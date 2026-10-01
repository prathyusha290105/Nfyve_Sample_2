import React from 'react';
import { Phone, Mail, Instagram, Globe, Sparkles } from 'lucide-react';
import { NFYVE_CONTACT } from '../data/nfyveData';

export const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#211A18] text-[#E8D9C7] w-full border-t border-[#D6B16A]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Summary Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#401724] p-2 flex items-center justify-center ring-1 ring-[#D6B16A]/50">
                <img
                  alt="NFYVE"
                  className="w-full h-full object-contain filter invert"
                  src={NFYVE_CONTACT.footerLogoUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif text-2xl text-[#FFFAF4] tracking-tight font-medium">NFYVE</span>
                <span className="block text-xs text-[#D6B16A] tracking-widest uppercase font-semibold">
                  The Change
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E8D9C7]/80 leading-relaxed max-w-sm">
              Hyderabad’s premier destination unifying luxury salon artistry, clinical aesthetics, medical fat loss, performance fitness, and custom nutrition under one architectural roof.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={NFYVE_CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#401724] border border-[#D6B16A]/30 flex items-center justify-center text-[#FFFAF4] hover:bg-[#D6B16A] hover:text-[#211A18] transition-colors"
                aria-label="NFYVE Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={NFYVE_CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#401724] border border-[#D6B16A]/30 flex items-center justify-center text-[#FFFAF4] hover:bg-[#D6B16A] hover:text-[#211A18] transition-colors"
                aria-label="NFYVE Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>

              <a
                href={`tel:${NFYVE_CONTACT.phone}`}
                className="w-10 h-10 rounded-full bg-[#401724] border border-[#D6B16A]/30 flex items-center justify-center text-[#FFFAF4] hover:bg-[#D6B16A] hover:text-[#211A18] transition-colors"
                aria-label="Call NFYVE Sanctuary"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pillar Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg text-[#FFFAF4] mb-4 font-semibold">Five Pillars</h4>
            <ul className="space-y-2.5 text-xs text-[#E8D9C7]/80">
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Salon Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Skin Aesthetics
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Slimming Clinic
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Gym Suites
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Nutri Bar Menu
                </button>
              </li>
            </ul>
          </div>

          {/* Clinic & Policies */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg text-[#FFFAF4] mb-4 font-semibold">Protocols &amp; Info</h4>
            <ul className="space-y-2.5 text-xs text-[#E8D9C7]/80">
              <li>
                <button onClick={() => scrollTo('#why-us')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Begumpet Location
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#reviews')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Google Trust Reviews
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#contact')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Consultation Policy
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#about')} className="hover:text-[#F0C46B] transition-colors cursor-pointer text-left">
                  Medical Advisory Board
                </button>
              </li>
              <li>
                <span className="text-[#E8D9C7]/60">Confidentiality Assured</span>
              </li>
            </ul>
          </div>

          {/* Location & Direct Dispatch */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg text-[#FFFAF4] mb-4 font-semibold">Begumpet Flagship</h4>
            <p className="text-xs text-[#E8D9C7]/80 leading-relaxed mb-3">
              {NFYVE_CONTACT.address}
            </p>

            <div className="flex flex-col gap-1 text-xs">
              <a className="text-[#F0C46B] font-semibold hover:underline tabular-nums" href={`tel:${NFYVE_CONTACT.phone}`}>
                {NFYVE_CONTACT.phoneDisplay}
              </a>
              <a className="text-[#E8D9C7] hover:text-[#F0C46B]" href={`mailto:${NFYVE_CONTACT.email}`}>
                {NFYVE_CONTACT.email}
              </a>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#401724] text-[#D6B16A] text-[11px] font-semibold border border-[#D6B16A]/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{NFYVE_CONTACT.hours}</span>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 border-t border-[#D6B16A]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[#E8D9C7]/70">
            © 2026 NFYVE – The Change. Begumpet, Hyderabad. All rights reserved. Holistic Beauty, Clinical Aesthetics &amp; Human Performance.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#E8D9C7]/70">
            <span>Doctor-Led Sanitation</span>
            <span>•</span>
            <span>Non-Invasive Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
