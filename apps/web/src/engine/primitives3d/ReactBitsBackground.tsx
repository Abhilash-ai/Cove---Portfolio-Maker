/**
 * ReactBitsBackground.tsx
 * 
 * Adapted from react-bits (https://github.com/DavidHDev/react-bits)
 * License: MIT (Copyright (c) DavidHDev)
 * 
 * Provides a lightweight animated canvas gradient mesh & ambient particle layer
 * behind Three.js scenes, avoiding heavy full-3D environment computations.
 * Dynamically binds to Cove design tokens (tokens.colors).
 */

import React, { useEffect, useRef } from 'react';
import { ThemeTokens } from '@cove/shared';

interface ReactBitsProps {
  tokens: ThemeTokens;
  variant?: 'gradient-mesh' | 'ambient-drift';
  className?: string;
}

export function ReactBitsBackground({
  tokens,
  variant = 'gradient-mesh',
  className = 'absolute inset-0 pointer-events-none z-0'
}: ReactBitsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for ambient-drift
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    }));

    let t = 0;

    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      if (variant === 'gradient-mesh') {
        // Soft animated radial gradient mesh anchored to tokens.colors
        const cx1 = width * 0.3 + Math.sin(t * 0.8) * 80;
        const cy1 = height * 0.4 + Math.cos(t * 0.6) * 60;
        const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.6);
        grad1.addColorStop(0, `${tokens.colors.accent}18`);
        grad1.addColorStop(1, 'transparent');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        const cx2 = width * 0.75 + Math.cos(t * 0.7) * 90;
        const cy2 = height * 0.65 + Math.sin(t * 0.5) * 70;
        const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.5);
        grad2.addColorStop(0, `${tokens.colors.border}22`);
        grad2.addColorStop(1, 'transparent');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Ambient particle drift
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${tokens.colors.accent}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tokens.colors.accent, tokens.colors.border, tokens.colors.background, variant]);

  return <canvas ref={canvasRef} className={className} />;
}
