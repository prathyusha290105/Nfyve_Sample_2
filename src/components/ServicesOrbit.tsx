import React, { useState } from 'react';
import {
  Sparkles,
  HeartHandshake,
  Scale,
  Dumbbell,
  UtensilsCrossed,
  ArrowRight,
  X,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { SERVICE_PILLARS, ServicePillar } from '../data/nfyveData';

interface ServicesOrbitProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesOrbit: React.FC<ServicesOrbitProps> = ({ onSelectServiceForBooking }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [detailPillar, setDetailPillar] = useState<ServicePillar | null>(null);

  const currentPillar = SERVICE_PILLARS[selectedIndex];

  // Helper to get Lucide icon component
  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'Dumbbell':
        return <Dumbbell className={className} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Node positions along a 720px circle (radius = 330px around center 360, 360)
  // Angles: 0° (-90° from top), 72°, 144°, 216°, 288°
  // 0: top (X: 360, Y: 30)
  // 1: top-right (X: 674, Y: 258)
  // 2: bottom-right (X: 554, Y: 627)
  // 3: bottom-left (X: 166, Y: 627)
  // 4: top-left (X: 46, Y: 258)
  const nodePositions = [
    { top: '30px', left: '360px' },
    { top: '258px', left: '674px' },
    { top: '627px', left: '554px' },
    { top: '627px', left: '166px' },
    { top: '258px', left: '46px' },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-[#E8D9C7] border-t border-[#D6B16A]/30 relative overflow-hidden">
      {/* Ambient orbital background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#D6B16A]/20 via-[#F0C46B]/15 to-[#401724]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[#401724] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#D6B16A]" />
            <span>★ FIVE DEDICATED PILLARS OF TRANSFORMATION</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#401724] font-medium leading-tight mb-4">
            Holistic Pillars of <span className="italic font-normal text-[#D6B16A]">Transformation</span>
          </h2>
          <p className="text-[#211A18]/80 text-base max-w-2xl leading-relaxed">
            Explore specialized wings staffed by certified dermatologists, trichologists, master colorists, ACE fitness trainers, and certified dieticians.
          </p>
        </div>

        {/* Interactive Circular Orbit System (Desktop & Tablet) */}
        <div className="hidden md:flex justify-center items-center relative min-h-[760px] my-4">
          {/* Concentric Orbital Guide Rings */}
          <div className="absolute w-[720px] h-[720px] rounded-full border border-dashed border-[#D6B16A]/50 pointer-events-none" />
          <div className="absolute w-[560px] h-[560px] rounded-full border border-[#D6B16A]/40 pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-[#D6B16A]/30 pointer-events-none" />

          {/* Center Luminous Focal Heart */}
          <div className="relative z-30 w-80 h-80 rounded-full bg-gradient-to-b from-[#401724] to-[#211A18] border-4 border-[#F0C46B] luminous-halo p-4 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 shadow-2xl group">
            {/* Background luxury portrait image with overlay */}
            <img
              alt={currentPillar.title}
              className="absolute inset-0 w-full h-full object-cover rounded-full mix-blend-luminosity opacity-35 group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105"
              src={currentPillar.image}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211A18]/95 via-[#401724]/80 to-[#211A18]/70 rounded-full" />

            {/* Inner content frame */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-2">
              <div className="w-12 h-12 rounded-full bg-[#FFFAF4]/10 backdrop-blur-md flex items-center justify-center text-[#F0C46B] ring-1 ring-[#D6B16A]/60 shadow-inner mb-2">
                {getIcon(currentPillar.icon, 'w-6 h-6 text-[#F0C46B]')}
              </div>
              <span className="text-[11px] text-[#F0C46B] uppercase tracking-widest font-bold drop-shadow">
                {currentPillar.tag}
              </span>
              <h3 className="font-serif text-xl text-[#FFFAF4] font-semibold mt-1 mb-1 drop-shadow transition-all duration-300">
                {currentPillar.title}
              </h3>
              <p className="text-[#E8D9C7] text-xs line-clamp-3 px-3 leading-relaxed mb-3 drop-shadow transition-all duration-300">
                {currentPillar.fullDesc}
              </p>
              <button
                onClick={() => setDetailPillar(currentPillar)}
                className="px-5 py-2 rounded-full bg-[#D6B16A] text-[#211A18] text-xs font-bold hover:bg-[#F0C46B] shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 border border-[#FFFAF4]/40 active:scale-95 group/btn cursor-pointer"
              >
                <span>Explore Wing</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#211A18] group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Stationary Upright Orbit Cards Wrapper */}
          <div className="absolute w-[720px] h-[720px] rounded-full pointer-events-auto">
            {SERVICE_PILLARS.map((pillar, idx) => {
              const pos = nodePositions[idx];
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={pillar.id}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-40 group"
                  onClick={() => setSelectedIndex(idx)}
                >
                  <div
                    className={`w-[205px] bg-[#F7F0E7] backdrop-blur-md p-3.5 rounded-2xl shadow-xl border-2 transition-all duration-300 hover:scale-105 flex flex-col gap-2.5 text-left ${
                      isSelected
                        ? 'border-[#F0C46B] ring-2 ring-[#D6B16A]/50 scale-105 shadow-2xl'
                        : 'border-[#D6B16A]/50 hover:border-[#D6B16A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#D6B16A]/60 shadow-inner">
                        <img
                          alt={pillar.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src={pillar.image}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] px-2 py-0.5 bg-[#401724] text-[#F0C46B] font-bold rounded-full w-fit mb-0.5 uppercase tracking-wider">
                          {pillar.tag}
                        </span>
                        <h4 className="text-xs font-bold text-[#401724] leading-snug line-clamp-2">
                          {pillar.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#211A18]/70 leading-tight line-clamp-2">
                      {pillar.shortDesc}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-[#D6B16A]/30 text-[10px] font-semibold text-[#401724]">
                      <span>Spotlight Wing</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D6B16A]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Touch-Friendly Alternative View */}
        <div className="md:hidden flex flex-col gap-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scroll-hide">
            {SERVICE_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setSelectedIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedIndex === idx
                    ? 'bg-[#401724] text-[#FFFAF4] border border-[#D6B16A]'
                    : 'bg-[#F7F0E7] border border-[#D6B16A]/40 text-[#401724]'
                }`}
              >
                {idx + 1}. {pillar.tag}
              </button>
            ))}
          </div>

          <div className="bg-[#F7F0E7] rounded-3xl p-6 border border-[#D6B16A]/40 warm-card-shadow relative overflow-hidden">
            <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 relative">
              <img
                alt={currentPillar.title}
                className="w-full h-full object-cover"
                src={currentPillar.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211A18]/90 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[#FFFAF4] bg-[#401724]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D6B16A]/40">
                {currentPillar.tag}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#401724] flex items-center justify-center text-[#F0C46B] shrink-0">
                {getIcon(currentPillar.icon, 'w-5 h-5 text-[#F0C46B]')}
              </div>
              <h3 className="font-serif text-xl text-[#401724] font-semibold">{currentPillar.title}</h3>
            </div>

            <p className="text-[#211A18]/80 text-sm leading-relaxed mb-4">{currentPillar.fullDesc}</p>

            <button
              onClick={() => setDetailPillar(currentPillar)}
              className="inline-flex items-center justify-between w-full py-3 px-5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold border border-[#D6B16A] active:scale-98"
            >
              <span>Explore Wing Treatments</span>
              <ArrowRight className="w-4 h-4 text-[#F0C46B]" />
            </button>
          </div>
        </div>

        {/* Orbit Helper Instruction */}
        <div className="text-center mt-6">
          <span className="text-xs text-[#401724]/80 inline-flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#D6B16A]" />
            Tap any planetary card or focal heart to spotlight and explore full wing protocols
          </span>
        </div>
      </div>

      {/* Full Pillar Detail Modal */}
      {detailPillar && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#211A18]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
        >
          <div className="bg-[#242426] border-2 border-[#D6B16A] rounded-3xl max-w-2xl w-full p-6 md:p-8 text-[#FFFAF4] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setDetailPillar(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#401724] text-[#E8D9C7] hover:text-[#FFFAF4] hover:bg-[#571f31] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#401724] border border-[#D6B16A]/50 flex items-center justify-center text-[#F0C46B]">
                {getIcon(detailPillar.icon, 'w-6 h-6 text-[#F0C46B]')}
              </div>
              <div>
                <span className="text-xs text-[#F0C46B] uppercase font-bold tracking-widest">
                  {detailPillar.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FFFAF4]">{detailPillar.title}</h3>
              </div>
            </div>

            <p className="text-sm text-[#E8D9C7] leading-relaxed mb-6">{detailPillar.fullDesc}</p>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#F0C46B] font-bold mb-3">
                Featured Clinical &amp; Sanctuary Treatments
              </h4>
              <ul className="space-y-2.5">
                {detailPillar.treatments.map((treatment, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#FFFAF4]">
                    <CheckCircle2 className="w-4 h-4 text-[#D6B16A] shrink-0 mt-0.5" />
                    <span>{treatment}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#D6B16A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#E8D9C7]/80">
                Administered in private suites on the 4th Floor, Begumpet.
              </div>
              <button
                onClick={() => {
                  const serviceName = detailPillar.title;
                  setDetailPillar(null);
                  onSelectServiceForBooking(serviceName);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold hover:bg-[#571f31] transition-all flex items-center justify-center gap-2 border border-[#D6B16A] bloom-shadow"
              >
                <Calendar className="w-4 h-4 text-[#F0C46B]" />
                <span>Book This Service</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
