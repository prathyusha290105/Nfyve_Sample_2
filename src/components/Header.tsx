import React, { useState } from 'react';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { NFYVE_CONTACT } from '../data/nfyveData';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-[#211A18]/90 backdrop-blur-md sticky top-0 z-50 shadow-md border-b border-[#D6B16A]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full h-20">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 transition-transform duration-200 active:scale-95 group focus-visible:outline focus-visible:outline-[#F0C46B]"
        >
          <div className="w-10 h-10 rounded-full bg-[#401724] border border-[#D6B16A]/50 flex items-center justify-center p-1.5 shadow-md">
            <img
              alt="NFYVE Emblem"
              className="w-full h-full object-contain filter brightness-110"
              src={NFYVE_CONTACT.logoUrl}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-tight text-[#FFFAF4] font-medium group-hover:text-[#F0C46B] transition-colors">
              NFYVE
            </span>
            <span className="text-[11px] tracking-widest text-[#D6B16A] uppercase -mt-1 font-semibold">
              The Change
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[#E8D9C7] hover:text-[#F0C46B] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F0C46B] rounded px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Trailing Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Phone Badge */}
          <a
            href={`tel:${NFYVE_CONTACT.phone}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#401724]/80 text-[#FFFAF4] border border-[#D6B16A]/40 hover:border-[#F0C46B] hover:bg-[#401724] transition-all duration-200 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
            aria-label="Call NFYVE Begumpet Sanctuary"
          >
            <Phone className="w-3.5 h-3.5 text-[#F0C46B]" />
            <span className="tabular-nums">{NFYVE_CONTACT.phoneDisplay}</span>
          </a>

          {/* Primary Booking Button */}
          <button
            onClick={onBookClick}
            className="px-5 py-2.5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold hover:bg-[#521e2f] shadow-md hover:shadow-lg transition-all duration-300 ease-out active:scale-95 flex items-center gap-2 border border-[#D6B16A]/70 bloom-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#F0C46B]" />
            <span className="whitespace-nowrap">Book Appointment</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#E8D9C7] hover:text-[#F0C46B] hover:bg-[#401724]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#211A18] border-b border-[#D6B16A]/30 px-6 py-6 transition-all duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base text-[#E8D9C7] hover:text-[#F0C46B] transition-colors py-1.5 border-b border-[#D6B16A]/10 font-serif"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`tel:${NFYVE_CONTACT.phone}`}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#401724]/70 text-[#FFFAF4] border border-[#D6B16A]/40 text-xs font-semibold"
              >
                <Phone className="w-4 h-4 text-[#F0C46B]" />
                <span>Call {NFYVE_CONTACT.phoneDisplay}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold border border-[#D6B16A] bloom-shadow flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#F0C46B]" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
