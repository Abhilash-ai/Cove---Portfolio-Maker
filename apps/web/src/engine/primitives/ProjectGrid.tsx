import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectDto, ThemeTokens } from '@cove/shared';
import { TiltCard } from '../interactions/TiltCard.js';
import { ScrollReveal } from '../interactions/ScrollReveal.js';
import { CaseStudyModal } from './CaseStudyModal.js';

interface Props {
  projects: ProjectDto[];
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
}

export function ProjectGrid({ projects, tokens, forcedTouchMode = false }: Props) {
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Motion.dev scroll-driven transform: cards subtly shift velocity as user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Staggered parallax translation across column groups
  const scrollParallaxEven = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const scrollParallaxOdd = useTransform(scrollYProgress, [0, 1], [16, -16]);

  if (projects.length === 0) {
    return (
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto">
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b pb-4"
          style={{ borderColor: tokens.colors.border }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
              Selected Index
            </span>
            <h2
              className="text-3xl font-bold mt-1"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              Featured Works
            </h2>
          </div>
        </div>

        <div
          className="border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto transition-all"
          style={{ borderColor: tokens.colors.border, backgroundColor: `${tokens.colors.surface}80` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: `${tokens.colors.accent}15`, color: tokens.colors.accent }}
          >
            +
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: tokens.colors.textPrimary }}>
              Add Your First Project
            </h3>
            <p className="text-xs mt-1 max-w-sm mx-auto" style={{ color: tokens.colors.textSecondary }}>
              Showcase case studies, high-resolution imagery, deliverables, and technical outcomes.
            </p>
          </div>
          <span
            className="px-4 py-2 rounded-xl text-xs font-semibold shadow-sm inline-block"
            style={{ backgroundColor: tokens.colors.accent, color: '#FFFFFF' }}
          >
            + Add Project
          </span>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} id="work" className="py-20 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b pb-4"
          style={{ borderColor: tokens.colors.border }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest"
              style={{ color: tokens.colors.accent }}
            >
              Selected Index
            </span>
            <h2
              className="text-3xl font-bold mt-1"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              Featured Works ({projects.length})
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0">Click any project to explore full case study</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.08}>
            <motion.div
              style={{ y: idx % 2 === 0 ? scrollParallaxEven : scrollParallaxOdd }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="h-full"
            >
            <TiltCard
              forcedTouchMode={forcedTouchMode}
              maxTilt={7}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl border flex flex-col h-full overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl"
              style={{
                backgroundColor: tokens.colors.surface,
                borderColor: tokens.colors.border
              }}
            >
              {/* Card Image Container with Hover Scale */}
              <div className="h-64 w-full overflow-hidden relative" style={{ backgroundColor: tokens.colors.surface }}>
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                    style={{ backgroundColor: tokens.colors.background }}
                  >
                    <span className="font-mono text-2xl font-bold mb-1 opacity-40" style={{ color: tokens.colors.accent }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 uppercase">{project.category || 'Project Archive'}</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 flex gap-1.5 z-10">
                  {project.year && (
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded backdrop-blur-md border text-zinc-200"
                      style={{ backgroundColor: 'rgba(0,0,0,0.6)', borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                      {project.year}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {project.category && (
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold"
                        style={{ color: tokens.colors.accent }}
                      >
                        {project.category}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-lg font-bold group-hover:text-blue-400 transition-colors"
                    style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
                  >
                    {project.title}
                  </h3>
                  {project.shortDescription && (
                    <p
                      className="text-xs mt-2 line-clamp-2 leading-relaxed"
                      style={{ color: tokens.colors.textSecondary }}
                    >
                      {project.shortDescription}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t flex items-center justify-between text-[11px] font-mono"
                  style={{ borderColor: tokens.colors.border, color: tokens.colors.textMuted }}
                >
                  <span>{project.media.length > 0 ? `${project.media.length} media items` : 'Case brief'}</span>
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold"
                    style={{ color: tokens.colors.accent }}
                  >
                    Open Case Study →
                  </span>
                </div>
              </div>
            </TiltCard>
            </motion.div>
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
