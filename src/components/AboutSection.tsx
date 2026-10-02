import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { luxuryEase } from '../utils/animations';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: luxuryEase,
      },
    },
  };

  const featureItemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: luxuryEase,
      },
    },
  };

  return (
    <section
      id="about"
      className="min-h-[calc(100vh-90px)] lg:min-h-[calc(100svh-90px)] py-12 md:py-16 lg:py-20 bg-[#F7F0E7] relative flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Image Collage with Staggered Entrance Animations */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              {/* Main Image */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: luxuryEase }}
                className="col-span-8 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D6B16A]/50 aspect-[4/5] max-h-[460px] lg:max-h-[500px] xl:max-h-[520px] gold-glow group"
              >
                <img
                  alt="NFYVE Begumpet Golden Corridor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD4Y06dF0U0krL-BSCSUMSF7pJxk-1sRX0pDWZ9hO6kmP5oo-ir1vpMEPGU5hjjn-t0H7sg59JiJTFytIQbrx34bX4NLJsa-Yl-QyJ8H0JVioD8cfdcr8Za3VWWs3AfyJwrnVPsAmE_-9sK_S1OQ_M2El1LyUWvFBOB6MzqqQGZ1thkDIYZ3HoOUlleGBxpO1lEzEgfE1XWqD3j1WD1ZaAOXolPcc-Yti7kyO9j2gUAu1frFgu3q0FUpOGsGleJWNCkFg"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Supporting Images Column */}
              <div className="col-span-4 flex flex-col gap-3 sm:gap-4">
                {/* Supporting Image 1 */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : 0.15, ease: luxuryEase }}
                  className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#D6B16A]/40 aspect-square max-h-[220px] lg:max-h-[245px] group"
                >
                  <img
                    alt="NFYVE Monogram Welcome Sign"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8kgYjvkO7mhcup_WIM3E2UYoJOwWjVzPcOQmv2-uc2-Co4ZtABZjGbpuPJpiIYl1yjxzroQRp4yEJvIvecmGw8hXEuqp00qNIt0Y7npb3uxdBdsnMXRT0i7-SGwZNfmCXNt3iG_eCv-wdjymiiXmBrnn63hZJ9A9l8uHY4yw1F_bZz-uweh0zPY5US1moI00V9ugpdt-T01C3MiDtKGGQAIumTDfi8rhIJSidmle3fpTLbKSwcW89ZC6BDmw8ehc7V4"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Supporting Image 2 */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : 0.25, ease: luxuryEase }}
                  className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#D6B16A]/40 aspect-[3/4] max-h-[220px] lg:max-h-[250px] group"
                >
                  <img
                    alt="NFYVE Luxury Styling Mirrors"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA14O-WgsYG9SbfpEuAKgQVJjR5OUvbeqdrSaUNLYwvsk988NxMHEzoz8Auchg5DiRNNW77sY0FWZ1IoS6Ed9GOBDqvArMkoLO1QWdJiZ8rdxoaANtrb1jwjUwXr7zxZtZ8xgDMi8R5E9AgXbxiZWxN0nHl33sBsNIymHlm5Yfe5_DehkorcJ38iNGt_Ywwa2zVAmcApM3HnTCI4plNf3mLcAsSBROfGhdX3qNWWvDIpwAOC85LCfvYQmmZWquwbpQ8hfM"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>

            {/* Deep Burgundy Inset Quote Card with Reveal Transition */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.35, ease: luxuryEase }}
              className="mt-4 sm:-mt-8 relative z-20 sm:ml-4 sm:mr-8 bg-[#401724] p-4 sm:p-5 rounded-2xl border border-[#D6B16A]/50 shadow-xl"
            >
              <p className="font-serif italic text-sm sm:text-base text-[#FFFAF4] leading-relaxed">
                <span className="text-[#F0C46B] text-base font-bold">“</span>
                We designed NFYVE so clients never have to compromise between medical rigour and spa tranquility.
                <span className="text-[#F0C46B] text-base font-bold">”</span>
              </p>
              <div className="text-[11px] text-[#F0C46B] font-semibold mt-2 tracking-wider uppercase">
                Begumpet Transformation Advisory
              </div>
            </motion.div>
          </div>

          {/* Right Content Block with Viewport-Triggered Stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 pt-2 lg:pt-0"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center gap-2 text-[#401724] text-xs font-bold tracking-wider uppercase"
            >
              <Sparkles className="w-4 h-4 text-[#D6B16A]" />
              <span>A Complete Transformation Sanctuary</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemFadeUp}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] text-[#401724] font-medium leading-[1.2]"
            >
              No More Rushing Between Clinic, Salon, and Gym.
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p variants={itemFadeUp} className="text-sm sm:text-base text-[#211A18]/85 leading-relaxed">
              At <strong>NFYVE – The Change</strong>, we bring together Weight Loss, Fitness, Aesthetics, Nutri Food, &amp; Salon into one integrated architectural haven. Our expert-led approach ensures you don’t just look better—but feel stronger, healthier, and more confident every single day.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p variants={itemFadeUp} className="text-xs sm:text-sm text-[#211A18]/75 leading-relaxed">
              Located on the 4th Floor of Kura Towers right beside Begumpet Old Airport, NFYVE offers custom dermatologist protocols, state-of-the-art non-surgical body contouring, luxury salon artistry, performance cardio machines, and freshly formulated macro-balanced foods from our Nutri Bar.
            </motion.p>

            {/* Feature Points Grid - Staggered entrance */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              <motion.div variants={featureItemVariants} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6B16A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#401724]">Integrated Care</h4>
                  <p className="text-xs sm:text-sm text-[#211A18]/70 mt-0.5">Physicians, trainers &amp; stylists aligned on your goals.</p>
                </div>
              </motion.div>

              <motion.div variants={featureItemVariants} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6B16A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#401724]">Hospitality First</h4>
                  <p className="text-xs sm:text-sm text-[#211A18]/70 mt-0.5">Serene, acoustic-buffered private suites.</p>
                </div>
              </motion.div>

              <motion.div variants={featureItemVariants} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6B16A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#401724]">Clinically Proven</h4>
                  <p className="text-xs sm:text-sm text-[#211A18]/70 mt-0.5">FDA-cleared lasers, HIFU, and Cryolipolysis.</p>
                </div>
              </motion.div>

              <motion.div variants={featureItemVariants} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6B16A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#401724]">Custom Nutrition</h4>
                  <p className="text-xs sm:text-sm text-[#211A18]/70 mt-0.5">Wholesome meal plans crafted for your metabolism.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
