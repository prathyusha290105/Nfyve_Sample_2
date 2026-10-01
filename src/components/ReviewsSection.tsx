import React from 'react';
import { Star, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { TESTIMONIALS_ROW_1, TESTIMONIALS_ROW_2, TestimonialItem } from '../data/nfyveData';

export const ReviewsSection: React.FC = () => {
  const renderCard = (rev: TestimonialItem, idx: number) => (
    <div
      key={`${rev.id}-${idx}`}
      className="w-[280px] md:w-[300px] bg-[#E8D9C7] rounded-xl p-3.5 sm:p-4 border border-[#D6B16A]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between shrink-0"
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex text-[#D6B16A]">
            {[...Array(rev.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#D6B16A] text-[#D6B16A]" />
            ))}
          </div>
          <span className="text-[9px] font-semibold text-[#401724] bg-[#F7F0E7] px-2 py-0.5 rounded-full border border-[#D6B16A]/30">
            Posted on Google
          </span>
        </div>
        <p className="font-serif italic text-xs text-[#211A18]/85 mb-2.5 leading-relaxed">
          "{rev.text}"
        </p>
      </div>

      <div className="pt-2 border-t border-[#D6B16A]/30 flex items-center justify-between">
        <div>
          <h5 className="text-xs font-bold text-[#401724]">{rev.author}</h5>
          <span className="text-[10px] text-[#211A18]/60">{rev.role} · {rev.service}</span>
        </div>
        <CheckCircle className="w-3.5 h-3.5 text-[#D6B16A]" />
      </div>
    </div>
  );

  return (
    <section id="reviews" className="py-8 md:py-10 bg-[#F7F0E7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 sm:mb-5">
        {/* Verified Rating Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-3.5 border-b border-[#D6B16A]/30 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#401724] text-[10px] font-bold tracking-wider uppercase mb-0.5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#D6B16A]" />
              <span>REAL PATIENT &amp; CLIENT STORIES</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#401724] font-medium">
              Our Clients' Inspiring Transformations
            </h2>
          </div>

          {/* Trustindex Google Reviews Aggregate Badge */}
          <div className="flex items-center gap-2.5 bg-[#E8D9C7] px-3.5 py-2 rounded-xl border border-[#D6B16A]/50 shadow-sm shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#401724] flex items-center justify-center text-[#F0C46B] font-bold">
              <Star className="w-3.5 h-3.5 fill-[#F0C46B] text-[#F0C46B]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-sm sm:text-base font-bold text-[#401724]">EXCELLENT</span>
                <span className="text-[9px] bg-[#401724] text-[#F0C46B] px-1.5 py-0.5 rounded-full font-semibold">
                  Google Verified
                </span>
              </div>
              <p className="text-[10px] text-[#211A18]/70 mt-0.5">
                Based on <strong className="text-[#401724] font-semibold tabular-nums">132+ verified reviews</strong> via Trustindex
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous Scrolling Marquee Rows */}
      <div className="flex flex-col gap-3 relative">
        {/* Soft Gradient Masking Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F7F0E7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F7F0E7] to-transparent z-10 pointer-events-none" />

        {/* ROW 1: Moves Left-to-Right */}
        <div className="overflow-hidden w-full py-1">
          <div className="marquee-track-right gap-4 px-3">
            {TESTIMONIALS_ROW_1.map((rev, idx) => renderCard(rev, idx))}
            {/* Duplicates for seamless infinite loop */}
            {TESTIMONIALS_ROW_1.map((rev, idx) => renderCard(rev, idx + 100))}
          </div>
        </div>

        {/* ROW 2: Moves Right-to-Left */}
        <div className="overflow-hidden w-full py-1">
          <div className="marquee-track-left gap-4 px-3">
            {TESTIMONIALS_ROW_2.map((rev, idx) => renderCard(rev, idx))}
            {/* Duplicates for seamless infinite loop */}
            {TESTIMONIALS_ROW_2.map((rev, idx) => renderCard(rev, idx + 200))}
          </div>
        </div>
      </div>
    </section>
  );
};
