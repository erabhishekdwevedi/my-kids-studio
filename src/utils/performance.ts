/**
 * Performance monitoring utilities for the Kids Studio application
 * These functions help track and optimize application performance
 */

// Simple performance measurement utility
export const measurePerformance = (label: string, callback: () => void): void => {
  if (process.env.NODE_ENV === 'development') {
    console.time(label);
    callback();
    console.timeEnd(label);
  } else {
    callback();
  }
};

// Track component render time
export const trackRenderTime = (componentName: string): () => void => {
  if (process.env.NODE_ENV !== 'development') return () => {};
  
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    console.log(`[Performance] ${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`);
  };
};

// Debounce function to limit how often a function can be called
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

// Throttle function to limit the rate at which a function can be called
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Memoize expensive calculations
export const memoize = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const cache = new Map<string, ReturnType<T>>();
  
  return (...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

// Optimize animations for low-end devices
export const shouldUseReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for prefers-reduced-motion media query
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) return true;
  
  // Check for low-end device indicators
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  
  // If device has less than 4GB RAM or fewer than 4 cores, reduce animations
  if (memory && memory < 4) return true;
  if (cores && cores < 4) return true;
  
  return false;
}; 