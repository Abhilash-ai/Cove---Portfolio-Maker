import { HeroVariant, ProjectLayout } from './templateTypes.js';

export const HERO_PATTERNS: readonly HeroVariant[] = [
  'centered',
  'split',
  'fullscreen-image',
  'minimal-text',
  'asymmetric-offset',
  'stacked-media',
  'marquee-text',
  'side-panel-nav',
  'video-background',
  'diagonal-split'
] as const;

export const PROJECT_PATTERNS: readonly ProjectLayout[] = [
  'grid',
  'list',
  'masonry',
  'horizontal-scroll',
  'timeline-stack',
  'featured-plus-grid'
] as const;

export type HeroPattern = HeroVariant;
export type ProjectPattern = ProjectLayout;

export interface CuratedCombination {
  heroVariant: HeroPattern;
  projectLayout: ProjectPattern;
  sectionOrder: string[];
  nameSuffix: string;
  description: string;
  interactionOverride?: {
    customCursor?: boolean;
    magneticButtons?: boolean;
    cardTilt?: boolean;
    scrollReveal?: boolean;
  };
}

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
  curatedCombinations: CuratedCombination[];
}

export const COMPATIBILITY_RULES: Record<string, CompatibilityRule> = {
  minimal: {
    preset: 'minimal',
    allowedHeroes: ['minimal-text', 'centered', 'asymmetric-offset', 'side-panel-nav'],
    allowedProjectLayouts: ['list', 'grid', 'horizontal-scroll', 'timeline-stack'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'minimal-text',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Pure Index',
        description: 'Understated typographic index focusing on essential editorial work and clean rhythm.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Quiet Clarity',
        description: 'Spacious Swiss grid with restrained typography and structured breathing room.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'list',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Type Baseline',
        description: 'Centered headline statement paired with sequential index row project presentation.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Subtle Grid',
        description: 'Refined symmetry and balance with focused project tiles and quiet typography.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Offset Reel',
        description: 'Off-axis focal lead flowing into a panoramic snap-scroll horizontal project gallery.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'list',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Clean Ledger',
        description: 'Architectural offset framing an archival work ledger and timeline record.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Lateral Plain',
        description: 'Sticky left-rail biographical navigation with an airy multi-column project layout.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Monochrome Record',
        description: 'Sidebar identity anchor coupled with chronological narrative milestones.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Linear Horizon',
        description: 'Monospaced header lead with edge-to-edge panoramic project cards.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Essential Archive',
        description: 'Poised centered introduction leading directly into an outcome-oriented timeline.'
      }
    ]
  },

  editorial: {
    preset: 'editorial',
    allowedHeroes: ['split', 'asymmetric-offset', 'diagonal-split', 'centered'],
    allowedProjectLayouts: ['timeline-stack', 'list', 'featured-plus-grid', 'masonry'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'split',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Chronicle',
        description: 'Two-column editorial narrative anchored by a chronological vertical project spine.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Gazette',
        description: 'Classic publication split header with rich article-style project listings.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Cover Story',
        description: 'Prominent headline interview layout with a marquee lead case study.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Essayist',
        description: 'Longform typographic composition framing progressive milestones.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Broadsheet',
        description: 'Multi-column staggered masonry rhythm reminiscent of cultural broadsheets.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Folio Landmark',
        description: 'Dynamic diagonal angled split hero highlighting flagship investigative work.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'list',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Curator Digest',
        description: 'Geometric split composition paired with structured critical reviews.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Colophon',
        description: 'Formal serif centered titling followed by sequential historical case studies.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Anthology',
        description: 'Rich dual-column header paired with dynamic staggered publication spreads.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Monograph',
        description: 'Architectural offset titling showcasing an overarching anchor case study.'
      }
    ]
  },

  studio: {
    preset: 'studio',
    allowedHeroes: ['fullscreen-image', 'stacked-media', 'video-background', 'diagonal-split'],
    allowedProjectLayouts: ['masonry', 'horizontal-scroll', 'featured-plus-grid', 'grid'],
    defaultInteraction: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Dark Canvas',
        description: 'Full-bleed atmospheric hero paired with a fluid 3-column staggered masonry.'
      },
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Panoramic Reel',
        description: 'Immersive visual landing with horizontal touch reel snap navigation.'
      },
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Showcase Hero',
        description: 'Electric-accented studio hero with a prominent landmark case study.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Art Direction',
        description: 'Layered visual media cards in the hero with variable-height masonry project gallery.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Gallery Stack',
        description: 'Multi-layer hero artwork leading to a structured studio grid with responsive tilt.'
      },
      {
        heroVariant: 'video-background',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Motion Stream',
        description: 'Looping ambient background video transition into an endless horizontal reel.'
      },
      {
        heroVariant: 'video-background',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Atmosphere Stage',
        description: 'Atmospheric video canvas with full-width primary project showcase.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Prism Studio',
        description: 'Angled gradient division in hero and organic cascading masonry projects.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Kinetic Showcase',
        description: 'Dynamic overlapping visual stacks leading to smooth horizontal card track.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Atelier Exhibition',
        description: 'Dynamic diagonal hero transition to high-density interactive gallery tiles.'
      }
    ]
  },

  brutalist: {
    preset: 'brutalist',
    allowedHeroes: ['marquee-text', 'asymmetric-offset', 'minimal-text', 'side-panel-nav'],
    allowedProjectLayouts: ['grid', 'timeline-stack', 'horizontal-scroll', 'featured-plus-grid'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'marquee-text',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Raw Monolith',
        description: 'High-speed infinite marquee ticker over thick-bordered industrial project cells.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Kinetic Concrete',
        description: 'Infinite ticker headline commanding a harsh vertical chronological timeline.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Ticker Strip',
        description: 'Continuous text marquee combined with an ultra-wide horizontal project slipstream.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Offset Slab',
        description: 'Unapologetic structural asymmetry with hard-line monochrome grid blocks.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Heavy Iron',
        description: 'Off-grid typography framing a heavyweight featured project banner.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'System Wire',
        description: 'Stark monospaced typography and high-contrast chronological engineering record.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Stark Terminal',
        description: 'Bare metal text presentation commanding a relentless bordered project grid.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Brutal Frame',
        description: 'Rigid fixed sidebar layout framing high-impact architectural project blocks.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Overdrive',
        description: 'Continuous ticker speedway with high-voltage featured landmark cards.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Scaffold Grid',
        description: 'Industrial sidebar navigation with a stark, brutalist milestone spine.'
      }
    ]
  },

  swiss: {
    preset: 'swiss',
    allowedHeroes: ['asymmetric-offset', 'minimal-text', 'centered', 'side-panel-nav'],
    allowedProjectLayouts: ['grid', 'timeline-stack', 'list', 'horizontal-scroll'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Zürich Grid',
        description: 'Strict asymmetric alignment governed by the International Typographic Style.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Basel Modern',
        description: 'Rational modular typography flowing into an exacting index list.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Helvetia Matrix',
        description: 'Pure sans-serif headline hierarchy governing a balanced geometric grid.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Rational Order',
        description: 'Clean typographic clarity structuring a chronological design progression.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Josef Precision',
        description: 'Harmonious centered headline proportions paired with systematic multi-column cells.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'list',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Graphic Standard',
        description: 'Equilateral centered titling with high-legibility project rows.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Maximal Modular',
        description: 'Fixed left navigational axis anchoring a rigorous multi-unit work grid.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'St. Gallen Ledger',
        description: 'Systematic left-rail metadata with clean sequential project documentation.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Constructivist',
        description: 'Calculated mathematical offset guiding an orderly sequential timeline.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Linear Continuum',
        description: 'Rational typographic statement opening into a continuous linear reel.'
      }
    ]
  },

  cinematic: {
    preset: 'cinematic',
    allowedHeroes: ['fullscreen-image', 'video-background', 'stacked-media', 'diagonal-split'],
    allowedProjectLayouts: ['horizontal-scroll', 'featured-plus-grid', 'masonry', 'grid'],
    defaultInteraction: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Nocturne 35mm',
        description: 'High-drama full-bleed photographic header with widescreen scrolling reel.'
      },
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Anamorphic Stage',
        description: 'Widescreen theatrical hero with massive primary premiere project spotlight.'
      },
      {
        heroVariant: 'video-background',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Frame Sequence',
        description: 'Cinematographic ambient motion video flowing into a smooth panoramic track.'
      },
      {
        heroVariant: 'video-background',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Cinematheque',
        description: 'Living video atmosphere with rich staggered production still masonry.'
      },
      {
        heroVariant: 'video-background',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Motion Horizon',
        description: 'Dynamic moving canvas setting up an imposing hero project feature.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Director Cut',
        description: 'Layered visual frames in the hero introducing landmark filmic case studies.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Continuous Reel',
        description: 'Overlapping scene cards with a theatrical horizontal project track.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Silver Nitrate',
        description: 'Dutch-angle split hero composition transitioning into an evocative horizontal gallery.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Wide Vignette',
        description: 'Angled lighting division setting the stage for flagship cinematic projects.'
      },
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Shadow Depth',
        description: 'Deep contrast full-bleed visual header with moody cascading project stills.'
      }
    ]
  },

  monochrome: {
    preset: 'monochrome',
    allowedHeroes: ['minimal-text', 'centered', 'marquee-text', 'side-panel-nav'],
    allowedProjectLayouts: ['list', 'grid', 'timeline-stack', 'horizontal-scroll'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'minimal-text',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Charcoal Column',
        description: 'Pure black-and-white typographic minimalism with disciplined index rows.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Obsidian Plain',
        description: 'High-contrast monochrome cards arranged in a tight balanced grid.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'list',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Silver Contrast',
        description: 'Graceful centered monochrome typography with crisp project index listings.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Grayscale Index',
        description: 'Balanced silver proportions commanding a uniform monochrome project layout.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Bold Negative',
        description: 'Kinetic monochrome marquee header juxtaposed against high-contrast grid cells.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Kinetic Tone',
        description: 'Monochrome marquee band flowing into a seamless horizontal project runner.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Lateral Shade',
        description: 'Persistent black left nav rail anchoring a clean white project catalog.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Monolith Registry',
        description: 'Columnar sidebar navigation charting a chronological career ledger.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Halftone Archive',
        description: 'Disciplined grayscale typography with milestone markers and project outcomes.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Linear Grayscale',
        description: 'Pure centered tonal statement opening into an edge-to-edge project sequence.'
      }
    ]
  },

  darkTechnical: {
    preset: 'darkTechnical',
    allowedHeroes: ['side-panel-nav', 'asymmetric-offset', 'minimal-text', 'video-background'],
    allowedProjectLayouts: ['timeline-stack', 'grid', 'horizontal-scroll', 'featured-plus-grid'],
    defaultInteraction: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Kernel Log',
        description: 'Developer IDE-inspired side rail with chronological system deployment timeline.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Terminal HUD',
        description: 'Fixed command panel on the left governing high-density technical modules.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Telemetry Stream',
        description: 'System sidebar coordinating an active horizontal stream of telemetry cards.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'DevOps Vector',
        description: 'Offset terminal metrics guiding an infrastructure release milestone timeline.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Circuit Matrix',
        description: 'Monospace code offset framing illuminated hardware and software grid units.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Monospace Trace',
        description: 'Clean green-on-dark CLI prompt with detailed technical execution log.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Syntax Node',
        description: 'Console header leading into structured cluster nodes and architecture specs.'
      },
      {
        heroVariant: 'video-background',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Live Telemetry',
        description: 'Glitch-video cyber canvas introducing an active chronological telemetry record.'
      },
      {
        heroVariant: 'video-background',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Cluster View',
        description: 'Live animated mesh canvas with full-width primary server infrastructure spotlight.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Spectrogram',
        description: 'Frequency-offset layout emphasizing a prominent flagship technical release.'
      }
    ]
  },

  magazine: {
    preset: 'magazine',
    allowedHeroes: ['diagonal-split', 'stacked-media', 'split', 'marquee-text'],
    allowedProjectLayouts: ['featured-plus-grid', 'masonry', 'timeline-stack', 'list'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Vogue Spread',
        description: 'Bold diagonal division in the header highlighting a feature article project spread.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Lookbook Diagonal',
        description: 'Angled editorial header transitioning into a lush multi-column lookbook masonry.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Haute Edition',
        description: 'Layered magazine covers in the hero with a marquee lead editorial spotlight.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Runway Showcase',
        description: 'Overlapping shoot prints leading to an expressive, varied-height photo masonry.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Feature Lead',
        description: 'Two-column masthead framing an imposing hero issue feature.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Chronicle Spread',
        description: 'Traditional magazine split header with a curated chronological season retrospective.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Headline Flow',
        description: 'Tabloid ticker headline commanding a rich multi-column gallery of creative works.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Boutique Cover',
        description: 'Fast-moving ticker over a luxury cover-story featured layout.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'list',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Curator Index',
        description: 'Striking angled split hero flowing into a refined editorial table of contents.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Retrospective',
        description: 'Layered portfolio prints with a chronological milestone timeline of major releases.'
      }
    ]
  },

  academic: {
    preset: 'academic',
    allowedHeroes: ['minimal-text', 'centered', 'split', 'side-panel-nav'],
    allowedProjectLayouts: ['list', 'timeline-stack', 'grid'],
    defaultInteraction: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'minimal-text',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Dissertation',
        description: 'Scholarly monograph presentation featuring a formal bibliographic project listing.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Curriculum Vitae',
        description: 'Stately academic header leading into an authoritative chronological research record.'
      },
      {
        heroVariant: 'minimal-text',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Archive Index',
        description: 'Clean typographic thesis statement followed by structured research laboratory cards.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Proceedings',
        description: 'Formal classical centered title page with an orderly list of peer-reviewed works.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Faculty History',
        description: 'Academic symposium header with an outcome-driven chronological progression.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Peer Review',
        description: 'Two-column faculty overview paired with clear publication citations and links.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Laboratory Ledger',
        description: 'Dual-panel biographical abstract with a rigorous investigation timeline.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'list',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Library Catalog',
        description: 'Departmental sidebar navigation anchoring an archival research repository.'
      },
      {
        heroVariant: 'side-panel-nav',
        projectLayout: 'timeline-stack',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Tenure Folio',
        description: 'Fixed academic index rail governing an exhaustive curriculum vitae milestone track.'
      },
      {
        heroVariant: 'centered',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Symposium Paper',
        description: 'Formal serif title page with a systematic multi-column corpus of publications.'
      }
    ]
  },

  luxury: {
    preset: 'luxury',
    allowedHeroes: ['fullscreen-image', 'split', 'diagonal-split', 'stacked-media'],
    allowedProjectLayouts: ['featured-plus-grid', 'masonry', 'horizontal-scroll', 'list'],
    defaultInteraction: { customCursor: false, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Maison Heritage',
        description: 'Opulent full-bleed visual header with a flagship haute-couture showcase.'
      },
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Private Salon',
        description: 'Full-bleed luxury atmosphere opening into an exclusive panoramic snap reel.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Atelier Signature',
        description: 'Gilded two-column signature hero framing a landmark masterpiece.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Bespoke Folio',
        description: 'Warm champagne split narrative paired with an artistic cascading photo masonry.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Prestige Diamond',
        description: 'Facet-cut angled header presenting an unforgettable crown jewel case study.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Jewel Panorama',
        description: 'Sharp diamond-cut transition into a lavish horizontal showcase track.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Couture Exhibition',
        description: 'Multi-layer luxury lookbook cards with an elegant high-fashion masonry.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Grand Landmark',
        description: 'Layered haute visuals introducing a monumentally scaled featured piece.'
      },
      {
        heroVariant: 'fullscreen-image',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Exclusive Archive',
        description: 'Deep cinematic imagery paired with an understated private client ledger.'
      },
      {
        heroVariant: 'split',
        projectLayout: 'list',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Opus Catalog',
        description: 'Refined editorial split typography framing a bespoke catalog index.'
      }
    ]
  },

  playful: {
    preset: 'playful',
    allowedHeroes: ['marquee-text', 'stacked-media', 'diagonal-split', 'asymmetric-offset'],
    allowedProjectLayouts: ['masonry', 'horizontal-scroll', 'featured-plus-grid', 'grid'],
    defaultInteraction: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    curatedCombinations: [
      {
        heroVariant: 'marquee-text',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Pop Dynamic',
        description: 'Bouncing animated marquee header with playful staggered masonry project cards.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Roller Snap',
        description: 'Candy-color kinetic marquee banner with a bouncy horizontal snap track.'
      },
      {
        heroVariant: 'marquee-text',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Sticker Parade',
        description: 'Animated banner introducing an oversized star project and supporting grid.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Creative Playground',
        description: 'Fanned-out sticker-style media in hero with interactive tilt masonry below.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'grid',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Candy Grid',
        description: 'Interactive fanned-card hero opening to vibrant high-tilt portfolio blocks.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Prism Bounce',
        description: 'Colorful angled split hero leading to a kinetic horizontal project stream.'
      },
      {
        heroVariant: 'diagonal-split',
        projectLayout: 'masonry',
        sectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
        nameSuffix: 'Toybox Flow',
        description: 'Dynamic diagonal color block hero with an organic bouncy project cascade.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'featured-plus-grid',
        sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
        nameSuffix: 'Zigzag Showcase',
        description: 'Offbeat punchy typography introducing an animated spotlight project.'
      },
      {
        heroVariant: 'asymmetric-offset',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
        nameSuffix: 'Funhouse Track',
        description: 'Quirky asymmetric titling paired with a fast horizontal project carousel.'
      },
      {
        heroVariant: 'stacked-media',
        projectLayout: 'horizontal-scroll',
        sectionOrder: ['hero', 'skills', 'projects', 'experience', 'contact'],
        nameSuffix: 'Wonderland Reel',
        description: 'Layered colorful artwork stacks transitioning into an infinite project slipway.'
      }
    ]
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
