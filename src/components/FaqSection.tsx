import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { FAQ_ITEMS } from '../data/nfyveData';
import { luxuryEase } from '../utils/animations';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const shouldReduceMotion = useReducedMotion();

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: luxuryEase,
      },
    },
  };

  return (
    <section
      id="faq"
      className="min-h-[calc(100vh-90px)] lg:min-h-[calc(100svh-90px)] py-12 md:py-16 lg:py-20 bg-[#E8D9C7] border-t border-[#D6B16A]/30 relative flex flex-col justify-center items-center"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D6B16A]/15 via-[#F0C46B]/10 to-[#401724]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 md:px-12 w-full my-auto relative z-10 flex flex-col justify-center">
        {/* Centered Header with Scroll Reveal */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: luxuryEase }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#401724] uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-[#D6B16A]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#401724] font-medium leading-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#211A18]/80 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our Begumpet sanctuary, personalized protocols, and integrated 5-pillar experience.
          </p>
        </motion.div>

        {/* Spacious Accordion List with Staggered Entrance and Gentle Expand/Collapse */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-4 md:space-y-5 w-full"
        >
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="rounded-2xl border border-[#D6B16A]/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center text-left bg-[#DED0C0] hover:bg-[#D5C5B3] transition-colors p-5 sm:p-6 md:p-7 cursor-pointer font-serif text-base sm:text-lg md:text-xl text-[#401724] font-semibold leading-snug"
                >
                  <span className="pr-4 sm:pr-6">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#401724] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#D6B16A]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: luxuryEase }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 md:p-7 bg-[#F7F0E7] border-t border-[#D6B16A]/40 text-sm sm:text-base lg:text-[17px] text-[#211A18]/85 leading-relaxed">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Concierge Help Callout */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2, ease: luxuryEase }}
          className="mt-8 md:mt-10 text-center"
        >
          <p className="text-xs sm:text-sm lg:text-base text-[#401724]/85 inline-flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-[#D6B16A]" />
            Have a custom query?{' '}
            <a
              href="#contact"
              className="text-[#401724] font-bold underline hover:text-[#571f31] transition-colors"
            >
              Consult with our Begumpet concierge team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
