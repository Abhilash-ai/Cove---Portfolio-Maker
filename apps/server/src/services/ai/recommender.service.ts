import { ProfileSignals, TemplateRecommendationDto } from '@cove/shared';

interface TemplateKnowledgeItem {
  id: string;
  name: string;
  category: string;
  suitableProfessions: string[];
  interactionStyle: string;
  minMediaRatio: number; // 0 to 1
  preferredPurposes: string[];
  strengths: string[];
}

const TEMPLATE_KNOWLEDGE_BASE: TemplateKnowledgeItem[] = [
  {
    id: 'tpl-minimal-pure',
    name: 'Minimalist Pure',
    category: 'minimal',
    suitableProfessions: ['Software Engineer', 'Full-Stack Developer', 'Product Designer', 'Frontend Architect'],
    interactionStyle: 'Precision trailing spring cursor with subtle button hover scaling and instant modal reveals.',
    minMediaRatio: 0.1,
    preferredPurposes: ['job_search', 'personal'],
    strengths: ['High signal-to-noise typography', 'Fast reading speed', 'Technical repository emphasis']
  },
  {
    id: 'tpl-editorial-journal',
    name: 'Editorial Journal',
    category: 'editorial',
    suitableProfessions: ['UX Researcher', 'Architectural Writer', 'Design Strategist', 'Academic', 'Journalist'],
    interactionStyle: 'Floating project list hover previews with smooth paragraph entry reveals and serif elegance.',
    minMediaRatio: 0.2,
    preferredPurposes: ['academic', 'freelance', 'job_search'],
    strengths: ['Deep long-form case studies', 'Editorial typography hierarchy', 'Refined narrative pacing']
  },
  {
    id: 'tpl-studio-neo-dark',
    name: 'Studio Neo-Dark',
    category: 'studio',
    suitableProfessions: ['Architect', '3D Visualizer', 'Spatial Designer', 'Creative Technologist', 'Photographer'],
    interactionStyle: '3D perspective card tilt with specular light reflection and magnetic interactive controls.',
    minMediaRatio: 0.6,
    preferredPurposes: ['studio', 'freelance'],
    strengths: ['High visual contrast', 'Full-bleed imagery', 'Immersive spatial presence']
  }
];

export class RecommenderService {
  async recommendTemplates(signals: ProfileSignals): Promise<TemplateRecommendationDto[]> {
    const normProf = (signals.profession || '').toLowerCase();
    const purpose = signals.portfolioPurpose || 'job_search';
    const mediaDensity = signals.mediaDensity || 'balanced';
    const textDensity = signals.textDensity || 'balanced';
    const desiredPersonality = (signals.desiredPersonality || '').toLowerCase();

    const scored = TEMPLATE_KNOWLEDGE_BASE.map((tpl) => {
      let score = 50; // Base score
      const rationalePoints: string[] = [];

      // 1. Profession matching
      const profMatch = tpl.suitableProfessions.some((p) => normProf.includes(p.toLowerCase()) || (normProf && p.toLowerCase().includes(normProf)));
      if (profMatch) {
        score += 35;
        rationalePoints.push(`Strong alignment with your profile as a ${signals.profession}`);
      }

      // 2. Media / Visual density matching
      if (mediaDensity === 'rich' && tpl.category === 'studio') {
        score += 25;
        rationalePoints.push('Optimized for rich imagery, 3D renders, and high-impact visual media');
      } else if (mediaDensity === 'minimal' && tpl.category === 'minimal') {
        score += 20;
        rationalePoints.push('Minimalist structure highlights core deliverables without requiring heavy photography');
      }

      // 3. Text density matching
      if (textDensity === 'rich' && tpl.category === 'editorial') {
        score += 25;
        rationalePoints.push('Spacious two-column layout accommodates in-depth case study narratives and process breakdowns');
      } else if (textDensity === 'minimal' && tpl.category === 'minimal') {
        score += 15;
        rationalePoints.push('Concise project cards maintain clean whitespace with short descriptions');
      }

      // 4. Desired personality matching
      if (desiredPersonality && (tpl.category.includes(desiredPersonality) || desiredPersonality.includes(tpl.category))) {
        score += 25;
        rationalePoints.push(`Directly matches your preference for a ${tpl.category} aesthetic`);
      }

      // 5. Purpose matching
      if (tpl.preferredPurposes.includes(purpose)) {
        score += 10;
      }

      // 6. Project count weighting
      const count = signals.projectCount || 0;
      if (count <= 3 && tpl.category === 'minimal') {
        score += 10;
        rationalePoints.push('Presents a compact project roster with maximum individual presence');
      } else if (count > 5 && tpl.category === 'editorial') {
        score += 10;
        rationalePoints.push('Index list view organizes larger project archives cleanly');
      }

      // Clamp score between 60% and 99%
      const matchPercentage = Math.min(99, Math.max(65, Math.round(score)));

      const finalRationale = rationalePoints.length > 0
        ? rationalePoints.join('. ') + '.'
        : `Well-balanced ${tpl.name} composition suitable for general creative portfolios.`;

      const contentFitSummary = tpl.category === 'studio'
        ? 'High media density • Full-bleed imagery • Tactile 3D sheen'
        : tpl.category === 'editorial'
        ? 'Rich typography • Long-form case studies • Split narrative'
        : 'Crisp whitespace • Grotesque type • Fast scanability';

      return {
        templateId: tpl.id,
        name: tpl.name,
        category: tpl.category,
        score,
        matchPercentage,
        rationale: finalRationale,
        suitableProfessions: tpl.suitableProfessions,
        interactionStyle: tpl.interactionStyle,
        contentFitSummary
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    return scored;
  }
}

export const recommenderService = new RecommenderService();
