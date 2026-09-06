export interface ProfessionSectionStructure {
  id: string;
  profession: string;
  description: string;
  recommendedSectionOrder: string[];
  customCaseStudyPhases?: string[];
}

export const PROFESSION_STRUCTURES: Record<string, ProfessionSectionStructure> = {
  architecture: {
    id: 'architecture',
    profession: 'Architect / Spatial Designer',
    description: 'Emphasizes spatial progression: site context, concept development, plans, materiality, and built photography.',
    recommendedSectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    customCaseStudyPhases: [
      'Site & Environmental Context',
      'Architectural Concept & Form Finding',
      'Structural Process & Materiality',
      'Plans, Sections & Elevations',
      'High-Resolution Renders & Built Work'
    ]
  },
  developer: {
    id: 'developer',
    profession: 'Software Engineer / Architect',
    description: 'Emphasizes system architecture, challenge resolution, tech stacks, and live application links.',
    recommendedSectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    customCaseStudyPhases: [
      'Problem & System Friction',
      'System Architecture & Topology',
      'Technical Implementation & Codebase',
      'Key Engineering Challenges',
      'Performance Benchmarks & Outcomes'
    ]
  },
  designer: {
    id: 'designer',
    profession: 'Product & Brand Designer',
    description: 'Emphasizes human-centered design: research discovery, iterative wireframing, component design systems, and user testing.',
    recommendedSectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    customCaseStudyPhases: [
      'Project Brief & User Need',
      'Research & Competitive Landscape',
      'Design Exploration & Iteration',
      'Final Design System & Interactions',
      'User Adoption & Business Impact'
    ]
  },
  researcher: {
    id: 'researcher',
    profession: 'UX & Academic Researcher',
    description: 'Emphasizes rigorous methodology, data synthesis, peer-reviewed publications, and ethical findings.',
    recommendedSectionOrder: ['hero', 'experience', 'projects', 'skills', 'contact'],
    customCaseStudyPhases: [
      'Research Abstract & Hypotheses',
      'Literature Context',
      'Qualitative & Quantitative Methodology',
      'Empirical Findings & Insights',
      'Actionable Recommendations & Citations'
    ]
  },
  photographer: {
    id: 'photographer',
    profession: 'Photographer / Visual Artist',
    description: 'Visual-first presentation focusing on image series, exhibitions, and technical capture metadata.',
    recommendedSectionOrder: ['hero', 'projects', 'experience', 'contact'],
    customCaseStudyPhases: [
      'Series Concept & Mood',
      'Location & Lighting Methodology',
      'Selected Exposures',
      'Exhibition & Print Inquiries'
    ]
  }
};
