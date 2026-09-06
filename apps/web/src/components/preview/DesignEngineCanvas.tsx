import React, { useState, useEffect } from 'react';
import { PortfolioSummary, ProjectDto, FullProfileDto } from '@cove/shared';
import { SEEDED_TEMPLATES } from '../../engine/templates/seededTemplates.js';
import { TemplateDefinition } from '../../engine/templates/templateTypes.js';
import { HeroVariant } from '../../engine/primitives/Hero.js';
import { PortfolioRenderer } from '../../engine/renderer/PortfolioRenderer.js';

interface Props {
  portfolio: PortfolioSummary | null;
  token: string;
}

const MOCK_SAMPLE_PROJECTS: ProjectDto[] = [
  {
    id: 'sample-p1',
    userId: 'demo',
    title: 'Fjord Eco Pavilion',
    coverImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    year: '2025',
    category: 'Cultural Architecture',
    location: 'Bergen, Norway',
    shortDescription: 'Zero-carbon timber pavilion overlooking the Byfjorden with solar-integrated roof panels.',
    fullDescription: 'Constructed entirely of locally harvested cross-laminated timber, this pavilion functions as an open public observatory and marine research post.',
    role: 'Lead Project Architect',
    duration: '14 months',
    outcome: 'Awarded 2025 European Sustainability Crown with 100% net-positive energy footprint.',
    githubLink: 'https://github.com/cove/fjord-pavilion',
    tools: ['Rhino 3D', 'Grasshopper', 'Ladybug Tools', 'Revit'],
    collaborators: ['Nordic Timber Group', 'Arup Structural'],
    externalLinks: [{ label: 'Press Release', url: 'https://archdaily.com' }],
    customSectionOrder: null,
    sortOrder: 0,
    media: [
      {
        id: 'm1',
        projectId: 'sample-p1',
        url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
        type: 'IMAGE',
        caption: 'South Facade Twilight Render',
        altText: 'Timber pavilion on fjord coastline',
        isCover: true,
        sortOrder: 0,
        createdAt: new Date().toISOString()
      },
      {
        id: 'm2',
        projectId: 'sample-p1',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        type: 'IMAGE',
        caption: 'Interior Cross Laminated Timber Ribs',
        altText: 'Interior vaulting structure',
        isCover: false,
        sortOrder: 1,
        createdAt: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sample-p2',
    userId: 'demo',
    title: 'Solar Promenade Walkway',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    category: 'Urban Infrastructure',
    location: 'Stockholm, Sweden',
    shortDescription: 'Elevated pedestrian greenway generating kinetic and photovoltaic energy.',
    fullDescription: 'Connecting the central station to the waterfront district across a 1.2km continuous canopy.',
    role: 'Principal Urbanist',
    duration: '2 years',
    outcome: 'Over 40,000 daily commuters; generates 320 MWh annually.',
    githubLink: null,
    tools: ['AutoCAD', 'Blender', 'QGIS'],
    collaborators: ['Stockholm City Planning Bureau'],
    externalLinks: [],
    customSectionOrder: null,
    sortOrder: 1,
    media: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sample-p3',
    userId: 'demo',
    title: 'Modular Timber Library',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    year: '2023',
    category: 'Public Works',
    location: 'Helsinki, Finland',
    shortDescription: 'A prefabricated, demountable community learning center built for seasonal civic events.',
    fullDescription: 'Engineered with modular acoustic wood panels that can be reconfigured in under 48 hours.',
    role: 'Design Director',
    duration: '8 months',
    outcome: 'Completed on budget with zero construction waste sent to landfill.',
    githubLink: null,
    tools: ['SketchUp', 'Cinema 4D', 'Enscape'],
    collaborators: ['Helsinki Cultural Trust'],
    externalLinks: [],
    customSectionOrder: null,
    sortOrder: 2,
    media: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function DesignEngineCanvas({ portfolio, token }: Props) {
  const [profile, setProfile] = useState<FullProfileDto | null>(null);
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);

  // Template Controls
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [selectedHeroVariant, setSelectedHeroVariant] = useState<HeroVariant>('centered');

  // Secondary Template for Side-by-Side Comparison (Phase 3 Review Gate)
  const [comparisonTemplateIndex, setComparisonTemplateIndex] = useState(2);

  // Viewport mode: 'desktop' | 'tablet' | 'mobile'
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Comparison toggle: single vs side-by-side
  const [sideBySide, setSideBySide] = useState(false);

  useEffect(() => {
    loadData();
  }, [portfolio?.id]);

  async function loadData() {
    try {
      setLoading(true);

      // 1. Fetch user profile
      const profRes = await fetch('/api/v1/profile/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (profRes.ok) {
        const profData = await profRes.json();
        setProfile(profData.data.profile);
      }

      // 2. Fetch portfolio projects if available
      if (portfolio) {
        const portRes = await fetch(`/api/v1/portfolios/${portfolio.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (portRes.ok) {
          const portData = await portRes.json();
          const loadedProjects = portData.data.portfolio.projects || [];
          setProjects(loadedProjects.length > 0 ? loadedProjects : MOCK_SAMPLE_PROJECTS);
        }
      } else {
        setProjects(MOCK_SAMPLE_PROJECTS);
      }
    } catch (err) {
      console.error('Failed to load design canvas data:', err);
      setProjects(MOCK_SAMPLE_PROJECTS);
    } finally {
      setLoading(false);
    }
  }

  const activeTemplate: TemplateDefinition = SEEDED_TEMPLATES[selectedTemplateIndex];
  const comparisonTemplate: TemplateDefinition = SEEDED_TEMPLATES[comparisonTemplateIndex];

  // Dummy fallback portfolio if none created yet
  const activePortfolio: PortfolioSummary = portfolio || {
    id: 'demo-portfolio',
    userId: 'demo',
    title: 'Architectural & Spatial Studio',
    slug: 'studio-demo',
    status: 'draft',
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const isTouchViewport = viewportMode === 'mobile';

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Design Engine Toolbar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Preset Selector */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
              Style Preset A {sideBySide && '(Left)'}
            </label>
            <select
              value={selectedTemplateIndex}
              onChange={(e) => {
                const idx = parseInt(e.target.value, 10);
                setSelectedTemplateIndex(idx);
                setSelectedHeroVariant(SEEDED_TEMPLATES[idx].heroVariant);
              }}
              className="px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700 rounded-lg text-white font-medium"
            >
              {SEEDED_TEMPLATES.map((tpl, i) => (
                <option key={tpl.id} value={i}>
                  {tpl.name} ({tpl.category.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Hero Layout Variant Selector */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Hero Variant</label>
            <select
              value={selectedHeroVariant}
              onChange={(e) => setSelectedHeroVariant(e.target.value as HeroVariant)}
              className="px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700 rounded-lg text-white font-medium"
            >
              <option value="centered">Centered Typographic</option>
              <option value="split">Split Narrative + 3D Tilt</option>
              <option value="fullscreen-image">Fullscreen Immersive</option>
              <option value="minimal-text">Minimal Statement</option>
            </select>
          </div>

          {/* Side-by-Side Secondary Preset Selector */}
          {sideBySide && (
            <div>
              <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">Style Preset B (Right)</label>
              <select
                value={comparisonTemplateIndex}
                onChange={(e) => setComparisonTemplateIndex(parseInt(e.target.value, 10))}
                className="px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700 rounded-lg text-white font-medium"
              >
                {SEEDED_TEMPLATES.map((tpl, i) => (
                  <option key={tpl.id} value={i}>
                    {tpl.name} ({tpl.category.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Side-by-side Comparison Toggle */}
          <button
            onClick={() => setSideBySide(!sideBySide)}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition ${
              sideBySide
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-zinc-950 text-zinc-300 border-zinc-700 hover:border-zinc-600'
            }`}
          >
            {sideBySide ? '✕ Single Mode' : '⧉ Side-by-Side Comparison'}
          </button>

          {/* Responsive Viewport Buttons */}
          <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition ${
                viewportMode === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
              title="Desktop: Fine pointer, Custom cursor, 3D tilt, Magnetic pull"
            >
              🖥 Desktop
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition ${
                viewportMode === 'tablet' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Tablet (768px)
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition ${
                viewportMode === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
              title="Mobile: Touch fallback, Cursor suppressed, Tap states active"
            >
              📱 Mobile (390px)
            </button>
          </div>
        </div>
      </div>

      {/* Feature Notice Banner */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span>
            {viewportMode === 'mobile'
              ? 'TOUCH / MOBILE VIEWPORT: Cursor-reactive effects suppressed • Tap scale states active • Zero broken parallax'
              : 'POINTER DESKTOP VIEWPORT: Custom trailing cursor • 3D mousemove card tilt • Magnetic spring buttons • Scroll reveals active'}
          </span>
        </div>
        <span className="text-[11px] text-zinc-400">
          Identical Data Model ({projects.length} Projects) • Zero Content Duplication
        </span>
      </div>

      {/* Canvas Area */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-zinc-400">Loading portfolio render tree...</div>
      ) : sideBySide ? (
        /* SIDE-BY-SIDE PROOF VIEW (Phase 3 Review Gate) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[80vh] overflow-hidden">
          {/* Left: Preset A */}
          <div className="border border-zinc-800 rounded-2xl overflow-y-auto flex flex-col relative shadow-2xl">
            <div className="sticky top-0 z-30 px-3 py-1.5 bg-zinc-950/90 backdrop-blur border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono">
              <span className="text-white font-bold">{activeTemplate.name}</span>
              <span className="text-zinc-500 uppercase">{activeTemplate.category}</span>
            </div>
            <div className="flex-1">
              <PortfolioRenderer
                portfolio={activePortfolio}
                projects={projects}
                profile={profile}
                template={activeTemplate}
                overrideHeroVariant={selectedHeroVariant}
                forcedTouchMode={isTouchViewport}
              />
            </div>
          </div>

          {/* Right: Preset B */}
          <div className="border border-zinc-800 rounded-2xl overflow-y-auto flex flex-col relative shadow-2xl">
            <div className="sticky top-0 z-30 px-3 py-1.5 bg-zinc-950/90 backdrop-blur border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono">
              <span className="text-white font-bold">{comparisonTemplate.name}</span>
              <span className="text-zinc-500 uppercase">{comparisonTemplate.category}</span>
            </div>
            <div className="flex-1">
              <PortfolioRenderer
                portfolio={activePortfolio}
                projects={projects}
                profile={profile}
                template={comparisonTemplate}
                overrideHeroVariant={comparisonTemplate.heroVariant}
                forcedTouchMode={isTouchViewport}
              />
            </div>
          </div>
        </div>
      ) : (
        /* SINGLE RENDERER VIEWPORT (Responsive Shell) */
        <div className="flex-1 flex justify-center items-start overflow-y-auto py-2">
          <div
            className={`w-full transition-all duration-300 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl ${
              viewportMode === 'mobile'
                ? 'max-w-[390px] min-h-[780px] border-4 border-zinc-700 my-4'
                : viewportMode === 'tablet'
                ? 'max-w-[768px] min-h-[800px] border-2 border-zinc-700 my-4'
                : 'max-w-full'
            }`}
          >
            <PortfolioRenderer
              portfolio={activePortfolio}
              projects={projects}
              profile={profile}
              template={activeTemplate}
              overrideHeroVariant={selectedHeroVariant}
              forcedTouchMode={isTouchViewport}
            />
          </div>
        </div>
      )}
    </div>
  );
}
