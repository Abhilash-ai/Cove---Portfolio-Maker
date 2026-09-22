import { useState, useEffect } from 'react';

export interface DeviceCapabilities {
  isTouch: boolean;
  isPointerFine: boolean;
  prefersReducedMotion: boolean;
  viewportWidth: number;
  webglSupported: boolean;
  performanceTier: 'high' | 'medium' | 'low';
  supports3D: boolean;
}

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

function detectPerformanceTier(webgl: boolean): 'high' | 'medium' | 'low' {
  if (!webgl) return 'low';
  if (typeof navigator === 'undefined') return 'medium';

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
        if (/swiftshader|llvmpipe|software|mesa/i.test(renderer)) {
          return 'low';
        }
      }
    }
  } catch {}

  if (cores < 4 || memory < 4) {
    return 'low';
  }
  if (cores >= 8 && memory >= 8) {
    return 'high';
  }
  return 'medium';
}

function computeCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      isTouch: false,
      isPointerFine: true,
      prefersReducedMotion: false,
      viewportWidth: 1200,
      webglSupported: true,
      performanceTier: 'high',
      supports3D: true
    };
  }

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isPointerFine = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const webglSupported = detectWebGL();
  const performanceTier = detectPerformanceTier(webglSupported);
  const supports3D = webglSupported && performanceTier !== 'low' && !prefersReducedMotion;

  return {
    isTouch,
    isPointerFine,
    prefersReducedMotion,
    viewportWidth: window.innerWidth,
    webglSupported,
    performanceTier,
    supports3D
  };
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(computeCapabilities);

  useEffect(() => {
    function handleResize() {
      setCapabilities(computeCapabilities());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capabilities;
}
