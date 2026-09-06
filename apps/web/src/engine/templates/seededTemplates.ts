import { TemplateDefinition } from './templateTypes.js';
import { MINIMAL_PRESET, EDITORIAL_PRESET, STUDIO_PRESET } from '@cove/shared';

export const SEEDED_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'tpl-minimal-pure',
    name: 'Minimalist Pure',
    category: 'minimal',
    description: 'Clean grotesque typography, expansive whitespace, and refined grid micro-interactions.',
    heroVariant: 'centered',
    projectLayout: 'grid',
    tokens: MINIMAL_PRESET,
    interactionProfile: {
      customCursor: false,
      magneticButtons: true,
      cardTilt: true,
      scrollReveal: true,
    },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '1.0.0',
  },
  {
    id: 'tpl-editorial-journal',
    name: 'Editorial Journal',
    category: 'editorial',
    description: 'Warm editorial serifs, two-column split narrative, and cursor-following list previews.',
    heroVariant: 'split',
    projectLayout: 'list',
    tokens: EDITORIAL_PRESET,
    interactionProfile: {
      customCursor: false,
      magneticButtons: true,
      cardTilt: true,
      scrollReveal: true,
    },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
    version: '1.0.0',
  },
  {
    id: 'tpl-studio-neo-dark',
    name: 'Studio Neo-Dark',
    category: 'studio',
    description: 'Immersive full-bleed header, electric blue accents, custom trailing cursor, and 3D card tilt.',
    heroVariant: 'fullscreen-image',
    projectLayout: 'grid',
    tokens: STUDIO_PRESET,
    interactionProfile: {
      customCursor: true,
      magneticButtons: true,
      cardTilt: true,
      scrollReveal: true,
    },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '1.0.0',
  }
];
