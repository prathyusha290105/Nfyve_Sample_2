import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/nfyveData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section className="py-16 md:py-24 bg-[#E8D9C7] border-t border-[#D6B16A]/30">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#401724] uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4 text-[#D6B16A]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#401724] font-medium">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#D6B16A]/50 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center text-left bg-[#DED0C0] hover:bg-[#D5C5B3] transition-colors p-6 cursor-pointer font-serif text-base sm:text-lg text-[#401724] font-semibold"
                >
                  <span className="pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#401724] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#D6B16A]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-6 bg-[#F7F0E7] border-t border-[#D6B16A]/40 text-sm text-[#211A18]/85 leading-relaxed animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
