import React from 'react';
import { motion } from 'framer-motion';
import { ProjectDto, ThemeTokens } from '@cove/shared';

interface Props {
  project: ProjectDto;
  tokens: ThemeTokens;
  onClose: () => void;
}

export function CaseStudyModal({ project, tokens, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="rounded-2xl border w-full max-w-4xl shadow-2xl my-8 overflow-hidden"
        style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
      >
        {/* Modal Top Header */}
        <div className="p-6 border-b flex items-center justify-between"
          style={{ borderColor: tokens.colors.border }}
        >
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider"
              style={{ color: tokens.colors.accent }}
            >
              {project.category || 'Featured Work'} • {project.year || '2026'}
            </span>
            <h2
              className="text-2xl font-bold mt-0.5"
              style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
            >
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full font-mono text-xs hover:opacity-80 transition"
            style={{ backgroundColor: tokens.colors.border, color: tokens.colors.textPrimary }}
          >
            ✕ Close
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Main Visual Cover */}
          {project.coverImage && (
            <div className="rounded-xl overflow-hidden h-80 w-full bg-zinc-950 border"
              style={{ borderColor: tokens.colors.border }}
            >
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Quick Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border text-xs font-mono"
            style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.border }}
          >
            <div>
              <p className="text-zinc-500 uppercase text-[10px]">Role</p>
              <p className="font-semibold" style={{ color: tokens.colors.textPrimary }}>{project.role || 'Designer'}</p>
            </div>
            <div>
              <p className="text-zinc-500 uppercase text-[10px]">Location</p>
              <p className="font-semibold" style={{ color: tokens.colors.textPrimary }}>{project.location || 'Global'}</p>
            </div>
            <div>
              <p className="text-zinc-500 uppercase text-[10px]">Duration</p>
              <p className="font-semibold" style={{ color: tokens.colors.textPrimary }}>{project.duration || 'Ongoing'}</p>
            </div>
            <div>
              <p className="text-zinc-500 uppercase text-[10px]">Source / Repo</p>
              {project.githubLink ? (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                  GitHub ↗
                </a>
              ) : (
                <span className="text-zinc-500">Private</span>
              )}
            </div>
          </div>

          {/* Narrative Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold" style={{ color: tokens.colors.textPrimary }}>
              Project Narrative
            </h3>
            {project.shortDescription && (
              <p className="text-sm italic" style={{ color: tokens.colors.textSecondary }}>
                "{project.shortDescription}"
              </p>
            )}
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: tokens.colors.textSecondary }}>
              {project.fullDescription || 'No in-depth case study provided for this project.'}
            </p>
          </div>

          {/* Outcome & Results */}
          {project.outcome && (
            <div className="p-4 rounded-xl border"
              style={{ backgroundColor: `${tokens.colors.accent}10`, borderColor: `${tokens.colors.accent}30` }}
            >
              <h4 className="text-xs font-mono uppercase font-bold mb-1" style={{ color: tokens.colors.accent }}>
                Outcome & Impact
              </h4>
              <p className="text-sm" style={{ color: tokens.colors.textPrimary }}>{project.outcome}</p>
            </div>
          )}

          {/* Tools & Collaborators */}
          {(project.tools.length > 0 || project.collaborators.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t"
              style={{ borderColor: tokens.colors.border }}
            >
              {project.tools.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-500 mb-2">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs rounded font-mono border"
                        style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.background, color: tokens.colors.textSecondary }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.collaborators.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-500 mb-2">Collaborators & Partners</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.collaborators.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs rounded font-mono border"
                        style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.background, color: tokens.colors.textSecondary }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Media Gallery */}
          {project.media.length > 0 && (
            <div className="space-y-4 pt-4 border-t" style={{ borderColor: tokens.colors.border }}>
              <h4 className="text-xs font-mono uppercase text-zinc-500">Media Artifacts ({project.media.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.media.map((m) => (
                  <div key={m.id} className="rounded-xl overflow-hidden border bg-zinc-950"
                    style={{ borderColor: tokens.colors.border }}
                  >
                    {m.type === 'IMAGE' ? (
                      <img src={m.url} alt={m.altText || ''} className="w-full h-56 object-cover" />
                    ) : (
                      <div className="h-56 flex items-center justify-center font-mono text-xs text-zinc-500">
                        {m.type} Asset
                      </div>
                    )}
                    {m.caption && (
                      <p className="p-2 text-[11px] text-zinc-400 font-mono text-center border-t"
                        style={{ borderColor: tokens.colors.border }}
                      >
                        {m.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
