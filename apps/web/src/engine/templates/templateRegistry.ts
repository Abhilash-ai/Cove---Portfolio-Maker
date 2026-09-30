import { TemplateDefinition } from './templateTypes.js';
import { EXPANDED_STYLE_PRESETS, ThemeTokens, ColorTokens } from '@cove/shared';

function makeTokens(
  presetKey: string,
  colors: Partial<ColorTokens>,
  fontHeading: string,
  fontBody: string
): ThemeTokens {
  const base = EXPANDED_STYLE_PRESETS[presetKey] || EXPANDED_STYLE_PRESETS.minimal;
  return {
    ...base,
    colors: {
      ...base.colors,
      ...colors,
    },
    typography: {
      ...base.typography,
      fontHeading,
      fontBody,
    },
  };
}

// ============================================================================
// COVE CURATED DISTINCT TEMPLATE REGISTRY
// AM Studio Flagship: Genuinely distinct designs across layout, typography,
// color systems, and 2D/3D compositions — ZERO permutation inflation.
// ============================================================================

export const DISTINCT_PORTFOLIO_TEMPLATES: TemplateDefinition[] = [
  // 1. The Monolith 3D (Immersive Spatial Portfolio)
  {
    id: 'tpl-portfolio-monolith-3d',
    name: 'The Monolith 3D',
    category: '3d',
    description: 'Immersive spatial hero with reactive 3D monolithic core, floating badges, and high-impact case study cards.',
    heroVariant: 'centered',
    fallbackHeroVariant: 'centered',
    projectLayout: 'featured-plus-grid',
    is3D: true,
    scene3DConfig: {
      archetype: 'rotating-hero-object',
      materialPreset: 'matte-studio',
      cameraBehavior: 'orbit-drag',
    },
    tokens: makeTokens(
      'studio',
      {
        background: '#09090B',
        surface: '#18181B',
        textPrimary: '#F4F4F6',
        textSecondary: '#A1A1AA',
        accent: '#FF6B4A',
        accentHover: '#F04E27',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      "'Space Grotesk', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 2. Kinetic Particle 3D (Spatial Creative Tech)
  {
    id: 'tpl-portfolio-kinetic-3d',
    name: 'Kinetic Particle 3D',
    category: '3d',
    description: 'Dynamic 3D particle field reacting to mouse motion with horizontal project track for creative technologists.',
    heroVariant: 'centered',
    fallbackHeroVariant: 'centered',
    projectLayout: 'horizontal-scroll',
    is3D: true,
    scene3DConfig: {
      archetype: 'particle-field-hero',
      materialPreset: 'neon-emissive',
      cameraBehavior: 'mouse-parallax-tilt',
    },
    tokens: makeTokens(
      'studio',
      {
        background: '#030712',
        surface: '#0B1329',
        textPrimary: '#F9FAFB',
        textSecondary: '#94A3B8',
        accent: '#06B6D4',
        accentHover: '#0891B2',
        border: 'rgba(6, 182, 212, 0.2)',
      },
      "'Syne', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 3. Swiss Precision (High-Modernist Grid System)
  {
    id: 'tpl-portfolio-swiss',
    name: 'Swiss Precision',
    category: 'swiss' as any,
    description: 'Strict 12-column grid system with authoritative Grotesk type, generous whitespace, and international red accents.',
    heroVariant: 'asymmetric-offset',
    fallbackHeroVariant: 'asymmetric-offset',
    projectLayout: 'grid',
    tokens: makeTokens(
      'swiss',
      {
        background: '#FFFFFF',
        surface: '#F4F4F5',
        textPrimary: '#0A0A0A',
        textSecondary: '#52525B',
        accent: '#FF2A00',
        accentHover: '#CC2200',
        border: '#E4E4E7',
      },
      "'Space Grotesk', -apple-system, sans-serif",
      "'Inter', -apple-system, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 4. The Editorial Gazette (Magazine Asymmetric Layout)
  {
    id: 'tpl-portfolio-editorial',
    name: 'The Editorial',
    category: 'editorial',
    description: 'Magazine-inspired editorial layout with distinguished serif titles, pull-quotes, and warm cream paper aesthetics.',
    heroVariant: 'split',
    fallbackHeroVariant: 'split',
    projectLayout: 'list',
    tokens: makeTokens(
      'editorial',
      {
        background: '#FBF8F3',
        surface: '#F2ECE4',
        textPrimary: '#1C1917',
        textSecondary: '#78716C',
        accent: '#C2410C',
        accentHover: '#9A3412',
        border: 'rgba(28, 25, 23, 0.12)',
      },
      "'Playfair Display', Georgia, serif",
      "'Plus Jakarta Sans', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'experience', 'skills', 'contact'],
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
    version: '2.0.0',
  },

  // 5. Atelier Minimal (Quiet Monochromatic Content-First)
  {
    id: 'tpl-portfolio-minimal',
    name: 'Atelier Minimal',
    category: 'minimal',
    description: 'Quiet, reductionist design with airy whitespace, hairline dividers, and pure focus on creative deliverables.',
    heroVariant: 'minimal-text',
    fallbackHeroVariant: 'minimal-text',
    projectLayout: 'masonry',
    tokens: makeTokens(
      'minimal',
      {
        background: '#FAFAFA',
        surface: '#F4F4F6',
        textPrimary: '#18181B',
        textSecondary: '#71717A',
        accent: '#18181B',
        accentHover: '#27272A',
        border: '#E4E4E7',
      },
      "'Inter', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 6. Neo-Brutalist Matrix (High Contrast Graphic Design)
  {
    id: 'tpl-portfolio-brutalist',
    name: 'Neo-Brutalist',
    category: 'brutalist' as any,
    description: 'Unconventional graphic language with bold 2px borders, hard drop-shadows, monospace type, and tactile cards.',
    heroVariant: 'marquee-text',
    fallbackHeroVariant: 'marquee-text',
    projectLayout: 'grid',
    tokens: makeTokens(
      'brutalist',
      {
        background: '#121214',
        surface: '#1E1E22',
        textPrimary: '#FFFFFF',
        textSecondary: '#A1A1AA',
        accent: '#FACC15',
        accentHover: '#EAB308',
        border: '#FFFFFF',
      },
      "'JetBrains Mono', monospace",
      "'JetBrains Mono', monospace"
    ),
    interactionProfile: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: false },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 7. Academic Scholar (Research, Citations & Papers)
  {
    id: 'tpl-portfolio-academic',
    name: 'Academic Scholar',
    category: 'academic' as any,
    description: 'Structured layout for researchers and scientists featuring publication bibliographies, credentials, and institutional hierarchy.',
    heroVariant: 'side-panel-nav',
    fallbackHeroVariant: 'side-panel-nav',
    projectLayout: 'timeline-stack',
    tokens: makeTokens(
      'academic',
      {
        background: '#FDFBF7',
        surface: '#F5F2EB',
        textPrimary: '#1E293B',
        textSecondary: '#64748B',
        accent: '#1E3A8A',
        accentHover: '#172554',
        border: 'rgba(30, 41, 59, 0.12)',
      },
      "'Playfair Display', Georgia, serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'experience', 'skills', 'contact'],
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
    version: '2.0.0',
  },

  // 8. Visual First Gallery (Media-First Showcase)
  {
    id: 'tpl-portfolio-gallery',
    name: 'Visual Gallery',
    category: 'studio',
    description: 'Media-forward layout engineered for designers, architects, and artists with large-format image grids and lightboxes.',
    heroVariant: 'fullscreen-image',
    fallbackHeroVariant: 'fullscreen-image',
    projectLayout: 'masonry',
    tokens: makeTokens(
      'cinematic',
      {
        background: '#0A0A0A',
        surface: '#141414',
        textPrimary: '#EDEDED',
        textSecondary: '#888888',
        accent: '#FF6B4A',
        accentHover: '#F04E27',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      "'Plus Jakarta Sans', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 9. Career Chronicle (Narrative Timeline Spine)
  {
    id: 'tpl-portfolio-timeline',
    name: 'Career Chronicle',
    category: 'studio',
    description: 'Chronological visual spine charting milestones, career promotions, case studies, and engineering achievements.',
    heroVariant: 'centered',
    fallbackHeroVariant: 'centered',
    projectLayout: 'timeline-stack',
    tokens: makeTokens(
      'studio',
      {
        background: '#18181B',
        surface: '#27272A',
        textPrimary: '#FAFAFA',
        textSecondary: '#A1A1AA',
        accent: '#10B981',
        accentHover: '#059669',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      "'Space Grotesk', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'experience', 'skills', 'contact'],
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
    version: '2.0.0',
  },

  // 10. Warm Linen (Warm Light Palette)
  {
    id: 'tpl-portfolio-warm-linen',
    name: 'Warm Linen',
    category: 'minimal',
    description: 'Warm, natural organic aesthetic on woven linen paper with terracotta accents and humanist sans typography.',
    heroVariant: 'split',
    fallbackHeroVariant: 'split',
    projectLayout: 'grid',
    tokens: makeTokens(
      'editorial',
      {
        background: '#F8F6F0',
        surface: '#EEECE4',
        textPrimary: '#262626',
        textSecondary: '#737373',
        accent: '#D97706',
        accentHover: '#B45309',
        border: 'rgba(38, 38, 38, 0.1)',
      },
      "'Plus Jakarta Sans', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },
];

// ============================================================================
// DISTINCT WEBSITE TEMPLATES
// Completely separated from Portfolio. Includes website-specific structures:
// Navbar, Hero, Feature Grid, Services, Pricing, Testimonials, FAQ, CTA, Footer.
// ============================================================================

import { DISTINCT_WEBSITE_TEMPLATES } from './websiteTemplates50.js';
export type { WebsiteTemplateDefinition } from './websiteTemplates50.js';
export { DISTINCT_WEBSITE_TEMPLATES };

// Unified catalog export
export const ALL_COVE_TEMPLATES: TemplateDefinition[] = [
  ...DISTINCT_PORTFOLIO_TEMPLATES,
  ...DISTINCT_WEBSITE_TEMPLATES.map((w) => ({
    id: w.id,
    name: w.name,
    category: '3d' as any,
    description: w.description,
    heroVariant: 'centered' as any,
    fallbackHeroVariant: 'centered' as any,
    projectLayout: 'grid' as any,
    tokens: makeTokens('studio', w.tokens.colors, w.tokens.typography.fontHeading, w.tokens.typography.fontBody),
    interactionProfile: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'features', 'pricing', 'testimonials', 'faq', 'cta'],
    sectionOrder: ['hero', 'features', 'pricing', 'testimonials', 'faq', 'cta'],
    version: '2.0.0',
    is3D: w.is3D,
    scene3DConfig: w.is3D
      ? {
          archetype: 'product-showcase-3d' as any,
          materialPreset: 'matte-studio' as any,
          cameraBehavior: 'orbit-drag' as any,
        }
      : undefined,
  })),
];
