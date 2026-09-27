import React, { useState } from 'react';
import { Presentation, Sparkles, Layers, Box, BarChart3, ArrowRight, CheckCircle2, MonitorPlay } from 'lucide-react';

export function PresentationWorkspace() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const previewDecks = [
    {
      id: 'keynote-3d',
      title: 'Spatial Keynote 3D',
      category: 'Stage & Keynotes',
      description: 'Cinema-grade 3D transitions with interactive object pedestals and depth-aware camera moves.',
      slides: 14,
      gradient: 'from-orange-500/20 via-rose-500/10 to-transparent',
      borderColor: 'border-orange-500/30',
      icon: Box,
    },
    {
      id: 'investor-pitch',
      title: 'Venture Pitch System',
      category: 'Fundraising',
      description: 'Investor-ready typography, milestone timelines, traction graphs, and embedded live demos.',
      slides: 18,
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      icon: Layers,
    },
    {
      id: 'metrics-deck',
      title: 'Data & Growth Matrix',
      category: 'Analytics & Reporting',
      description: 'Live interactive metric cards, financial run-rate models, and animated cohort charts.',
      slides: 12,
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      icon: BarChart3,
    },
    {
      id: 'product-launch',
      title: 'Product Launch Keynote',
      category: 'Go-To-Market',
      description: 'High-contrast typography with dynamic feature walkthroughs and device mockups.',
      slides: 16,
      gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
      borderColor: 'border-purple-500/30',
      icon: MonitorPlay,
    },
  ];

  function handleJoinWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!waitlistEmail) return;
    setJoined(true);
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* 1. Header Section */}
      <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-soft transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF6B4A]/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF6B4A]/10 text-[#FF6B4A] border border-[#FF6B4A]/20">
              <Presentation className="w-3.5 h-3.5" />
              <span>PPT Workspace</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Coming Soon
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Create presentations that communicate.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            We are engineering a presentation workspace designed for modern creators — interactive 3D slides, live web embeds, and fluid spatial transitions without legacy slide-deck clutter.
          </p>

          {/* Waitlist / Early Access Form */}
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            {joined ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>You're on the early access list! We'll notify you as soon as the PPT editor opens.</span>
              </div>
            ) : (
              <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter email for early access..."
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#FF6B4A] hover:bg-[#F04E27] text-white text-xs font-semibold rounded-xl transition shadow-soft flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. Deck Archetypes In Progress Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <span>Deck Archetypes in Development</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                {previewDecks.length} Archetypes
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              These native presentation archetypes are currently being built to work seamlessly with Cove's 3D engine.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previewDecks.map((deck) => {
            const Icon = deck.icon;
            return (
              <div
                key={deck.id}
                className={`p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:${deck.borderColor} transition-all duration-200 shadow-soft group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${deck.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {deck.category}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {deck.slides} Slides
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-[#FF6B4A] shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-[#FF6B4A] transition-colors">
                          {deck.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                          {deck.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-mono text-[11px]">Engine Status: Staging</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-zinc-500 group-hover:text-[#FF6B4A] transition-colors">
                      <span>Preview Spec</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
