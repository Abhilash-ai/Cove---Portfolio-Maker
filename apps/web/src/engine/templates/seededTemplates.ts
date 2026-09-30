import { TemplateDefinition } from './templateTypes.js';
import { ALL_EXPANDED_TEMPLATES } from './expandedTemplates.js';
import { DISTINCT_PORTFOLIO_TEMPLATES, DISTINCT_WEBSITE_TEMPLATES } from './templateRegistry.js';

export { DISTINCT_PORTFOLIO_TEMPLATES, DISTINCT_WEBSITE_TEMPLATES };
export const SEEDED_TEMPLATES: TemplateDefinition[] = ALL_EXPANDED_TEMPLATES;
export const FOUNDATIONAL_TEMPLATES = DISTINCT_PORTFOLIO_TEMPLATES;
