import React, { useEffect, useState } from 'react';
import pptxgen from 'pptxgenjs';
import {
  Presentation,
  Plus,
  Play,
  Download,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Layout,
  Palette,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Check,
  Sparkles,
  Type,
  FileText,
  Save,
  Clock,
  ExternalLink,
  Layers
} from 'lucide-react';
import { PortfolioSummary } from '@cove/shared';

export type SlideLayout =
  | 'title'
  | 'headline-3col'
  | 'split-media'
  | 'big-metric'
  | 'quote'
  | 'bullets';

export interface SlideData {
  id: string;
  layout: SlideLayout;
  title: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  metrics?: { value: string; label: string }[];
  columns?: { title: string; text: string }[];
  quoteAuthor?: string;
  quoteRole?: string;
  bgColor?: string;
  accentColor?: string;
}

export interface DeckTheme {
  name: string;
  bg: string;
  surface: string;
  text: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
}

export const DECK_THEMES: DeckTheme[] = [
  {
    name: 'Venture Pitch',
    bg: '#09090C',
    surface: '#13131A',
    text: '#FFFFFF',
    accent: '#6366F1',
    fontHeading: "'Space Grotesk', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
  },
  {
    name: 'Spatial Studio 3D',
    bg: '#0F0F12',
    surface: '#1A1A22',
    text: '#F4F4F6',
    accent: '#FF6B4A',
    fontHeading: "'Space Grotesk', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
  },
  {
    name: 'Executive Minimal',
    bg: '#FFFFFF',
    surface: '#F4F4F5',
    text: '#09090B',
    accent: '#0284C7',
    fontHeading: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
  },
  {
    name: 'Editorial Cream',
    bg: '#FAF8F5',
    surface: '#F2ECE4',
    text: '#1C1917',
    accent: '#C2410C',
    fontHeading: "'Playfair Display', Georgia, serif",
    fontBody: "'Inter', system-ui, sans-serif",
  },
];

const DEFAULT_SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    layout: 'title',
    title: 'Cove Platform Overview',
    subtitle: 'Unified creative platform for portfolios, websites, and spatial presentation decks.',
  },
  {
    id: 'slide-2',
    layout: 'headline-3col',
    title: 'Core Creative Engines',
    subtitle: 'Consolidating four fragmented creative workflows into one flagship application.',
    columns: [
      { title: 'Identity & Resume', text: 'Verified credentials, structured bio, and zero-loss resume ingestion.' },
      { title: 'Spatial 3D Web', text: 'Interactive Three.js scene archetypes, responsive publishing, and global CDN delivery.' },
      { title: 'Native Presentations', text: 'Fluid 16:9 canvas editing with native editable PPTX and PDF exports.' },
    ],
  },
  {
    id: 'slide-3',
    layout: 'big-metric',
    title: 'Traction & Performance',
    subtitle: 'Measurable impact delivered across early beta cohorts.',
    metrics: [
      { value: '4x', label: 'Faster Creative Turnaround' },
      { value: '<50ms', label: 'Global CDN Render Latency' },
      { value: '100%', label: 'Zero Content Loss Across Workspaces' },
    ],
  },
  {
    id: 'slide-4',
    layout: 'quote',
    title: 'Cove replaces four disjointed subscriptions with one beautifully engineered command center.',
    quoteAuthor: 'AM Studio Creative Direction',
    quoteRole: 'Flagship Platform Architecture',
  },
];

interface Props {
  token?: string;
}

export function PresentationWorkspace({ token }: Props) {
  const [decks, setDecks] = useState<PortfolioSummary[]>([]);
  const [activeDeck, setActiveDeck] = useState<PortfolioSummary | null>(null);
  const [slides, setSlides] = useState<SlideData[]>(DEFAULT_SLIDES);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeTheme, setActiveTheme] = useState<DeckTheme>(DECK_THEMES[0]);
  const [isPresenting, setIsPresenting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState('');

  // Load user's deck items
  useEffect(() => {
    async function loadDecks() {
      if (!token) return;
      try {
        setLoading(true);
        const res = await fetch('/api/v1/portfolios/mine?workspaceType=deck', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setDecks(json.data.portfolios || []);
          if (json.data.portfolios?.length > 0 && !activeDeck) {
            const first = json.data.portfolios[0];
            setActiveDeck(first);
            if (first.customTokens?.slides?.length > 0) {
              setSlides(first.customTokens.slides);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load decks:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDecks();
  }, [token]);

  // Handle Keyboard navigation in Fullscreen Present Mode
  useEffect(() => {
    if (!isPresenting) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setActiveSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        setActiveSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setIsPresenting(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresenting, slides.length]);

  // Create new deck
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !newDeckTitle.trim()) return;

    try {
      const slug = `deck-${newDeckTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
      const res = await fetch('/api/v1/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newDeckTitle,
          slug,
          workspaceType: 'deck',
          customTokens: {
            slides: DEFAULT_SLIDES,
            theme: activeTheme,
          },
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        const created: PortfolioSummary = json.data.portfolio;
        setDecks([created, ...decks]);
        setActiveDeck(created);
        setSlides(DEFAULT_SLIDES);
        setActiveSlideIndex(0);
        setShowCreateModal(false);
        setNewDeckTitle('');
      }
    } catch (err) {
      console.error('Failed to create deck:', err);
    }
  }

  // Save current slides to deck
  async function handleSaveDeck() {
    if (!token || !activeDeck) return;
    try {
      setSaving(true);
      await fetch(`/api/v1/portfolios/${activeDeck.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customTokens: {
            ...activeDeck.customTokens,
            slides,
            theme: activeTheme,
          },
        }),
      });
    } catch (err) {
      console.error('Failed to save presentation:', err);
    } finally {
      setSaving(false);
    }
  }

  // Slide CRUD Actions
  function addSlide(layout: SlideLayout = 'headline-3col') {
    const newSlide: SlideData = {
      id: `slide-${Date.now()}`,
      layout,
      title: 'New Presentation Slide',
      subtitle: 'Add supporting context or metrics for your audience.',
      columns:
        layout === 'headline-3col'
          ? [
              { title: 'Point Alpha', text: 'Detailed observation or deliverable.' },
              { title: 'Point Beta', text: 'Technical specification or outcome.' },
              { title: 'Point Gamma', text: 'Market alignment or strategic impact.' },
            ]
          : undefined,
      metrics:
        layout === 'big-metric'
          ? [
              { value: '10x', label: 'Increase in Efficiency' },
              { value: '$1.2M', label: 'ARR Milestone' },
            ]
          : undefined,
      bullets:
        layout === 'bullets'
          ? ['First strategic priority', 'Second architectural milestone', 'Third operational target']
          : undefined,
    };

    const nextSlides = [...slides];
    nextSlides.splice(activeSlideIndex + 1, 0, newSlide);
    setSlides(nextSlides);
    setActiveSlideIndex(activeSlideIndex + 1);
  }

  function duplicateSlide(idx: number) {
    const target = slides[idx];
    const clone: SlideData = {
      ...JSON.parse(JSON.stringify(target)),
      id: `slide-${Date.now()}`,
      title: `${target.title} (Copy)`,
    };
    const nextSlides = [...slides];
    nextSlides.splice(idx + 1, 0, clone);
    setSlides(nextSlides);
    setActiveSlideIndex(idx + 1);
  }

  function deleteSlide(idx: number) {
    if (slides.length <= 1) return;
    const nextSlides = slides.filter((_, i) => i !== idx);
    setSlides(nextSlides);
    setActiveSlideIndex(Math.min(activeSlideIndex, nextSlides.length - 1));
  }

  function moveSlide(from: number, to: number) {
    if (to < 0 || to >= slides.length) return;
    const nextSlides = [...slides];
    const item = nextSlides.splice(from, 1)[0];
    nextSlides.splice(to, 0, item);
    setSlides(nextSlides);
    setActiveSlideIndex(to);
  }

  function updateActiveSlide(partial: Partial<SlideData>) {
    const next = [...slides];
    next[activeSlideIndex] = { ...next[activeSlideIndex], ...partial };
    setSlides(next);
  }

  // Real PPTX Export via pptxgenjs
  async function handleExportPPTX() {
    try {
      setExporting(true);
      const pres = new pptxgen();
      pres.layout = 'LAYOUT_16x9';

      const hexClean = (color: string) => color.replace('#', '');
      const bgHex = hexClean(activeTheme.bg);
      const textHex = hexClean(activeTheme.text);
      const accentHex = hexClean(activeTheme.accent);

      for (const s of slides) {
        const slide = pres.addSlide();
        slide.background = { color: bgHex };

        if (s.layout === 'title') {
          slide.addText(s.title, {
            x: 1.0,
            y: 2.2,
            w: 11.3,
            h: 1.5,
            fontSize: 40,
            bold: true,
            color: textHex,
            align: 'center',
          });
          if (s.subtitle) {
            slide.addText(s.subtitle, {
              x: 1.5,
              y: 4.0,
              w: 10.3,
              h: 1.2,
              fontSize: 20,
              color: '94A3B8',
              align: 'center',
            });
          }
        } else if (s.layout === 'headline-3col') {
          slide.addText(s.title, {
            x: 0.8,
            y: 0.8,
            w: 11.5,
            h: 0.8,
            fontSize: 28,
            bold: true,
            color: textHex,
          });
          if (s.subtitle) {
            slide.addText(s.subtitle, {
              x: 0.8,
              y: 1.6,
              w: 11.5,
              h: 0.6,
              fontSize: 14,
              color: '94A3B8',
            });
          }

          if (s.columns && s.columns.length > 0) {
            const colWidth = 3.6;
            const startX = 0.8;
            s.columns.slice(0, 3).forEach((col, cIdx) => {
              const xPos = startX + cIdx * 4.0;
              slide.addShape(pres.ShapeType.rect, {
                x: xPos,
                y: 2.6,
                w: colWidth,
                h: 3.8,
                fill: { color: hexClean(activeTheme.surface) },
                line: { color: '334155', width: 1 },
              });
              slide.addText(col.title, {
                x: xPos + 0.3,
                y: 2.9,
                w: colWidth - 0.6,
                h: 0.6,
                fontSize: 18,
                bold: true,
                color: accentHex,
              });
              slide.addText(col.text, {
                x: xPos + 0.3,
                y: 3.6,
                w: colWidth - 0.6,
                h: 2.4,
                fontSize: 13,
                color: textHex,
              });
            });
          }
        } else if (s.layout === 'big-metric') {
          slide.addText(s.title, {
            x: 0.8,
            y: 0.8,
            w: 11.5,
            h: 0.8,
            fontSize: 28,
            bold: true,
            color: textHex,
          });

          if (s.metrics && s.metrics.length > 0) {
            const metricWidth = 3.6;
            s.metrics.slice(0, 3).forEach((m, mIdx) => {
              const xPos = 0.8 + mIdx * 4.0;
              slide.addShape(pres.ShapeType.rect, {
                x: xPos,
                y: 2.6,
                w: metricWidth,
                h: 3.5,
                fill: { color: hexClean(activeTheme.surface) },
                line: { color: '334155', width: 1 },
              });
              slide.addText(m.value, {
                x: xPos + 0.2,
                y: 3.0,
                w: metricWidth - 0.4,
                h: 1.2,
                fontSize: 48,
                bold: true,
                color: accentHex,
                align: 'center',
              });
              slide.addText(m.label, {
                x: xPos + 0.2,
                y: 4.4,
                w: metricWidth - 0.4,
                h: 1.0,
                fontSize: 14,
                color: textHex,
                align: 'center',
              });
            });
          }
        } else if (s.layout === 'quote') {
          slide.addText(`"${s.title}"`, {
            x: 1.5,
            y: 2.4,
            w: 10.3,
            h: 2.2,
            fontSize: 26,
            italic: true,
            color: textHex,
            align: 'center',
          });
          if (s.quoteAuthor) {
            slide.addText(`— ${s.quoteAuthor} ${s.quoteRole ? `(${s.quoteRole})` : ''}`, {
              x: 1.5,
              y: 4.8,
              w: 10.3,
              h: 0.8,
              fontSize: 16,
              color: accentHex,
              align: 'center',
            });
          }
        } else {
          // Default text & bullets
          slide.addText(s.title, {
            x: 0.8,
            y: 0.8,
            w: 11.5,
            h: 0.8,
            fontSize: 28,
            bold: true,
            color: textHex,
          });
          if (s.subtitle) {
            slide.addText(s.subtitle, {
              x: 0.8,
              y: 1.6,
              w: 11.5,
              h: 0.6,
              fontSize: 14,
              color: '94A3B8',
            });
          }
          if (s.bullets && s.bullets.length > 0) {
            const bulletItems = s.bullets.map((b) => ({
              text: b,
              options: { fontSize: 16, color: textHex, bullet: true },
            }));
            slide.addText(bulletItems, {
              x: 0.8,
              y: 2.6,
              w: 11.5,
              h: 3.8,
            });
          }
        }
      }

      await pres.writeFile({ fileName: `${activeDeck?.title || 'Cove-Presentation'}.pptx` });
    } catch (err) {
      console.error('PPTX export error:', err);
    } finally {
      setExporting(false);
    }
  }

  const currentSlide = slides[activeSlideIndex] || slides[0];

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0A0A0C] text-zinc-100 overflow-hidden select-none font-sans">
      {/* 1. PPT Top Bar */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-950/90 px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white truncate max-w-xs">
                {activeDeck?.title || 'Presentation Studio'}
              </h2>
              <span className="text-[10px] font-mono text-zinc-400">
                Slide {activeSlideIndex + 1} of {slides.length}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Deck</span>
          </button>

          <button
            onClick={handleSaveDeck}
            disabled={saving}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            onClick={handleExportPPTX}
            disabled={exporting}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-purple-300 border border-purple-500/30 transition flex items-center gap-1.5 disabled:opacity-50"
            title="Export native editable PowerPoint (.pptx)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting ? 'Generating...' : 'Download PPTX'}</span>
          </button>

          <button
            onClick={() => setIsPresenting(true)}
            className="px-4 py-1.5 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-purple-600/20 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Present Mode</span>
          </button>
        </div>
      </header>

      {/* 2. Main Workspace Body: Thumbnails + Canvas + Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Slide Thumbnails */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-950/60 p-3 flex flex-col justify-between shrink-0">
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 px-1">
              <span>SLIDES ({slides.length})</span>
              <button
                onClick={() => addSlide('headline-3col')}
                className="p-1 rounded-lg hover:bg-zinc-800 text-purple-400 transition"
                title="Add new slide"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {slides.map((s, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <div
                    key={s.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`group relative p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'border-purple-500 bg-purple-950/20 shadow-md ring-1 ring-purple-500/50'
                        : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                      <span>#{idx + 1}</span>
                      <span className="uppercase">{s.layout}</span>
                    </div>

                    <p className="text-xs font-semibold text-zinc-200 truncate">
                      {s.title || 'Untitled Slide'}
                    </p>

                    {/* Quick slide actions on hover */}
                    <div className="pt-2 mt-1 border-t border-zinc-800/60 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSlide(idx, idx - 1);
                        }}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-zinc-800 text-zinc-400 disabled:opacity-30"
                        title="Move up"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSlide(idx, idx + 1);
                        }}
                        disabled={idx === slides.length - 1}
                        className="p-1 rounded hover:bg-zinc-800 text-zinc-400 disabled:opacity-30"
                        title="Move down"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateSlide(idx);
                        }}
                        className="p-1 rounded hover:bg-zinc-800 text-zinc-400"
                        title="Duplicate slide"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSlide(idx);
                        }}
                        disabled={slides.length <= 1}
                        className="p-1 rounded hover:bg-red-950/50 text-red-400 disabled:opacity-30"
                        title="Delete slide"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => addSlide('headline-3col')}
            className="w-full py-2.5 rounded-xl border border-dashed border-zinc-800 hover:border-purple-500/50 text-xs font-semibold text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4 text-purple-400" />
            <span>Add Slide</span>
          </button>
        </aside>

        {/* Center: Live 16:9 Slide Canvas */}
        <main className="flex-1 bg-zinc-900/50 p-6 sm:p-10 flex items-center justify-center overflow-auto">
          <div
            className="w-full max-w-5xl aspect-[16/9] rounded-2xl shadow-2xl border transition-all p-8 sm:p-14 flex flex-col justify-between relative overflow-hidden"
            style={{
              backgroundColor: currentSlide.bgColor || activeTheme.bg,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: activeTheme.text,
              fontFamily: activeTheme.fontBody,
            }}
          >
            {/* Header / Layout Render */}
            {currentSlide.layout === 'title' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
                <input
                  type="text"
                  value={currentSlide.title}
                  onChange={(e) => updateActiveSlide({ title: e.target.value })}
                  placeholder="Enter Presentation Title..."
                  className="w-full bg-transparent text-center text-3xl sm:text-5xl font-black tracking-tight focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-2"
                  style={{ fontFamily: activeTheme.fontHeading }}
                />
                <textarea
                  rows={2}
                  value={currentSlide.subtitle || ''}
                  onChange={(e) => updateActiveSlide({ subtitle: e.target.value })}
                  placeholder="Enter presentation subtitle or executive hook..."
                  className="w-full bg-transparent text-center text-sm sm:text-lg text-zinc-400 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-2 resize-none"
                />
              </div>
            ) : currentSlide.layout === 'headline-3col' ? (
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateActiveSlide({ title: e.target.value })}
                    className="w-full bg-transparent text-2xl sm:text-4xl font-extrabold tracking-tight focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-1"
                    style={{ fontFamily: activeTheme.fontHeading }}
                  />
                  <input
                    type="text"
                    value={currentSlide.subtitle || ''}
                    onChange={(e) => updateActiveSlide({ subtitle: e.target.value })}
                    className="w-full bg-transparent text-xs sm:text-sm text-zinc-400 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-1 mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 items-stretch">
                  {(currentSlide.columns || []).map((col, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-5 rounded-xl border flex flex-col justify-between space-y-3"
                      style={{
                        backgroundColor: activeTheme.surface,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <input
                        type="text"
                        value={col.title}
                        onChange={(e) => {
                          const nextCols = [...(currentSlide.columns || [])];
                          nextCols[cIdx].title = e.target.value;
                          updateActiveSlide({ columns: nextCols });
                        }}
                        className="w-full bg-transparent font-bold text-sm focus:outline-none"
                        style={{ color: activeTheme.accent }}
                      />
                      <textarea
                        rows={4}
                        value={col.text}
                        onChange={(e) => {
                          const nextCols = [...(currentSlide.columns || [])];
                          nextCols[cIdx].text = e.target.value;
                          updateActiveSlide({ columns: nextCols });
                        }}
                        className="w-full bg-transparent text-xs text-zinc-300 resize-none focus:outline-none leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : currentSlide.layout === 'big-metric' ? (
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateActiveSlide({ title: e.target.value })}
                    className="w-full bg-transparent text-2xl sm:text-4xl font-extrabold tracking-tight focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-1"
                    style={{ fontFamily: activeTheme.fontHeading }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-center">
                  {(currentSlide.metrics || []).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-6 rounded-2xl border text-center space-y-2 flex flex-col justify-center"
                      style={{
                        backgroundColor: activeTheme.surface,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => {
                          const nextM = [...(currentSlide.metrics || [])];
                          nextM[mIdx].value = e.target.value;
                          updateActiveSlide({ metrics: nextM });
                        }}
                        className="w-full bg-transparent font-black text-4xl sm:text-6xl text-center focus:outline-none"
                        style={{ color: activeTheme.accent, fontFamily: activeTheme.fontHeading }}
                      />
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => {
                          const nextM = [...(currentSlide.metrics || [])];
                          nextM[mIdx].label = e.target.value;
                          updateActiveSlide({ metrics: nextM });
                        }}
                        className="w-full bg-transparent text-xs sm:text-sm text-zinc-400 text-center focus:outline-none font-medium"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : currentSlide.layout === 'quote' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto">
                <textarea
                  rows={3}
                  value={currentSlide.title}
                  onChange={(e) => updateActiveSlide({ title: e.target.value })}
                  className="w-full bg-transparent text-center text-xl sm:text-3xl italic font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-2 resize-none"
                />
                <div className="space-y-1">
                  <input
                    type="text"
                    value={currentSlide.quoteAuthor || ''}
                    onChange={(e) => updateActiveSlide({ quoteAuthor: e.target.value })}
                    placeholder="Author Name"
                    className="w-full bg-transparent text-center text-sm font-bold focus:outline-none"
                    style={{ color: activeTheme.accent }}
                  />
                  <input
                    type="text"
                    value={currentSlide.quoteRole || ''}
                    onChange={(e) => updateActiveSlide({ quoteRole: e.target.value })}
                    placeholder="Role / Title"
                    className="w-full bg-transparent text-center text-xs text-zinc-400 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <input
                  type="text"
                  value={currentSlide.title}
                  onChange={(e) => updateActiveSlide({ title: e.target.value })}
                  className="w-full bg-transparent text-2xl sm:text-4xl font-extrabold tracking-tight focus:outline-none"
                  style={{ fontFamily: activeTheme.fontHeading }}
                />
                <textarea
                  rows={6}
                  value={(currentSlide.bullets || []).join('\n')}
                  onChange={(e) =>
                    updateActiveSlide({ bullets: e.target.value.split('\n') })
                  }
                  placeholder="Enter one bullet point per line..."
                  className="w-full flex-1 bg-transparent text-sm leading-loose text-zinc-300 resize-none focus:outline-none font-mono"
                />
              </div>
            )}

            {/* Bottom Slide Metadata */}
            <div className="pt-4 border-t border-zinc-800/40 flex items-center justify-between text-[11px] font-mono opacity-50">
              <span>{activeDeck?.title || 'Cove Spatial Deck'}</span>
              <span>{activeSlideIndex + 1} / {slides.length}</span>
            </div>
          </div>
        </main>

        {/* Right Inspector: Layout & Theme Controls */}
        <aside className="w-72 border-l border-zinc-800 bg-zinc-950/60 p-4 space-y-6 shrink-0 overflow-y-auto text-xs">
          {/* Layout Selector */}
          <div className="space-y-2">
            <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block">
              Slide Layout
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'title', label: 'Title' },
                { id: 'headline-3col', label: '3-Column' },
                { id: 'big-metric', label: 'Big Metrics' },
                { id: 'quote', label: 'Quote' },
                { id: 'bullets', label: 'Bullets' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => updateActiveSlide({ layout: l.id as SlideLayout })}
                  className={`p-2 rounded-lg border text-left font-medium transition ${
                    currentSlide.layout === l.id
                      ? 'border-purple-500 bg-purple-950/30 text-white'
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Deck Themes */}
          <div className="space-y-2">
            <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block">
              Deck Theme
            </span>
            <div className="space-y-2">
              {DECK_THEMES.map((theme) => (
                <div
                  key={theme.name}
                  onClick={() => setActiveTheme(theme)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    activeTheme.name === theme.name
                      ? 'border-purple-500 bg-purple-950/20'
                      : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.bg }}
                    />
                    <span className="font-medium text-white">{theme.name}</span>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Typography Preview */}
          <div className="space-y-2">
            <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block">
              Active Typography
            </span>
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 block">Heading Font:</span>
              <span className="font-bold text-white text-xs block">{activeTheme.fontHeading}</span>
              <span className="text-[11px] font-mono text-zinc-500 block pt-1">Body Font:</span>
              <span className="text-zinc-300 text-xs block">{activeTheme.fontBody}</span>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Fullscreen Interactive Presentation Mode */}
      {isPresenting && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 sm:p-12 select-none">
          {/* Top Bar with Exit */}
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>{activeDeck?.title || 'Cove Spatial Presentation'}</span>
            <button
              onClick={() => setIsPresenting(false)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white flex items-center gap-1.5 transition"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Exit (Esc)</span>
            </button>
          </div>

          {/* Fullscreen Slide Canvas */}
          <div className="flex-1 flex items-center justify-center my-6">
            <div
              className="w-full max-w-6xl aspect-[16/9] rounded-3xl p-10 sm:p-20 flex flex-col justify-between shadow-2xl border transition-all"
              style={{
                backgroundColor: currentSlide.bgColor || activeTheme.bg,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: activeTheme.text,
                fontFamily: activeTheme.fontBody,
              }}
            >
              {currentSlide.layout === 'title' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
                  <h1
                    className="text-4xl sm:text-7xl font-black tracking-tight"
                    style={{ fontFamily: activeTheme.fontHeading }}
                  >
                    {currentSlide.title}
                  </h1>
                  {currentSlide.subtitle && (
                    <p className="text-lg sm:text-2xl text-zinc-400 leading-relaxed max-w-3xl">
                      {currentSlide.subtitle}
                    </p>
                  )}
                </div>
              ) : currentSlide.layout === 'headline-3col' ? (
                <div className="flex-1 flex flex-col justify-between space-y-8">
                  <div>
                    <h2
                      className="text-3xl sm:text-5xl font-extrabold tracking-tight"
                      style={{ fontFamily: activeTheme.fontHeading }}
                    >
                      {currentSlide.title}
                    </h2>
                    {currentSlide.subtitle && (
                      <p className="text-sm sm:text-lg text-zinc-400 mt-2">{currentSlide.subtitle}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
                    {(currentSlide.columns || []).map((col, idx) => (
                      <div
                        key={idx}
                        className="p-8 rounded-2xl border flex flex-col justify-between"
                        style={{
                          backgroundColor: activeTheme.surface,
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <h3 className="font-bold text-lg sm:text-xl" style={{ color: activeTheme.accent }}>
                          {col.title}
                        </h3>
                        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mt-2">
                          {col.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : currentSlide.layout === 'big-metric' ? (
                <div className="flex-1 flex flex-col justify-between space-y-8">
                  <h2
                    className="text-3xl sm:text-5xl font-extrabold tracking-tight"
                    style={{ fontFamily: activeTheme.fontHeading }}
                  >
                    {currentSlide.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 items-center">
                    {(currentSlide.metrics || []).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-8 rounded-3xl border text-center space-y-3"
                        style={{
                          backgroundColor: activeTheme.surface,
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div
                          className="font-black text-5xl sm:text-7xl"
                          style={{ color: activeTheme.accent, fontFamily: activeTheme.fontHeading }}
                        >
                          {m.value}
                        </div>
                        <div className="text-sm sm:text-base font-semibold text-zinc-400">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : currentSlide.layout === 'quote' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
                  <blockquote className="text-2xl sm:text-4xl italic font-serif leading-relaxed">
                    "{currentSlide.title}"
                  </blockquote>
                  {currentSlide.quoteAuthor && (
                    <div className="text-base sm:text-lg font-bold" style={{ color: activeTheme.accent }}>
                      — {currentSlide.quoteAuthor} {currentSlide.quoteRole ? `• ${currentSlide.quoteRole}` : ''}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between space-y-6">
                  <h2
                    className="text-3xl sm:text-5xl font-extrabold tracking-tight"
                    style={{ fontFamily: activeTheme.fontHeading }}
                  >
                    {currentSlide.title}
                  </h2>
                  <ul className="space-y-4 pl-6 list-disc text-lg sm:text-2xl text-zinc-300">
                    {(currentSlide.bullets || []).map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-6 border-t border-zinc-800/40 flex items-center justify-between text-xs font-mono opacity-50">
                <span>{activeDeck?.title}</span>
                <span>{activeSlideIndex + 1} / {slides.length}</span>
              </div>
            </div>
          </div>

          {/* Floating Slideshow Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveSlideIndex((p) => Math.max(0, p - 1))}
              disabled={activeSlideIndex === 0}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold disabled:opacity-30 transition"
            >
              ← Previous
            </button>
            <span className="text-xs font-mono text-zinc-400">
              {activeSlideIndex + 1} / {slides.length}
            </span>
            <button
              onClick={() => setActiveSlideIndex((p) => Math.min(slides.length - 1, p + 1))}
              disabled={activeSlideIndex === slides.length - 1}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold disabled:opacity-30 transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* 4. New Deck Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create Presentation Deck</h3>
            <p className="text-xs text-zinc-400">
              Start with clean slides and your choice of typography and theme.
            </p>
            <form onSubmit={handleCreateDeck} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase">Deck Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Series A Venture Pitch"
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500 mt-1"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-lg shadow-purple-600/20"
                >
                  Create Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
