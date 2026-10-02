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
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: luxuryEase,
      },
    },
  };

  return (
    <section
      id="faq"
      className="min-h-[calc(100vh-90px)] lg:min-h-[calc(100svh-90px)] lg:h-[calc(100vh-90px)] lg:max-h-[calc(100vh-90px)] lg:h-[calc(100svh-90px)] lg:max-h-[calc(100svh-90px)] py-8 lg:py-0 bg-[#E8D9C7] border-t border-[#D6B16A]/30 relative flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#D6B16A]/15 via-[#F0C46B]/10 to-[#401724]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 md:px-12 w-full my-auto relative z-10 flex flex-col justify-center shrink-0">
        {/* Compact Header with Scroll Reveal */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: luxuryEase }}
          className="text-center mb-3 lg:mb-4"
        >
          <div className="inline-flex items-center gap-1.5 text-[10px] lg:text-[11px] font-bold text-[#401724] uppercase tracking-wider mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#D6B16A]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-[#401724] font-medium leading-tight mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-[13px] text-[#211A18]/80 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our Begumpet sanctuary, personalized protocols, and integrated 5-pillar experience.
          </p>
        </motion.div>

        {/* Compact Accordion List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-2 lg:space-y-2.5 w-full"
        >
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="rounded-xl lg:rounded-2xl border border-[#D6B16A]/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center text-left bg-[#DED0C0] hover:bg-[#D5C5B3] transition-colors py-2.5 px-4 lg:py-3 lg:px-5 cursor-pointer font-serif text-xs sm:text-sm lg:text-[15px] text-[#401724] font-semibold leading-snug"
                >
                  <span className="pr-4 sm:pr-6">{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#401724] shrink-0 transition-transform duration-300 ${
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
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: luxuryEase }}
                      className="overflow-hidden"
                    >
                      <div className="py-2.5 px-4 lg:py-3 lg:px-5 bg-[#F7F0E7] border-t border-[#D6B16A]/40 text-xs sm:text-[13px] text-[#211A18]/85 leading-relaxed">
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
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.15, ease: luxuryEase }}
          className="mt-3 lg:mt-4 text-center"
        >
          <p className="text-xs text-[#401724]/85 inline-flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#D6B16A]" />
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
