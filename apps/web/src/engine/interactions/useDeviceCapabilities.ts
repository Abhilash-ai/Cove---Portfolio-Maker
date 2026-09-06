import { useState, useEffect } from 'react';

export interface DeviceCapabilities {
  isTouch: boolean;
  isPointerFine: boolean;
  prefersReducedMotion: boolean;
  viewportWidth: number;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => {
    if (typeof window === 'undefined') {
      return { isTouch: false, isPointerFine: true, prefersReducedMotion: false, viewportWidth: 1200 };
    }
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return { isTouch, isPointerFine, prefersReducedMotion, viewportWidth: window.innerWidth };
  });

  useEffect(() => {
    function handleResize() {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isPointerFine = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setCapabilities({
        isTouch,
        isPointerFine,
        prefersReducedMotion,
        viewportWidth: window.innerWidth
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capabilities;
}
