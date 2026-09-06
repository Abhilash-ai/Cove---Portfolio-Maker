import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useDeviceCapabilities } from './useDeviceCapabilities.js';

interface Props {
  children: React.ReactNode;
  maxTilt?: number; // degrees (e.g. 8)
  className?: string;
  style?: React.CSSProperties;
  forcedTouchMode?: boolean;
  onClick?: () => void;
}

export function TiltCard({
  children,
  maxTilt = 8,
  className = '',
  style,
  forcedTouchMode = false,
  onClick
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { isTouch, isPointerFine } = useDeviceCapabilities();
  const isTouchDevice = forcedTouchMode || isTouch || !isPointerFine;

  const springConfig = { damping: 20, stiffness: 220, mass: 0.2 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - yPct) * (maxTilt * 2);
    const tiltY = (xPct - 0.5) * (maxTilt * 2);

    rotateX.set(tiltX);
    rotateY.set(tiltY);
    setGlarePos({ x: xPct * 100, y: yPct * 100, opacity: 0.15 });
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }

  return (
    <motion.div
      ref={ref}
      style={{
        ...(style || {}),
        ...(isTouchDevice
          ? {}
          : {
              perspective: 1000,
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            })
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={isTouchDevice ? undefined : { y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      data-cursor-interactive="true"
      className={`relative overflow-hidden transition-shadow ${className}`}
    >
      {children}

      {/* Dynamic Specular Glare (Desktop only) */}
      {!isTouchDevice && glarePos.opacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
