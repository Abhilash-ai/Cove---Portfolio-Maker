import { ThemeTokens } from '@cove/shared';
import { HeroVariant } from '../primitives/Hero.js';

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
  projectLayout: 'grid' | 'list';
  tokens: ThemeTokens;
  interactionProfile: InteractionProfile;
  supportedSections: string[];
  sectionOrder: string[];
  version: string;
}
