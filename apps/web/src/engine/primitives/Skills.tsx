import React from 'react';
import { FullProfileDto, ThemeTokens } from '@cove/shared';
import { ScrollReveal } from '../interactions/ScrollReveal.js';

interface Props {
  profile: FullProfileDto | null;
  tokens: ThemeTokens;
}

export function Skills({ profile, tokens }: Props) {
  const skills = profile?.skills || [];
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto border-t"
      style={{ borderColor: tokens.colors.border }}
    >
      <ScrollReveal>
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            Expertise & Capabilities
          </span>
          <h2 className="text-3xl font-bold mt-1"
            style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
          >
            Core Competencies
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.03}>
            <div
              className="p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default group"
              style={{
                backgroundColor: tokens.colors.surface,
                borderColor: tokens.colors.border
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono uppercase text-zinc-500 text-[10px]">
                  {skill.category || 'Competency'}
                </span>
                {skill.level && (
                  <span className="text-[10px] font-mono font-semibold" style={{ color: tokens.colors.accent }}>
                    {skill.level}
                  </span>
                )}
              </div>
              <p className="font-semibold text-xs group-hover:text-white transition-colors"
                style={{ color: tokens.colors.textPrimary }}
              >
                {skill.name}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
