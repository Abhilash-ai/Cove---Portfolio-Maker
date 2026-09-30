import React, { useEffect, useState, useRef } from 'react';
import {
  Sparkles,
  User,
  Briefcase,
  Globe,
  Presentation,
  Plus,
  ArrowRight,
  ExternalLink,
  Eye,
  FileText,
  Clock,
  Layers,
  CheckCircle2,
  TrendingUp,
  FolderPlus,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { PortfolioSummary } from '@cove/shared';

interface Props {
  token: string;
  userName?: string;
  userEmail: string;
  onNavigateTab: (tab: 'profile' | 'portfolio' | 'website' | 'deck') => void;
  onOpenEditor: (item: PortfolioSummary) => void;
  onOpenResumeUpload: () => void;
  onCreateNewItem: (workspaceType: 'portfolio' | 'website' | 'deck') => void;
}

export function CoveHome({
  token,
  userName,
  userEmail,
  onNavigateTab,
  onOpenEditor,
  onOpenResumeUpload,
  onCreateNewItem
}: Props) {
  const [items, setItems] = useState<PortfolioSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Card 2 (Portfolio): 3D Cursor Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHoveringPortfolio, setIsHoveringPortfolio] = useState(false);

  // Card 3 (Website): Interactive Multi-Section Scroll Position
  const [isHoveringWebsite, setIsHoveringWebsite] = useState(false);

  // Card 4 (PPT): Interactive Cycling 16:9 Slides State
  const [activeSlide, setActiveSlide] = useState(0);

  const pptSlides = [
    {
      type: 'Title',
      title: 'Executive Strategic Vision 2026',
      sub: 'AM Studio Flagship Architecture & Scalability',
      badge: 'SLIDE 1: COVER',
      accent: '#8B5CF6'
    },
    {
      type: 'Metrics',
      title: 'Global Growth & Traction',
      sub: 'Key performance indicators across enterprise cohorts',
      metric: '10x',
      metricLabel: 'YoY Production Efficiency',
      badge: 'SLIDE 2: METRICS',
      accent: '#EC4899'
    },
    {
      type: 'Columns',
      title: 'Three Pillars of Execution',
      cols: ['1. Unified Identity', '2. Spatial 3D Engine', '3. Multi-Format Output'],
      badge: 'SLIDE 3: STRATEGY',
      accent: '#3B82F6'
    }
  ];

  // Auto-cycle PPT slide every 3 seconds if not actively interacting
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % pptSlides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [pptSlides.length]);

  useEffect(() => {
    async function loadRecent() {
      try {
        setLoading(true);
        const res = await fetch('/api/v1/portfolios/mine', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setItems(json.data.portfolios || []);
        }
      } catch (err) {
        console.error('Failed to load recent work:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRecent();
  }, [token]);

  const displayName = userName || userEmail.split('@')[0];
  const portfolioCount = items.filter((i) => i.workspaceType === 'portfolio' || !i.workspaceType).length;
  const websiteCount = items.filter((i) => i.workspaceType === 'website').length;
  const deckCount = items.filter((i) => i.workspaceType === 'deck').length;
  const publishedCount = items.filter((i) => i.status === 'published').length;

  // Handle Portfolio Tilt on Mouse Move
  function handlePortfolioMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -14;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 14;
    setTilt({ x: rotateX, y: rotateY });
  }

  function handlePortfolioMouseLeave() {
    setIsHoveringPortfolio(false);
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-2 sm:py-6">
      {/* 1. Command Center Header (Default Light Studio Chrome) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 dark:from-zinc-900 dark:via-zinc-950 dark:to-black border border-zinc-200/90 dark:border-zinc-800 p-8 sm:p-12 shadow-sm transition-colors duration-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B4A]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B4A]/10 border border-[#FF6B4A]/20 text-[#FF6B4A] text-xs font-mono font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AM STUDIO CREATIVE COMMAND CENTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-rose-500">{displayName}</span>.
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
            Cove is your unified creative platform. Build your identity, showcase high-impact work in 3D, launch production websites, and deliver executive presentations — all from one place.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 border-t border-zinc-200 dark:border-zinc-800/80 text-xs">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-mono">
              <Layers className="w-4 h-4 text-[#FF6B4A]" />
              <span>
                <strong className="text-zinc-900 dark:text-white text-sm font-semibold">{items.length}</strong> Total Works
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>
                <strong className="text-zinc-900 dark:text-white text-sm font-semibold">{publishedCount}</strong> Published Live
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-mono">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              <span>
                <strong className="text-zinc-900 dark:text-white text-sm font-semibold">4</strong> Workspaces Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Creative Command Center Workspaces (Alive Hover States & Live Miniature Previews) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              What do you want to create?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Interactive creative workspaces with zero content loss and one-click publishing.
            </p>
          </div>
          <button
            onClick={onOpenResumeUpload}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#FF6B4A]" />
            <span>Import Resume to Autofill</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Profile (Identity Layer with Alive Interactive Credentials & Skills) */}
          <div
            onClick={() => onNavigateTab('profile')}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Synced</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-500 font-semibold">
                  Identity Layer
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5 group-hover:text-blue-500 transition-colors">
                  Profile
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Master identity, verified credentials, career history, and skills automatically shared across all projects.
                </p>
              </div>

              {/* Alive Miniature Interactive Identity Preview */}
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2.5 transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{displayName}</p>
                    <p className="text-[10px] text-zinc-500 font-mono truncate">{userEmail}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[9px] font-mono font-medium border border-blue-200/50 dark:border-blue-900/40">
                    Design Systems
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-mono font-medium border border-indigo-200/50 dark:border-indigo-900/40">
                    Spatial Tech
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[9px] font-mono">
                    +AI Sync
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-blue-500">
              <span>Manage Identity</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Portfolio (Alive Cursor-Reactive 3D Tilt Miniature Preview) */}
          <div
            onClick={() => onNavigateTab('portfolio')}
            onMouseEnter={() => setIsHoveringPortfolio(true)}
            onMouseMove={handlePortfolioMouseMove}
            onMouseLeave={handlePortfolioMouseLeave}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#FF6B4A] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center transition-transform group-hover:scale-110">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {portfolioCount} Works
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF6B4A] font-semibold">
                  Work & Career
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5 group-hover:text-[#FF6B4A] transition-colors">
                  Portfolio
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Curate case studies, visual projects, and experience in responsive 2D and genuine 3D archetypes with one-click publishing.
                </p>
              </div>

              {/* Alive Interactive 3D Perspective Tilt Mini Stage */}
              <div
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 transition-transform duration-150 ease-out"
                style={{
                  perspective: '600px',
                }}
              >
                <div
                  className="space-y-2 transition-transform duration-100"
                  style={{
                    transform: isHoveringPortfolio
                      ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                      : 'rotateX(0deg) rotateY(0deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
                      <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">Spatial Monolith 3D</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#FF6B4A] font-semibold">250+ Archetypes</span>
                  </div>
                  <div className="h-10 rounded-lg bg-gradient-to-r from-orange-400/20 via-[#FF6B4A]/20 to-rose-400/20 border border-[#FF6B4A]/30 flex items-center justify-center text-[10px] font-mono text-[#FF6B4A]">
                    {isHoveringPortfolio ? '✦ Reactive 3D Active' : 'Hover to Experience 3D Tilt'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-[#FF6B4A]">
              <span>Open Portfolios</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Website (Alive Multi-Section Mini Browser Viewport) */}
          <div
            onClick={() => onNavigateTab('website')}
            onMouseEnter={() => setIsHoveringWebsite(true)}
            onMouseLeave={() => setIsHoveringWebsite(false)}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {websiteCount} Sites
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-semibold">
                  Multi-Section
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5 group-hover:text-emerald-500 transition-colors">
                  Website
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Build multi-section websites for SaaS, studios, agencies, restaurants, and events with navbars, pricing tiers, FAQs, and forms.
                </p>
              </div>

              {/* Alive Miniature Interactive Multi-Section Browser Mock */}
              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-inner">
                {/* Mini Browser Bar */}
                <div className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">cove.site/preview</span>
                  <div className="w-2" />
                </div>
                {/* Mini Scrolling Sections */}
                <div className="h-16 overflow-hidden relative p-2">
                  <div
                    className="space-y-1.5 transition-transform duration-700 ease-in-out"
                    style={{
                      transform: isHoveringWebsite ? 'translateY(-34px)' : 'translateY(0px)',
                    }}
                  >
                    <div className="p-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[9px] font-semibold text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                      <span>Hero & 3D Canvas</span>
                      <span className="text-emerald-500 font-mono">Live</span>
                    </div>
                    <div className="p-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[9px] font-semibold text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                      <span>Feature Matrix</span>
                      <span className="text-zinc-400 font-mono">Grid</span>
                    </div>
                    <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[9px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                      <span>Pricing & Checkout</span>
                      <span className="text-emerald-500 font-mono">$0 - $49</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-500">
              <span>Open Websites</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: PPT (Alive Cycling 16:9 Presentation Studio) */}
          <div
            onClick={() => onNavigateTab('deck')}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Presentation className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {deckCount} Decks
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-500 font-semibold">
                  Slides & Decks
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5 group-hover:text-purple-500 transition-colors">
                  PPT Slides
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Design pitch decks, keynotes, and academic slides with live editing, interactive fullscreen presentation mode, and editable PPTX export.
                </p>
              </div>

              {/* Alive Interactive 16:9 Slide Frame */}
              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-2.5 text-zinc-100 relative overflow-hidden aspect-video flex flex-col justify-between shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {pptSlides[activeSlide].badge}
                  </span>
                  <div className="flex items-center gap-1">
                    {pptSlides.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === activeSlide ? 'bg-purple-400 scale-125' : 'bg-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="my-auto py-1">
                  <p className="text-[11px] font-black text-white truncate leading-tight">
                    {pptSlides[activeSlide].title}
                  </p>
                  {pptSlides[activeSlide].sub && (
                    <p className="text-[9px] text-zinc-400 truncate mt-0.5">
                      {pptSlides[activeSlide].sub}
                    </p>
                  )}
                  {pptSlides[activeSlide].metric && (
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-sm font-black text-purple-400">{pptSlides[activeSlide].metric}</span>
                      <span className="text-[8px] text-zinc-400">{pptSlides[activeSlide].metricLabel}</span>
                    </div>
                  )}
                  {pptSlides[activeSlide].cols && (
                    <div className="grid grid-cols-3 gap-1 mt-1 text-[8px] text-zinc-300">
                      {pptSlides[activeSlide].cols.map((col, i) => (
                        <div key={i} className="p-0.5 bg-zinc-900 rounded border border-zinc-800 truncate text-center">
                          {col}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[8px] text-zinc-500 font-mono pt-1 border-t border-zinc-800">
                  <span>16:9 Presentation Studio</span>
                  <span>.pptx Export</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-purple-500">
              <span>Open Presentations</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Actions Bar */}
      <section className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
            Quick Actions
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Spin up a new creative canvas with custom URL slug in seconds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onCreateNewItem('portfolio')}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#FF6B4A] hover:bg-[#F04E27] text-white shadow-soft transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Portfolio</span>
          </button>
          <button
            onClick={() => onCreateNewItem('website')}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Website</span>
          </button>
          <button
            onClick={() => onCreateNewItem('deck')}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-soft transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Presentation</span>
          </button>
          <button
            onClick={onOpenResumeUpload}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Upload Resume</span>
          </button>
        </div>
      </section>

      {/* 4. Recent Works & Drafts Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Recent Works & Drafts
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-mono">
              {items.length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-zinc-400 bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            Loading recent creative works...
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center space-y-3 bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
              <FolderPlus className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
              No works created yet
            </h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Start by importing your resume or creating your first portfolio or website canvas above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => {
              const typeBadge =
                item.workspaceType === 'website'
                  ? { label: '🌐 Website', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' }
                  : item.workspaceType === 'deck'
                  ? { label: '📊 PPT Deck', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' }
                  : { label: '✨ Portfolio', color: 'bg-[#FF6B4A]/10 text-[#FF6B4A] border-[#FF6B4A]/20' };

              const publicUrl = item.workspaceType === 'website' ? `/w/${item.slug}` : `/p/${item.slug}`;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-soft transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 text-[10px] font-mono font-medium rounded-full border ${typeBadge.color}`}>
                        {typeBadge.label}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                          item.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                      {item.title}
                    </h4>

                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      slug: <span className="text-[#FF6B4A]">/{item.slug}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenEditor(item)}
                      className="flex-1 py-1.5 px-3 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#FF6B4A] to-rose-500 hover:from-[#F04E27] hover:to-rose-600 text-white shadow-soft transition text-center"
                    >
                      Open Editor
                    </button>

                    {item.status === 'published' && (
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                        title="View Live Public Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
