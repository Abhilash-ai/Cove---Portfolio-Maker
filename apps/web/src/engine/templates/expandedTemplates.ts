import { TemplateDefinition } from './templateTypes.js';
import { EXPANDED_STYLE_PRESETS } from '@cove/shared';
import { FOUNDATIONAL_TEMPLATES } from './foundationalTemplates.js';
import { COMPATIBILITY_RULES, isPatternCombinationCompatible } from './compatibilityMatrix.js';

export const PRESET_KEYS = [
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

function buildExpandedCatalog(): TemplateDefinition[] {
  const result: TemplateDefinition[] = [...FOUNDATIONAL_TEMPLATES];
  const existingIds = new Set(FOUNDATIONAL_TEMPLATES.map((t) => t.id));

  for (const presetKey of PRESET_KEYS) {
    const rule = COMPATIBILITY_RULES[presetKey];
    if (!rule) {
      throw new Error(`Missing compatibility rule for preset: ${presetKey}`);
    }

    const tokens = EXPANDED_STYLE_PRESETS[presetKey] || EXPANDED_STYLE_PRESETS.minimal;
    const category = tokens.category;

    // Track seen triples within this preset to strictly guarantee distinctiveness
    const seenTriples = new Set<string>();

    // Curate exactly 10 distinct templates per preset from compatibilityMatrix
    rule.curatedCombinations.slice(0, 10).forEach((combo, idx) => {
      const variantIdx = idx + 1;
      const id = `tpl-${presetKey.toLowerCase()}-${variantIdx}`;
      if (existingIds.has(id)) {
        throw new Error(`Duplicate template ID detected: ${id}`);
      }

      // Assert matrix compatibility
      if (!isPatternCombinationCompatible(presetKey, combo.heroVariant, combo.projectLayout)) {
        throw new Error(
          `Curated combo for preset ${presetKey} violates compatibility matrix: hero=${combo.heroVariant}, layout=${combo.projectLayout}`
        );
      }

      // Assert intra-preset distinctiveness
      const tripleKey = `${combo.heroVariant}__${combo.projectLayout}__${combo.sectionOrder.join('-')}`;
      if (seenTriples.has(tripleKey)) {
        throw new Error(
          `Intra-preset duplicate triple found in preset "${presetKey}": (${combo.heroVariant}, ${combo.projectLayout}, [${combo.sectionOrder.join(',')}])`
        );
      }
      seenTriples.add(tripleKey);

      const name = `${tokens.name} — ${combo.nameSuffix}`;
      const description = `${combo.description} Built for ${tokens.name.toLowerCase()} portfolios with fluid reactive motion.`;

      const interaction = {
        ...rule.defaultInteraction,
        ...(combo.interactionOverride || {})
      };

      result.push({
        id,
        name,
        category: category as any,
        description,
        heroVariant: combo.heroVariant,
        projectLayout: combo.projectLayout,
        tokens,
        interactionProfile: interaction,
        supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
        sectionOrder: combo.sectionOrder,
        version: '1.0.0'
      });

      existingIds.add(id);
    });
  }

  return result;
}

export const ALL_EXPANDED_TEMPLATES: TemplateDefinition[] = buildExpandedCatalog();
