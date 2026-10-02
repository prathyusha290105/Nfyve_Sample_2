/**
 * Distinct Page-Specific Animation System for NFYVE – The Change
 * Each section/page possesses a dedicated animation language matching its unique purpose:
 *
 * 1. Home / Hero: Cinematic Landing (word/line masked reveal, visual scale-in, sequential CTAs)
 * 2. About: Storytelling Narrative (clip-path mask uncurling, progressive narrative flow)
 * 3. Services: Celestial Orbital (radial settling, card elevation, soft shadow blooming)
 * 4. Gallery: Editorial Magazine (asymmetric staggered reveal, mask/scale transitions)
 * 5. Why Choose Us: Structured Bento Staircase (alternating diagonal entrance, progressive benefits)
 * 6. Reviews: Serene Floating Drift (gentle glide, cascading Trustindex badges)
 * 7. Contact / Booking: Welcoming Invitation Bloom (calm expansion, immediate interactive readiness)
 */

export const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const storytellingEase: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const structuredEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
export const sereneEase: [number, number, number, number] = [0.4, 0, 0.2, 1];
export const welcomingEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

/* =========================================================================
   1. HOME / HERO: CINEMATIC LANDING ANIMATIONS
   ========================================================================= */

export const heroHeadingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const heroLineMask = {
  hidden: { opacity: 0, y: 32, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.85,
      ease: cinematicEase,
    },
  },
};

export const heroImageCinematic = {
  hidden: { opacity: 0, scale: 0.91, y: 35 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: cinematicEase,
      delay: 0.2,
    },
  },
};

export const heroBadgeFloat = (delay = 0.5) => ({
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: cinematicEase,
    },
  },
});

/* =========================================================================
   2. ABOUT: STORYTELLING NARRATIVE & CLIP-PATH REVEALS
   ========================================================================= */

export const aboutImageMaskReveal = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(12% 0% 0% 0%)',
    scale: 1.04,
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: {
      duration: 0.95,
      ease: storytellingEase,
    },
  },
};

export const aboutSupportingImageReveal = (delay = 0.15) => ({
  hidden: {
    opacity: 0,
    clipPath: 'inset(0% 0% 15% 0%)',
    scale: 1.03,
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: {
      duration: 0.85,
      delay,
      ease: storytellingEase,
    },
  },
});

export const aboutStoryParagraph = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: storytellingEase,
    },
  },
};

export const aboutFeatureSequential = (delay = 0) => ({
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: storytellingEase,
    },
  },
});

/* =========================================================================
   3. SERVICES: CELESTIAL ORBITAL & REFINED CARD ELEVATION
   ========================================================================= */

export const servicesHeaderReveal = {
  hidden: { opacity: 0, y: -16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

export const servicesCenterFocal = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
};

export const servicesCardStagger = (index: number) => ({
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + index * 0.08,
      ease: luxuryEase,
    },
  },
});

/* =========================================================================
   4. GALLERY: EDITORIAL MAGAZINE REVEAL
   ========================================================================= */

export const galleryEditorialItem = (index: number) => {
  const isOdd = index % 2 === 1;
  return {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: isOdd ? 30 : 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: (index % 4) * 0.1,
        ease: luxuryEase,
      },
    },
  };
};

/* =========================================================================
   5. WHY CHOOSE US: STRUCTURED BENTO STAIRCASE REVEAL
   ========================================================================= */

export const bentoCardCascade = (index: number) => {
  // Alternating directional offset for structured architectural settle
  const xOffset = index % 2 === 0 ? -18 : 18;
  return {
    hidden: {
      opacity: 0,
      x: xOffset,
      y: 22,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.1 + index * 0.09,
        ease: structuredEase,
      },
    },
  };
};

/* =========================================================================
   6. REVIEWS: SERENE FLOATING DRIFT
   ========================================================================= */

export const reviewsHeaderDrift = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: sereneEase,
    },
  },
};

export const reviewsBadgeFloat = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      delay: 0.2,
      ease: sereneEase,
    },
  },
};

/* =========================================================================
   7. CONTACT & BOOKING: WELCOMING INVITATION BLOOM
   ========================================================================= */

export const contactWelcomeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: welcomingEase,
    },
  },
};

export const contactCardBloom = {
  hidden: { opacity: 0, scale: 0.95, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.15,
      ease: welcomingEase,
    },
  },
};
