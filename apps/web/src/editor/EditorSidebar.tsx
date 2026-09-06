import React, { useState } from 'react';
import { ThemeTokens } from '@cove/shared';
import { EditorTab } from './editorTypes.js';
import { SEEDED_TEMPLATES } from '../engine/templates/seededTemplates.js';
import { HeroVariant } from '../engine/primitives/Hero.js';

interface Props {
  tokens: ThemeTokens;
  templateId: string;
  sectionOrder: string[];
  hiddenSections: string[];
  heroVariant: HeroVariant;
  projectLayout: 'grid' | 'list';
  onSelectTemplate: (id: string) => void;
  onUpdateColor: (key: keyof ThemeTokens['colors'], hex: string) => void;
  onUpdateFontHeading: (font: string) => void;
  onUpdateFontBody: (font: string) => void;
  onUpdateRadius: (radius: string) => void;
  onUpdateContainerMax: (width: string) => void;
  onSetHeroVariant: (variant: HeroVariant) => void;
  onSetProjectLayout: (layout: 'grid' | 'list') => void;
  onMoveSection: (index: number, dir: 'up' | 'down') => void;
  onToggleSectionVisibility: (sectionKey: string) => void;
}

const HEADING_FONTS = [
  { label: 'Plus Jakarta Sans', value: '"Plus Jakarta Sans", system-ui, sans-serif' },
  { label: 'Playfair Display (Serif)', value: '"Playfair Display", Georgia, serif' },
  { label: 'Space Grotesk (Tech)', value: '"Space Grotesk", sans-serif' },
  { label: 'Syne (Avant-Garde)', value: '"Syne", sans-serif' },
  { label: 'Inter (Clean)', value: '"Inter", sans-serif' },
];

const BODY_FONTS = [
  { label: 'Plus Jakarta Sans', value: '"Plus Jakarta Sans", system-ui, sans-serif' },
  { label: 'Inter', value: '"Inter", system-ui, sans-serif' },
  { label: 'Newsreader (Editorial Serif)', value: '"Newsreader", Georgia, serif' },
  { label: 'Space Grotesk', value: '"Space Grotesk", monospace' },
];

const RADIUS_PRESETS = [
  { label: 'Sharp', value: '0px' },
  { label: 'Subtle', value: '0.375rem' },
  { label: 'Rounded', value: '0.75rem' },
  { label: 'Curved', value: '1.25rem' },
];

const CONTAINER_PRESETS = [
  { label: 'Compact (1000px)', value: '1000px' },
  { label: 'Standard (1200px)', value: '1200px' },
  { label: 'Wide (1400px)', value: '1400px' },
];

const COLOR_PALETTES = [
  { label: 'Electric Blue', accent: '#2563EB', bg: '#09090B' },
  { label: 'Cyan Cyber', accent: '#00F0FF', bg: '#05070E' },
  { label: 'Warm Amber', accent: '#D97706', bg: '#181614' },
  { label: 'Emerald Sage', accent: '#10B981', bg: '#0A120E' },
  { label: 'Violet Royal', accent: '#8B5CF6', bg: '#0F0B1A' },
  { label: 'Editorial Warm Paper', accent: '#A0522D', bg: '#FDFBF7', text: '#1E1D1A' },
];

export function EditorSidebar({
  tokens,
  templateId,
  sectionOrder,
  hiddenSections,
  heroVariant,
  projectLayout,
  onSelectTemplate,
  onUpdateColor,
  onUpdateFontHeading,
  onUpdateFontBody,
  onUpdateRadius,
  onUpdateContainerMax,
  onSetHeroVariant,
  onSetProjectLayout,
  onMoveSection,
  onToggleSectionVisibility,
}: Props) {
  const [activeTab, setActiveTab] = useState<EditorTab>('templates');

  return (
    <aside className="w-80 sm:w-96 border-r border-zinc-800 bg-zinc-950 flex flex-col h-full shrink-0 select-none z-20">
      {/* 1. Sidebar Tab Navigation */}
      <div className="flex border-b border-zinc-800 bg-zinc-900/50 p-1 gap-1 shrink-0 overflow-x-auto">
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 min-w-[64px] py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'templates'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          Preset
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          className={`flex-1 min-w-[64px] py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'typography'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          Type
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`flex-1 min-w-[64px] py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'colors'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          Colors
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex-1 min-w-[64px] py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'layout'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          Layout
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex-1 min-w-[64px] py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'sections'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          Sections
        </button>
      </div>

      {/* 2. Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* TAB 1: TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Design Presets</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Select a curated foundational style. Your portfolio content remains 100% untouched.
              </p>
            </div>

            <div className="space-y-3">
              {SEEDED_TEMPLATES.map((tpl) => {
                const isSelected = templateId === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => onSelectTemplate(tpl.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/20 shadow-md ring-1 ring-blue-500'
                        : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">{tpl.name}</h4>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{tpl.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: tpl.tokens.colors.background }} />
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: tpl.tokens.colors.surface }} />
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: tpl.tokens.colors.accent }} />
                      <span className="text-[11px] text-zinc-500 ml-auto font-mono">
                        {tpl.heroVariant} • {tpl.projectLayout}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Typography</h3>
              <p className="text-xs text-zinc-500 mt-1">Choose distinctive display and editorial type pairings.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Heading Font</label>
              <select
                value={tokens.typography.fontHeading}
                onChange={(e) => onUpdateFontHeading(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
              >
                {HEADING_FONTS.map((f) => (
                  <option key={f.label} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Body Font</label>
              <select
                value={tokens.typography.fontBody}
                onChange={(e) => onUpdateFontBody(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
              >
                {BODY_FONTS.map((f) => (
                  <option key={f.label} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Live Preview Card */}
            <div
              className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2"
              style={{ fontFamily: tokens.typography.fontBody }}
            >
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Preview Specimen</span>
              <h4
                className="text-lg font-bold"
                style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
              >
                Architectural Clarity & Motion
              </h4>
              <p className="text-xs leading-relaxed text-zinc-400">
                The visual cadence of thoughtful design speaks across every boundary and device.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: COLORS */}
        {activeTab === 'colors' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Color Palette</h3>
              <p className="text-xs text-zinc-500 mt-1">Adjust tones, background contrast, and magnetic accents.</p>
            </div>

            {/* Quick Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Quick Themes</label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_PALETTES.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      onUpdateColor('accent', p.accent);
                      onUpdateColor('background', p.bg);
                      if (p.text) onUpdateColor('textPrimary', p.text);
                    }}
                    className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 flex items-center gap-2 text-left"
                  >
                    <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: p.accent }} />
                    <span className="text-[11px] text-zinc-300 truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Pickers */}
            <div className="space-y-3 pt-2">
              {/* Background */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">Background</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={tokens.colors.background.startsWith('#') ? tokens.colors.background : '#09090b'}
                    onChange={(e) => onUpdateColor('background', e.target.value)}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={tokens.colors.background}
                    onChange={(e) => onUpdateColor('background', e.target.value)}
                    className="w-20 px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-300 font-mono"
                  />
                </div>
              </div>

              {/* Surface */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">Surface Card</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={tokens.colors.surface.startsWith('#') ? tokens.colors.surface : '#121215'}
                    onChange={(e) => onUpdateColor('surface', e.target.value)}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={tokens.colors.surface}
                    onChange={(e) => onUpdateColor('surface', e.target.value)}
                    className="w-20 px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-300 font-mono"
                  />
                </div>
              </div>

              {/* Accent */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">Accent Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={tokens.colors.accent.startsWith('#') ? tokens.colors.accent : '#2563eb'}
                    onChange={(e) => onUpdateColor('accent', e.target.value)}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={tokens.colors.accent}
                    onChange={(e) => onUpdateColor('accent', e.target.value)}
                    className="w-20 px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-300 font-mono"
                  />
                </div>
              </div>

              {/* Text Primary */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">Text Primary</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={tokens.colors.textPrimary.startsWith('#') ? tokens.colors.textPrimary : '#fafafa'}
                    onChange={(e) => onUpdateColor('textPrimary', e.target.value)}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={tokens.colors.textPrimary}
                    onChange={(e) => onUpdateColor('textPrimary', e.target.value)}
                    className="w-20 px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-300 font-mono"
                  />
                </div>
              </div>

              {/* Border */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">Border</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={tokens.colors.border.startsWith('#') ? tokens.colors.border : '#27272a'}
                    onChange={(e) => onUpdateColor('border', e.target.value)}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={tokens.colors.border}
                    onChange={(e) => onUpdateColor('border', e.target.value)}
                    className="w-20 px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-300 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LAYOUT & RADIUS */}
        {activeTab === 'layout' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Layout & Geometry</h3>
              <p className="text-xs text-zinc-500 mt-1">Control geometry, container width, and project presentation.</p>
            </div>

            {/* Corner Radius */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Corner Radius</label>
              <div className="grid grid-cols-2 gap-2">
                {RADIUS_PRESETS.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => onUpdateRadius(r.value)}
                    className={`py-2 px-3 text-xs rounded-lg border text-center transition-all ${
                      tokens.spacing.radius === r.value
                        ? 'border-blue-500 bg-blue-950/20 text-white font-medium'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Container Max Width */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Container Width</label>
              <div className="space-y-1.5">
                {CONTAINER_PRESETS.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => onUpdateContainerMax(c.value)}
                    className={`w-full py-2 px-3 text-xs rounded-lg border text-left flex justify-between items-center transition-all ${
                      tokens.spacing.containerMax === c.value
                        ? 'border-blue-500 bg-blue-950/20 text-white font-medium'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span>{c.label}</span>
                    {tokens.spacing.containerMax === c.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Layout Style */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium text-zinc-300">Projects Display Style</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSetProjectLayout('grid')}
                  className={`py-2.5 px-3 text-xs rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    projectLayout === 'grid'
                      ? 'border-blue-500 bg-blue-950/20 text-white font-medium'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>3D Tilt Grid</span>
                </button>

                <button
                  onClick={() => onSetProjectLayout('list')}
                  className={`py-2.5 px-3 text-xs rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    projectLayout === 'list'
                      ? 'border-blue-500 bg-blue-950/20 text-white font-medium'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Editorial List</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SECTIONS & ORDER */}
        {activeTab === 'sections' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Sections & Sequence</h3>
              <p className="text-xs text-zinc-500 mt-1">Reorder page sections or toggle visibility instantly.</p>
            </div>

            {/* Hero Variant Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">Hero Section Layout</label>
              <div className="grid grid-cols-2 gap-2">
                {(['centered', 'split', 'fullscreen-image', 'minimal-text'] as HeroVariant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => onSetHeroVariant(v)}
                    className={`p-2 text-xs rounded-lg border text-center capitalize transition-all ${
                      heroVariant === v
                        ? 'border-blue-500 bg-blue-950/20 text-white font-medium'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {v.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Sequence Reordering */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium text-zinc-300">Page Section Sequence</label>
              <div className="space-y-2">
                {sectionOrder.map((sec, idx) => {
                  const isHidden = hiddenSections.includes(sec);
                  return (
                    <div
                      key={sec}
                      className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                        isHidden
                          ? 'border-zinc-800/40 bg-zinc-900/20 opacity-50'
                          : 'border-zinc-800 bg-zinc-900/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-zinc-500 w-4">{idx + 1}</span>
                        <span className="text-xs font-semibold capitalize text-zinc-200">{sec}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Move Up */}
                        <button
                          onClick={() => onMoveSection(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                          title="Move Up"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>

                        {/* Move Down */}
                        <button
                          onClick={() => onMoveSection(idx, 'down')}
                          disabled={idx === sectionOrder.length - 1}
                          className="p-1 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                          title="Move Down"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Toggle Visibility */}
                        <button
                          onClick={() => onToggleSectionVisibility(sec)}
                          className={`p-1 transition-colors ${
                            isHidden ? 'text-zinc-600 hover:text-zinc-400' : 'text-blue-400 hover:text-blue-300'
                          }`}
                          title={isHidden ? 'Show Section' : 'Hide Section'}
                        >
                          {isHidden ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
