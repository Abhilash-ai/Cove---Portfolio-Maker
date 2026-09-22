/**
 * Hero3D.tsx
 * 
 * Unifies real-time Three.js canvas, framer-motion UI layer, and react-bits ambient canvas.
 * Guaranteed 100% text legibility via adaptive contrast scrims bound to tokens.colors.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectDto, FullProfileDto, PortfolioSummary, ThemeTokens } from '@cove/shared';
import { TemplateDefinition } from '../templates/templateTypes.js';
import { CanvasContainer3D } from './CanvasContainer3D.js';
import { CameraController } from './CameraControllers.js';
import { SceneArchetypes } from './SceneArchetypes.js';
import { ReactBitsBackground } from './ReactBitsBackground.js';

interface Hero3DProps {
  template: TemplateDefinition;
  profile: FullProfileDto | null;
  projects: ProjectDto[];
  portfolio: PortfolioSummary;
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
  onContactClick?: () => void;
}

export function Hero3D({
  template,
  profile,
  projects,
  portfolio,
  tokens,
  forcedTouchMode = false,
  onContactClick
}: Hero3DProps) {
  const config = template.scene3DConfig || {
    archetype: 'rotating-hero-object',
    materialPreset: 'matte-studio',
    cameraBehavior: 'mouse-parallax-tilt',
    rotationSpeed: 1.0,
    cameraDistance: 6.0
  };

  const [focusedPoint, setFocusedPoint] = useState<[number, number, number] | null>(null);

  const name = profile?.name || 'Alex Rivera';
  const headline = profile?.headline || 'Spatial Designer & Creative Technologist';
  const bio =
    profile?.bio ||
    'Building tactile digital experiences at the intersection of interaction design, machine intelligence, and spatial computing.';

  function scrollToProjects() {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative w-full h-[88vh] min-h-[600px] max-h-[960px] overflow-hidden flex flex-col justify-between select-none">
      {/* 0. Base react-bits ambient 2D mesh layer behind Three.js */}
      <ReactBitsBackground
        tokens={tokens}
        variant={config.archetype === 'particle-field-hero' ? 'ambient-drift' : 'gradient-mesh'}
      />

      {/* 1. Background 3D Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <CanvasContainer3D
          tokens={tokens}
          materialPreset={config.materialPreset}
          cameraDistance={config.cameraDistance || 6.0}
        >
          <CameraController
            behavior={config.cameraBehavior}
            cameraDistance={config.cameraDistance || 6.0}
            rotationSpeed={config.rotationSpeed || 1.0}
            focusedPoint={focusedPoint}
          />
          <SceneArchetypes
            archetype={config.archetype}
            materialPreset={config.materialPreset}
            tokens={tokens}
            profile={profile}
            projects={projects}
            portfolio={portfolio}
            rotationSpeed={config.rotationSpeed || 1.0}
            onFocusPoint={setFocusedPoint}
          />
        </CanvasContainer3D>
      </div>

      {/* 2. Motion.dev UI-layer overlay with adaptive legibility scrim */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-12 pb-8 flex-1 flex flex-col justify-between pointer-events-none">
        {/* Top Status & Archetype Badges */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-between gap-4"
        >
          {profile?.availableForWork && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide backdrop-blur-md border shadow-sm pointer-events-auto transition-transform hover:scale-105"
              style={{
                backgroundColor: `${tokens.colors.surface}EE`,
                borderColor: tokens.colors.border,
                color: tokens.colors.textPrimary,
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.colors.accent }} />
              Available for new projects
            </div>
          )}

          <div
            className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-md border pointer-events-auto backdrop-blur-md shadow-sm ml-auto"
            style={{
              backgroundColor: `${tokens.colors.surface}DD`,
              borderColor: tokens.colors.border,
              color: tokens.colors.textSecondary,
            }}
          >
            3D Interactive &bull; {config.archetype}
          </div>
        </motion.div>

        {/* Center/Bottom Content with High-Legibility Scrim */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mt-auto pt-8"
        >
          {/* Frosted text shield container: guarantees typography remains sharp regardless of underlying 3D mesh */}
          <div
            className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-xl relative overflow-hidden"
            style={{
              backgroundColor: `${tokens.colors.background}B3`, // 70% opacity adaptive background
              borderColor: `${tokens.colors.border}80`,
              boxShadow: `0 20px 40px -15px ${tokens.colors.background}80`,
            }}
          >
            {/* Subtle accent edge glow */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${tokens.colors.accent}, transparent)`
              }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-3"
              style={{
                color: tokens.colors.textPrimary,
                fontFamily: tokens.typography.fontHeading,
                textShadow: `0 2px 10px ${tokens.colors.background}80`
              }}
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg sm:text-xl font-semibold mb-3 leading-snug"
              style={{
                color: tokens.colors.accent,
              }}
            >
              {headline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-sm sm:text-base leading-relaxed mb-6 max-w-xl"
              style={{
                color: tokens.colors.textSecondary,
              }}
            >
              {bio}
            </motion.p>

            {/* Interactive Motion CTAs */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={onContactClick}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all duration-200"
                style={{
                  backgroundColor: tokens.colors.accent,
                  color: '#FFFFFF',
                }}
              >
                Get in Touch
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToProjects}
                className="px-5 py-2.5 rounded-xl font-medium text-sm border backdrop-blur-md transition-all duration-200"
                style={{
                  backgroundColor: `${tokens.colors.surface}DD`,
                  borderColor: tokens.colors.border,
                  color: tokens.colors.textPrimary,
                }}
              >
                Explore Works &darr;
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero3D;
