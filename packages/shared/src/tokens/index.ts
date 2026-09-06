export interface TypographyScale {
  size: string;
  weight: string;
  lineHeight: string;
  tracking: string;
}

export interface TypographyTokens {
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  display: TypographyScale;
  h1: TypographyScale;
  h2: TypographyScale;
  h3: TypographyScale;
  body: TypographyScale;
  caption: TypographyScale;
}

export interface SpacingTokens {
  containerMax: string;
  sectionPadding: string;
  cardPadding: string;
  gapGrid: string;
  radius: string;
}

export interface ColorTokens {
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderHover: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentGlow: string;
  badgeBg: string;
  badgeText: string;
}

export interface ThemeTokens {
  id: string;
  name: string;
  category: 'minimal' | 'editorial' | 'studio';
  typography: TypographyTokens;
  spacing: SpacingTokens;
  colors: ColorTokens;
}

import { MINIMAL_PRESET, EDITORIAL_PRESET, STUDIO_PRESET } from './basePresets.js';
export * from './basePresets.js';
export * from './expandedPresets.js';

export const STYLE_PRESETS: Record<string, ThemeTokens> = {
  minimal: MINIMAL_PRESET,
  editorial: EDITORIAL_PRESET,
  studio: STUDIO_PRESET,
};


