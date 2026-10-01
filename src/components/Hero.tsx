import React from 'react';
import { ArrowRight, Star, Users, CheckCircle2, Sparkles, Heart } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
  return (
    <section
      id="hero"
      className="relative pt-14 pb-20 md:py-28 bg-gradient-to-b from-[#211A18] via-[#401724] to-[#211A18] overflow-hidden"
    >
      {/* Radial ambient glow behind headline */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#F0C46B]/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#D6B16A]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#401724]/90 border border-[#D6B16A]/40 shadow-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-[#F0C46B] animate-ping" />
              <span className="text-xs text-[#FFFAF4] font-medium tracking-wide">
                Begumpet Luxury Flagship · Hyderabad
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FFFAF4] font-medium leading-[1.15] text-balance">
              Transform Your Body, <br />
              <span className="italic font-normal text-[#F0C46B]">Elevate Your Lifestyle.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#E8D9C7] max-w-xl leading-relaxed">
              Where beauty, clinical aesthetics, fat loss, fitness, and nutrition converge under one roof in Begumpet.
              Experience effortless transformation guided by certified medical and wellness specialists.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="px-8 py-3.5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold hover:bg-[#571f31] transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 flex items-center gap-2.5 border border-[#D6B16A] bloom-shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#F0C46B]" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-8 py-3.5 rounded-full bg-[#211A18]/70 text-[#FFFAF4] border border-[#D6B16A]/70 hover:bg-[#D6B16A]/15 hover:border-[#F0C46B] transition-all duration-300 text-xs font-semibold shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
              >
                Explore Our Services
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#D6B16A]/20 flex flex-wrap items-center gap-6 text-[#E8D9C7] text-xs font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F0C46B]" />
                <span>Doctor-Led Aesthetics</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D6B16A]" />
                <span>100% Non-Invasive Protocols</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F0C46B]" />
                <span>Bespoke Nutri Kitchen</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D6B16A]/50 bg-[#211A18] relative aspect-[4/5] transform hover:scale-[1.01] transition-transform duration-500 gold-glow">
                <img
                  alt="NFYVE Luxury Aesthetics - Not just nails, a reflection of you"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlnYI3dK8XbQFmrf33Dxue7TTW7Tne3dM11jZahbp2hgV2GZ7jlYtHe66fJge9P0fxPpdZ6ywXZSg_YvuTqUI8yyR5lIqJf1UKskX4LvMbVxC4ky-mbUpXwSwPzS_H_4MNk8-RFdYt2hU6didEj-l8IzTF8mYUymC5UR0FgUVOt4s__wh5rRhsNwXQX8M18_hQr2BsFWvKWykwLt8imwjr-4gcnYUUld40P1aa2NWGsPu2w6FxZ7sQdX9B6qDSqkw0LvY"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211A18]/95 via-[#211A18]/30 to-transparent flex flex-col justify-end p-6 text-[#FFFAF4]">
                  <span className="font-serif text-xl italic font-light text-[#F0C46B]">
                    "Not just nails. A reflection of you."
                  </span>
                  <span className="text-xs text-[#E8D9C7] tracking-wider uppercase mt-1 font-semibold">
                    NFYVE Haute Nail &amp; Aesthetic Bar
                  </span>
                </div>
              </div>

              {/* Floating Micro-Badge: Google Verified Rating */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-[#401724]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#D6B16A]/60 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#211A18] border border-[#D6B16A]/40 flex items-center justify-center text-[#F0C46B]">
                  <Star className="w-5 h-5 fill-[#F0C46B] text-[#F0C46B]" />
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-sm text-[#FFFAF4]">
                    <span>★ 4.9</span>
                    <span className="text-xs text-[#E8D9C7] font-normal tabular-nums">(132+ Reviews)</span>
                  </div>
                  <div className="text-xs text-[#F0C46B] font-semibold">Verified on Google</div>
                </div>
              </div>

              {/* Floating Micro-Badge: Transformed Clients */}
              <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-[#401724]/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#D6B16A]/60 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#211A18] border border-[#D6B16A]/40 flex items-center justify-center text-[#F0C46B]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-[#FFFAF4] leading-none tabular-nums">
                    1,500+
                  </div>
                  <div className="text-xs text-[#E8D9C7] mt-0.5">Happy Transformations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
