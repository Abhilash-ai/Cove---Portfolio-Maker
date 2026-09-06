export const HERO_PATTERNS = [
  'centered',
  'split',
  'fullscreen-image',
  'minimal-text',
  'monumental-type',
  'asymmetric-grid',
  'technical-metrics',
  'floating-card',
  'cinematic-vignette',
  'editorial-split-serif',
] as const;

export const PROJECT_PATTERNS = [
  'grid',
  'list',
  'masonry',
  'horizontal-reel',
  'case-study-split',
  'asymmetric-stagger',
  'minimal-index',
  'density-strip',
  'timeline',
  'fullscreen-focus',
] as const;

export const NAV_PATTERNS = [
  'floating-island',
  'sticky-header',
  'split-dock',
  'sidebar-drawer',
  'minimal-breadcrumb',
  'transparent-glass',
  'magnetic-pill',
  'command-bar',
] as const;

export const INTERACTION_PROFILES = [
  'spring-cursor',
  'card-tilt-sheen',
  'magnetic-buttons',
  'mousemove-parallax',
  'floating-hover-preview',
  'section-snap',
  'kinetic-reveal',
  'tap-expand',
] as const;

export type HeroPattern = (typeof HERO_PATTERNS)[number];
export type ProjectPattern = (typeof PROJECT_PATTERNS)[number];
export type NavPattern = (typeof NAV_PATTERNS)[number];
export type InteractionPattern = (typeof INTERACTION_PROFILES)[number];

export interface CompatibilityRule {
  preset: string;
  allowedHeroes: HeroPattern[];
  allowedProjectLayouts: ProjectPattern[];
  defaultInteraction: {
    customCursor: boolean;
    magneticButtons: boolean;
    cardTilt: boolean;
    scrollReveal: boolean;
  };
}

export const COMPATIBILITY_RULES: Record<string, CompatibilityRule> = {
  minimal: {
    preset: 'minimal',
    allowedHeroes: ['centered', 'minimal-text', 'asymmetric-grid'],
    allowedProjectLayouts: ['grid', 'list', 'minimal-index', 'density-strip'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true }
  },
  editorial: {
    preset: 'editorial',
    allowedHeroes: ['split', 'editorial-split-serif', 'centered'],
    allowedProjectLayouts: ['list', 'case-study-split', 'timeline', 'asymmetric-stagger'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true }
  },
  studio: {
    preset: 'studio',
    allowedHeroes: ['fullscreen-image', 'floating-card', 'cinematic-vignette'],
    allowedProjectLayouts: ['grid', 'masonry', 'horizontal-reel', 'fullscreen-focus'],
    defaultInteraction: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true }
  },
  brutalist: {
    preset: 'brutalist',
    allowedHeroes: ['monumental-type', 'minimal-text', 'asymmetric-grid'],
    allowedProjectLayouts: ['grid', 'minimal-index', 'density-strip'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true }
  },
  swiss: {
    preset: 'swiss',
    allowedHeroes: ['asymmetric-grid', 'centered', 'minimal-text'],
    allowedProjectLayouts: ['grid', 'minimal-index', 'timeline'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true }
  },
  cinematic: {
    preset: 'cinematic',
    allowedHeroes: ['fullscreen-image', 'cinematic-vignette', 'floating-card'],
    allowedProjectLayouts: ['fullscreen-focus', 'horizontal-reel', 'grid'],
    defaultInteraction: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true }
  },
  monochrome: {
    preset: 'monochrome',
    allowedHeroes: ['centered', 'minimal-text', 'monumental-type'],
    allowedProjectLayouts: ['grid', 'list', 'density-strip'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true }
  },
  darkTechnical: {
    preset: 'darkTechnical',
    allowedHeroes: ['technical-metrics', 'minimal-text', 'asymmetric-grid'],
    allowedProjectLayouts: ['grid', 'density-strip', 'timeline'],
    defaultInteraction: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true }
  },
  magazine: {
    preset: 'magazine',
    allowedHeroes: ['editorial-split-serif', 'split', 'monumental-type'],
    allowedProjectLayouts: ['case-study-split', 'asymmetric-stagger', 'list'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true }
  },
  academic: {
    preset: 'academic',
    allowedHeroes: ['split', 'editorial-split-serif', 'centered'],
    allowedProjectLayouts: ['list', 'case-study-split', 'timeline'],
    defaultInteraction: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true }
  },
  luxury: {
    preset: 'luxury',
    allowedHeroes: ['editorial-split-serif', 'floating-card', 'split'],
    allowedProjectLayouts: ['asymmetric-stagger', 'grid', 'fullscreen-focus'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true }
  },
  playful: {
    preset: 'playful',
    allowedHeroes: ['monumental-type', 'floating-card', 'centered'],
    allowedProjectLayouts: ['grid', 'masonry', 'horizontal-reel'],
    defaultInteraction: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true }
  }
};

export function isPatternCombinationCompatible(
  presetKey: string,
  hero: HeroPattern,
  projectLayout: ProjectPattern
): boolean {
  const rule = COMPATIBILITY_RULES[presetKey];
  if (!rule) return true;

  const heroOk = rule.allowedHeroes.includes(hero);
  const layoutOk = rule.allowedProjectLayouts.includes(projectLayout);

  return heroOk && layoutOk;
}
