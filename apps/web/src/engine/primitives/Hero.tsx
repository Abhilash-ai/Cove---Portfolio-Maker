import React from 'react';
import { ThemeTokens, FullProfileDto, PortfolioSummary } from '@cove/shared';
import { MagneticButton } from '../interactions/MagneticButton.js';
import { TiltCard } from '../interactions/TiltCard.js';
import { ScrollReveal } from '../interactions/ScrollReveal.js';

export type HeroVariant = 'centered' | 'split' | 'fullscreen-image' | 'minimal-text';

interface Props {
  variant?: HeroVariant;
  profile: FullProfileDto | null;
  portfolio: PortfolioSummary;
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
  onContactClick?: () => void;
}

export function Hero({
  variant = 'centered',
  profile,
  portfolio,
  tokens,
  forcedTouchMode = false,
  onContactClick
}: Props) {
  const displayName = profile?.name || 'Anonymous Creator';
  const headline = profile?.headline || 'Spatial Designer & Architect';
  const bio = profile?.bio || 'Designing enduring spaces, systems, and structures at the intersection of human scale and digital precision.';
  const location = profile?.location || 'Stockholm, Sweden';
  const available = profile?.availableForWork ?? true;

  // 1. SPLIT VARIANT
  if (variant === 'split') {
    return (
      <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border"
                style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.badgeBg, color: tokens.colors.badgeText }}
              >
                <span className={`w-2 h-2 rounded-full ${available ? 'bg-emerald-400' : 'bg-zinc-500'} animate-pulse`} />
                {available ? 'Available for commissions' : 'Currently booked'} • {location}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1
                style={{
                  fontFamily: tokens.typography.fontHeading,
                  fontSize: tokens.typography.display.size,
                  lineHeight: tokens.typography.display.lineHeight,
                  letterSpacing: tokens.typography.display.tracking,
                  color: tokens.colors.textPrimary
                }}
              >
                {displayName}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                style={{
                  fontFamily: tokens.typography.fontBody,
                  fontSize: tokens.typography.h3.size,
                  color: tokens.colors.textSecondary,
                  lineHeight: '1.4'
                }}
              >
                {headline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p
                style={{
                  fontFamily: tokens.typography.fontBody,
                  fontSize: tokens.typography.body.size,
                  color: tokens.colors.textMuted,
                  lineHeight: tokens.typography.body.lineHeight,
                  maxWidth: '540px'
                }}
              >
                {bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <MagneticButton
                  forcedTouchMode={forcedTouchMode}
                  onClick={onContactClick}
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition shadow-lg"
                  style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
                >
                  Get In Touch
                </MagneticButton>
                <a
                  href="#work"
                  className="px-5 py-3 rounded-full text-xs font-mono transition border hover:bg-white/5"
                  style={{ borderColor: tokens.colors.border, color: tokens.colors.textPrimary }}
                >
                  View Selected Work ↓
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.3}>
              <TiltCard forcedTouchMode={forcedTouchMode} maxTilt={6} className="rounded-2xl border p-2"
                style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.surface }}
              >
                <div className="h-96 w-full rounded-xl bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-950 overflow-hidden relative flex items-center justify-center">
                  {profile?.photoUrl ? (
                    <img src={profile.photoUrl} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono text-xl"
                        style={{ color: tokens.colors.accent }}
                      >
                        {displayName.charAt(0)}
                      </div>
                      <p className="font-mono text-xs text-zinc-400">{portfolio.title}</p>
                      <p className="text-[10px] text-zinc-500">Curated Work Archive</p>
                    </div>
                  )}
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    );
  }

  // 2. FULLSCREEN-IMAGE VARIANT
  if (variant === 'fullscreen-image') {
    return (
      <section className="relative min-h-[85vh] flex flex-col justify-between p-8 sm:p-12 overflow-hidden border-b"
        style={{ borderColor: tokens.colors.border }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/95 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center filter saturate-50 brightness-75 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')` }}
        />

        <div className="relative z-20 max-w-7xl mx-auto w-full pt-12">
          <span className="inline-block font-mono text-xs uppercase px-3 py-1 rounded-full border backdrop-blur-md mb-6"
            style={{ borderColor: tokens.colors.border, backgroundColor: 'rgba(0,0,0,0.5)', color: tokens.colors.textPrimary }}
          >
            Portfolio • {portfolio.title}
          </span>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full pb-8">
          <h1
            className="mb-4"
            style={{
              fontFamily: tokens.typography.fontHeading,
              fontSize: tokens.typography.display.size,
              lineHeight: tokens.typography.display.lineHeight,
              color: tokens.colors.textPrimary
            }}
          >
            {displayName}
          </h1>
          <p
            className="text-lg max-w-2xl mb-8"
            style={{ fontFamily: tokens.typography.fontBody, color: tokens.colors.textSecondary }}
          >
            {headline} — {bio}
          </p>

          <div className="flex items-center gap-4">
            <MagneticButton
              forcedTouchMode={forcedTouchMode}
              onClick={onContactClick}
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition"
              style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
            >
              Start A Conversation
            </MagneticButton>
            <a
              href="#work"
              className="px-5 py-3 rounded-full text-xs font-mono text-white/80 border border-white/20 hover:bg-white/10 transition"
            >
              Explore Archive ↓
            </a>
          </div>
        </div>
      </section>
    );
  }

  // 3. MINIMAL-TEXT VARIANT
  if (variant === 'minimal-text') {
    return (
      <section className="py-24 px-6 max-w-7xl mx-auto border-b"
        style={{ borderColor: tokens.colors.border }}
      >
        <div className="max-w-4xl space-y-8">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            {location} • {available ? 'Open to Select Projects' : 'Booked'}
          </div>

          <h1
            style={{
              fontFamily: tokens.typography.fontHeading,
              fontSize: tokens.typography.display.size,
              lineHeight: '1.05',
              letterSpacing: '-0.04em',
              color: tokens.colors.textPrimary
            }}
          >
            {displayName} is an architect & designer crafting thoughtful digital and physical environments.
          </h1>

          <p
            className="text-base leading-relaxed"
            style={{ fontFamily: tokens.typography.fontBody, color: tokens.colors.textSecondary }}
          >
            {bio}
          </p>

          <div className="pt-4 flex items-center gap-4">
            <MagneticButton
              forcedTouchMode={forcedTouchMode}
              onClick={onContactClick}
              className="px-6 py-3 rounded-md text-xs font-mono font-medium transition"
              style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
            >
              Contact →
            </MagneticButton>
          </div>
        </div>
      </section>
    );
  }

  // 4. CENTERED VARIANT (Default)
  return (
    <section className="py-28 px-6 text-center max-w-4xl mx-auto relative overflow-hidden">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border mb-6"
          style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.badgeBg, color: tokens.colors.badgeText }}
        >
          <span className={`w-2 h-2 rounded-full ${available ? 'bg-emerald-400' : 'bg-zinc-500'} animate-pulse`} />
          {available ? 'Available for work' : 'In studio'} • {location}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h1
          className="mb-4"
          style={{
            fontFamily: tokens.typography.fontHeading,
            fontSize: tokens.typography.display.size,
            lineHeight: tokens.typography.display.lineHeight,
            letterSpacing: tokens.typography.display.tracking,
            color: tokens.colors.textPrimary
          }}
        >
          {displayName}
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p
          className="text-lg md:text-xl font-normal max-w-2xl mx-auto mb-6"
          style={{ fontFamily: tokens.typography.fontBody, color: tokens.colors.textSecondary }}
        >
          {headline}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <p
          className="text-sm max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ fontFamily: tokens.typography.fontBody, color: tokens.colors.textMuted }}
        >
          {bio}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <div className="flex items-center justify-center gap-4">
          <MagneticButton
            forcedTouchMode={forcedTouchMode}
            onClick={onContactClick}
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition shadow-lg"
            style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
          >
            Get In Touch
          </MagneticButton>
          <a
            href="#work"
            className="px-5 py-3 rounded-full text-xs font-mono transition border hover:bg-white/5"
            style={{ borderColor: tokens.colors.border, color: tokens.colors.textPrimary }}
          >
            View Projects ↓
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
