import React, { useState, useRef } from 'react';
import { ProjectDto, ThemeTokens } from '@cove/shared';
import { ScrollReveal } from '../interactions/ScrollReveal.js';
import { CaseStudyModal } from './CaseStudyModal.js';

interface Props {
  projects: ProjectDto[];
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
}

export function ProjectHorizontal({ projects, tokens }: Props) {
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (projects.length === 0) {
    return (
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto text-center">
        <p className="text-zinc-500 font-mono text-xs">No projects populated yet.</p>
      </section>
    );
  }

  function scroll(direction: 'left' | 'right') {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }

  return (
    <section id="work" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div
            className="flex items-end justify-between mb-8 border-b pb-4"
            style={{ borderColor: tokens.colors.border }}
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
                Horizontal Reel
              </span>
              <h2
                className="text-3xl font-bold mt-1"
                style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
              >
                Panoramic Showcase ({projects.length})
              </h2>
            </div>

            {/* Scroll Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full border flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition"
                style={{ borderColor: tokens.colors.border }}
              >
                ←
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full border flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition"
                style={{ borderColor: tokens.colors.border }}
              >
                →
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal Scroll Strip */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 max-w-7xl mx-auto pb-6 scrollbar-none snap-x snap-mandatory"
      >
        {projects.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="flex-shrink-0 w-80 sm:w-96 rounded-2xl border overflow-hidden cursor-pointer group snap-start transition shadow-md hover:shadow-2xl"
            style={{
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border
            }}
          >
            <div className="h-64 sm:h-72 w-full overflow-hidden bg-zinc-900 relative">
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
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md bg-black/60 text-white border border-white/20">
                {String(idx + 1).padStart(2, '0')} • {project.category || 'Design'}
              </div>
            </div>

            <div className="p-6">
              <h3
                className="text-lg font-bold mb-2 group-hover:text-blue-400 transition"
                style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
              >
                {project.title}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                {project.shortDescription || project.fullDescription}
              </p>
              <span className="text-[11px] font-mono font-medium" style={{ color: tokens.colors.accent }}>
                View Project Details →
              </span>
            </div>
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
