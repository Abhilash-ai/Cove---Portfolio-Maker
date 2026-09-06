import React from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapabilities } from './useDeviceCapabilities.js';

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: Props) {
  const { prefersReducedMotion } = useDeviceCapabilities();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = 28;
  const initialVariants = {
    up: { opacity: 0, y: offset },
    down: { opacity: 0, y: -offset },
    left: { opacity: 0, x: offset },
    right: { opacity: 0, x: -offset },
    none: { opacity: 0 }
  };

  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
