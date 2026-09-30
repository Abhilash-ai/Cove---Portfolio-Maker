import React, { useState } from 'react';
import { PortfolioSummary, ThemeTokens } from '@cove/shared';
import { DISTINCT_WEBSITE_TEMPLATES, WebsiteTemplateDefinition } from '../templates/templateRegistry.js';
import { Template3DBoundary } from './Template3DBoundary.js';
import { ArrowRight, Check, ChevronDown, ChevronUp, Globe, Sparkles } from 'lucide-react';

interface Props {
  website: PortfolioSummary;
  templateId?: string;
  overrideTokens?: ThemeTokens;
  overrideContent?: Partial<WebsiteTemplateDefinition['defaultContent']>;
  forcedTouchMode?: boolean;
  simulateNoWebGL?: boolean;
}

export function WebsiteRenderer({
  website,
  templateId,
  overrideTokens,
  overrideContent,
  forcedTouchMode = false,
  simulateNoWebGL = false,
}: Props) {
  // Find matching template or default to SaaS Velocity
  const template =
    DISTINCT_WEBSITE_TEMPLATES.find((t) => t.id === templateId || t.id === website.activeTemplateId) ||
    DISTINCT_WEBSITE_TEMPLATES[0];

  const defaultContent = template.defaultContent;
  const userContent = website.customTokens?.websiteContent || {};
  const override = overrideContent || {};

  const content = {
    navbar: {
      ...defaultContent.navbar,
      ...userContent.navbar,
      ...override.navbar,
      links: override.navbar?.links || userContent.navbar?.links || defaultContent.navbar?.links || [],
    },
    hero: {
      ...defaultContent.hero,
      ...userContent.hero,
      ...override.hero,
    },
    features: defaultContent.features ? {
      ...defaultContent.features,
      ...userContent.features,
      ...override.features,
      items: override.features?.items || userContent.features?.items || defaultContent.features?.items || [],
    } : null,
    services: defaultContent.services ? {
      ...defaultContent.services,
      ...userContent.services,
      ...override.services,
      items: override.services?.items || userContent.services?.items || defaultContent.services?.items || [],
    } : null,
    pricing: defaultContent.pricing ? {
      ...defaultContent.pricing,
      ...userContent.pricing,
      ...override.pricing,
      tiers: override.pricing?.tiers || userContent.pricing?.tiers || defaultContent.pricing?.tiers || [],
    } : null,
    testimonials: defaultContent.testimonials ? {
      ...defaultContent.testimonials,
      ...userContent.testimonials,
      ...override.testimonials,
      quotes: override.testimonials?.quotes || userContent.testimonials?.quotes || defaultContent.testimonials?.quotes || [],
    } : null,
    faq: defaultContent.faq ? {
      ...defaultContent.faq,
      ...userContent.faq,
      ...override.faq,
      items: override.faq?.items || userContent.faq?.items || defaultContent.faq?.items || [],
    } : null,
    cta: defaultContent.cta ? {
      ...defaultContent.cta,
      ...userContent.cta,
      ...override.cta,
    } : null,
    footer: {
      ...defaultContent.footer,
      ...userContent.footer,
      ...override.footer,
      columns: override.footer?.columns || userContent.footer?.columns || defaultContent.footer?.columns || [],
    },
  };

  const colors = overrideTokens?.colors || template.tokens.colors;
  const typography = overrideTokens?.typography || template.tokens.typography;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300 relative selection:bg-[#FF6B4A] selection:text-white"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
        fontFamily: typography.fontBody,
      }}
    >
      {/* 1. Website Navbar */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors"
        style={{
          borderColor: colors.border,
          backgroundColor: `${colors.background}EE`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white"
              style={{ backgroundColor: colors.accent }}
            >
              {content.navbar.brandName.charAt(0)}
            </div>
            <span
              className="font-bold text-base tracking-tight"
              style={{ fontFamily: typography.fontHeading }}
            >
              {content.navbar.brandName}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            {content.navbar.links.map((link: { label: string; href: string }) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:opacity-100 opacity-70"
                style={{ color: colors.textPrimary }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#pricing"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 shadow-soft"
            style={{ backgroundColor: colors.accent }}
          >
            {content.navbar.ctaLabel}
          </a>
        </div>
      </header>

      {/* 2. Website Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto text-center space-y-6">
        {content.hero.badge && (
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold border"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.accent,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.hero.badge}</span>
          </div>
        )}

        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.08]"
          style={{ fontFamily: typography.fontHeading }}
        >
          {content.hero.headline}
        </h1>

        <p
          className="text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed opacity-80"
          style={{ color: colors.textSecondary }}
        >
          {content.hero.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#pricing"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-soft transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            style={{ backgroundColor: colors.accent }}
          >
            <span>{content.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#features"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all hover:bg-zinc-500/10 active:scale-95"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.textPrimary,
            }}
          >
            {content.hero.secondaryCta}
          </a>
        </div>
      </section>

      {/* 3. Features Section */}
      {content.features && (
        <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: typography.fontHeading }}
            >
              {content.features.title}
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: colors.textSecondary }}>
              {content.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.items.map((feat: { icon: string; title: string; description: string }, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between space-y-4"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <div className="space-y-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    {feat.icon}
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ fontFamily: typography.fontHeading }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Services Section (if applicable) */}
      {content.services && (
        <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: typography.fontHeading }}
            >
              {content.services.title}
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: colors.textSecondary }}>
              {content.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.services.items.map((srv: { title: string; description: string; deliverables: string[] }, idx: number) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border space-y-4"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: typography.fontHeading }}
                >
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                  {srv.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {srv.deliverables.map((del: string, dIdx: number) => (
                    <span
                      key={dIdx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-lg border font-medium"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                        color: colors.accent,
                      }}
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Pricing Matrix */}
      {content.pricing && (
        <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: typography.fontHeading }}
            >
              {content.pricing.title}
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: colors.textSecondary }}>
              {content.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.pricing.tiers.map((tier: { name: string; price: string; period: string; description: string; features: string[]; highlighted?: boolean; cta: string }, idx: number) => {
              const isHighlight = tier.highlighted;
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                    isHighlight ? 'ring-2 shadow-2xl scale-105' : ''
                  }`}
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: isHighlight ? colors.accent : colors.border,
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-lg font-bold"
                        style={{ fontFamily: typography.fontHeading }}
                      >
                        {tier.name}
                      </h3>
                      {isHighlight && (
                        <span
                          className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full text-white"
                          style={{ backgroundColor: colors.accent }}
                        >
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-xs font-mono" style={{ color: colors.textSecondary }}>
                        {tier.period}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>
                      {tier.description}
                    </p>

                    <div className="pt-4 border-t space-y-2.5" style={{ borderColor: colors.border }}>
                      {tier.features.map((feat: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-3 rounded-xl text-xs font-bold text-white transition-all shadow-soft active:scale-95"
                    style={{ backgroundColor: isHighlight ? colors.accent : colors.textPrimary, color: isHighlight ? '#FFFFFF' : colors.background }}
                  >
                    {tier.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Testimonials */}
      {content.testimonials && (
        <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: typography.fontHeading }}
            >
              {content.testimonials.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.testimonials.quotes.map((t: { quote: string; author: string; role: string; company: string }, idx: number) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border space-y-4"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <p className="text-sm sm:text-base italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: colors.border }}>
                  <div>
                    <h4 className="text-xs font-bold">{t.author}</h4>
                    <p className="text-[11px]" style={{ color: colors.textSecondary }}>
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FAQ Accordion */}
      {content.faq && (
        <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: typography.fontHeading }}
            >
              {content.faq.title}
            </h2>
          </div>

          <div className="space-y-3">
            {content.faq.items.map((item: { q: string; a: string }, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border overflow-hidden transition-all"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-xs sm:text-sm font-bold">{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-5 pt-1 text-xs leading-relaxed border-t"
                      style={{
                        borderColor: colors.border,
                        color: colors.textSecondary,
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 8. Call To Action Banner */}
      {content.cta && (
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-10 sm:p-16 text-center space-y-6 border shadow-2xl relative overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <h2
              className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto"
              style={{ fontFamily: typography.fontHeading }}
            >
              {content.cta.headline}
            </h2>
            <p className="text-xs sm:text-sm max-w-xl mx-auto" style={{ color: colors.textSecondary }}>
              {content.cta.subline}
            </p>
            <div className="pt-2">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-soft transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: colors.accent }}
              >
                <span>{content.cta.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 9. Website Footer */}
      <footer
        className="border-t py-12 px-4 sm:px-6 transition-colors"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.background,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p style={{ color: colors.textSecondary }}>{content.footer.copyright}</p>
          <div className="flex items-center gap-6">
            {content.footer.columns.flatMap((col: { title: string; links: { label: string; href: string }[] }) => col.links).map((l: { label: string; href: string }, lIdx: number) => (
              <a
                key={lIdx}
                href={l.href}
                className="hover:underline opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: colors.textPrimary }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
