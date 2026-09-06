import React from 'react';
import { FullProfileDto, ThemeTokens } from '@cove/shared';
import { MagneticButton } from '../interactions/MagneticButton.js';
import { ScrollReveal } from '../interactions/ScrollReveal.js';

interface Props {
  profile: FullProfileDto | null;
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
}

export function Contact({ profile, tokens, forcedTouchMode = false }: Props) {
  const contactEmail = profile?.contactEmail || profile?.email || 'hello@cove.design';
  const location = profile?.location || 'Stockholm, Sweden';
  const phone = profile?.contactPhone;
  const available = profile?.availableForWork ?? true;
  const socialLinks = profile?.socialLinks || [];

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto border-t text-center"
      style={{ borderColor: tokens.colors.border }}
    >
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border mb-6"
          style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.badgeBg, color: tokens.colors.badgeText }}
        >
          <span className={`w-2 h-2 rounded-full ${available ? 'bg-emerald-400' : 'bg-zinc-500'} animate-pulse`} />
          {available ? 'Available for New Commissions' : 'Currently Booked'}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
        >
          Let's Build Something Enduring
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="text-sm max-w-xl mx-auto mb-8" style={{ color: tokens.colors.textSecondary }}>
          Have a project in mind, an architectural inquiry, or a creative partnership? Reach out directly.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <MagneticButton
            forcedTouchMode={forcedTouchMode}
            onClick={() => window.location.href = `mailto:${contactEmail}`}
            className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition shadow-xl"
            style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
          >
            Email Me: {contactEmail}
          </MagneticButton>

          {phone && (
            <a
              href={`tel:${phone}`}
              className="px-6 py-3.5 rounded-full text-xs font-mono transition border hover:bg-white/5"
              style={{ borderColor: tokens.colors.border, color: tokens.colors.textPrimary }}
            >
              {phone}
            </a>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4"
          style={{ borderColor: tokens.colors.border }}
        >
          <span>Base: {location}</span>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline uppercase text-[11px] transition-colors"
                  style={{ color: tokens.colors.textSecondary }}
                >
                  {s.label || s.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
