import React from 'react';
import { ArrowRight, Star, Users, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  cinematicEase,
  heroHeadingContainer,
  heroLineMask,
  heroImageCinematic,
  heroBadgeFloat,
} from '../utils/animations';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
  const shouldReduceMotion = useReducedMotion();

  // Stagger sequence container for cinematic sequence
  const copyContainerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const lineVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.9,
        ease: cinematicEase,
      },
    },
  };

  const ctaButtonVariants = (delay: number) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        delay: shouldReduceMotion ? 0 : delay,
        ease: cinematicEase,
      },
    },
  });

  const trustIndicatorVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : 0.6,
        ease: cinematicEase,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-90px)] lg:h-[calc(100vh-90px)] lg:max-h-[calc(100vh-90px)] lg:min-h-[calc(100svh-90px)] lg:h-[calc(100svh-90px)] lg:max-h-[calc(100svh-90px)] flex items-center justify-center bg-gradient-to-b from-[#211A18] via-[#401724] to-[#211A18] overflow-hidden py-6 lg:py-0"
    >
      {/* Radial ambient glow behind headline */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.15 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: cinematicEase }}
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#F0C46B] rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-6 right-6 w-72 h-72 bg-[#D6B16A]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Editorial Copy with Cinematic Stagger Sequence */}
          <motion.div
            variants={copyContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4"
          >
            {/* 1. Eyebrow badge */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: cinematicEase }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#401724]/90 border border-[#D6B16A]/40 shadow-sm w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F0C46B] animate-ping" />
                <span className="text-[11px] text-[#FFFAF4] font-medium tracking-wide">
                  Begumpet Luxury Flagship · Hyderabad
                </span>
              </div>
            </motion.div>

            {/* 2. Headline in Line-by-Line Masked Cinematic Reveal */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] text-[#FFFAF4] font-medium leading-[1.18] text-balance">
              <span className="block overflow-hidden pb-1">
                <motion.span variants={lineVariants} className="block">
                  Transform Your Body,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span variants={lineVariants} className="block italic font-normal text-[#F0C46B]">
                  Elevate Your Lifestyle.
                </motion.span>
              </span>
            </h1>

            {/* 3. Description */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.75, delay: shouldReduceMotion ? 0 : 0.35, ease: cinematicEase }}
              className="text-xs sm:text-sm lg:text-[15px] text-[#E8D9C7] max-w-lg leading-relaxed"
            >
              Where beauty, clinical aesthetics, fat loss, fitness, and nutrition converge under one roof in Begumpet.
              Experience effortless transformation guided by certified medical and wellness specialists.
            </motion.p>

            {/* 4. CTA Action Buttons with Sequential Entrance */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.button
                variants={ctaButtonVariants(0.48)}
                initial="hidden"
                animate="visible"
                whileHover={shouldReduceMotion ? {} : { scale: 1.025, boxShadow: "0 10px 25px -5px rgba(214,177,106,0.3)" }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={onBookClick}
                className="px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-[#401724] text-[#FFFAF4] text-xs sm:text-sm font-semibold hover:bg-[#571f31] transition-colors shadow-md flex items-center gap-2 border border-[#D6B16A] bloom-shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F0C46B]" />
              </motion.button>

              <motion.button
                variants={ctaButtonVariants(0.58)}
                initial="hidden"
                animate="visible"
                whileHover={shouldReduceMotion ? {} : { scale: 1.025, borderColor: "#F0C46B" }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                onClick={onExploreClick}
                className="px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-[#211A18]/70 text-[#FFFAF4] border border-[#D6B16A]/70 hover:bg-[#D6B16A]/15 transition-all text-xs sm:text-sm font-semibold shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C46B]"
              >
                Explore Our Services
              </motion.button>
            </div>

            {/* 5. Trust Indicators Sequentially Revealed */}
            <motion.div
              variants={trustIndicatorVariants}
              initial="hidden"
              animate="visible"
              className="pt-3 border-t border-[#D6B16A]/20 flex flex-wrap items-center gap-4 text-[#E8D9C7] text-xs font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F0C46B]" />
                <span>Doctor-Led Aesthetics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#D6B16A]" />
                <span>100% Non-Invasive Protocols</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F0C46B]" />
                <span>Bespoke Nutri Kitchen</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Visual: Cinematic Fade & Scale-in with subtle upward float */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative mx-auto max-w-sm lg:max-w-none w-full">
              <motion.div
                variants={heroImageCinematic}
                initial="hidden"
                animate="visible"
                className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D6B16A]/50 bg-[#211A18] relative aspect-[4/5] max-h-[350px] lg:max-h-[380px] xl:max-h-[420px] gold-glow group"
              >
                <img
                  alt="NFYVE Luxury Aesthetics - Not just nails, a reflection of you"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlnYI3dK8XbQFmrf33Dxue7TTW7Tne3dM11jZahbp2hgV2GZ7jlYtHe66fJge9P0fxPpdZ6ywXZSg_YvuTqUI8yyR5lIqJf1UKskX4LvMbVxC4ky-mbUpXwSwPzS_H_4MNk8-RFdYt2hU6didEj-l8IzTF8mYUymC5UR0FgUVOt4s__wh5rRhsNwXQX8M18_hQr2BsFWvKWykwLt8imwjr-4gcnYUUld40P1aa2NWGsPu2w6FxZ7sQdX9B6qDSqkw0LvY"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211A18]/95 via-[#211A18]/30 to-transparent flex flex-col justify-end p-4 text-[#FFFAF4]">
                  <span className="font-serif text-sm sm:text-base italic font-light text-[#F0C46B]">
                    "Not just nails. A reflection of you."
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#E8D9C7] tracking-wider uppercase mt-0.5 font-semibold">
                    NFYVE Haute Nail &amp; Aesthetic Bar
                  </span>
                </div>
              </motion.div>

              {/* Floating Badge 1: Google Verified Rating */}
              <motion.div
                variants={heroBadgeFloat(0.5)}
                initial="hidden"
                animate="visible"
                className="absolute -top-3 -left-2 sm:-left-3 bg-[#401724]/95 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-[#D6B16A]/60 shadow-xl flex items-center gap-2"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#211A18] border border-[#D6B16A]/40 flex items-center justify-center text-[#F0C46B]">
                  <Star className="w-3.5 h-3.5 fill-[#F0C46B] text-[#F0C46B]" />
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-xs text-[#FFFAF4]">
                    <span>★ 4.9</span>
                    <span className="text-[10px] text-[#E8D9C7] font-normal tabular-nums">(132+ Reviews)</span>
                  </div>
                  <div className="text-[9px] text-[#F0C46B] font-semibold">Verified on Google</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: Transformed Clients */}
              <motion.div
                variants={heroBadgeFloat(0.68)}
                initial="hidden"
                animate="visible"
                className="absolute -bottom-3 -right-2 sm:-right-3 bg-[#401724]/95 backdrop-blur-md px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-[#D6B16A]/60 shadow-xl flex items-center gap-2"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#211A18] border border-[#D6B16A]/40 flex items-center justify-center text-[#F0C46B]">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-serif text-base sm:text-lg font-bold text-[#FFFAF4] leading-none tabular-nums">
                    1,500+
                  </div>
                  <div className="text-[9px] text-[#E8D9C7] mt-0.5">Happy Transformations</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
