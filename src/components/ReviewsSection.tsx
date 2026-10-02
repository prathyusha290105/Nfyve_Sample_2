import React from 'react';
import { Star, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { TESTIMONIALS_ROW_1, TESTIMONIALS_ROW_2, TestimonialItem } from '../data/nfyveData';

export const ReviewsSection: React.FC = () => {
  const renderCard = (rev: TestimonialItem, idx: number) => (
    <div
      key={`${rev.id}-${idx}`}
      className="w-[340px] sm:w-[380px] md:w-[420px] lg:w-[460px] bg-[#E8D9C7] rounded-2xl p-5 sm:p-6 md:p-7 border border-[#D6B16A]/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between shrink-0"
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex text-[#D6B16A] gap-0.5">
            {[...Array(rev.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#D6B16A] text-[#D6B16A]" />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-[#401724] bg-[#F7F0E7] px-2.5 py-1 rounded-full border border-[#D6B16A]/40 shadow-xs">
            Posted on Google
          </span>
        </div>
        <p className="font-serif italic text-sm sm:text-base text-[#211A18]/90 mb-4 leading-relaxed line-clamp-4">
          "{rev.text}"
        </p>
      </div>

      <div className="pt-3 border-t border-[#D6B16A]/40 flex items-center justify-between">
        <div>
          <h5 className="text-sm sm:text-base font-bold text-[#401724]">{rev.author}</h5>
          <span className="text-xs sm:text-sm text-[#211A18]/65">{rev.role} · {rev.service}</span>
        </div>
        <CheckCircle className="w-4 h-4 text-[#D6B16A] shrink-0" />
      </div>
    </div>
  );

  return (
    <section
      id="reviews"
      className="min-h-[calc(100vh-60px)] md:min-h-[calc(100svh-60px)] py-12 md:py-16 lg:py-20 bg-[#F7F0E7] relative overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8 sm:mb-10">
        {/* Verified Rating Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#D6B16A]/40 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[#401724] text-xs font-bold tracking-wider uppercase mb-1">
              <MessageSquareQuote className="w-4 h-4 text-[#D6B16A]" />
              <span>REAL PATIENT &amp; CLIENT STORIES</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#401724] font-medium leading-tight">
              Our Clients' Inspiring Transformations
            </h2>
          </div>

          {/* Trustindex Google Reviews Aggregate Badge */}
          <div className="flex items-center gap-3.5 bg-[#E8D9C7] px-5 py-3 rounded-2xl border-2 border-[#D6B16A]/50 shadow-md shrink-0">
            <div className="w-11 h-11 rounded-full bg-[#401724] flex items-center justify-center text-[#F0C46B] font-bold shadow-inner">
              <Star className="w-5 h-5 fill-[#F0C46B] text-[#F0C46B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base sm:text-lg font-bold text-[#401724]">EXCELLENT</span>
                <span className="text-[10px] bg-[#401724] text-[#F0C46B] px-2 py-0.5 rounded-full font-semibold">
                  Google Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#211A18]/75 mt-0.5">
                Based on <strong className="text-[#401724] font-semibold tabular-nums">132+ verified reviews</strong> via Trustindex
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous Scrolling Marquee Rows */}
      <div className="flex flex-col gap-5 sm:gap-6 relative w-full">
        {/* Soft Gradient Masking Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-[#F7F0E7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-[#F7F0E7] to-transparent z-10 pointer-events-none" />

        {/* ROW 1: Moves Left-to-Right */}
        <div className="overflow-hidden w-full py-1">
          <div className="marquee-track-right gap-5 sm:gap-6 px-4">
            {TESTIMONIALS_ROW_1.map((rev, idx) => renderCard(rev, idx))}
            {/* Duplicates for seamless infinite loop */}
            {TESTIMONIALS_ROW_1.map((rev, idx) => renderCard(rev, idx + 100))}
          </div>
        </div>

        {/* ROW 2: Moves Right-to-Left */}
        <div className="overflow-hidden w-full py-1">
          <div className="marquee-track-left gap-5 sm:gap-6 px-4">
            {TESTIMONIALS_ROW_2.map((rev, idx) => renderCard(rev, idx))}
            {/* Duplicates for seamless infinite loop */}
            {TESTIMONIALS_ROW_2.map((rev, idx) => renderCard(rev, idx + 200))}
          </div>
        </div>
      </div>
    </section>
  );
};
