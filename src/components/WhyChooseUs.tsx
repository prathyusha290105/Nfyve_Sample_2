import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Cpu,
  HeartPulse,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { CAROUSEL_SLIDES } from '../data/nfyveData';

interface WhyChooseUsProps {
  onBookClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onBookClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = CAROUSEL_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3500); // 3.5 seconds

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#E8D9C7] relative overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#D6B16A]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Why Choose Copy & Bento Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-[#401724] text-xs font-bold tracking-wider uppercase">
              <CheckCircle2 className="w-4 h-4 text-[#D6B16A]" />
              <span>Why Choose NFYVE</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl text-[#401724] font-medium leading-tight">
              Your Complete Transformation Partner Under One Roof.
            </h2>

            <p className="text-base text-[#211A18]/80 leading-relaxed">
              At <strong>NFYVE – The Change</strong>, we combine Weight Loss, Fitness, Aesthetics, Nutrition, Gym, and Salon care to deliver real, visible results. Our approach is personalized, technology-driven, and focused on helping you achieve long-term transformation—not just temporary changes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-[#401724] border border-[#D6B16A]/50 text-[#FFFAF4] shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#211A18] border border-[#D6B16A]/40 flex items-center justify-center text-[#F0C46B] mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg text-[#FFFAF4] mb-1 font-semibold">5 Wellness Dimensions</h4>
                <p className="text-xs text-[#E8D9C7] leading-relaxed">
                  Save hours every week. Salon, dermatological clinic, slimming suite, gym, and cafe situated in one seamless destination.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl bg-[#F7F0E7] border border-[#D6B16A]/50 text-[#211A18] warm-card-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#401724] flex items-center justify-center text-[#F0C46B] mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg text-[#401724] mb-1 font-semibold">Non-Invasive Tech</h4>
                <p className="text-xs text-[#211A18]/70 leading-relaxed">
                  FDA-cleared fat freeze Cryolipolysis, Lipolysis, Carbon Laser (O3), Pico Laser, and HydraFacial with zero social downtime.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-[#F7F0E7] border border-[#D6B16A]/50 text-[#211A18] warm-card-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#401724] flex items-center justify-center text-[#F0C46B] mb-3">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg text-[#401724] mb-1 font-semibold">Tailored Protocols</h4>
                <p className="text-xs text-[#211A18]/70 leading-relaxed">
                  Zero generic routines. Every treatment is designed after thorough skin analysis and body composition scans.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-2xl bg-[#401724] border border-[#D6B16A]/50 text-[#FFFAF4] shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#211A18] border border-[#D6B16A]/40 flex items-center justify-center text-[#F0C46B] mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg text-[#FFFAF4] mb-1 font-semibold">Calm Ambience</h4>
                <p className="text-xs text-[#E8D9C7] leading-relaxed">
                  Fluted walls, ambient cove lighting, and warm hospitality designed to soothe anxiety the moment you enter.
                </p>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookClick}
                className="px-8 py-3.5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs font-semibold hover:bg-[#571f31] transition-all shadow-md bloom-shadow active:scale-95 border border-[#D6B16A] cursor-pointer"
              >
                Book a Free Consultation
              </button>
              <span className="text-xs text-[#401724]/80 font-medium">Personalized tour included</span>
            </div>
          </div>

          {/* Right Column: Horizontal Image Carousel */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D6B16A]/40 bg-[#211A18] aspect-[4/5] group warm-card-shadow"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-roledescription="carousel"
              aria-label="NFYVE Gym and Sanctuary Facilities Carousel"
            >
              {/* Carousel Track with smooth horizontal transition (700ms) */}
              <div
                className="flex w-full h-full transition-transform ease-out duration-700"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {CAROUSEL_SLIDES.map((slide) => (
                  <div key={slide.id} className="w-full h-full shrink-0 relative">
                    <img
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      src={slide.image}
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211A18]/95 via-[#211A18]/25 to-transparent flex flex-col justify-end p-7 text-[#FFFAF4]">
                      <span className="text-xs text-[#F0C46B] uppercase font-bold tracking-wider mb-1">
                        {slide.tag}
                      </span>
                      <div className="font-serif text-2xl font-semibold">{slide.title}</div>
                      <p className="text-xs text-[#E8D9C7] mt-1.5 leading-relaxed">{slide.caption}</p>

                      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#D6B16A]/30">
                        <div>
                          <div className="font-serif text-xl font-bold text-[#F0C46B]">98%</div>
                          <div className="text-xs text-[#E8D9C7]">Client Satisfaction</div>
                        </div>
                        <div>
                          <div className="font-serif text-xl font-bold text-[#F0C46B]">5 kg / 6 wks</div>
                          <div className="text-xs text-[#E8D9C7]">Avg. Slimming Result</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev / Next Manual Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#211A18]/80 text-[#FFFAF4] border border-[#D6B16A]/50 flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-[#401724] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-[#F0C46B]" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#211A18]/80 text-[#FFFAF4] border border-[#D6B16A]/50 flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-[#401724] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-[#F0C46B]" />
              </button>
            </div>

            {/* Pagination Dots underneath image */}
            <div className="flex items-center justify-center gap-2 mt-4" role="tablist">
              {CAROUSEL_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === index
                      ? 'w-8 bg-[#401724] border border-[#D6B16A]'
                      : 'w-2.5 bg-[#401724]/30 hover:bg-[#401724]/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={currentSlide === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
