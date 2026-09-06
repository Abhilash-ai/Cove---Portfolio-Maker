import React from 'react';
import { ViewportMode } from './editorTypes.js';
import { ThemeTokens, PortfolioSummary, ProjectDto, FullProfileDto } from '@cove/shared';
import { SEEDED_TEMPLATES } from '../engine/templates/seededTemplates.js';
import { PortfolioRenderer } from '../engine/renderer/PortfolioRenderer.js';
import { HeroVariant } from '../engine/primitives/Hero.js';
import { ProjectLayout } from '../engine/templates/templateTypes.js';

interface Props {
  viewport: ViewportMode;
  scale: number;
  tokens: ThemeTokens;
  templateId: string;
  sectionOrder: string[];
  hiddenSections: string[];
  heroVariant: HeroVariant;
  projectLayout: ProjectLayout;
  portfolio: PortfolioSummary | null;
  projects: ProjectDto[];
  profile: FullProfileDto | null;
}

// Fallback mock items if portfolio is empty or loading
const MOCK_PROFILE: FullProfileDto = {
  id: 'mock-profile',
  userId: 'mock-user',
  name: 'Elena Rostova',
  email: 'elena.rostova@cove.design',
  headline: 'Architectural Designer & Spatial Technologist',
  bio: 'Designing responsive physical spaces and digital design systems. Focused on ecological materiality, computational architecture, and tactile interactions.',
  location: 'San Francisco, CA',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  contactEmail: 'elena.rostova@cove.design',
  contactPhone: '+1 (415) 890-2341',
  availableForWork: true,
  updatedAt: new Date().toISOString(),
  skills: [
    { id: 's1', name: 'Parametric Design', category: 'Design', level: 'Expert', sortOrder: 0 },
    { id: 's2', name: 'Computational Geometry', category: 'Architecture', level: 'Advanced', sortOrder: 1 },
    { id: 's3', name: 'Material Ecology', category: 'Research', level: 'Advanced', sortOrder: 2 },
    { id: 's4', name: 'Three.js & WebGL', category: 'Code', level: 'Advanced', sortOrder: 3 },
  ],
  experiences: [
    {
      id: 'e1',
      company: 'Atelier Biomimetic',
      position: 'Lead Spatial Designer',
      location: 'Zurich / Remote',
      startDate: '2022-01-01',
      isCurrent: true,
      description: 'Directed generative spatial installations and lightweight carbon-neutral pavilions.',
      highlights: ['Designed Venice Biennale 2024 Pavilion', 'Pioneered timber algorithm'],
      sortOrder: 0,
    },
  ],
  educations: [],
  certifications: [],
  achievements: [],
  publications: [],
  socialLinks: [
    { id: 'l1', platform: 'GitHub', url: 'https://github.com', label: 'GitHub', sortOrder: 0 },
    { id: 'l2', platform: 'LinkedIn', url: 'https://linkedin.com', label: 'LinkedIn', sortOrder: 1 },
  ],
};

const MOCK_PROJECTS: ProjectDto[] = [
  {
    id: 'p1',
    userId: 'mock-user',
    title: 'Fjord Eco Pavilion & Research Station',
    category: 'Architecture',
    year: '2025',
    shortDescription: 'Zero-carbon timber marine observatory nestled into the Lofoten coastline.',
    fullDescription: 'Constructed using locally harvested engineered timber with passive solar orientation and natural seawater cooling.',
    role: 'Principal Architect & Computational Lead',
    tools: ['Rhino', 'Grasshopper', 'Timber Framing', 'Thermal Sim'],
    collaborators: ['Nordic Ecology Group', 'Studio Snøhetta alumni'],
    outcome: 'Completed construction on schedule; awarded 2025 Nordic Sustainable Architecture Gold.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    externalLinks: [{ label: 'Live Site', url: 'https://example.com' }],
    media: [
      {
        id: 'm1',
        projectId: 'p1',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        type: 'IMAGE',
        caption: 'South-facing marine deck overlooking the Arctic fjord',
        isCover: true,
        sortOrder: 0,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'm2',
        projectId: 'p1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        type: 'IMAGE',
        caption: 'Computational structural framing detail',
        isCover: false,
        sortOrder: 1,
        createdAt: new Date().toISOString(),
      },
    ],
    sortOrder: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    userId: 'mock-user',
    title: 'Kinetic Facade System for Urban Biome',
    category: 'Spatial Design',
    year: '2024',
    shortDescription: 'Adaptive solar-shading envelope driven by real-time microclimate sensors.',
    fullDescription: 'Responsive exterior envelope fabricated with shape-memory alloy actuators that dilate in response to direct sunlight.',
    role: 'Lead Facade Engineer',
    tools: ['Python', 'Arduino', 'SolidWorks', 'CFD'],
    collaborators: ['ETH Zurich Robotics Lab'],
    outcome: 'Reduced annual building HVAC consumption by 38% across testing phase.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    externalLinks: [],
    media: [],
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function EditorCanvas({
  viewport,
  scale,
  tokens,
  templateId,
  sectionOrder,
  hiddenSections,
  heroVariant,
  projectLayout,
  portfolio,
  projects,
  profile,
}: Props) {
  const activeTemplate = SEEDED_TEMPLATES.find((t) => t.id === templateId) || SEEDED_TEMPLATES[0];

  const resolvedProfile = profile || MOCK_PROFILE;
  const resolvedProjects = projects && projects.length > 0 ? projects : MOCK_PROJECTS;
  const resolvedPortfolio: PortfolioSummary = portfolio || {
    id: 'preview-id',
    userId: 'preview-user',
    title: 'Elena Rostova — Portfolio',
    slug: 'elena-rostova',
    status: 'draft',
    sectionOrder,
    projectCount: resolvedProjects.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Dimensions based on viewport mode
  const getViewportDimensions = () => {
    switch (viewport) {
      case 'mobile':
        return {
          width: '375px',
          height: '812px',
          containerClass: 'shadow-2xl rounded-[40px] border-[10px] border-zinc-900 ring-1 ring-zinc-800 overflow-hidden relative my-6',
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          containerClass: 'shadow-2xl rounded-[28px] border-[8px] border-zinc-900 ring-1 ring-zinc-800 overflow-hidden relative my-6',
        };
      case 'desktop':
      default:
        return {
          width: '100%',
          height: '100%',
          containerClass: 'w-full h-full relative',
        };
    }
  };

  const vp = getViewportDimensions();

  return (
    <div className="flex-1 bg-zinc-900/60 overflow-auto flex flex-col items-center justify-start p-2 sm:p-6 relative select-auto">
      {/* Viewport dimensions indicator banner in tablet/mobile */}
      {viewport !== 'desktop' && (
        <div className="text-[11px] font-mono text-zinc-500 mb-2 flex items-center gap-2">
          <span>{viewport === 'mobile' ? 'Mobile Phone' : 'Tablet Device'}</span>
          <span>•</span>
          <span>{viewport === 'mobile' ? '375 × 812 pt' : '768 × 1024 pt'}</span>
          <span>•</span>
          <span className="text-emerald-500">Touch Emulation Active</span>
        </div>
      )}

      {/* Frame wrapper with scaling */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease-out, width 0.3s ease, height 0.3s ease',
        }}
        className="flex items-center justify-center"
      >
        <div
          style={{ width: vp.width, height: vp.height }}
          className={`${vp.containerClass} bg-black transition-all duration-300`}
        >
          {/* Mobile Island / Speaker Bar */}
          {viewport === 'mobile' && (
            <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-900/90 z-50 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-3.5 bg-black rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 mr-2" />
              </div>
            </div>
          )}

          {/* Internal scrollable viewport frame */}
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            <PortfolioRenderer
              portfolio={resolvedPortfolio}
              projects={resolvedProjects}
              profile={resolvedProfile}
              template={activeTemplate}
              overrideTokens={tokens}
              overrideHeroVariant={heroVariant}
              overrideProjectLayout={projectLayout}
              overrideSectionOrder={sectionOrder}
              hiddenSections={hiddenSections}
              forcedTouchMode={viewport === 'mobile'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
