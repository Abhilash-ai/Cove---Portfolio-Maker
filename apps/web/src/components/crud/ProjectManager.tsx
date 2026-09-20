import { useState, useEffect } from 'react';
import { ProjectDto, PortfolioSummary } from '@cove/shared';
import { ProjectFormModal } from './ProjectFormModal.js';
import { EmptyState } from '../common/EmptyState.js';
import { Plus, ArrowUp, ArrowDown, Copy, Edit3, Trash2 } from 'lucide-react';

interface Props {
  portfolio: PortfolioSummary;
  token: string;
}

export function ProjectManager({ portfolio, token }: Props) {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectDto | null>(null);

  useEffect(() => {
    loadProjects();
  }, [portfolio.id]);

  async function loadProjects() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/v1/portfolios/${portfolio.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects(data.data.portfolio.projects || []);
      } else {
        setError(data.error?.message || 'Failed to load projects');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function handleDuplicate(projectId: string) {
    try {
      setError(null);
      const res = await fetch(`/api/v1/projects/${projectId}/duplicate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await loadProjects();
      } else {
        setError(data.error?.message || 'Duplicate failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  }

  async function handleDelete(projectId: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      setError(null);
      const res = await fetch(`/api/v1/projects/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await loadProjects();
      } else {
        const data = await res.json();
        setError(data.error?.message || 'Delete failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= projects.length) return;

    const copy = [...projects];
    const [moved] = copy.splice(index, 1);
    copy.splice(newIdx, 0, moved);
    setProjects(copy);

    try {
      await fetch(`/api/v1/portfolios/${portfolio.id}/projects/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectIds: copy.map((p) => p.id) }),
      });
    } catch (err) {
      console.error('Reorder error:', err);
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-soft transition-colors max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#FF6B4A]/10 text-[#FF6B4A] border border-[#FF6B4A]/20 font-semibold">
              Active Portfolio
            </span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{portfolio.title}</h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            slug: <span className="font-mono text-[#FF6B4A] font-semibold">/{portfolio.slug}</span> • {projects.length} Projects Total
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProject(null);
            setModalOpen(true);
          }}
          className="py-2.5 px-4 bg-[#FF6B4A] hover:bg-[#F04E27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition shadow-soft hover:shadow-coral flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Project</span>
        </button>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="p-10 text-center text-xs font-mono text-zinc-400">Loading project records...</div>
      ) : projects.length === 0 ? (
        <EmptyState
          icon="💼"
          title="No Projects Added Yet"
          description="Populate your portfolio with case studies, coursework, client deliverables, or side projects."
          actionLabel="+ Add New Project"
          onAction={() => {
            setEditingProject(null);
            setModalOpen(true);
          }}
        />
      ) : (
        <div className="space-y-3.5">
          {projects.map((pr, idx) => (
            <div
              key={pr.id}
              className="p-5 bg-[#FAFAF8] dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-soft"
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail / Cover */}
                <div className="w-20 h-20 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {pr.coverImage ? (
                    <img src={pr.coverImage} alt={pr.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-zinc-400 font-mono">No Cover</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">{pr.title}</h3>
                    {pr.year && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {pr.year}
                      </span>
                    )}
                    {pr.category && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FF6B4A]/10 text-[#FF6B4A]">
                        {pr.category}
                      </span>
                    )}
                  </div>

                  {pr.shortDescription && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-1">{pr.shortDescription}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500 font-mono mt-2">
                    {pr.role && <span>Role: {pr.role}</span>}
                    <span>Media: {pr.media.length} files</span>
                    {pr.tools && pr.tools.length > 0 && <span>Tools: {pr.tools.join(', ')}</span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center">
                <div className="flex gap-1 mr-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 rounded-lg text-zinc-600 dark:text-zinc-300 transition"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === projects.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 rounded-lg text-zinc-600 dark:text-zinc-300 transition"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleDuplicate(pr.id)}
                  className="px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl border border-zinc-200 dark:border-zinc-700 font-medium transition flex items-center gap-1 shadow-sm"
                  title="Duplicate project"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Duplicate</span>
                </button>

                <button
                  onClick={() => {
                    setEditingProject(pr);
                    setModalOpen(true);
                  }}
                  className="px-3 py-1.5 text-xs bg-[#FF6B4A]/10 hover:bg-[#FF6B4A]/20 text-[#FF6B4A] border border-[#FF6B4A]/30 rounded-xl font-semibold transition flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit / Media</span>
                </button>

                <button
                  onClick={() => handleDelete(pr.id)}
                  className="p-2 text-xs bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-xl transition"
                  title="Delete project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <ProjectFormModal
          portfolioId={portfolio.id}
          token={token}
          project={editingProject}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            loadProjects();
          }}
        />
      )}
    </div>
  );
}
