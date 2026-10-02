import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data/nfyveData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="min-h-[calc(100vh-60px)] md:min-h-[calc(100svh-60px)] py-12 md:py-16 lg:py-20 bg-[#E8D9C7] border-t border-[#D6B16A]/30 relative flex flex-col justify-center"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D6B16A]/15 via-[#F0C46B]/10 to-[#401724]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 md:px-12 w-full my-auto relative z-10 flex flex-col justify-center">
        {/* Centered Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#401724] uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-[#D6B16A]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#401724] font-medium leading-tight mb-2.5">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#211A18]/75 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our Begumpet sanctuary, personalized protocols, and integrated 5-pillar experience.
          </p>
        </div>

        {/* Spacious Accordion List */}
        <div className="space-y-4 md:space-y-4.5 w-full">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#D6B16A]/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center text-left bg-[#DED0C0] hover:bg-[#D5C5B3] transition-colors p-5 sm:p-6 cursor-pointer font-serif text-base sm:text-lg md:text-xl text-[#401724] font-semibold leading-snug"
                >
                  <span className="pr-4 sm:pr-6">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#401724] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#D6B16A]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 sm:p-6 bg-[#F7F0E7] border-t border-[#D6B16A]/40 text-sm sm:text-base text-[#211A18]/85 leading-relaxed animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Help Callout */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-[#401724]/85 inline-flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#D6B16A]" />
            Have a custom query?{' '}
            <a
              href="#contact"
              className="text-[#401724] font-bold underline hover:text-[#571f31] transition-colors"
            >
              Consult with our Begumpet concierge team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
