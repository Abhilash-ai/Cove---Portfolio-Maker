import { TemplateDefinition } from './templateTypes.js';
import { EXPANDED_STYLE_PRESETS } from '@cove/shared';
import { FOUNDATIONAL_TEMPLATES } from './foundationalTemplates.js';

export interface ScaledTemplateSeed {
  id: string;
  name: string;
  category: string;
  description: string;
  heroVariant: any;
  projectLayout: any;
  tokensKey: string;
  interactionProfile: {
    customCursor: boolean;
    magneticButtons: boolean;
    cardTilt: boolean;
    scrollReveal: boolean;
  };
  sectionOrder: string[];
}

const PRESET_KEYS = [
  'minimal',
  'editorial',
  'studio',
  'brutalist',
  'swiss',
  'cinematic',
  'monochrome',
  'darkTechnical',
  'magazine',
  'academic',
  'luxury',
  'playful'
];

const HERO_COMBINATIONS = [
  'centered',
  'split',
  'fullscreen-image',
  'minimal-text',
  'centered',
  'split'
];

const LAYOUT_COMBINATIONS = ['grid', 'list', 'grid'];

function buildExpandedCatalog(): TemplateDefinition[] {
  const result: TemplateDefinition[] = [...FOUNDATIONAL_TEMPLATES];
  const existingIds = new Set(FOUNDATIONAL_TEMPLATES.map((t) => t.id));

  let index = 1;

  for (const presetKey of PRESET_KEYS) {
    const tokens = EXPANDED_STYLE_PRESETS[presetKey] || EXPANDED_STYLE_PRESETS.minimal;
    const category = tokens.category;

    // Generate 18 distinct variations per preset (12 x 18 = 216 templates)
    for (let variantIdx = 1; variantIdx <= 18; variantIdx++) {
      const hero = HERO_COMBINATIONS[(variantIdx - 1) % HERO_COMBINATIONS.length] as any;
      const layout = LAYOUT_COMBINATIONS[(variantIdx - 1) % LAYOUT_COMBINATIONS.length] as any;

      const id = `tpl-${presetKey.toLowerCase()}-${variantIdx}`;
      if (existingIds.has(id)) continue;

      const variantDescriptors = [
        'Pure', 'Focus', 'Atmosphere', 'Precision', 'Elegance', 'Monolith',
        'Spatial', 'Direct', 'Kinetic', 'Vanguard', 'Archive', 'Clarity',
        'Monument', 'Studio', 'Prose', 'Vignette', 'Horizon', 'Structure'
      ];

      const descriptor = variantDescriptors[variantIdx - 1] || `Variant ${variantIdx}`;
      const name = `${tokens.name} — ${descriptor}`;

      const interaction = {
        customCursor: variantIdx % 3 === 0,
        magneticButtons: true,
        cardTilt: variantIdx % 2 === 0,
        scrollReveal: true
      };

      const sectionOrders = [
        ['hero', 'projects', 'skills', 'experience', 'contact'],
        ['hero', 'projects', 'experience', 'skills', 'contact'],
        ['hero', 'skills', 'projects', 'experience', 'contact']
      ];

      const sectionOrder = sectionOrders[variantIdx % 3];

      result.push({
        id,
        name,
        category: category as any,
        description: `${tokens.name} archetype optimized for ${hero} presentation and ${layout} exploration with fluid reactive motion.`,
        heroVariant: hero,
        projectLayout: layout,
        tokens,
        interactionProfile: interaction,
        supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
        sectionOrder,
        version: '1.0.0'
      });

      existingIds.add(id);
      index++;
    }
  }

  return result;
}

export const ALL_EXPANDED_TEMPLATES: TemplateDefinition[] = buildExpandedCatalog();
