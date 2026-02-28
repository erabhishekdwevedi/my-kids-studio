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

/**
 * Lazy load images with Intersection Observer
 * Better performance for pages with many images
 */
export const lazyLoadImage = (img: HTMLImageElement, src: string): void => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    img.src = src;
  }
};

/**
 * Request Idle Callback wrapper with fallback
 * Run non-critical tasks when browser is idle
 */
export const runWhenIdle = (callback: () => void, options?: IdleRequestOptions): void => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, options);
  } else {
    // Fallback: use setTimeout
    setTimeout(callback, 1);
  }
};

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Batch DOM updates using requestAnimationFrame
 */
export const batchDOMUpdates = (updates: Array<() => void>): void => {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
};

/**
 * Memory-efficient array chunking for large datasets
 */
export function* chunkArray<T>(array: T[], chunkSize: number): Generator<T[], void, unknown> {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}

/**
 * Virtual scrolling helper - calculate visible items
 */
export const calculateVisibleItems = (
  totalItems: number,
  itemHeight: number,
  containerHeight: number,
  scrollTop: number,
  overscan: number = 3
): { startIndex: number; endIndex: number; offsetY: number } => {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + overscan * 2;
  const endIndex = Math.min(totalItems - 1, startIndex + visibleCount);
  const offsetY = startIndex * itemHeight;

  return { startIndex, endIndex, offsetY };
};

/**
 * Check if device is low-powered
 */
export const isLowEndDevice = (): boolean => {
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency || 1;
  const connection = (navigator as any).connection;

  // Consider low-end if:
  // - Less than 2GB RAM
  // - 2 or fewer CPU cores
  // - Slow network (2g or slow-2g)
  return (
    (memory && memory < 2) ||
    cores <= 2 ||
    (connection && ['slow-2g', '2g'].includes(connection.effectiveType))
  );
};

/**
 * Adaptive quality based on device capabilities
 */
export const getQualitySettings = (): {
  animations: boolean;
  particles: boolean;
  shadows: boolean;
  blur: boolean;
} => {
  const isLowEnd = isLowEndDevice();
  const reducedMotion = shouldUseReducedMotion();

  return {
    animations: !reducedMotion && !isLowEnd,
    particles: !isLowEnd,
    shadows: !isLowEnd,
    blur: !isLowEnd
  };
};

/**
 * Clear memory by removing event listeners and timers
 */
export const clearMemory = (refs: Array<{ current: any | null }>): void => {
  refs.forEach((ref) => {
    if (ref.current) {
      // Clear any intervals/timeouts if they exist
      if (typeof ref.current === 'number') {
        clearInterval(ref.current);
        clearTimeout(ref.current);
      }

      // Remove event listeners if it's a DOM element
      if (ref.current instanceof Element) {
        const clone = ref.current.cloneNode(true);
        ref.current.parentNode?.replaceChild(clone, ref.current);
      }

      ref.current = null;
    }
  });
};

export default {
  measurePerformance,
  trackRenderTime,
  debounce,
  throttle,
  memoize,
  shouldUseReducedMotion,
  lazyLoadImage,
  runWhenIdle,
  preloadResource,
  batchDOMUpdates,
  chunkArray,
  calculateVisibleItems,
  isLowEndDevice,
  getQualitySettings,
  clearMemory
}; 