/**
 * Premium Animation Constants & Variants for NFYVE – The Change
 * Designed for luxury wellness: smooth, cinematic, restrained, with zero layout shift.
 */

export const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: luxuryEase,
    },
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

export const staggerContainer = (staggerDelay = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const cardStagger = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: luxuryEase,
    },
  },
};

export const badgePop = (delay = 0.4) => ({
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: luxuryEase,
    },
  },
});
