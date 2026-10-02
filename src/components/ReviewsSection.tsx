import React from 'react';
import { Star, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { TESTIMONIALS_ROW_1, TESTIMONIALS_ROW_2, TestimonialItem } from '../data/nfyveData';
import { sereneEase, reviewsHeaderDrift, reviewsBadgeFloat } from '../utils/animations';

export const ReviewsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const renderCard = (rev: TestimonialItem, idx: number) => (
    <div
      key={`${rev.id}-${idx}`}
      className="w-[300px] sm:w-[340px] md:w-[380px] lg:w-[400px] bg-[#E8D9C7] rounded-xl lg:rounded-2xl p-3.5 sm:p-4 lg:p-4.5 border border-[#D6B16A]/50 shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between shrink-0"
    >
      <div>
        <div className="flex items-center justify-between mb-1.5 lg:mb-2">
          <div className="flex text-[#D6B16A] gap-0.5">
            {[...Array(rev.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#D6B16A] text-[#D6B16A]" />
            ))}
          </div>
          <span className="text-[10px] font-semibold text-[#401724] bg-[#F7F0E7] px-2.5 py-0.5 rounded-full border border-[#D6B16A]/40 shadow-xs">
            Google Verified
          </span>
        </div>
        <p className="font-serif italic text-xs sm:text-[13px] lg:text-sm text-[#211A18]/90 mb-2 leading-relaxed line-clamp-2 lg:line-clamp-3">
          "{rev.text}"
        </p>
      </div>

      <div className="pt-2 lg:pt-2.5 border-t border-[#D6B16A]/40 flex items-center justify-between">
        <div>
          <h5 className="text-xs sm:text-sm font-bold text-[#401724] leading-tight">{rev.author}</h5>
          <span className="text-[11px] text-[#211A18]/70 block mt-0.5">{rev.role} · {rev.service}</span>
        </div>
        <CheckCircle className="w-3.5 h-3.5 text-[#D6B16A] shrink-0" />
      </div>
    </div>
  );

  return (
    <section
      id="reviews"
      className="min-h-[calc(100vh-90px)] lg:min-h-[calc(100svh-90px)] lg:h-[calc(100vh-90px)] lg:max-h-[calc(100vh-90px)] lg:h-[calc(100svh-90px)] lg:max-h-[calc(100svh-90px)] py-8 lg:py-0 bg-[#F7F0E7] relative overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-3 lg:mb-4 shrink-0">
        {/* Verified Rating Header Banner with Serene Drift */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-2.5 lg:pb-3 border-b border-[#D6B16A]/40 gap-2.5 lg:gap-4">
          <motion.div
            variants={shouldReduceMotion ? {} : reviewsHeaderDrift}
            initial={shouldReduceMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="inline-flex items-center gap-1.5 text-[#401724] text-[10px] font-bold tracking-wider uppercase mb-0.5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#D6B16A]" />
              <span>REAL PATIENT &amp; CLIENT STORIES</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-[#401724] font-medium leading-tight">
              Our Clients' Inspiring Transformations
            </h2>
          </motion.div>

          {/* Trustindex Google Reviews Aggregate Badge */}
          <motion.div
            variants={shouldReduceMotion ? {} : reviewsBadgeFloat}
            initial={shouldReduceMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-2.5 bg-[#E8D9C7] px-3.5 py-1.5 lg:px-4 lg:py-2 rounded-xl border border-[#D6B16A]/50 shadow-sm shrink-0"
          >
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#401724] flex items-center justify-center text-[#F0C46B] font-bold shadow-inner shrink-0">
              <Star className="w-4 h-4 fill-[#F0C46B] text-[#F0C46B]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xs sm:text-sm font-bold text-[#401724]">EXCELLENT</span>
                <span className="text-[9px] bg-[#401724] text-[#F0C46B] px-1.5 py-0.2 rounded-full font-semibold">
                  Google Verified
                </span>
              </div>
              <p className="text-[11px] text-[#211A18]/75 mt-0.2">
                Based on <strong className="text-[#401724] font-semibold tabular-nums">132+ verified reviews</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonial Rows with Compact Floating Entrance */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.15, ease: sereneEase }}
        className="flex flex-col gap-2.5 lg:gap-3 relative w-full shrink-0"
      >
        {/* Soft Gradient Masking Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-[#F7F0E7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-[#F7F0E7] to-transparent z-10 pointer-events-none" />

        {/* ROW 1: Moves Left-to-Right */}
        <div className="overflow-hidden w-full py-0.5">
          <div className="marquee-track-right gap-3 lg:gap-3.5 px-4">
            {TESTIMONIALS_ROW_1.map((rev, idx) => renderCard(rev, idx))}
            {/* Duplicates for seamless infinite loop */}
            {TESTIMONIALS_ROW_1.map((rev, idx) => renderCard(rev, idx + 100))}
          </div>
        </div>

        {/* ROW 2: Moves Right-to-Left */}
        <div className="overflow-hidden w-full py-0.5">
          <div className="marquee-track-left gap-3 lg:gap-3.5 px-4">
            {TESTIMONIALS_ROW_2.map((rev, idx) => renderCard(rev, idx))}
            {/* Duplicates for seamless infinite loop */}
            {TESTIMONIALS_ROW_2.map((rev, idx) => renderCard(rev, idx + 200))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
