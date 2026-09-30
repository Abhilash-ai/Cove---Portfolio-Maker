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
  Layers,
  Wand2,
  RefreshCw
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
    name: 'Executive Minimal',
    bg: '#FFFFFF',
    surface: '#F4F4F5',
    text: '#09090B',
    accent: '#0284C7',
    fontHeading: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
  },
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

  // Creation & AI Deck Generator Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalTab, setModalTab] = useState<'ai' | 'manual'>('ai');
  const [newDeckTitle, setNewDeckTitle] = useState('');

  // AI Generator Parameters
  const [aiTopic, setAiTopic] = useState('AI Cloud Infrastructure Series A Pitch');
  const [aiSlideCount, setAiSlideCount] = useState<number>(7);
  const [aiCustomCount, setAiCustomCount] = useState<string>('');
  const [aiAudience, setAiAudience] = useState('Venture Pitch');
  const [aiThemeName, setAiThemeName] = useState('Venture Pitch');
  const [aiTone, setAiTone] = useState('Authoritative & Strategic');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

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

  // AI Structured Slide Generation
  function generateStructuredSlides(topic: string, count: number, audience: string, tone: string): SlideData[] {
    const generated: SlideData[] = [];

    // Slide 1: Title
    generated.push({
      id: `slide-1`,
      layout: 'title',
      title: topic,
      subtitle: `${audience} • ${tone} Blueprint`,
    });

    if (count >= 2) {
      generated.push({
        id: `slide-2`,
        layout: 'headline-3col',
        title: 'Executive Problem Statement',
        subtitle: 'Critical bottlenecks and architectural inefficiencies in current industry workflows.',
        columns: [
          { title: 'Workflow Fragmentation', text: 'Teams manage disconnected SaaS applications resulting in data silos.' },
          { title: 'High Production Latency', text: 'Manual handoffs and unoptimized asset pipelines create multi-week delays.' },
          { title: 'Inconsistent Identity', text: 'Brand and portfolio narratives degrade across disparate delivery channels.' },
        ],
      });
    }

    if (count >= 3) {
      generated.push({
        id: `slide-3`,
        layout: 'headline-3col',
        title: 'The Proposed Solution Engine',
        subtitle: 'A unified platform delivering automated end-to-end execution.',
        columns: [
          { title: 'Unified Data Core', text: 'Centralized master identity automatically shared across web, 3D, and presentations.' },
          { title: 'Autonomous Generation', text: 'AI-assisted structured content creation with zero-loss schema guarantees.' },
          { title: 'Edge Cloud Delivery', text: 'Instant global edge deployment with sub-50ms cache-invalidated response times.' },
        ],
      });
    }

    if (count >= 4) {
      generated.push({
        id: `slide-4`,
        layout: 'big-metric',
        title: 'Core Performance & Growth Metrics',
        subtitle: 'Demonstrated operational leverage and efficiency multipliers.',
        metrics: [
          { value: '10x', label: 'Faster Time-to-Market' },
          { value: '68%', label: 'Reduction in Production Costs' },
          { value: '99.9%', label: 'Reliability Across Deployments' },
        ],
      });
    }

    if (count >= 5) {
      generated.push({
        id: `slide-5`,
        layout: 'bullets',
        title: 'Strategic Priorities & Roadmap',
        subtitle: 'Sequential milestones over the next four operating quarters.',
        bullets: [
          'Phase 1: Scale spatial 3D rendering pipeline across mobile viewports',
          'Phase 2: Expand enterprise governance, audit logging, and SSO identity federation',
          'Phase 3: Roll out autonomous multi-format export engines for native PPTX and PDF',
          'Phase 4: Launch partner ecosystem for verified industry credentials and plugins',
        ],
      });
    }

    if (count >= 6) {
      generated.push({
        id: `slide-6`,
        layout: 'quote',
        title: `The standard of execution established by this platform represents a fundamental paradigm shift in digital productivity.`,
        quoteAuthor: 'Executive Director of Technology',
        quoteRole: 'Leading Global Design Consortium',
      });
    }

    if (count >= 7) {
      generated.push({
        id: `slide-7`,
        layout: 'headline-3col',
        title: 'Business Model & Unit Economics',
        subtitle: 'High-margin SaaS architecture with compounding net revenue retention.',
        columns: [
          { title: 'Subscription Model', text: 'Predictable recurring enterprise licensing with tiered seat expansion.' },
          { title: 'Negative Churn', text: 'Organic account expansion driven by cross-department team adoption.' },
          { title: '84% Gross Margin', text: 'Optimized serverless edge compute keeping infrastructure costs low.' },
        ],
      });
    }

    // Dynamic backfill up to requested exact count
    for (let i = generated.length; i < count; i++) {
      const slideNum = i + 1;
      const layouts: SlideLayout[] = ['headline-3col', 'big-metric', 'bullets', 'quote'];
      const layout = layouts[i % layouts.length];

      if (layout === 'big-metric') {
        generated.push({
          id: `slide-${slideNum}`,
          layout,
          title: `Milestone ${slideNum}: Quantitative Scale`,
          subtitle: `Measurable targets aligned with ${audience.toLowerCase()} expectations.`,
          metrics: [
            { value: `$${slideNum * 1.5}M`, label: 'Projected ARR' },
            { value: `${slideNum * 25}%`, label: 'Efficiency Gain' },
            { value: `${slideNum * 10}k+`, label: 'Active Seats' },
          ],
        });
      } else if (layout === 'bullets') {
        generated.push({
          id: `slide-${slideNum}`,
          layout,
          title: `Milestone ${slideNum}: Operational Execution`,
          subtitle: `Key strategic deliverables scheduled for Phase ${slideNum}.`,
          bullets: [
            `Execution item Alpha: Deploy ${topic.toLowerCase()} core capabilities`,
            `Execution item Beta: Validate compliance and security protocols`,
            `Execution item Gamma: Integrate feedback loops with key stakeholders`,
            `Execution item Delta: Scale distribution and team training`,
          ],
        });
      } else {
        generated.push({
          id: `slide-${slideNum}`,
          layout: 'headline-3col',
          title: `Milestone ${slideNum}: Strategic Architecture`,
          subtitle: `In-depth structural breakdown of domain requirements.`,
          columns: [
            { title: 'Foundation', text: 'Robust architectural patterns ensuring long-term resilience.' },
            { title: 'Acceleration', text: 'Automated pipelines speeding up team delivery cycles.' },
            { title: 'Governance', text: 'Audited protocols maintaining rigorous quality control.' },
          ],
        });
      }
    }

    return generated;
  }

  // Handle AI Deck Creation
  async function handleAIGenerateDeck(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !aiTopic.trim()) return;

    const count = aiCustomCount ? parseInt(aiCustomCount, 10) || 7 : aiSlideCount;
    setIsGeneratingAI(true);

    try {
      const generatedSlides = generateStructuredSlides(aiTopic, count, aiAudience, aiTone);
      const chosenTheme = DECK_THEMES.find((t) => t.name === aiThemeName) || DECK_THEMES[0];
      const slug = `deck-${aiTopic.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;

      const res = await fetch('/api/v1/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: aiTopic,
          slug,
          workspaceType: 'deck',
          customTokens: {
            slides: generatedSlides,
            theme: chosenTheme,
          },
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        const created: PortfolioSummary = json.data.portfolio;
        setDecks([created, ...decks]);
        setActiveDeck(created);
        setSlides(generatedSlides);
        setActiveTheme(chosenTheme);
        setActiveSlideIndex(0);
        setShowCreateModal(false);
      }
    } catch (err) {
      console.error('Failed to generate AI deck:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  }

  // Create manual new deck
  async function handleCreateManualDeck(e: React.FormEvent) {
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

  // In-Deck AI Refinements
  function handleAIRefine(action: 'shorten' | 'metrics' | 'expand' | 'executive') {
    const s = slides[activeSlideIndex];
    if (!s) return;

    if (action === 'shorten') {
      updateActiveSlide({
        title: s.title.split(':').pop()?.trim().slice(0, 40) || s.title,
        subtitle: s.subtitle ? `${s.subtitle.split('.')[0]}.` : undefined,
      });
    } else if (action === 'metrics') {
      updateActiveSlide({
        layout: 'big-metric',
        metrics: [
          { value: '10x', label: 'Quantifiable Leverage' },
          { value: '99.9%', label: 'Operational Uptime' },
          { value: '<50ms', label: 'Execution Latency' },
        ],
      });
    } else if (action === 'expand') {
      updateActiveSlide({
        columns: [
          { title: 'Core Mechanics', text: 'Rigorous architectural discipline applied to domain primitives.' },
          { title: 'Telemetry & Validation', text: 'Continuous verification and automated regression feedback.' },
          { title: 'Ecosystem Scaling', text: 'Composable components enabling distributed team autonomy.' },
        ],
      });
    } else if (action === 'executive') {
      updateActiveSlide({
        title: `Strategic Horizon: ${s.title}`,
        subtitle: 'Enterprise governance and value realization framework.',
      });
    }
  }

  // Native PowerPoint (.pptx) Export
  async function handleExportPPTX() {
    try {
      setExporting(true);
      const pres = new pptxgen();
      pres.layout = 'LAYOUT_16x9';

      const hexClean = (h: string) => h.replace('#', '');
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
            h: 1.6,
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
                x: xPos + 0.3,
                y: 3.0,
                w: metricWidth - 0.6,
                h: 1.2,
                fontSize: 44,
                bold: true,
                color: accentHex,
              });
              slide.addText(m.label, {
                x: xPos + 0.3,
                y: 4.4,
                w: metricWidth - 0.6,
                h: 1.0,
                fontSize: 14,
                color: textHex,
              });
            });
          }
        } else if (s.layout === 'quote') {
          slide.addText(`"${s.title}"`, {
            x: 1.5,
            y: 2.2,
            w: 10.3,
            h: 2.5,
            fontSize: 26,
            italic: true,
            color: textHex,
            align: 'center',
          });
          if (s.quoteAuthor) {
            slide.addText(`— ${s.quoteAuthor} ${s.quoteRole ? `• ${s.quoteRole}` : ''}`, {
              x: 1.5,
              y: 4.8,
              w: 10.3,
              h: 0.8,
              fontSize: 16,
              bold: true,
              color: accentHex,
              align: 'center',
            });
          }
        } else {
          // Bullets
          slide.addText(s.title, {
            x: 0.8,
            y: 0.8,
            w: 11.5,
            h: 0.8,
            fontSize: 28,
            bold: true,
            color: textHex,
          });

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
    <div className="h-screen w-screen flex flex-col bg-[#FAFAF8] dark:bg-[#0A0A0C] text-zinc-900 dark:text-zinc-100 overflow-hidden select-none font-sans transition-colors duration-200">
      {/* 1. PPT Top Bar (Default Light Chrome) */}
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/90 px-4 flex items-center justify-between shrink-0 z-30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-xs">
                {activeDeck?.title || 'Presentation Studio'}
              </h2>
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                Slide {activeSlideIndex + 1} of {slides.length}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Deck Generator</span>
          </button>

          <button
            onClick={handleSaveDeck}
            disabled={saving}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            onClick={handleExportPPTX}
            disabled={exporting}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 transition flex items-center gap-1.5 disabled:opacity-50"
            title="Export native editable PowerPoint (.pptx)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting ? 'Generating...' : 'Download PPTX'}</span>
          </button>

          <button
            onClick={() => setIsPresenting(true)}
            className="px-4 py-1.5 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition flex items-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Present Mode</span>
          </button>
        </div>
      </header>

      {/* 2. Main Workspace Body: Thumbnails + Canvas + Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Slide Thumbnails (Default Light Chrome) */}
        <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 p-3 flex flex-col justify-between shrink-0 transition-colors">
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 px-1">
              <span>SLIDES ({slides.length})</span>
              <button
                onClick={() => addSlide('headline-3col')}
                className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-purple-600 dark:text-purple-400 transition"
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
                        ? 'border-purple-500 bg-purple-50/70 dark:bg-purple-950/20 shadow-md ring-1 ring-purple-500/50'
                        : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                      <span>#{idx + 1}</span>
                      <span className="uppercase">{s.layout}</span>
                    </div>

                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate">
                      {s.title || 'Untitled Slide'}
                    </p>

                    {/* Quick slide actions on hover */}
                    <div className="pt-2 mt-1 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSlide(idx, idx - 1);
                        }}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 disabled:opacity-30"
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
                        className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 disabled:opacity-30"
                        title="Move down"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateSlide(idx);
                        }}
                        className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500"
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
                        className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950/50 text-red-500 disabled:opacity-30"
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
            className="w-full py-2.5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 hover:border-purple-500/50 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-white flex items-center justify-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4 text-purple-500" />
            <span>Add Slide</span>
          </button>
        </aside>

        {/* Center: Live 16:9 Slide Canvas + In-Deck AI Refinement Bar */}
        <main className="flex-1 bg-zinc-100 dark:bg-zinc-900/50 p-4 sm:p-8 flex flex-col items-center justify-center overflow-auto transition-colors">
          {/* In-Deck AI Refinement Toolbar */}
          <div className="mb-3 flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1.5 shadow-sm text-xs">
            <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold px-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Refine:</span>
            </span>
            <button
              onClick={() => handleAIRefine('shorten')}
              className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition"
              title="Shorten and tighten copy"
            >
              Concise
            </button>
            <button
              onClick={() => handleAIRefine('metrics')}
              className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition"
              title="Add quantifiable data points"
            >
              + Metrics
            </button>
            <button
              onClick={() => handleAIRefine('expand')}
              className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition"
              title="Add supporting architectural points"
            >
              Expand
            </button>
            <button
              onClick={() => handleAIRefine('executive')}
              className="px-2.5 py-1 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition"
              title="Rephrase for board & executives"
            >
              Executive
            </button>
          </div>

          <div
            className="w-full max-w-5xl aspect-[16/9] rounded-2xl shadow-2xl border transition-all p-8 sm:p-14 flex flex-col justify-between relative overflow-hidden"
            style={{
              backgroundColor: currentSlide.bgColor || activeTheme.bg,
              borderColor: 'rgba(0, 0, 0, 0.08)',
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
                  placeholder="Supporting strategic context or audience tag..."
                  className="w-full bg-transparent text-center text-base sm:text-xl opacity-70 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-2 resize-none"
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
                    placeholder="Add supporting subtitle..."
                    className="w-full bg-transparent text-xs sm:text-sm opacity-60 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-1 mt-1"
                  />
                </div>

                {/* 3 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 items-stretch">
                  {(currentSlide.columns || [
                    { title: 'Point Alpha', text: 'Detailed observation or deliverable.' },
                    { title: 'Point Beta', text: 'Technical specification or outcome.' },
                    { title: 'Point Gamma', text: 'Market alignment or strategic impact.' },
                  ]).map((col, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-5 rounded-2xl border flex flex-col justify-between transition-all"
                      style={{
                        backgroundColor: activeTheme.surface,
                        borderColor: 'rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <input
                        type="text"
                        value={col.title}
                        onChange={(e) => {
                          const nextCols = [...(currentSlide.columns || [])];
                          nextCols[cIdx] = { ...col, title: e.target.value };
                          updateActiveSlide({ columns: nextCols });
                        }}
                        className="bg-transparent font-bold text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-purple-500 rounded p-1 mb-2"
                        style={{ color: activeTheme.accent }}
                      />
                      <textarea
                        rows={4}
                        value={col.text}
                        onChange={(e) => {
                          const nextCols = [...(currentSlide.columns || [])];
                          nextCols[cIdx] = { ...col, text: e.target.value };
                          updateActiveSlide({ columns: nextCols });
                        }}
                        className="bg-transparent text-xs sm:text-sm leading-relaxed opacity-80 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded p-1 flex-1 resize-none"
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
                  <input
                    type="text"
                    value={currentSlide.subtitle || ''}
                    onChange={(e) => updateActiveSlide({ subtitle: e.target.value })}
                    className="w-full bg-transparent text-xs sm:text-sm opacity-60 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-1 mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 items-center">
                  {(currentSlide.metrics || [
                    { value: '10x', label: 'Velocity' },
                    { value: '$1.2M', label: 'ARR' },
                    { value: '99%', label: 'Retention' },
                  ]).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-6 rounded-2xl border text-center space-y-2"
                      style={{
                        backgroundColor: activeTheme.surface,
                        borderColor: 'rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => {
                          const nextM = [...(currentSlide.metrics || [])];
                          nextM[mIdx] = { ...m, value: e.target.value };
                          updateActiveSlide({ metrics: nextM });
                        }}
                        className="bg-transparent font-black text-4xl sm:text-6xl text-center focus:outline-none focus:ring-1 focus:ring-purple-500 rounded p-1 w-full"
                        style={{ color: activeTheme.accent, fontFamily: activeTheme.fontHeading }}
                      />
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => {
                          const nextM = [...(currentSlide.metrics || [])];
                          nextM[mIdx] = { ...m, label: e.target.value };
                          updateActiveSlide({ metrics: nextM });
                        }}
                        className="bg-transparent text-xs sm:text-sm font-semibold opacity-70 text-center focus:outline-none focus:ring-1 focus:ring-purple-500 rounded p-1 w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : currentSlide.layout === 'quote' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
                <textarea
                  rows={3}
                  value={currentSlide.title}
                  onChange={(e) => updateActiveSlide({ title: e.target.value })}
                  className="w-full bg-transparent text-center text-2xl sm:text-4xl italic font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-2 resize-none"
                />
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={currentSlide.quoteAuthor || ''}
                    onChange={(e) => updateActiveSlide({ quoteAuthor: e.target.value })}
                    placeholder="Author Name"
                    className="bg-transparent text-sm sm:text-base font-bold text-center focus:outline-none focus:ring-1 focus:ring-purple-500 rounded p-1"
                    style={{ color: activeTheme.accent }}
                  />
                  <span className="opacity-40">•</span>
                  <input
                    type="text"
                    value={currentSlide.quoteRole || ''}
                    onChange={(e) => updateActiveSlide({ quoteRole: e.target.value })}
                    placeholder="Author Role / Company"
                    className="bg-transparent text-xs sm:text-sm opacity-60 text-center focus:outline-none focus:ring-1 focus:ring-purple-500 rounded p-1"
                  />
                </div>
              </div>
            ) : (
              // Bullets
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <input
                  type="text"
                  value={currentSlide.title}
                  onChange={(e) => updateActiveSlide({ title: e.target.value })}
                  className="w-full bg-transparent text-2xl sm:text-4xl font-extrabold tracking-tight focus:outline-none focus:ring-1 focus:ring-purple-500 rounded-lg p-1"
                  style={{ fontFamily: activeTheme.fontHeading }}
                />

                <div className="space-y-3 flex-1 pl-4">
                  {(currentSlide.bullets || ['Point Alpha', 'Point Beta', 'Point Gamma']).map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: activeTheme.accent }} />
                      <input
                        type="text"
                        value={b}
                        onChange={(e) => {
                          const nextB = [...(currentSlide.bullets || [])];
                          nextB[bIdx] = e.target.value;
                          updateActiveSlide({ bullets: nextB });
                        }}
                        className="bg-transparent text-base sm:text-xl opacity-90 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded p-1 w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide Footer */}
            <div className="pt-4 border-t border-zinc-500/20 flex items-center justify-between text-[11px] font-mono opacity-50">
              <span>{activeDeck?.title || 'Presentation'}</span>
              <span>
                {activeSlideIndex + 1} / {slides.length}
              </span>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Slide Inspector & Themes (Default Light Chrome) */}
        <aside className="w-72 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 p-4 space-y-6 shrink-0 overflow-y-auto transition-colors">
          {/* Layout Selector */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
              Slide Layout
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'title', label: 'Cover' },
                { id: 'headline-3col', label: '3 Columns' },
                { id: 'big-metric', label: 'Metrics' },
                { id: 'bullets', label: 'List' },
                { id: 'quote', label: 'Quote' },
              ].map((lay) => (
                <button
                  key={lay.id}
                  onClick={() => updateActiveSlide({ layout: lay.id as SlideLayout })}
                  className={`p-2 rounded-xl border text-center transition font-semibold ${
                    currentSlide.layout === lay.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-400 hover:border-zinc-300'
                  }`}
                >
                  {lay.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Presets */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
              Deck Theme
            </span>
            <div className="space-y-2">
              {DECK_THEMES.map((theme) => (
                <div
                  key={theme.name}
                  onClick={() => setActiveTheme(theme)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    activeTheme.name === theme.name
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-5 rounded-md border border-zinc-300 dark:border-zinc-700 shrink-0"
                      style={{ backgroundColor: theme.bg }}
                    />
                    <span className="text-xs font-semibold text-zinc-900 dark:text-white">{theme.name}</span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Fullscreen Present Mode */}
      {isPresenting && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 sm:p-12">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>{activeDeck?.title}</span>
            <button
              onClick={() => setIsPresenting(false)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white flex items-center gap-1.5"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Exit Present (ESC)</span>
            </button>
          </div>

          <div
            className="w-full max-w-6xl aspect-[16/9] mx-auto rounded-3xl p-10 sm:p-20 flex flex-col justify-between shadow-2xl my-auto"
            style={{
              backgroundColor: currentSlide.bgColor || activeTheme.bg,
              color: activeTheme.text,
              fontFamily: activeTheme.fontBody,
            }}
          >
            {currentSlide.layout === 'title' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                <h1 className="text-4xl sm:text-6xl font-black" style={{ fontFamily: activeTheme.fontHeading }}>
                  {currentSlide.title}
                </h1>
                {currentSlide.subtitle && <p className="text-xl sm:text-2xl opacity-75">{currentSlide.subtitle}</p>}
              </div>
            ) : currentSlide.layout === 'big-metric' ? (
              <div className="flex-1 flex flex-col justify-between space-y-8">
                <h2 className="text-3xl sm:text-5xl font-black" style={{ fontFamily: activeTheme.fontHeading }}>
                  {currentSlide.title}
                </h2>
                <div className="grid grid-cols-3 gap-8 my-auto">
                  {(currentSlide.metrics || []).map((m, idx) => (
                    <div key={idx} className="p-8 rounded-2xl text-center" style={{ backgroundColor: activeTheme.surface }}>
                      <div className="text-5xl sm:text-7xl font-black" style={{ color: activeTheme.accent }}>
                        {m.value}
                      </div>
                      <div className="text-sm font-semibold opacity-75 mt-2">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : currentSlide.layout === 'quote' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
                <blockquote className="text-3xl sm:text-5xl italic font-serif">"{currentSlide.title}"</blockquote>
                {currentSlide.quoteAuthor && (
                  <div className="text-lg font-bold" style={{ color: activeTheme.accent }}>
                    — {currentSlide.quoteAuthor} {currentSlide.quoteRole ? `• ${currentSlide.quoteRole}` : ''}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between space-y-8">
                <h2 className="text-3xl sm:text-5xl font-black" style={{ fontFamily: activeTheme.fontHeading }}>
                  {currentSlide.title}
                </h2>
                <div className="grid grid-cols-3 gap-8 flex-1 items-stretch">
                  {(currentSlide.columns || []).map((col, idx) => (
                    <div key={idx} className="p-6 rounded-2xl" style={{ backgroundColor: activeTheme.surface }}>
                      <h4 className="text-lg font-bold mb-2" style={{ color: activeTheme.accent }}>
                        {col.title}
                      </h4>
                      <p className="text-sm opacity-80 leading-relaxed">{col.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-zinc-500/20 flex items-center justify-between text-xs font-mono opacity-50">
              <span>{activeDeck?.title}</span>
              <span>
                {activeSlideIndex + 1} / {slides.length}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveSlideIndex((p) => Math.max(0, p - 1))}
              disabled={activeSlideIndex === 0}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="text-xs font-mono text-zinc-400">
              {activeSlideIndex + 1} / {slides.length}
            </span>
            <button
              onClick={() => setActiveSlideIndex((p) => Math.min(slides.length - 1, p + 1))}
              disabled={activeSlideIndex === slides.length - 1}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* 4. AI Deck Generator & New Deck Modal (Default Light) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-900 dark:text-white transition-colors">
            {/* Modal Tabs */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800 pb-3 justify-between items-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalTab('ai')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    modalTab === 'ai'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Generator</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('manual')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    modalTab === 'manual'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  Start from Scratch
                </button>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* AI Generator Form */}
            {modalTab === 'ai' ? (
              <form onSubmit={handleAIGenerateDeck} className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                    What is this presentation about?
                  </label>
                  <input
                    type="text"
                    required
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g. Series A Venture Pitch Deck or Clean Energy Architecture"
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Exact Slide Count Selector */}
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1.5">
                    Exact Slide Count
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[5, 7, 9, 11, 15, 22, 25].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => {
                          setAiSlideCount(cnt);
                          setAiCustomCount('');
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold transition ${
                          aiSlideCount === cnt && !aiCustomCount
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                        }`}
                      >
                        {cnt} Slides
                      </button>
                    ))}
                    <div className="flex items-center gap-1 pl-1">
                      <input
                        type="number"
                        min={1}
                        max={50}
                        placeholder="Custom"
                        value={aiCustomCount}
                        onChange={(e) => setAiCustomCount(e.target.value)}
                        className="w-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-2 py-1.5 text-xs text-center text-zinc-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Audience & Purpose */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                      Audience / Purpose
                    </label>
                    <select
                      value={aiAudience}
                      onChange={(e) => setAiAudience(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 text-zinc-900 dark:text-white"
                    >
                      <option value="Venture Pitch">Venture Pitch Deck</option>
                      <option value="Board Meeting">Board Review</option>
                      <option value="Technical Architecture">Technical Architecture</option>
                      <option value="Product Launch">Product Launch Keynote</option>
                      <option value="Case Study">Customer Case Study</option>
                      <option value="Academic Lecture">Academic Lecture</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                      Visual Style
                    </label>
                    <select
                      value={aiThemeName}
                      onChange={(e) => setAiThemeName(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 text-zinc-900 dark:text-white"
                    >
                      {DECK_THEMES.map((t) => (
                        <option key={t.name} value={t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tone */}
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                    Presentation Tone
                  </label>
                  <select
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 text-zinc-900 dark:text-white"
                  >
                    <option value="Authoritative & Strategic">Authoritative & Strategic</option>
                    <option value="Visionary & Inspiring">Visionary & Inspiring</option>
                    <option value="Data-Driven & Analytical">Data-Driven & Analytical</option>
                    <option value="Concise & Minimal">Concise & Minimal</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isGeneratingAI}
                    className="px-5 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-lg shadow-purple-600/20 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingAI ? 'Generating...' : `Generate ${aiCustomCount || aiSlideCount} Slides`}</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCreateManualDeck} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">
                    Deck Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Series A Venture Pitch"
                    value={newDeckTitle}
                    onChange={(e) => setNewDeckTitle(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-md shadow-purple-600/20"
                  >
                    Create Deck
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
