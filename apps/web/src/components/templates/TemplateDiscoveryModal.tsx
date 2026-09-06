import React, { useState, useEffect } from 'react';
import { TemplateRecommendationDto, PortfolioSummary, ProjectDto, ProfileDto } from '@cove/shared';
import { SEEDED_TEMPLATES } from '../../engine/templates/seededTemplates.js';
import { PortfolioRenderer } from '../../engine/renderer/PortfolioRenderer.js';

interface Props {
  token?: string;
  portfolio: PortfolioSummary | null;
  projects: ProjectDto[];
  profile: ProfileDto | null;
  activeTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onClose: () => void;
}

export function TemplateDiscoveryModal({
  token,
  portfolio,
  projects,
  profile,
  activeTemplateId,
  onSelectTemplate,
  onClose
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProfession, setSelectedProfession] = useState('all');
  const [selectedInteraction, setSelectedInteraction] = useState('all');
  const [recommendations, setRecommendations] = useState<TemplateRecommendationDto[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // Fetch AI Recommendations
  useEffect(() => {
    async function loadRecommendations() {
      if (!token) return;
      try {
        setLoadingRecs(true);
        const res = await fetch('/api/v1/templates/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            portfolioId: portfolio?.id,
            signals: {
              profession: profile?.headline || 'Architect & Spatial Designer',
              projectCount: projects.length,
              mediaDensity: projects.some((p) => (p.media?.length || 0) > 2) ? 'rich' : 'balanced',
              textDensity: projects.some((p) => (p.fullDescription?.length || 0) > 500) ? 'rich' : 'balanced'
            }
          })
        });
        const data = await res.json();
        if (data.success && data.data?.recommendations) {
          setRecommendations(data.data.recommendations);
        }
      } catch (err) {
        console.error('Failed to load AI recommendations:', err);
      } finally {
        setLoadingRecs(false);
      }
    }

    loadRecommendations();
  }, [token, portfolio?.id, profile?.headline, projects]);

  // Fetch User Favorites
  useEffect(() => {
    async function loadFavorites() {
      if (!token) return;
      try {
        const res = await fetch('/api/v1/templates/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data?.favorites)) {
          setFavorites(data.data.favorites);
        }
      } catch (err) {
        console.error('Failed to load favorites:', err);
      }
    }

    loadFavorites();
  }, [token]);

  async function handleToggleFavorite(templateId: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!token) return;

    // Optimistic toggle
    setFavorites((prev) =>
      prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId]
    );

    try {
      await fetch(`/api/v1/templates/${templateId}/favorite`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  }

  // Filter templates
  const allTemplates = SEEDED_TEMPLATES;
  const filteredTemplates = allTemplates.filter((t) => {
    const matchesQuery =
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || t.category.toLowerCase() === selectedCategory;

    const matchesInteraction =
      selectedInteraction === 'all' ||
      (selectedInteraction === 'expressive' && t.category === 'studio') ||
      (selectedInteraction === 'standard' && t.category === 'editorial') ||
      (selectedInteraction === 'subtle' && t.category === 'minimal');

    const matchesProfession =
      selectedProfession === 'all' ||
      (selectedProfession === 'architect' && (t.category === 'studio' || t.category === 'minimal')) ||
      (selectedProfession === 'developer' && t.category === 'minimal') ||
      (selectedProfession === 'writer' && t.category === 'editorial') ||
      (selectedProfession === 'designer' && (t.category === 'studio' || t.category === 'editorial'));

    return matchesQuery && matchesCategory && matchesInteraction && matchesProfession;
  });

  const previewTemplate = previewTemplateId
    ? SEEDED_TEMPLATES.find((t) => t.id === previewTemplateId)
    : null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-lg shadow-inner">
              ✨
            </div>
            <div>
              <h2 className="text-zinc-100 text-base font-bold tracking-tight">
                Template Discovery & AI Recommender
              </h2>
              <p className="text-zinc-400 text-xs">
                Explore interaction archetypes personalized to your work and projects
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 text-sm p-1.5 rounded-lg hover:bg-zinc-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-5 border-b border-zinc-800/80 bg-zinc-900/30 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-2.5 text-zinc-500 text-xs">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates by style, personality, or profession..."
                className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-700/70 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-zinc-500 text-[11px] font-medium mr-1">Filter:</span>

            {/* Category */}
            {['all', 'minimal', 'editorial', 'studio'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg border capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm font-semibold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="h-4 w-px bg-zinc-800 mx-1" />

            {/* Profession */}
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="px-2.5 py-1 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Disciplines</option>
              <option value="architect">Architecture & Spatial</option>
              <option value="developer">Developer & Tech</option>
              <option value="writer">Writer & Researcher</option>
              <option value="designer">Visual & Brand Design</option>
            </select>

            {/* Interaction Intensity */}
            <select
              value={selectedInteraction}
              onChange={(e) => setSelectedInteraction(e.target.value)}
              className="px-2.5 py-1 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Motions</option>
              <option value="subtle">Subtle Motion</option>
              <option value="standard">Standard Motion</option>
              <option value="expressive">Expressive 3D Motion</option>
            </select>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* 1. AI Personalized Recommendations Section */}
          {recommendations.length > 0 && !searchQuery && selectedCategory === 'all' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🎯</span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    AI Recommended For Your Work
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-500">
                  Grounded in your profile & project media density
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.slice(0, 2).map((rec) => {
                  const tpl = SEEDED_TEMPLATES.find((t) => t.id === rec.templateId);
                  const isFav = favorites.includes(rec.templateId);
                  const isCurrent = activeTemplateId === rec.templateId;

                  return (
                    <div
                      key={rec.templateId}
                      className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/40 hover:border-indigo-400/80 transition-all flex flex-col justify-between space-y-3 shadow-lg group relative"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white tracking-tight">
                              {rec.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {rec.matchPercentage}% Match
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleToggleFavorite(rec.templateId, e)}
                            className="text-sm text-zinc-400 hover:text-amber-400 transition-colors p-1"
                            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {isFav ? '★' : '☆'}
                          </button>
                        </div>

                        {/* Rationale Callout */}
                        <p className="text-xs text-indigo-200/80 mt-2 leading-relaxed">
                          {rec.rationale}
                        </p>

                        <div className="mt-3 pt-2.5 border-t border-indigo-900/40 text-[11px] text-zinc-400 flex items-center gap-2">
                          <span className="font-semibold text-zinc-300">Fit:</span>
                          <span>{rec.contentFitSummary}</span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setPreviewTemplateId(rec.templateId)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline flex items-center gap-1"
                        >
                          <span>👁️</span> Try with my projects
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectTemplate(rec.templateId);
                            onClose();
                          }}
                          disabled={isCurrent}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                            isCurrent
                              ? 'bg-zinc-800 text-zinc-500 cursor-default'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                          }`}
                        >
                          {isCurrent ? 'Active Template' : 'Apply Template'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Full Catalog Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                All Available Archetypes ({filteredTemplates.length})
              </h3>
              {favorites.length > 0 && (
                <span className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
                  <span>★</span> {favorites.length} Saved in Favorites
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredTemplates.map((t) => {
                const isFav = favorites.includes(t.id);
                const isCurrent = activeTemplateId === t.id;

                return (
                  <div
                    key={t.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'bg-zinc-900/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                        : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900/80 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-100">{t.name}</h4>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                            {t.category} archetype
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleToggleFavorite(t.id, e)}
                          className={`text-base p-1 transition-colors ${
                            isFav ? 'text-amber-400' : 'text-zinc-600 hover:text-zinc-300'
                          }`}
                        >
                          {isFav ? '★' : '☆'}
                        </button>
                      </div>

                      <p className="text-xs text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">
                        {t.description}
                      </p>

                      <div className="mt-3 text-[11px] text-zinc-500 space-y-1">
                        <div>
                          <strong className="text-zinc-400">Hero:</strong> {t.heroVariant}
                        </div>
                        <div>
                          <strong className="text-zinc-400">Projects:</strong> {t.projectLayout}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setPreviewTemplateId(t.id)}
                        className="text-xs text-zinc-400 hover:text-white font-medium underline"
                      >
                        Preview
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectTemplate(t.id);
                          onClose();
                        }}
                        disabled={isCurrent}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          isCurrent
                            ? 'bg-zinc-800 text-zinc-500 cursor-default'
                            : 'bg-zinc-100 text-zinc-900 hover:bg-white shadow'
                        }`}
                      >
                        {isCurrent ? 'Active' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500">
          <span>Zero content loss guarantee: switching templates preserves all projects, bio, and media.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Live Interactive Preview Drawer with User's Real Content */}
      {previewTemplate && portfolio && (
        <div className="fixed inset-0 z-[120] bg-black/90 flex flex-col">
          <div className="h-12 border-b border-zinc-800 bg-zinc-950 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white">
                Live Preview: {previewTemplate.name}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                Rendered with your actual {projects.length} projects
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelectTemplate(previewTemplate.id);
                  setPreviewTemplateId(null);
                  onClose();
                }}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg shadow transition"
              >
                Apply This Template
              </button>
              <button
                type="button"
                onClick={() => setPreviewTemplateId(null)}
                className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1"
              >
                Exit Preview
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <PortfolioRenderer
              portfolio={portfolio}
              projects={projects}
              profile={profile}
              template={previewTemplate}
              overrideTokens={previewTemplate.tokens}
              overrideHeroVariant={previewTemplate.heroVariant}
              overrideProjectLayout={previewTemplate.projectLayout}
              overrideSectionOrder={portfolio.sectionOrder}
              forcedTouchMode={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
