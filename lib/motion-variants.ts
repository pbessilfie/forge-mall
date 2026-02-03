import type { Variants, Transition } from "motion/react";

// Default transition settings
export const defaultTransition: Transition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth easing
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade in up animation - commonly used for content sections
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade in animation - simple opacity transition
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Fade in down animation
export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Scale fade animation - for modals and dialogs
export const scaleFade: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Stagger container - for animating children sequentially
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item - to be used with staggerContainer
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Modal/overlay backdrop
export const backdropVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
};

// Toast notification animation
export const toastVariants: Variants = {
  initial: {
    opacity: 0,
    y: -50,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// Product grid container - staggered children animation
export const productGridContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05, // 50ms stagger delay
      delayChildren: 0.1,
    },
  },
};

// Product card item - for use with productGridContainer
export const productCardItem: Variants = {
  initial: {
    opacity: 0,
    y: 14, // 14px upward motion (midpoint of 12-16px)
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================
// DISCOVER PAGE ANIMATIONS
// ============================================

// Page entry animation - subtle fade up
export const pageFadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 10, // 10px (midpoint of 8-12px)
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28, // 280ms (midpoint of 250-300ms)
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Hero section - delayed entrance
export const heroFadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.1, // 100ms delay (midpoint of 80-120ms)
      ease: "easeOut",
    },
  },
};

// Hero content stagger container
export const heroContentContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

// Hero content items
export const heroContentItem: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Section fade up - viewport triggered
export const sectionFadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2, // 200ms
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Horizontal product row container - staggered left to right
export const productRowContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06, // 60ms (midpoint of 50-70ms)
      delayChildren: 0.1,
    },
  },
};

// Product row card item
export const productRowItem: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Image fade in - for lazy loaded images
export const imageFadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Style card container - for Browse by Style section
export const styleGridContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Style card item
export const styleCardItem: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================
// FOOTER & NEWSLETTER ANIMATIONS
// ============================================

// Footer fade up - viewport triggered, once per session
export const footerFadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28, // 280ms
      ease: "easeOut",
    },
  },
};

// Footer content container - staggered children
export const footerContentContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Footer content item
export const footerContentItem: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Newsletter reveal - delayed entrance after footer
export const newsletterReveal: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25, // 250ms
      delay: 0.1, // 100ms delay after footer animation starts
      ease: "easeOut",
    },
  },
};

// Form success fade - for successful submission
export const formSuccessFade: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2, // 200ms
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Form input exit - for hiding input on success
export const formInputExit: Variants = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2, // 200ms
      ease: "easeOut",
    },
  },
};
