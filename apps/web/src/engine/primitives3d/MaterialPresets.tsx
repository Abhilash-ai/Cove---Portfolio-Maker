import React from 'react';
import * as THREE from 'three';
import { ThemeTokens } from '@cove/shared';
import { MaterialPreset3D } from '../templates/templateTypes.js';

/**
 * 3D Material and Lighting Presets
 * 
 * Design Inspiration & Traceability:
 * - Minimal.gallery: Informs quiet, restrained presets ('monochrome-wire', 'soft-pastel-toon', 'matte-studio', 'paper-craft-flat', 'clay-claymation')
 *   ensuring the 3D catalog has an understated editorial spectrum that doesn't overwhelm textual hierarchy.
 * - Godly.website & Design Spells: Informs high-energy / refractive presets ('glass-refractive', 'neon-emissive', 'chrome-liquid', 'holographic-iridescent')
 *   with tuned Fresnel reflectivity, rim lighting, and bloom falloffs.
 * 
 * STRICT RULE: All materials and lighting rigs dynamically bind to tokens.colors.* (zero hardcoded hex values).
 */

interface MaterialResult {
  primaryMaterial: THREE.Material;
  accentMaterial: THREE.Material;
  wireframeMaterial: THREE.Material;
  glowMaterial: THREE.Material;
}

export function createMaterialsForPreset(
  preset: MaterialPreset3D,
  tokens: ThemeTokens
): MaterialResult {
  const bgCol = new THREE.Color(tokens.colors.background);
  const surfaceCol = new THREE.Color(tokens.colors.surface);
  const accentCol = new THREE.Color(tokens.colors.accent);
  const textCol = new THREE.Color(tokens.colors.textPrimary);
  const borderCol = new THREE.Color(tokens.colors.border);

  switch (preset) {
    case 'glass-refractive': {
      const primary = new THREE.MeshPhysicalMaterial({
        color: surfaceCol,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 1.2,
        transparent: true,
        opacity: 0.85,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });
      const accent = new THREE.MeshPhysicalMaterial({
        color: accentCol,
        emissive: accentCol,
        emissiveIntensity: 0.4,
        roughness: 0.15,
        transmission: 0.6,
        transparent: true,
        opacity: 0.9,
      });
      const wire = new THREE.MeshBasicMaterial({ color: borderCol, wireframe: true, transparent: true, opacity: 0.4 });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.5 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'neon-emissive': {
      const primary = new THREE.MeshStandardMaterial({
        color: surfaceCol,
        roughness: 0.2,
        metalness: 0.8,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: accentCol,
        emissive: accentCol,
        emissiveIntensity: 1.6,
        roughness: 0.1,
      });
      const wire = new THREE.MeshBasicMaterial({ color: accentCol, wireframe: true });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.75 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'soft-pastel-toon': {
      const primary = new THREE.MeshToonMaterial({
        color: surfaceCol,
      });
      const accent = new THREE.MeshToonMaterial({
        color: accentCol,
      });
      const wire = new THREE.MeshBasicMaterial({ color: textCol, wireframe: true, transparent: true, opacity: 0.3 });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.4 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'brushed-metal': {
      const primary = new THREE.MeshStandardMaterial({
        color: surfaceCol,
        roughness: 0.35,
        metalness: 0.9,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: accentCol,
        roughness: 0.25,
        metalness: 0.95,
      });
      const wire = new THREE.MeshBasicMaterial({ color: borderCol, wireframe: true });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.4 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'paper-craft-flat': {
      const primary = new THREE.MeshLambertMaterial({
        color: surfaceCol,
        flatShading: true,
      });
      const accent = new THREE.MeshLambertMaterial({
        color: accentCol,
        flatShading: true,
      });
      const wire = new THREE.MeshBasicMaterial({ color: borderCol, wireframe: true });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.3 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'chrome-liquid': {
      const primary = new THREE.MeshStandardMaterial({
        color: surfaceCol,
        roughness: 0.05,
        metalness: 1.0,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: accentCol,
        roughness: 0.05,
        metalness: 0.95,
      });
      const wire = new THREE.MeshBasicMaterial({ color: accentCol, wireframe: true, transparent: true, opacity: 0.5 });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.6 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'warm-film-grain': {
      const primary = new THREE.MeshStandardMaterial({
        color: surfaceCol,
        roughness: 0.6,
        metalness: 0.1,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: accentCol,
        roughness: 0.4,
        metalness: 0.2,
      });
      const wire = new THREE.MeshBasicMaterial({ color: borderCol, wireframe: true, transparent: true, opacity: 0.35 });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.4 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'monochrome-wire': {
      const primary = new THREE.MeshBasicMaterial({
        color: surfaceCol,
        transparent: true,
        opacity: 0.7,
      });
      const accent = new THREE.MeshBasicMaterial({
        color: accentCol,
      });
      const wire = new THREE.MeshBasicMaterial({ color: textCol, wireframe: true });
      const glow = new THREE.MeshBasicMaterial({ color: borderCol, transparent: true, opacity: 0.5 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'gradient-mesh': {
      const primary = new THREE.MeshStandardMaterial({
        color: surfaceCol,
        roughness: 0.2,
        metalness: 0.3,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: accentCol,
        roughness: 0.1,
        metalness: 0.5,
        emissive: accentCol,
        emissiveIntensity: 0.3,
      });
      const wire = new THREE.MeshBasicMaterial({ color: borderCol, wireframe: true });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.6 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'holographic-iridescent': {
      const primary = new THREE.MeshPhysicalMaterial({
        color: surfaceCol,
        roughness: 0.1,
        transmission: 0.5,
        iridescence: 0.9,
        iridescenceIOR: 1.6,
        clearcoat: 1.0,
      });
      const accent = new THREE.MeshPhysicalMaterial({
        color: accentCol,
        emissive: accentCol,
        emissiveIntensity: 0.6,
        iridescence: 1.0,
      });
      const wire = new THREE.MeshBasicMaterial({ color: accentCol, wireframe: true, transparent: true, opacity: 0.4 });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.7 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'clay-claymation': {
      const primary = new THREE.MeshStandardMaterial({
        color: surfaceCol,
        roughness: 0.9,
        metalness: 0.02,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: accentCol,
        roughness: 0.85,
        metalness: 0.05,
      });
      const wire = new THREE.MeshBasicMaterial({ color: borderCol, wireframe: true, transparent: true, opacity: 0.25 });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.3 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }

    case 'matte-studio':
    default: {
      const primary = new THREE.MeshStandardMaterial({
        color: surfaceCol,
        roughness: 0.5,
        metalness: 0.1,
      });
      const accent = new THREE.MeshStandardMaterial({
        color: accentCol,
        roughness: 0.3,
        metalness: 0.2,
      });
      const wire = new THREE.MeshBasicMaterial({ color: borderCol, wireframe: true, transparent: true, opacity: 0.3 });
      const glow = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.4 });
      return { primaryMaterial: primary, accentMaterial: accent, wireframeMaterial: wire, glowMaterial: glow };
    }
  }
}

export function LightingRig({
  preset,
  tokens
}: {
  preset: MaterialPreset3D;
  tokens: ThemeTokens;
}) {
  const bgCol = tokens.colors.background;
  const accentCol = tokens.colors.accent;
  const surfaceCol = tokens.colors.surface;
  const textCol = tokens.colors.textPrimary;

  switch (preset) {
    case 'neon-emissive':
      return (
        <>
          <ambientLight intensity={0.4} color={bgCol} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color={accentCol} />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color={tokens.colors.border} />
          <directionalLight position={[0, 8, 4]} intensity={1.0} color={textCol} />
        </>
      );

    case 'glass-refractive':
    case 'chrome-liquid':
    case 'holographic-iridescent':
      return (
        <>
          <ambientLight intensity={0.6} color={surfaceCol} />
          <directionalLight position={[6, 8, 6]} intensity={1.8} color={accentCol} />
          <directionalLight position={[-6, -4, -6]} intensity={1.2} color={tokens.colors.border} />
          <pointLight position={[0, 5, 0]} intensity={1.5} color={textCol} />
        </>
      );

    case 'soft-pastel-toon':
    case 'paper-craft-flat':
    case 'clay-claymation':
      return (
        <>
          <ambientLight intensity={1.2} color={surfaceCol} />
          <directionalLight position={[5, 10, 7]} intensity={1.5} color={tokens.colors.textPrimary} />
          <directionalLight position={[-5, 3, -5]} intensity={0.8} color={accentCol} />
        </>
      );

    case 'warm-film-grain':
      return (
        <>
          <ambientLight intensity={0.7} color={tokens.colors.surface} />
          <pointLight position={[8, 6, 8]} intensity={2.0} color={accentCol} />
          <pointLight position={[-8, -4, -6]} intensity={0.8} color={tokens.colors.border} />
        </>
      );

    case 'monochrome-wire':
      return (
        <>
          <ambientLight intensity={0.9} color={tokens.colors.background} />
          <directionalLight position={[0, 10, 5]} intensity={1.2} color={textCol} />
          <pointLight position={[5, 5, 5]} intensity={1.0} color={accentCol} />
        </>
      );

    case 'brushed-metal':
    case 'gradient-mesh':
    case 'matte-studio':
    default:
      return (
        <>
          <ambientLight intensity={0.8} color={surfaceCol} />
          <directionalLight position={[7, 10, 8]} intensity={1.6} color={accentCol} />
          <directionalLight position={[-7, -3, -5]} intensity={0.9} color={tokens.colors.border} />
          <pointLight position={[0, 6, 4]} intensity={1.0} color={textCol} />
        </>
      );
  }
}
