import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useDeviceCapabilities } from './useDeviceCapabilities.js';

interface Props {
  enabled?: boolean;
  forcedTouchMode?: boolean;
  accentColor?: string;
}

export function CustomCursor({ enabled = true, forcedTouchMode = false, accentColor = '#38BDF8' }: Props) {
  const { isTouch, isPointerFine } = useDeviceCapabilities();
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Smooth trailing spring physics
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  // Strict touch / mobile fallback: NEVER render custom cursor on touch devices
  if (forcedTouchMode || isTouch || !isPointerFine || !enabled) {
    return null;
  }

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    }

    function onMouseLeave() {
      setVisible(false);
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[data-cursor-interactive]')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [visible, cursorX, cursorY]);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        borderColor: accentColor,
      }}
      animate={{
        scale: hovered ? 1.8 : 1,
        backgroundColor: hovered ? `${accentColor}20` : 'transparent',
        borderWidth: hovered ? '2px' : '1.5px',
      }}
      transition={{ duration: 0.15 }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] backdrop-blur-[1px]"
    >
      <motion.div
        animate={{ scale: hovered ? 0 : 1 }}
        style={{ backgroundColor: accentColor }}
        className="w-1.5 h-1.5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  );
}
