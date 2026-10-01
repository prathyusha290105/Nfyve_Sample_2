import React, { useEffect, useRef, useState } from 'react';
import { Smile, Star, Diamond, ShieldCheck } from 'lucide-react';

interface StatItem {
  id: string;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    id: 'stat-transformed',
    target: 1500,
    suffix: '+',
    label: 'Happy Customers Transformed',
    icon: <Smile className="w-5 h-5 text-[#F0C46B]" />,
  },
  {
    id: 'stat-reviews',
    target: 132,
    suffix: '+',
    label: 'Verified Google Reviews',
    icon: <Star className="w-5 h-5 fill-[#F0C46B] text-[#F0C46B]" />,
  },
  {
    id: 'stat-pillars',
    target: 5,
    suffix: '',
    label: 'Core Pillars Under One Roof',
    icon: <Diamond className="w-5 h-5 text-[#F0C46B]" />,
  },
  {
    id: 'stat-protocols',
    target: 100,
    suffix: '%',
    label: 'Personalized Protocols',
    icon: <ShieldCheck className="w-5 h-5 text-[#F0C46B]" />,
  },
];

export const StatsCounter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setCounts(STATS.map((s) => s.target));
      hasAnimatedRef.current = true;
      return;
    }

    const currentRef = sectionRef.current;
    if (!currentRef) return;

    let animationFrameId: number | null = null;

    const startCounting = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const duration = 1800; // 1.8 seconds
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic curve: 1 - Math.pow(1 - progress, 3)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const nextCounts = STATS.map((stat) => {
          if (progress >= 1) return stat.target;
          return Math.floor(stat.target * easeOut);
        });

        setCounts(nextCounts);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCounts(STATS.map((s) => s.target));
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          startCounting();
          observer.unobserve(currentRef);
        }
      },
      {
        threshold: 0.1, // Trigger reliably as soon as section enters viewport
      }
    );

    observer.observe(currentRef);

    // Fallback: If section is already visible upon initial render/load
    const rect = currentRef.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startCounting();
      observer.unobserve(currentRef);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 bg-[#E8D9C7] border-y border-[#D6B16A]/40 relative"
      aria-label="Verified transformation statistics"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="font-serif italic text-xl md:text-2xl text-[#401724] mb-2 font-medium leading-relaxed">
            "NFYVE – The Change redefines Wellness by blending Beauty, Aesthetics, Fitness, &amp; Nutri Food into one seamless journey of transformation &amp; self-care."
          </p>
          <span className="text-xs text-[#401724]/75 uppercase tracking-widest font-bold">
            — Begumpet Flagship Sanctuary
          </span>
        </div>

        {/* 4 Verified Metrics Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <div
              key={stat.id}
              className="bg-[#F7F0E7] rounded-2xl p-6 text-center border border-[#D6B16A]/40 warm-card-shadow transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#401724] mx-auto flex items-center justify-center mb-3 shadow-sm">
                {stat.icon}
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#401724] tabular-nums tracking-tight">
                {stat.prefix}
                {counts[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-[11px] text-[#401724]/80 mt-1 uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
