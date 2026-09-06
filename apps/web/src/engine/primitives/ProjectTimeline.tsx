import React, { useState } from 'react';
import { ProjectDto, ThemeTokens } from '@cove/shared';
import { ScrollReveal } from '../interactions/ScrollReveal.js';
import { CaseStudyModal } from './CaseStudyModal.js';

interface Props {
  projects: ProjectDto[];
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
}

export function ProjectTimeline({ projects, tokens }: Props) {
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);

  if (projects.length === 0) {
    return (
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto text-center">
        <p className="text-zinc-500 font-mono text-xs">No projects populated yet.</p>
      </section>
    );
  }

  return (
    <section id="work" className="py-24 px-6 max-w-5xl mx-auto">
      <ScrollReveal>
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b pb-4"
          style={{ borderColor: tokens.colors.border }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
              Chronological Timeline
            </span>
            <h2
              className="text-3xl font-bold mt-1"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              Evolution of Practice ({projects.length})
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0">Sequential milestone history</p>
        </div>
      </ScrollReveal>

      {/* Vertical Spine */}
      <div className="relative border-l-2 ml-4 sm:ml-12 pl-6 sm:pl-10 space-y-12" style={{ borderColor: tokens.colors.border }}>
        {projects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.1}>
            <div className="relative group cursor-pointer" onClick={() => setSelectedProject(project)}>
              {/* Milestone Indicator Dot */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 bg-zinc-950 transition group-hover:scale-125"
                style={{ borderColor: tokens.colors.accent }}
              />

              <div
                className="p-6 rounded-2xl border transition hover:border-zinc-600 shadow-sm hover:shadow-xl"
                style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold" style={{ color: tokens.colors.accent }}>
                        {project.year || `Phase 0${idx + 1}`}
                      </span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        {project.category || 'Architecture'}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold text-white group-hover:text-blue-400 transition"
                      style={{ fontFamily: tokens.typography.fontHeading }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {project.role && (
                    <span className="text-xs font-mono px-3 py-1 rounded-full border text-zinc-400 self-start md:self-auto"
                      style={{ borderColor: tokens.colors.border }}
                    >
                      Role: {project.role}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {project.shortDescription || project.fullDescription}
                    </p>
                    {project.outcome && (
                      <p className="text-xs font-mono text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                        Outcome: {project.outcome}
                      </p>
                    )}
                  </div>

                  {project.coverImage && (
                    <div className="md:col-span-4 h-36 rounded-xl overflow-hidden bg-zinc-900 border" style={{ borderColor: tokens.colors.border }}>
                      <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          tokens={tokens}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
