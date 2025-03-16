import { Variants } from 'framer-motion';

// Performance optimized animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const staggerChildren = (staggerTime = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime
    }
  }
});

// Optimized for tablet performance
export const tabletOptimizedAnimation = (animation: Variants): Variants => {
  // Create a copy to avoid mutating the original
  const optimized = JSON.parse(JSON.stringify(animation));
  
  // Reduce animation complexity for better performance on tablets
  if (optimized.visible && optimized.visible.transition) {
    optimized.visible.transition.duration = Math.min(
      optimized.visible.transition.duration || 0.3, 
      0.3
    );
    
    // Remove any physics-based animations which can be CPU intensive
    delete optimized.visible.transition.type;
    delete optimized.visible.transition.bounce;
    delete optimized.visible.transition.damping;
    delete optimized.visible.transition.mass;
  }
  
  return optimized;
};

/**
 * Generates an array of sprinkle objects for decorative purposes
 * @param count Number of sprinkles to generate
 * @param colors Array of color strings to use for the sprinkles
 * @returns Array of sprinkle objects with position and styling properties
 */
export const generateSprinkles = (count: number, colors: string[]) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2
  }));
};

/**
 * Generates theme-specific colors for decorative elements
 * @param themeId The ID of the current theme
 * @returns Array of color strings appropriate for the theme
 */
export const getThemeColors = (themeId: string | undefined) => {
  if (!themeId) return ['#f8bbd0', '#bbdefb', '#ffcc80', '#c5e1a5', '#b39ddb'];
  
  switch (themeId) {
    case 'icecream':
      return ['#f8bbd0', '#bbdefb', '#ffcc80', '#c5e1a5', '#b39ddb'];
    case 'jungle':
      return ['#a5d6a7', '#c8e6c9', '#ffcc80', '#bcaaa4', '#81c784'];
    case 'carnival':
      return ['#f8bbd0', '#bbdefb', '#ffe082', '#b39ddb', '#90caf9'];
    default:
      return ['#f8bbd0', '#bbdefb', '#ffcc80', '#c5e1a5', '#b39ddb'];
  }
};

/**
 * Generates jungle animal decorations for the jungle theme
 * @returns Array of jungle animal objects with position and styling properties
 */
export const generateJungleAnimals = () => {
  return [
    { type: 'tiger' as const, position: { top: '15%', left: '10%' }, delay: 0.5 },
    { type: 'zebra' as const, position: { top: '70%', left: '15%' }, delay: 0.8 },
    { type: 'giraffe' as const, position: { top: '25%', left: '85%' }, delay: 1.2 },
    { type: 'tiger' as const, position: { top: '80%', left: '80%' }, delay: 1.5 },
    { type: 'zebra' as const, position: { top: '40%', left: '5%' }, delay: 1.8 },
    { type: 'giraffe' as const, position: { top: '60%', left: '90%' }, delay: 2.0 },
  ];
}; 