import React from 'react';
import { FullProfileDto, ThemeTokens } from '@cove/shared';
import { ScrollReveal } from '../interactions/ScrollReveal.js';

interface Props {
  profile: FullProfileDto | null;
  tokens: ThemeTokens;
}

export function Experience({ profile, tokens }: Props) {
  const experiences = profile?.experiences || [];
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-20 px-6 max-w-7xl mx-auto border-t"
      style={{ borderColor: tokens.colors.border }}
    >
      <ScrollReveal>
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            Background
          </span>
          <h2 className="text-3xl font-bold mt-1"
            style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
          >
            Professional Experience
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative border-l pl-6 sm:pl-8 space-y-12 ml-4"
        style={{ borderColor: tokens.colors.border }}
      >
        {experiences.map((exp, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.1}>
            <div className="relative group">
              {/* Timeline Marker */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: tokens.colors.background,
                  borderColor: exp.isCurrent ? tokens.colors.accent : tokens.colors.border
                }}
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-lg font-bold" style={{ color: tokens.colors.textPrimary }}>
                  {exp.position} <span className="font-normal text-zinc-400">at</span> {exp.company}
                </h3>
                <span className="font-mono text-xs" style={{ color: tokens.colors.accent }}>
                  {new Date(exp.startDate).getFullYear()} — {exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                </span>
              </div>

              {exp.location && (
                <p className="font-mono text-xs text-zinc-500 mb-3">{exp.location}</p>
              )}

              {exp.description && (
                <p className="text-xs leading-relaxed max-w-2xl" style={{ color: tokens.colors.textSecondary }}>
                  {exp.description}
                </p>
              )}

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs list-disc list-inside" style={{ color: tokens.colors.textMuted }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
