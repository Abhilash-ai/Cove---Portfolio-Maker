import { useState, useEffect } from 'react';
import { ProjectDto, PortfolioSummary } from '@cove/shared';
import { ProjectFormModal } from './ProjectFormModal.js';

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
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
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
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ projectIds: copy.map((p) => p.id) })
      });
    } catch (err) {
      console.error('Reorder error:', err);
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Active Portfolio
            </span>
            <h2 className="text-lg font-bold text-white">{portfolio.title}</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            slug: <span className="font-mono text-zinc-300">/{portfolio.slug}</span> • {projects.length} Projects Total
          </p>
        </div>

        <button
          onClick={() => { setEditingProject(null); setModalOpen(true); }}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition"
        >
          + Add New Project
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-xs font-mono text-zinc-400">Loading project records...</div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-lg">
          <p className="text-zinc-400 text-sm font-medium">No projects added to this portfolio yet.</p>
          <p className="text-zinc-600 text-xs mt-1">Click "+ Add New Project" to populate your work.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((pr, idx) => (
            <div
              key={pr.id}
              className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700 transition"
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail / Cover */}
                <div className="w-20 h-20 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {pr.coverImage ? (
                    <img src={pr.coverImage} alt={pr.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-zinc-600 font-mono">No Cover</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{pr.title}</h3>
                    {pr.year && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {pr.year}
                      </span>
                    )}
                    {pr.category && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-blue-400">
                        {pr.category}
                      </span>
                    )}
                  </div>

                  {pr.shortDescription && (
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{pr.shortDescription}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500 font-mono mt-2">
                    {pr.role && <span>Role: {pr.role}</span>}
                    <span>Media: {pr.media.length} files</span>
                    {pr.tools.length > 0 && <span>Tools: {pr.tools.join(', ')}</span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center">
                <div className="flex gap-1 mr-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30 rounded text-xs text-zinc-300"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    disabled={idx === projects.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 disabled:opacity-30 rounded text-xs text-zinc-300"
                    title="Move Down"
                  >
                    ↓
                  </button>
                </div>

                <button
                  onClick={() => handleDuplicate(pr.id)}
                  className="px-2.5 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded font-medium transition"
                  title="Duplicate project"
                >
                  Duplicate
                </button>

                <button
                  onClick={() => { setEditingProject(pr); setModalOpen(true); }}
                  className="px-2.5 py-1.5 text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded font-medium transition"
                >
                  Edit / Media
                </button>

                <button
                  onClick={() => handleDelete(pr.id)}
                  className="px-2.5 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded transition"
                >
                  Delete
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
