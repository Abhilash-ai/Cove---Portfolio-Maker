import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, ArrowRight, Layout, Globe, Presentation, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { CoveLogo } from '../assets/CoveLogo.js';
import { ThemeToggle } from '../components/common/ThemeToggle.js';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  // Staggered entrance variants for hero
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const featureCards = [
    {
      icon: Layout,
      tag: 'Core Experience',
      title: 'Portfolio Maker',
      description:
        'Craft stunning case studies with modular project timelines, masonry galleries, and adaptive typography. Highlight your role, process, and measurable impact.',
      highlight: 'Interactive layouts & visual editor',
      badge: 'Live',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      icon: Globe,
      tag: 'Personal Hub',
      title: 'Personal Website',
      description:
        'Instant public link with custom slug publishing, zero hosting setup, responsive mobile optimization, and automatic SEO tags so recruiters discover you.',
      highlight: 'Resume AI parser & instant slug',
      badge: 'Live',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      icon: Presentation,
      tag: 'Next Up',
      title: 'Interactive Deck',
      description:
        'Turn your case studies into cinematic presentation decks. Built-in speaker notes, slide transitions, and one-click PDF export for critiques and interviews.',
      highlight: 'Pitch deck mode & PDF export',
      badge: 'Coming Soon',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0C] text-[#1A1A1A] dark:text-[#F4F4F6] flex flex-col selection:bg-[#FF6B4A] selection:text-white transition-colors duration-200 overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAFAF8]/90 dark:bg-[#0A0A0C]/90 border-b border-[#E5E5E0] dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CoveLogo size="md" />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <button
              onClick={onSignIn}
              className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-[#FF6B4A] hover:bg-[#F04E27] px-4 py-2 rounded-xl shadow-soft hover:shadow-coral transition-all duration-200 active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[450px] bg-gradient-to-tr from-[#FF6B4A]/15 to-violet-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Audience Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FF6B4A]/10 text-[#FF6B4A] border border-[#FF6B4A]/25">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B4A]" />
                <span>Crafted for students & emerging creators</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.08]"
            >
              Build your portfolio, website, or deck —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] via-[#FF886E] to-[#F04E27]">
                no code needed.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal"
            >
              Designed for students in design, engineering, business, and arts.
              Turn coursework, projects, and your resume into a stunning live showcase that gets you hired.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF6B4A] hover:bg-[#F04E27] text-white font-semibold text-sm sm:text-base shadow-coral hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSignIn}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm sm:text-base hover:bg-zinc-50 dark:hover:bg-zinc-850 shadow-soft transition-all duration-200"
              >
                <span>Sign In to Existing Account</span>
              </button>
            </motion.div>

            {/* Social Proof Badges */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FF6B4A]" />
                <span>Publish in under 2 minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>Custom slug & responsive by default</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Showcase Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 sm:mt-18 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-zinc-200/80 to-zinc-300/40 dark:from-zinc-800/80 dark:to-zinc-900/40 shadow-soft-lg">
              <div className="rounded-xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl">
                {/* Browser bar */}
                <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <div className="px-4 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-xs">
                    cove.design/p/alex-rivera
                  </div>
                  <div className="w-10" />
                </div>

                {/* Simulated Portfolio Surface */}
                <div className="p-6 sm:p-10 bg-[#FAFAF8] dark:bg-[#0A0A0C]">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                      <div>
                        <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold mb-1">
                          Available for Fall 2026 roles
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                          Alex Rivera
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                          Product Designer & Creative Technologist
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FF6B4A] text-white">
                        Get in Touch
                      </span>
                    </div>

                    {/* Preview Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="h-28 rounded-lg bg-gradient-to-br from-[#FF6B4A]/20 via-orange-100 to-amber-100 dark:from-[#FF6B4A]/20 dark:to-zinc-800 mb-3 flex items-center justify-center">
                          <span className="text-xs font-mono text-[#FF6B4A] font-semibold">
                            Autonomous Drone Telemetry UI
                          </span>
                        </div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-white">AeroSense 2.0</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                          Hardware dashboard designed for field robotics engineers.
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="h-28 rounded-lg bg-gradient-to-br from-violet-500/20 via-indigo-100 to-blue-100 dark:from-violet-500/20 dark:to-zinc-800 mb-3 flex items-center justify-center">
                          <span className="text-xs font-mono text-indigo-500 font-semibold">
                            Biometric Health Assistant
                          </span>
                        </div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-white">PulseFlow Mobile</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                          Real-time heart rate analysis and recovery metrics app.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Scroll-Reveal Feature Section (Below the Fold) */}
        <section className="py-20 sm:py-28 bg-white dark:bg-zinc-900/60 border-t border-[#E5E5E0] dark:border-zinc-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xs font-bold font-mono tracking-wider uppercase text-[#FF6B4A]">
                  Built for Every Stage
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-2 tracking-tight">
                  One platform. Three essential formats.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                  From university applications to executive interviews, Cove adapts to how you present your story.
                </p>
              </motion.div>
            </div>

            {/* 3 Feature Cards animating on scroll */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {featureCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 hover:border-[#FF6B4A]/50 transition-all duration-300 shadow-soft hover:shadow-soft-lg group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                          {card.badge}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {card.tag}
                      </span>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-1 mb-2.5">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-semibold text-[#FF6B4A]">
                      <span>{card.highlight}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ready to Launch Banner */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#FF6B4A] to-[#F04E27] text-white shadow-coral relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Ready to stand out to employers?
              </h2>
              <p className="text-xs sm:text-base text-white/90 leading-relaxed">
                Join students and graduates using Cove to showcase their skills with pride. Free to use.
              </p>
              <div className="pt-2">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-3.5 rounded-xl bg-white text-[#FF6B4A] hover:bg-zinc-100 font-bold text-sm sm:text-base shadow-lg transition-transform active:scale-95"
                >
                  Create Your Showcase Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-[#E5E5E0] dark:border-zinc-800 bg-[#FAFAF8] dark:bg-[#0A0A0C] py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <CoveLogo size="sm" showWordmark={false} />
            <span>Cove — by AM Studio</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onSignIn} className="hover:text-zinc-800 dark:hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={onGetStarted} className="hover:text-zinc-800 dark:hover:text-white transition-colors">
              Get Started
            </button>
            <span className="text-zinc-400 dark:text-zinc-600">•</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
