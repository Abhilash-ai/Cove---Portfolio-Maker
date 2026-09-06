import React, { useState } from 'react';
import { ProjectDto, ThemeTokens } from '@cove/shared';
import { ScrollReveal } from '../interactions/ScrollReveal.js';
import { CaseStudyModal } from './CaseStudyModal.js';

interface Props {
  projects: ProjectDto[];
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
}

export function ProjectFeaturedGrid({ projects, tokens }: Props) {
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);

  if (projects.length === 0) {
    return (
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto text-center">
        <p className="text-zinc-500 font-mono text-xs">No projects populated yet.</p>
      </section>
    );
  }

  const marqueeProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b pb-4"
          style={{ borderColor: tokens.colors.border }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
              Curated Spotlight
            </span>
            <h2
              className="text-3xl font-bold mt-1"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              Key Showcase & Archive ({projects.length})
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0">Hero marquee + companion works</p>
        </div>
      </ScrollReveal>

      {/* Marquee Primary Hero Card */}
      {marqueeProject && (
        <ScrollReveal delay={0.05}>
          <div
            onClick={() => setSelectedProject(marqueeProject)}
            className="mb-12 rounded-3xl border overflow-hidden cursor-pointer group shadow-2xl transition hover:border-zinc-600"
            style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 h-80 sm:h-96 lg:h-[28rem] overflow-hidden bg-zinc-900 relative">
                {marqueeProject.coverImage ? (
                  <img
                    src={marqueeProject.coverImage}
                    alt={marqueeProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <span className="font-mono text-sm text-zinc-500">Marquee Visual</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono bg-black/70 backdrop-blur-md text-white border border-white/20">
                  ★ Primary Landmark
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    {marqueeProject.category || 'Lead Case Study'}
                  </span>
                  <h3
                    className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-blue-400 transition"
                    style={{ fontFamily: tokens.typography.fontHeading }}
                  >
                    {marqueeProject.title}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {marqueeProject.fullDescription || marqueeProject.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: tokens.colors.border }}>
                  <span className="text-xs font-mono font-bold" style={{ color: tokens.colors.accent }}>
                    Read Complete Case Study →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Secondary Companion Grid */}
      {secondaryProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={0.1 + (idx * 0.08)}>
              <div
                onClick={() => setSelectedProject(project)}
                className="rounded-2xl border p-6 cursor-pointer group transition hover:border-zinc-600 shadow-sm hover:shadow-xl flex flex-col justify-between"
                style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
              >
                <div>
                  {project.coverImage && (
                    <div className="h-52 w-full rounded-xl overflow-hidden bg-zinc-900 mb-4">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  )}
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {project.category || 'Archive'}
                  </span>
                  <h4
                    className="text-lg font-bold text-white mt-1 group-hover:text-blue-400 transition"
                    style={{ fontFamily: tokens.typography.fontHeading }}
                  >
                    {project.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.shortDescription || project.fullDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t flex justify-between items-center text-[11px] font-mono" style={{ borderColor: tokens.colors.border }}>
                  <span className="text-zinc-500">{project.year || 'Recent'}</span>
                  <span style={{ color: tokens.colors.accent }}>Inspect →</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

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
