import React, { useEffect, useRef, useState } from 'react';
import { Smile, Star, Diamond, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { luxuryEase } from '../utils/animations';

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
  const shouldReduceMotion = useReducedMotion();

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
        threshold: 0.1,
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

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: luxuryEase,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-6 md:py-8 bg-[#E8D9C7] border-y border-[#D6B16A]/40 relative"
      aria-label="Verified transformation statistics"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: luxuryEase }}
          className="text-center max-w-3xl mx-auto mb-4 sm:mb-5"
        >
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#401724] mb-1 font-medium leading-relaxed">
            "NFYVE – The Change redefines Wellness by blending Beauty, Aesthetics, Fitness, &amp; Nutri Food into one seamless journey of transformation &amp; self-care."
          </p>
          <span className="text-[10px] text-[#401724]/75 uppercase tracking-widest font-bold">
            — Begumpet Flagship Sanctuary
          </span>
        </motion.div>

        {/* 4 Verified Metrics Bento Grid with Sequential Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: 0.2 } }}
              className="bg-[#F7F0E7] rounded-xl p-3 sm:p-4 text-center border border-[#D6B16A]/40 warm-card-shadow transition-shadow hover:shadow-md"
            >
              <div className="w-7 h-7 rounded-full bg-[#401724] mx-auto flex items-center justify-center mb-1.5 shadow-sm">
                {stat.icon}
              </div>
              <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#401724] tabular-nums tracking-tight">
                {stat.prefix}
                {counts[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#401724]/80 mt-1 uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
