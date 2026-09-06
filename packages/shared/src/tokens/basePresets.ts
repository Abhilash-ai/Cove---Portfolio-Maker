import { ThemeTokens } from './index.js';

// 1. MINIMAL PRESET: Monochromatic, high-whitespace, pure grotesque typography
export const MINIMAL_PRESET: ThemeTokens = {
  id: 'preset-minimal',
  name: 'Minimal Clean',
  category: 'minimal',
  typography: {
    fontHeading: '"Plus Jakarta Sans", system-ui, sans-serif',
    fontBody: '"Plus Jakarta Sans", system-ui, sans-serif',
    fontMono: '"Space Grotesk", monospace',
    display: { size: 'clamp(2.75rem, 5vw, 4.5rem)', weight: '600', lineHeight: '1.05', tracking: '-0.04em' },
    h1: { size: 'clamp(2rem, 3.5vw, 3rem)', weight: '600', lineHeight: '1.15', tracking: '-0.03em' },
    h2: { size: '1.75rem', weight: '600', lineHeight: '1.25', tracking: '-0.02em' },
    h3: { size: '1.25rem', weight: '500', lineHeight: '1.35', tracking: '-0.01em' },
    body: { size: '0.9375rem', weight: '400', lineHeight: '1.6', tracking: '0' },
    caption: { size: '0.75rem', weight: '400', lineHeight: '1.4', tracking: '0.05em' },
  },
  spacing: {
    containerMax: '1200px',
    sectionPadding: '6rem 1.5rem',
    cardPadding: '1.5rem',
    gapGrid: '2rem',
    radius: '0.75rem',
  },
  colors: {
    background: '#09090B',
    surface: '#121215',
    surfaceHover: '#18181D',
    border: '#27272A',
    borderHover: '#3F3F46',
    textPrimary: '#FAFAFA',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    accent: '#FFFFFF',
    accentHover: '#E4E4E7',
    accentGlow: 'rgba(255, 255, 255, 0.1)',
    badgeBg: 'rgba(255, 255, 255, 0.06)',
    badgeText: '#E4E4E7',
  }
};

// 2. EDITORIAL PRESET: Classical serif headlines, warm paper tones, narrative elegance
export const EDITORIAL_PRESET: ThemeTokens = {
  id: 'preset-editorial',
  name: 'Editorial Journal',
  category: 'editorial',
  typography: {
    fontHeading: '"Playfair Display", Georgia, serif',
    fontBody: '"Plus Jakarta Sans", system-ui, sans-serif',
    fontMono: '"Space Grotesk", monospace',
    display: { size: 'clamp(3rem, 6vw, 5.5rem)', weight: '400', lineHeight: '1.02', tracking: '-0.02em' },
    h1: { size: 'clamp(2.25rem, 4vw, 3.5rem)', weight: '400', lineHeight: '1.1', tracking: '-0.01em' },
    h2: { size: '2rem', weight: '400', lineHeight: '1.2', tracking: '0' },
    h3: { size: '1.35rem', weight: '400', lineHeight: '1.3', tracking: '0' },
    body: { size: '1rem', weight: '400', lineHeight: '1.7', tracking: '0.01em' },
    caption: { size: '0.8125rem', weight: '500', lineHeight: '1.4', tracking: '0.08em' },
  },
  spacing: {
    containerMax: '1100px',
    sectionPadding: '7rem 2rem',
    cardPadding: '2rem',
    gapGrid: '2.5rem',
    radius: '0.25rem',
  },
  colors: {
    background: '#141311',
    surface: '#1D1C19',
    surfaceHover: '#262420',
    border: '#33302A',
    borderHover: '#4A463D',
    textPrimary: '#F6F3EE',
    textSecondary: '#C5C0B6',
    textMuted: '#8E887B',
    accent: '#D97706',
    accentHover: '#F59E0B',
    accentGlow: 'rgba(217, 119, 6, 0.15)',
    badgeBg: 'rgba(217, 119, 6, 0.1)',
    badgeText: '#FBBF24',
  }
};

// 3. STUDIO PRESET: High-contrast technical dark, electric blue/cyan accents, bold geometry
export const STUDIO_PRESET: ThemeTokens = {
  id: 'preset-studio',
  name: 'Studio Neo-Dark',
  category: 'studio',
  typography: {
    fontHeading: '"Space Grotesk", system-ui, monospace',
    fontBody: '"Plus Jakarta Sans", system-ui, sans-serif',
    fontMono: '"Space Grotesk", monospace',
    display: { size: 'clamp(3rem, 6vw, 5rem)', weight: '700', lineHeight: '0.98', tracking: '-0.05em' },
    h1: { size: 'clamp(2rem, 3.75vw, 3.25rem)', weight: '700', lineHeight: '1.1', tracking: '-0.04em' },
    h2: { size: '1.85rem', weight: '700', lineHeight: '1.2', tracking: '-0.03em' },
    h3: { size: '1.25rem', weight: '600', lineHeight: '1.3', tracking: '-0.02em' },
    body: { size: '0.9375rem', weight: '400', lineHeight: '1.6', tracking: '-0.01em' },
    caption: { size: '0.75rem', weight: '600', lineHeight: '1.4', tracking: '0.1em' },
  },
  spacing: {
    containerMax: '1280px',
    sectionPadding: '6rem 1.5rem',
    cardPadding: '1.75rem',
    gapGrid: '1.75rem',
    radius: '1rem',
  },
  colors: {
    background: '#040711',
    surface: '#0B1120',
    surfaceHover: '#111A30',
    border: '#1E293B',
    borderHover: '#38BDF8',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#38BDF8',
    accentHover: '#0EA5E9',
    accentGlow: 'rgba(56, 189, 248, 0.25)',
    badgeBg: 'rgba(56, 189, 248, 0.1)',
    badgeText: '#38BDF8',
  }
};
