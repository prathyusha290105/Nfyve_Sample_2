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
import { motion, useReducedMotion } from 'motion/react';
import { CAROUSEL_SLIDES } from '../data/nfyveData';
import { structuredEase, bentoCardCascade } from '../utils/animations';

interface WhyChooseUsProps {
  onBookClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onBookClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

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

  const cardsData = [
    {
      icon: <Layers className="w-4 h-4 lg:w-4.5 lg:h-4.5" />,
      title: '5 Wellness Dimensions',
      desc: 'Save hours every week. Salon, dermatological clinic, slimming suite, gym, and cafe in one destination.',
      bg: 'bg-[#401724]',
      text: 'text-[#FFFAF4]',
      subtext: 'text-[#E8D9C7]',
      iconBg: 'bg-[#211A18]',
    },
    {
      icon: <Cpu className="w-4 h-4 lg:w-4.5 lg:h-4.5" />,
      title: 'Non-Invasive Tech',
      desc: 'FDA-cleared Cryolipolysis, Lipolysis, Carbon Laser (O3), Pico Laser, and HydraFacial with zero downtime.',
      bg: 'bg-[#F7F0E7]',
      text: 'text-[#401724]',
      subtext: 'text-[#211A18]/70',
      iconBg: 'bg-[#401724]',
    },
    {
      icon: <HeartPulse className="w-4 h-4 lg:w-4.5 lg:h-4.5" />,
      title: 'Tailored Protocols',
      desc: 'Zero generic routines. Every treatment is designed after thorough skin analysis and body composition scans.',
      bg: 'bg-[#F7F0E7]',
      text: 'text-[#401724]',
      subtext: 'text-[#211A18]/70',
      iconBg: 'bg-[#401724]',
    },
    {
      icon: <Sparkles className="w-4 h-4 lg:w-4.5 lg:h-4.5" />,
      title: 'Calm Ambience',
      desc: 'Fluted walls, ambient cove lighting, and warm hospitality designed to soothe anxiety the moment you enter.',
      bg: 'bg-[#401724]',
      text: 'text-[#FFFAF4]',
      subtext: 'text-[#E8D9C7]',
      iconBg: 'bg-[#211A18]',
    },
  ];

  return (
    <section
      id="why-us"
      className="min-h-[calc(100vh-90px)] lg:min-h-[calc(100svh-90px)] lg:h-[calc(100vh-90px)] lg:max-h-[calc(100vh-90px)] lg:h-[calc(100svh-90px)] lg:max-h-[calc(100svh-90px)] py-8 lg:py-0 bg-[#E8D9C7] relative overflow-hidden flex flex-col justify-center"
    >
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-[#D6B16A]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full my-auto relative z-10 shrink-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          {/* Left Column: Progressive Structured Reveal */}
          <div className="lg:col-span-7 flex flex-col gap-2.5 lg:gap-3">
            {/* 1. Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: structuredEase }}
              className="inline-flex items-center gap-1.5 text-[#401724] text-[10px] lg:text-[11px] font-bold tracking-wider uppercase"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B16A]" />
              <span>Why Choose NFYVE</span>
            </motion.div>

            {/* 2. Heading - Revealed First */}
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: structuredEase }}
              className="font-serif text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] text-[#401724] font-medium leading-[1.2]"
            >
              Your Complete Transformation Partner Under One Roof.
            </motion.h2>

            {/* 3. Introduction Paragraph - Revealed Second */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : 0.15, ease: structuredEase }}
              className="text-xs sm:text-[13px] text-[#211A18]/80 leading-relaxed max-w-xl"
            >
              At <strong>NFYVE – The Change</strong>, we combine Weight Loss, Fitness, Aesthetics, Nutrition, Gym, and Salon care to deliver real, visible results. Our approach is personalized, technology-driven, and focused on helping you achieve long-term transformation.
            </motion.p>

            {/* 4. Bento Feature Cards in Cascading Structured Staircase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:gap-3 pt-0.5">
              {cardsData.map((card, idx) => (
                <motion.div
                  key={card.title}
                  variants={shouldReduceMotion ? {} : bentoCardCascade(idx)}
                  initial={shouldReduceMotion ? { opacity: 1 } : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -3,
                          scale: 1.015,
                          transition: { duration: 0.2 },
                        }
                  }
                  className={`p-3 sm:p-3.5 lg:p-4 rounded-xl lg:rounded-2xl ${card.bg} border border-[#D6B16A]/50 ${card.text} shadow-xs hover:shadow-md transition-all`}
                >
                  <div
                    className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg ${card.iconBg} border border-[#D6B16A]/40 flex items-center justify-center text-[#F0C46B] mb-1.5`}
                  >
                    {card.icon}
                  </div>
                  <h4 className={`font-serif text-xs sm:text-sm lg:text-[15px] ${card.text} mb-0.5 font-semibold`}>
                    {card.title}
                  </h4>
                  <p className={`text-[11px] sm:text-xs lg:text-[12.5px] ${card.subtext} leading-snug line-clamp-2`}>
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 5. CTA Button */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.35, ease: structuredEase }}
              className="pt-1 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={onBookClick}
                className="px-5 py-2 lg:px-6 lg:py-2.5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs sm:text-[13px] font-semibold hover:bg-[#571f31] transition-all shadow-md bloom-shadow active:scale-95 border border-[#D6B16A] cursor-pointer"
              >
                Book a Free Consultation
              </button>
              <span className="text-[11px] sm:text-xs text-[#401724]/85 font-medium">Personalized tour included</span>
            </motion.div>
          </div>

          {/* Right Column: Carousel with Structured Settle */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.2, ease: structuredEase }}
            className="lg:col-span-5 relative"
          >
            <div
              className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border-3 border-[#D6B16A]/40 bg-[#211A18] aspect-[4/5] max-h-[360px] sm:max-h-[380px] lg:max-h-[400px] xl:max-h-[440px] group warm-card-shadow"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211A18]/95 via-[#211A18]/25 to-transparent flex flex-col justify-end p-4 lg:p-5 text-[#FFFAF4]">
                      <span className="text-[10px] text-[#F0C46B] uppercase font-bold tracking-wider mb-0.5">
                        {slide.tag}
                      </span>
                      <div className="font-serif text-lg lg:text-xl font-semibold leading-tight">{slide.title}</div>
                      <p className="text-[11px] sm:text-xs text-[#E8D9C7] mt-1 leading-snug line-clamp-2">{slide.caption}</p>

                      {/* Structured Statistics Pill */}
                      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#D6B16A]/30">
                        <div>
                          <div className="font-serif text-base sm:text-lg font-bold text-[#F0C46B]">98%</div>
                          <div className="text-[10px] text-[#E8D9C7]">Client Satisfaction</div>
                        </div>
                        <div>
                          <div className="font-serif text-base sm:text-lg font-bold text-[#F0C46B]">5 kg / 6 wks</div>
                          <div className="text-[10px] text-[#E8D9C7]">Avg. Slimming Result</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev / Next Manual Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#211A18]/80 text-[#FFFAF4] border border-[#D6B16A]/50 flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-[#401724] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 text-[#F0C46B]" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#211A18]/80 text-[#FFFAF4] border border-[#D6B16A]/50 flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-[#401724] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 text-[#F0C46B]" />
              </button>
            </div>

            {/* Pagination Dots underneath image */}
            <div className="flex items-center justify-center gap-1.5 mt-2" role="tablist">
              {CAROUSEL_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === index
                      ? 'w-6 bg-[#401724] border border-[#D6B16A]'
                      : 'w-2 bg-[#401724]/30 hover:bg-[#401724]/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={currentSlide === index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
