import React from 'react';
import { ThemeTokens, FullProfileDto, PortfolioSummary } from '@cove/shared';
import { MagneticButton } from '../interactions/MagneticButton.js';
import { TiltCard } from '../interactions/TiltCard.js';
import { ScrollReveal } from '../interactions/ScrollReveal.js';
import { HeroVariant } from '../templates/templateTypes.js';

export type { HeroVariant };

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
  const headline = profile?.headline || 'Spatial Designer & Computational Architect';
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
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border"
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
              <TiltCard
                forcedTouchMode={forcedTouchMode}
                maxTilt={6}
                className="rounded-2xl border p-2"
                style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.surface }}
              >
                <div className="h-96 w-full rounded-xl bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-950 overflow-hidden relative flex items-center justify-center">
                  {profile?.photoUrl ? (
                    <img src={profile.photoUrl} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <div
                        className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono text-xl"
                        style={{ color: tokens.colors.accent }}
                      >
                        {displayName.charAt(0)}
                      </div>
                      <p className="text-xs text-zinc-500 font-mono">{location}</p>
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
      <section className="relative min-h-[85vh] flex items-end p-8 md:p-16 overflow-hidden">
        {/* Background Image / Render */}
        <div className="absolute inset-0 z-0">
          {profile?.photoUrl ? (
            <img src={profile.photoUrl} alt={displayName} className="w-full h-full object-cover object-center filter brightness-50" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono border backdrop-blur-md"
            style={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {location} • Studio
          </div>

          <h1
            className="text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            style={{ fontFamily: tokens.typography.fontHeading }}
          >
            {displayName}
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl font-light">
            {headline}
          </p>

          <p className="text-zinc-400 text-sm max-w-xl line-clamp-3">
            {bio}
          </p>

          <div className="pt-4 flex items-center gap-4">
            <MagneticButton
              forcedTouchMode={forcedTouchMode}
              onClick={onContactClick}
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition shadow-xl"
              style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
            >
              Start Collaboration
            </MagneticButton>
            <a
              href="#work"
              className="px-5 py-3 rounded-full text-xs font-mono transition border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Explore Index ↓
            </a>
          </div>
        </div>
      </section>
    );
  }

  // 3. MINIMAL-TEXT VARIANT
  if (variant === 'minimal-text') {
    return (
      <section
        className="py-24 px-6 max-w-7xl mx-auto border-b"
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

  // 4. [NEW] ASYMMETRIC-OFFSET VARIANT
  if (variant === 'asymmetric-offset') {
    return (
      <section className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Displaced big typography on left */}
          <div className="md:col-span-8 space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-mono uppercase tracking-widest border"
              style={{ borderColor: tokens.colors.border, color: tokens.colors.accent }}
            >
              № 01 / {location}
            </div>

            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter"
              style={{
                fontFamily: tokens.typography.fontHeading,
                color: tokens.colors.textPrimary,
                lineHeight: '0.92'
              }}
            >
              {displayName.toUpperCase()}
            </h1>

            <div className="pt-4 max-w-xl">
              <p
                className="text-lg md:text-xl font-medium leading-snug"
                style={{ fontFamily: tokens.typography.fontBody, color: tokens.colors.textSecondary }}
              >
                {headline}
              </p>
            </div>
          </div>

          {/* Offset floating metadata box on right */}
          <div className="md:col-span-4 md:pt-20 space-y-6">
            <div
              className="p-6 rounded-2xl border backdrop-blur-sm shadow-xl"
              style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
            >
              <div className="flex items-center justify-between pb-4 border-b mb-4" style={{ borderColor: tokens.colors.border }}>
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Availability</span>
                <span className={`text-xs font-mono font-bold ${available ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  {available ? '● ACCEPTING COMMISSIONS' : '○ RETIRED / BOOKED'}
                </span>
              </div>

              <p className="text-xs leading-relaxed text-zinc-400 mb-6 font-mono">
                {bio}
              </p>

              <MagneticButton
                forcedTouchMode={forcedTouchMode}
                onClick={onContactClick}
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition"
                style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
              >
                Initiate Project
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 5. [NEW] STACKED-MEDIA VARIANT
  if (variant === 'stacked-media') {
    return (
      <section className="py-20 px-6 max-w-6xl mx-auto text-center relative overflow-hidden">
        <div className="space-y-4 max-w-3xl mx-auto mb-10">
          <span
            className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{ borderColor: tokens.colors.border, color: tokens.colors.textMuted }}
          >
            Curated Practice • {location}
          </span>
          <h1
            className="text-4xl sm:text-6xl font-bold tracking-tight"
            style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
          >
            {displayName}
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-light">
            {headline}
          </p>
        </div>

        {/* Stacked Preview Cards */}
        <div className="relative max-w-2xl mx-auto h-72 sm:h-80 mb-10 flex items-center justify-center">
          <div
            className="absolute w-72 h-52 sm:w-96 sm:h-64 rounded-2xl border shadow-2xl transform -rotate-6 -translate-x-12 opacity-70 transition hover:opacity-100 hover:rotate-0 hover:z-30 overflow-hidden"
            style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.surface }}
          >
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center p-4">
              <span className="font-mono text-xs text-zinc-500">Selected Works Archive</span>
            </div>
          </div>
          <div
            className="absolute w-72 h-52 sm:w-96 sm:h-64 rounded-2xl border shadow-2xl transform rotate-6 translate-x-12 opacity-80 transition hover:opacity-100 hover:rotate-0 hover:z-30 overflow-hidden"
            style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.surface }}
          >
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center p-4">
              <span className="font-mono text-xs text-zinc-400">Exhibition & Spatial Design</span>
            </div>
          </div>
          <div
            className="absolute w-80 h-56 sm:w-[26rem] sm:h-68 rounded-2xl border shadow-2xl z-20 overflow-hidden flex flex-col justify-between p-6"
            style={{ borderColor: tokens.colors.accent, backgroundColor: tokens.colors.surface }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Featured Spotlight</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs text-zinc-300 font-mono text-left leading-relaxed">
              {bio}
            </p>
            <div className="text-left text-[11px] font-mono" style={{ color: tokens.colors.accent }}>
              Explore Case Studies ↓
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <MagneticButton
            forcedTouchMode={forcedTouchMode}
            onClick={onContactClick}
            className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-lg"
            style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
          >
            Contact Creator
          </MagneticButton>
        </div>
      </section>
    );
  }

  // 6. [NEW] MARQUEE-TEXT VARIANT
  if (variant === 'marquee-text') {
    return (
      <section className="py-16 overflow-hidden border-b" style={{ borderColor: tokens.colors.border }}>
        {/* Continuous Marquee Ticker */}
        <div className="whitespace-nowrap overflow-hidden flex select-none py-4 border-y" style={{ borderColor: tokens.colors.border }}>
          <div className="flex items-center gap-8 animate-marquee font-black uppercase text-5xl sm:text-7xl md:text-8xl tracking-tighter"
            style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
          >
            <span>{displayName}</span>
            <span style={{ color: tokens.colors.accent }}>✦</span>
            <span>{headline}</span>
            <span style={{ color: tokens.colors.accent }}>✦</span>
            <span>{location}</span>
            <span style={{ color: tokens.colors.accent }}>✦</span>
          </div>
        </div>

        {/* Informational Sub-Hero */}
        <div className="max-w-7xl mx-auto px-6 pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Statement of Purpose</span>
            <p className="text-base sm:text-xl leading-relaxed max-w-2xl font-light" style={{ color: tokens.colors.textSecondary }}>
              {bio}
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <MagneticButton
              forcedTouchMode={forcedTouchMode}
              onClick={onContactClick}
              className="px-8 py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition"
              style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
            >
              Initiate Contact →
            </MagneticButton>
          </div>
        </div>
      </section>
    );
  }

  // 7. [NEW] SIDE-PANEL-NAV VARIANT
  if (variant === 'side-panel-nav') {
    return (
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Side Panel Identity Box */}
          <div className="lg:col-span-4 p-8 rounded-3xl border flex flex-col justify-between space-y-8"
            style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 border flex items-center justify-center font-bold text-2xl"
                style={{ borderColor: tokens.colors.border, color: tokens.colors.accent }}
              >
                {displayName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{displayName}</h2>
                <p className="text-xs font-mono text-zinc-400">{headline}</p>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono border"
                  style={{ borderColor: tokens.colors.border, color: available ? '#34d399' : '#a1a1aa' }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${available ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                  {available ? 'AVAILABLE FOR HIRE' : 'CURRENTLY BOOKED'}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t" style={{ borderColor: tokens.colors.border }}>
              <div className="text-xs font-mono text-zinc-500">Location: {location}</div>
              <MagneticButton
                forcedTouchMode={forcedTouchMode}
                onClick={onContactClick}
                className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-center transition"
                style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
              >
                Direct Message
              </MagneticButton>
            </div>
          </div>

          {/* Right Presentation Canvas */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-8 p-4 lg:p-12">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Design Dossier</span>
            <h1
              className="text-4xl sm:text-6xl font-extrabold tracking-tight"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              Crafting systemic precision across physical and computational mediums.
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed max-w-xl">
              {bio}
            </p>
            <div>
              <a href="#work" className="inline-flex items-center gap-2 text-xs font-mono transition hover:underline"
                style={{ color: tokens.colors.accent }}
              >
                Examine Catalog Below ↓
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 8. [NEW] VIDEO-BACKGROUND / CINEMATIC-VIGNETTE VARIANT
  if (variant === 'video-background') {
    return (
      <section className="relative py-32 px-6 overflow-hidden flex items-center justify-center text-center">
        {/* Ambient Darkened Backdrop with Grain and Radial Glow */}
        <div className="absolute inset-0 bg-zinc-950 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${tokens.colors.accent} 0%, transparent 65%)`
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border backdrop-blur-md"
            style={{ borderColor: tokens.colors.border, backgroundColor: 'rgba(0,0,0,0.6)', color: tokens.colors.textSecondary }}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Vignette Reel • {location}
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
            style={{ fontFamily: tokens.typography.fontHeading }}
          >
            {displayName}
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            {headline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-mono">
            {bio}
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <MagneticButton
              forcedTouchMode={forcedTouchMode}
              onClick={onContactClick}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition shadow-2xl"
              style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
            >
              Begin Dialogue
            </MagneticButton>
            <a
              href="#work"
              className="px-6 py-3.5 rounded-full text-xs font-mono text-zinc-300 border border-zinc-700 hover:bg-white/5 transition"
            >
              View Reel ↓
            </a>
          </div>
        </div>
      </section>
    );
  }

  // 9. [NEW] DIAGONAL-SPLIT VARIANT
  if (variant === 'diagonal-split') {
    return (
      <section className="relative py-28 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Diagonal Geometric Backdrop */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
            backgroundColor: tokens.colors.accent
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Geometry & Form • {location}
            </span>

            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              {displayName}
            </h1>

            <p className="text-lg sm:text-xl font-medium" style={{ color: tokens.colors.accent }}>
              {headline}
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              {bio}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <MagneticButton
                forcedTouchMode={forcedTouchMode}
                onClick={onContactClick}
                className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition"
                style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
              >
                Inquire
              </MagneticButton>
              <a
                href="#work"
                className="px-5 py-3 rounded-lg text-xs font-mono border hover:bg-white/5 transition"
                style={{ borderColor: tokens.colors.border, color: tokens.colors.textPrimary }}
              >
                Selected Portfolio ↓
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div
              className="w-full max-w-sm h-96 rounded-3xl border p-3 rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl"
              style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.surface }}
            >
              <div className="w-full h-full rounded-2xl bg-zinc-900 overflow-hidden flex flex-col justify-end p-6 relative">
                {profile?.photoUrl ? (
                  <img src={profile.photoUrl} alt={displayName} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 to-zinc-950" />
                )}
                <div className="relative z-10 space-y-1">
                  <div className="text-xs font-bold text-white uppercase">{displayName}</div>
                  <div className="text-[11px] font-mono text-zinc-400">{location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 10. CENTERED VARIANT (Default)
  return (
    <section className="py-28 px-6 text-center max-w-4xl mx-auto relative overflow-hidden">
      <ScrollReveal>
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border mb-6"
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
