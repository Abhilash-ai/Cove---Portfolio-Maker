import React, { useState } from 'react';
import { ProjectDto, ThemeTokens } from '@cove/shared';
import { TiltCard } from '../interactions/TiltCard.js';
import { ScrollReveal } from '../interactions/ScrollReveal.js';
import { CaseStudyModal } from './CaseStudyModal.js';

interface Props {
  projects: ProjectDto[];
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
}

export function ProjectMasonry({ projects, tokens, forcedTouchMode = false }: Props) {
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);

  if (projects.length === 0) {
    return (
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto text-center">
        <p className="text-zinc-500 font-mono text-xs">No projects populated yet.</p>
      </section>
    );
  }

  // Distribute projects into 2 columns for tablet, 3 columns for desktop to achieve true masonry rhythm
  const col1 = projects.filter((_, i) => i % 3 === 0);
  const col2 = projects.filter((_, i) => i % 3 === 1);
  const col3 = projects.filter((_, i) => i % 3 === 2);
  const columns = [col1, col2, col3];

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b pb-4"
          style={{ borderColor: tokens.colors.border }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
              Staggered Masonry
            </span>
            <h2
              className="text-3xl font-bold mt-1"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              Visual Archive ({projects.length})
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0">Dynamic aspect ratio curation</p>
        </div>
      </ScrollReveal>

      {/* Masonry Columns Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {columns.map((colProjects, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6">
            {colProjects.map((project, itemIdx) => {
              // Alternating height ratios per card
              const isTall = (colIdx + itemIdx) % 2 === 0;
              return (
                <ScrollReveal key={project.id} delay={(colIdx * 0.1) + (itemIdx * 0.05)}>
                  <TiltCard
                    forcedTouchMode={forcedTouchMode}
                    maxTilt={5}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl"
                    style={{
                      backgroundColor: tokens.colors.surface,
                      borderColor: tokens.colors.border
                    }}
                  >
                    <div
                      className={`w-full overflow-hidden relative bg-zinc-900 ${
                        isTall ? 'h-80 sm:h-96' : 'h-52 sm:h-64'
                      }`}
                    >
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-6 text-center">
                          <span className="text-xs font-mono text-zinc-500">{project.title}</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono backdrop-blur-md bg-black/50 text-white border border-white/20">
                        {project.category || 'Work'}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3
                          className="text-base font-bold mb-1 group-hover:text-blue-400 transition"
                          style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
                        >
                          {project.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {project.shortDescription || project.fullDescription}
                        </p>
                      </div>

                      {project.tools && project.tools.length > 0 && (
                        <div className="pt-3 flex flex-wrap gap-1.5 border-t mt-3" style={{ borderColor: tokens.colors.border }}>
                          {project.tools.slice(0, 3).map((t, tidx) => (
                            <span key={tidx} className="text-[10px] font-mono text-zinc-500">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
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
