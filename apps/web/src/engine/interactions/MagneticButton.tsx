import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useDeviceCapabilities } from './useDeviceCapabilities.js';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  magneticPull?: number; // default 0.35
  forcedTouchMode?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MagneticButton({
  children,
  magneticPull = 0.35,
  forcedTouchMode = false,
  className = '',
  onClick,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const { isTouch, isPointerFine } = useDeviceCapabilities();
  const isTouchDevice = forcedTouchMode || isTouch || !isPointerFine;

  const springConfig = { damping: 15, stiffness: 180, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * magneticPull;
    const distanceY = (e.clientY - centerY) * magneticPull;

    x.set(distanceX);
    y.set(distanceY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      style={isTouchDevice ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={isTouchDevice ? undefined : { scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      data-cursor-interactive="true"
      className={`relative inline-flex items-center justify-center transition-colors cursor-pointer select-none active:brightness-90 ${className}`}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}
