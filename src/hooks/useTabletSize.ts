import { useState, useEffect, useCallback } from 'react';

interface DeviceSizeOptions {
  mobileMaxWidth?: number;
  tabletMinWidth?: number;
  tabletMaxWidth?: number;
  desktopMinWidth?: number;
}

interface DeviceSizeResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
}

// Default values for common device dimensions
const DEFAULT_OPTIONS: DeviceSizeOptions = {
  mobileMaxWidth: 599,
  tabletMinWidth: 600,
  tabletMaxWidth: 1199,
  desktopMinWidth: 1200
};

export const useTabletSize = (options: DeviceSizeOptions = {}): DeviceSizeResult => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  
  const [size, setSize] = useState<DeviceSizeResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    orientation: typeof window !== 'undefined' && window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  });

  // Memoize the checkSize function to prevent it from being recreated on each render
  const checkSize = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const isMobile = width <= (mergedOptions.mobileMaxWidth || 599);
    const isTablet = width >= (mergedOptions.tabletMinWidth || 600) && width <= (mergedOptions.tabletMaxWidth || 1199);
    const isDesktop = width >= (mergedOptions.desktopMinWidth || 1200);
    
    setSize({
      isMobile,
      isTablet,
      isDesktop,
      width,
      height,
      orientation: width > height ? 'landscape' : 'portrait'
    });
  }, [
    mergedOptions.mobileMaxWidth,
    mergedOptions.tabletMinWidth,
    mergedOptions.tabletMaxWidth,
    mergedOptions.desktopMinWidth
  ]);

  useEffect(() => {
    // Initial check
    checkSize();

    // Add event listener
    window.addEventListener('resize', checkSize);

    // Clean up
    return () => window.removeEventListener('resize', checkSize);
  }, [checkSize]); // Only re-run if checkSize changes

  return size;
};

export default useTabletSize; 