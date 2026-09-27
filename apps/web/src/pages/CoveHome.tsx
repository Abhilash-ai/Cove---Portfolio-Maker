import React, { useEffect, useState } from 'react';
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
  FolderPlus
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

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-2 sm:py-6">
      {/* 1. Command Center Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800/80 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B4A]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B4A]/10 border border-[#FF6B4A]/20 text-[#FF6B4A] text-xs font-mono font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AM STUDIO CREATIVE COMMAND CENTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-rose-400">{displayName}</span>.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-normal">
            Cove is your unified creative platform. Build your identity, showcase high-impact work in 3D, launch production websites, and deliver executive presentations — all from one place.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 border-t border-zinc-800/80 text-xs">
            <div className="flex items-center gap-2 text-zinc-400 font-mono">
              <Layers className="w-4 h-4 text-[#FF6B4A]" />
              <span>
                <strong className="text-white text-sm font-semibold">{items.length}</strong> Total Works
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white text-sm font-semibold">{publishedCount}</strong> Published Live
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 font-mono">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>
                <strong className="text-white text-sm font-semibold">4</strong> Workspaces Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "What do you want to create?" Primary Workspaces Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              What do you want to create?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Select a dedicated creative workspace to start building.
            </p>
          </div>
          <button
            onClick={onOpenResumeUpload}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition shadow-soft"
          >
            <FileText className="w-4 h-4 text-[#FF6B4A]" />
            <span>Import Resume to Autofill</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Profile */}
          <div
            onClick={() => onNavigateTab('profile')}
            className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center transition-transform group-hover:scale-110">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-500 font-semibold">
                  Identity Layer
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-blue-500 transition-colors">
                  Profile
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Build your verified professional identity, credentials, career history, and skills. Automatically shared across all workspaces.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-blue-500">
              <span>Manage Identity</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Portfolio */}
          <div
            onClick={() => onNavigateTab('portfolio')}
            className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#FF6B4A]/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center transition-transform group-hover:scale-110">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF6B4A] font-semibold">
                    Work & Career
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {portfolioCount} Projects
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-[#FF6B4A] transition-colors">
                  Portfolio
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Curate case studies, visual projects, and experience in responsive 2D and genuine 3D archetypes with one-click publishing.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-[#FF6B4A]">
              <span>Open Portfolios</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Website */}
          <div
            onClick={() => onNavigateTab('website')}
            className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center transition-transform group-hover:scale-110">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-semibold">
                    Multi-Section
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {websiteCount} Sites
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-emerald-500 transition-colors">
                  Website
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Build multi-section websites for SaaS, studios, agencies, restaurants, and events with navbars, pricing tiers, FAQs, and forms.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-500">
              <span>Open Websites</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: PPT */}
          <div
            onClick={() => onNavigateTab('deck')}
            className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center transition-transform group-hover:scale-110">
                <Presentation className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-500 font-semibold">
                    Slides & Decks
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {deckCount} Decks
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-purple-500 transition-colors">
                  PPT Slides
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Design pitch decks, keynotes, and academic slides with live editing, interactive fullscreen presentation mode, and editable PPTX export.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-purple-500">
              <span>Open Presentations</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Actions Bar */}
      <section className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
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
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition flex items-center gap-1.5"
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
