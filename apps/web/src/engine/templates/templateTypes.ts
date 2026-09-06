import { ThemeTokens } from '@cove/shared';

export type HeroVariant =
  | 'centered'
  | 'split'
  | 'fullscreen-image'
  | 'minimal-text'
  | 'asymmetric-offset'
  | 'stacked-media'
  | 'marquee-text'
  | 'side-panel-nav'
  | 'video-background'
  | 'diagonal-split';

export type ProjectLayout =
  | 'grid'
  | 'list'
  | 'masonry'
  | 'horizontal-scroll'
  | 'timeline-stack'
  | 'featured-plus-grid';

export interface InteractionProfile {
  customCursor: boolean;
  magneticButtons: boolean;
  cardTilt: boolean;
  scrollReveal: boolean;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: 'minimal' | 'editorial' | 'studio';
  description: string;
  heroVariant: HeroVariant;
  projectLayout: ProjectLayout;
  tokens: ThemeTokens;
  interactionProfile: InteractionProfile;
  supportedSections: string[];
  sectionOrder: string[];
  version: string;
}
