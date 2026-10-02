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
      icon: <Layers className="w-5 h-5 lg:w-5.5 lg:h-5.5" />,
      title: '5 Wellness Dimensions',
      desc: 'Save hours every week. Salon, dermatological clinic, slimming suite, gym, and cafe situated in one seamless destination.',
      bg: 'bg-[#401724]',
      text: 'text-[#FFFAF4]',
      subtext: 'text-[#E8D9C7]',
      iconBg: 'bg-[#211A18]',
    },
    {
      icon: <Cpu className="w-5 h-5 lg:w-5.5 lg:h-5.5" />,
      title: 'Non-Invasive Tech',
      desc: 'FDA-cleared fat freeze Cryolipolysis, Lipolysis, Carbon Laser (O3), Pico Laser, and HydraFacial with zero social downtime.',
      bg: 'bg-[#F7F0E7]',
      text: 'text-[#401724]',
      subtext: 'text-[#211A18]/70',
      iconBg: 'bg-[#401724]',
    },
    {
      icon: <HeartPulse className="w-5 h-5 lg:w-5.5 lg:h-5.5" />,
      title: 'Tailored Protocols',
      desc: 'Zero generic routines. Every treatment is designed after thorough skin analysis and body composition scans.',
      bg: 'bg-[#F7F0E7]',
      text: 'text-[#401724]',
      subtext: 'text-[#211A18]/70',
      iconBg: 'bg-[#401724]',
    },
    {
      icon: <Sparkles className="w-5 h-5 lg:w-5.5 lg:h-5.5" />,
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
      className="min-h-[calc(100vh-90px)] lg:min-h-[calc(100svh-90px)] py-12 md:py-16 lg:py-20 bg-[#E8D9C7] relative overflow-hidden flex flex-col justify-center"
    >
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#D6B16A]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Progressive Structured Reveal */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
            {/* 1. Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: structuredEase }}
              className="inline-flex items-center gap-2 text-[#401724] text-xs font-bold tracking-wider uppercase"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D6B16A]" />
              <span>Why Choose NFYVE</span>
            </motion.div>

            {/* 2. Heading - Revealed First */}
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.1, ease: structuredEase }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] text-[#401724] font-medium leading-[1.2]"
            >
              Your Complete Transformation Partner Under One Roof.
            </motion.h2>

            {/* 3. Introduction Paragraph - Revealed Second */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : 0.2, ease: structuredEase }}
              className="text-sm sm:text-base lg:text-[16px] text-[#211A18]/80 leading-relaxed"
            >
              At <strong>NFYVE – The Change</strong>, we combine Weight Loss, Fitness, Aesthetics, Nutrition, Gym, and Salon care to deliver real, visible results. Our approach is personalized, technology-driven, and focused on helping you achieve long-term transformation—not just temporary changes.
            </motion.p>

            {/* 4. Bento Feature Cards in Cascading Structured Staircase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 pt-1">
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
                          y: -4,
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }
                  }
                  className={`p-4 sm:p-5 lg:p-6 rounded-2xl ${card.bg} border border-[#D6B16A]/50 ${card.text} shadow-md transition-shadow hover:shadow-xl`}
                >
                  <div
                    className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl ${card.iconBg} border border-[#D6B16A]/40 flex items-center justify-center text-[#F0C46B] mb-2.5 sm:mb-3`}
                  >
                    {card.icon}
                  </div>
                  <h4 className={`font-serif text-base sm:text-lg lg:text-xl ${card.text} mb-1 font-semibold`}>
                    {card.title}
                  </h4>
                  <p className={`text-xs sm:text-sm lg:text-[14px] ${card.subtext} leading-relaxed`}>
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 5. CTA Button */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.5, ease: structuredEase }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onBookClick}
                className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs sm:text-sm lg:text-base font-semibold hover:bg-[#571f31] transition-all shadow-lg bloom-shadow active:scale-95 border border-[#D6B16A] cursor-pointer"
              >
                Book a Free Consultation
              </button>
              <span className="text-xs sm:text-sm text-[#401724]/85 font-medium">Personalized tour included</span>
            </motion.div>
          </div>

          {/* Right Column: Carousel with Structured Settle */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.25, ease: structuredEase }}
            className="lg:col-span-5 relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D6B16A]/40 bg-[#211A18] aspect-[4/5] max-h-[480px] lg:max-h-[520px] xl:max-h-[560px] group warm-card-shadow"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211A18]/95 via-[#211A18]/25 to-transparent flex flex-col justify-end p-6 text-[#FFFAF4]">
                      <span className="text-xs text-[#F0C46B] uppercase font-bold tracking-wider mb-1">
                        {slide.tag}
                      </span>
                      <div className="font-serif text-2xl font-semibold">{slide.title}</div>
                      <p className="text-xs sm:text-sm text-[#E8D9C7] mt-1.5 leading-relaxed">{slide.caption}</p>

                      {/* Structured Statistics Pill */}
                      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#D6B16A]/30">
                        <div>
                          <div className="font-serif text-xl sm:text-2xl font-bold text-[#F0C46B]">98%</div>
                          <div className="text-xs text-[#E8D9C7]">Client Satisfaction</div>
                        </div>
                        <div>
                          <div className="font-serif text-xl sm:text-2xl font-bold text-[#F0C46B]">5 kg / 6 wks</div>
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
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#211A18]/80 text-[#FFFAF4] border border-[#D6B16A]/50 flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-[#401724] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-[#F0C46B]" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#211A18]/80 text-[#FFFAF4] border border-[#D6B16A]/50 flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-[#401724] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
