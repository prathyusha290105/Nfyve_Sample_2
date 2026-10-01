import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#F7F0E7] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Image Collage with real sanctuary photos */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 rounded-3xl overflow-hidden shadow-lg border-2 border-[#D6B16A]/40 aspect-[4/5] gold-glow">
                <img
                  alt="NFYVE Begumpet Golden Corridor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD4Y06dF0U0krL-BSCSUMSF7pJxk-1sRX0pDWZ9hO6kmP5oo-ir1vpMEPGU5hjjn-t0H7sg59JiJTFytIQbrx34bX4NLJsa-Yl-QyJ8H0JVioD8cfdcr8Za3VWWs3AfyJwrnVPsAmE_-9sK_S1OQ_M2El1LyUWvFBOB6MzqqQGZ1thkDIYZ3HoOUlleGBxpO1lEzEgfE1XWqD3j1WD1ZaAOXolPcc-Yti7kyO9j2gUAu1frFgu3q0FUpOGsGleJWNCkFg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-[#D6B16A]/40 aspect-square">
                  <img
                    alt="NFYVE Monogram Welcome Sign"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8kgYjvkO7mhcup_WIM3E2UYoJOwWjVzPcOQmv2-uc2-Co4ZtABZjGbpuPJpiIYl1yjxzroQpRp4yEJvIvecmGw8hXEuqp00qNIt0Y7npb3uxdBdsnMXRT0i7-SGwZNfmCXNt3iG_eCv-wdjymiiXmBrnn63hZJ9A9l8uHY4yw1F_bZz-uweh0zPY5US1moI00V9ugpdt-T01C3MiDtKGGQAIumTDfi8rhIJSidmle3fpTLbKSwcW89ZC6BDmw8ehc7V4"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-[#D6B16A]/40 aspect-[3/4]">
                  <img
                    alt="NFYVE Luxury Styling Mirrors"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA14O-WgsYG9SbfpEuAKgQVJjR5OUvbeqdrSaUNLYwvsk988NxMHEzoz8Auchg5DiRNNW77sY0FWZ1IoS6Ed9GOBDqvArMkoLO1QWdJiZ8rdxoaANtrb1jwjUwXr7zxZtZ8xgDMi8R5E9AgXbxiZWxN0nHl33sBsNIymHlm5Yfe5_DehkorcJ38iNGt_Ywwa2zVAmcApM3HnTCI4plNf3mLcAsSBROfGhdX3qNWWvDIpwAOC85LCfvYQmmZWquwbpQ8hfM"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Deep Burgundy Inset Quote Card */}
            <div className="mt-6 sm:-mt-8 relative z-20 sm:ml-6 sm:mr-10 bg-[#401724] p-5 rounded-2xl border border-[#D6B16A]/50 shadow-2xl">
              <p className="font-serif italic text-sm text-[#FFFAF4] leading-relaxed">
                <span className="text-[#F0C46B] text-lg font-bold">“</span>
                We designed NFYVE so clients never have to compromise between medical rigour and spa tranquility.
                <span className="text-[#F0C46B] text-lg font-bold">”</span>
              </p>
              <div className="text-[11px] text-[#F0C46B] font-semibold mt-2 tracking-wide uppercase">
                Begumpet Transformation Advisory
              </div>
            </div>
          </div>

          {/* Right Content Block */}
          <div className="lg:col-span-6 flex flex-col gap-6 pt-4 lg:pt-0">
            <div className="inline-flex items-center gap-2 text-[#401724] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#D6B16A]" />
              <span>A Complete Transformation Sanctuary</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl text-[#401724] font-medium leading-tight">
              No More Rushing Between Clinic, Salon, and Gym.
            </h2>

            <p className="text-base text-[#211A18]/85 leading-relaxed">
              At <strong>NFYVE – The Change</strong>, we bring together Weight Loss, Fitness, Aesthetics, Nutri Food, &amp; Salon into one integrated architectural haven. Our expert-led approach ensures you don’t just look better—but feel stronger, healthier, and more confident every single day.
            </p>

            <p className="text-sm text-[#211A18]/70 leading-relaxed">
              Located on the 4th Floor of Kura Towers right beside Begumpet Old Airport, NFYVE offers custom dermatologist protocols, state-of-the-art non-surgical body contouring, luxury salon artistry, performance cardio machines, and freshly formulated macro-balanced foods from our Nutri Bar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6B16A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#401724]">Integrated Care</h4>
                  <p className="text-xs text-[#211A18]/70">Physicians, trainers &amp; stylists aligned on your goals.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6B16A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#401724]">Hospitality First</h4>
                  <p className="text-xs text-[#211A18]/70">Serene, acoustic-buffered private suites.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6B16A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#401724]">Clinically Proven</h4>
                  <p className="text-xs text-[#211A18]/70">FDA-cleared lasers, HIFU, and Cryolipolysis.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6B16A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#401724]">Custom Nutrition</h4>
                  <p className="text-xs text-[#211A18]/70">Wholesome meal plans crafted for your metabolism.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
