import React, { useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ProjectDto, ThemeTokens } from '@cove/shared';
import { ScrollReveal } from '../interactions/ScrollReveal.js';
import { CaseStudyModal } from './CaseStudyModal.js';
import { useDeviceCapabilities } from '../interactions/useDeviceCapabilities.js';

interface Props {
  projects: ProjectDto[];
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
}

export function ProjectList({ projects, tokens, forcedTouchMode = false }: Props) {
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectDto | null>(null);
  const { isTouch, isPointerFine } = useDeviceCapabilities();
  const isTouchDevice = forcedTouchMode || isTouch || !isPointerFine;

  // Floating hover preview coordinates
  const springConfig = { damping: 25, stiffness: 300, mass: 0.4 };
  const previewX = useSpring(0, springConfig);
  const previewY = useSpring(0, springConfig);

  function handleMouseMove(e: React.MouseEvent) {
    if (isTouchDevice) return;
    previewX.set(e.clientX + 24);
    previewY.set(e.clientY - 100);
  }

  return (
    <section id="work" className="py-20 px-6 max-w-7xl mx-auto" onMouseMove={handleMouseMove}>
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b pb-4"
          style={{ borderColor: tokens.colors.border }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
              Chronological Index
            </span>
            <h2 className="text-3xl font-bold mt-1"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              Project Archive ({projects.length})
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0">Hover to preview • Click to expand</p>
        </div>
      </ScrollReveal>

      {/* Floating cursor preview for pointer devices */}
      {!isTouchDevice && hoveredProject && hoveredProject.coverImage && (
        <motion.div
          style={{ x: previewX, y: previewY, borderColor: tokens.colors.border }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-0 left-0 w-64 h-40 rounded-xl overflow-hidden pointer-events-none z-40 border shadow-2xl"
        >
          <img src={hoveredProject.coverImage} alt={hoveredProject.title} className="w-full h-full object-cover" />
        </motion.div>
      )}

      <div className="divide-y" style={{ borderColor: tokens.colors.border }}>
        {projects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.04}>
            <div
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-colors px-2 rounded-lg"
              style={{
                backgroundColor: hoveredProject?.id === project.id ? tokens.colors.surfaceHover : 'transparent'
              }}
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-zinc-500 w-8">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Inline thumbnail for touch devices */}
                {isTouchDevice && project.coverImage && (
                  <div className="w-12 h-12 rounded bg-zinc-900 overflow-hidden flex-shrink-0">
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold group-hover:translate-x-1.5 transition-transform"
                    style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{project.shortDescription}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 text-xs font-mono text-zinc-400 pl-14 md:pl-0">
                <span className="text-blue-400">{project.category || 'Archive'}</span>
                <span>{project.year || '2026'}</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold"
                  style={{ color: tokens.colors.accent }}
                >
                  View Case →
                </span>
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
