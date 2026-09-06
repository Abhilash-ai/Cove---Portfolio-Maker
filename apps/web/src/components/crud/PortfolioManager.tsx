import React, { useState, useEffect } from 'react';
import { PortfolioSummary } from '@cove/shared';
import { EmptyState } from '../common/EmptyState.js';

interface Props {
  token: string;
  onSelectPortfolio: (portfolio: PortfolioSummary) => void;
  onOpenEditor?: (portfolio: PortfolioSummary) => void;
  activePortfolioId?: string;
}

export function PortfolioManager({ token, onSelectPortfolio, onOpenEditor, activePortfolioId }: Props) {
  const [portfolios, setPortfolios] = useState<PortfolioSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New portfolio state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [creating, setCreating] = useState(false);

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editStatus, setEditStatus] = useState<'draft' | 'published'>('draft');
  const [editSections, setEditSections] = useState<string[]>([]);

  useEffect(() => {
    loadPortfolios();
  }, []);

  async function loadPortfolios() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/v1/portfolios/mine', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPortfolios(data.data.portfolios);
        if (data.data.portfolios.length > 0 && !activePortfolioId) {
          onSelectPortfolio(data.data.portfolios[0]);
        }
      } else {
        setError(data.error?.message || 'Failed to load portfolios');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    try {
      setCreating(true);
      setError(null);
      const res = await fetch('/api/v1/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, slug })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTitle('');
        setSlug('');
        await loadPortfolios();
        onSelectPortfolio(data.data.portfolio);
      } else {
        setError(data.error?.message || 'Failed to create portfolio');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setCreating(false);
    }
  }

  function startEdit(p: PortfolioSummary) {
    setEditingId(p.id);
    setEditTitle(p.title);
    setEditSlug(p.slug);
    setEditStatus(p.status);
    setEditSections(p.sectionOrder || ['hero', 'projects', 'skills', 'experience', 'about', 'contact']);
  }

  async function handleSaveEdit(id: string) {
    try {
      setError(null);
      const res = await fetch(`/api/v1/portfolios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editTitle,
          slug: editSlug,
          status: editStatus,
          sectionOrder: editSections
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEditingId(null);
        await loadPortfolios();
      } else {
        setError(data.error?.message || 'Update failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to permanently delete this portfolio and all its projects?')) return;
    try {
      setError(null);
      const res = await fetch(`/api/v1/portfolios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        await loadPortfolios();
      } else {
        const data = await res.json();
        setError(data.error?.message || 'Delete failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  }

  function moveSection(index: number, direction: 'up' | 'down') {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= editSections.length) return;
    const copy = [...editSections];
    const [item] = copy.splice(index, 1);
    copy.splice(newIdx, 0, item);
    setEditSections(copy);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Create Portfolio Box */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-white mb-1">Create New Portfolio</h2>
        <p className="text-xs text-zinc-400 mb-4">Portfolios maintain their own projects, custom section order, and status.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            required
            placeholder="Portfolio Title (e.g. Design Studio 2026)"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
            }}
            className="px-3 py-2 text-xs bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            required
            placeholder="Public Slug (e.g. studio-2026)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="px-3 py-2 text-xs bg-zinc-950 border border-zinc-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={creating}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Portfolio'}
          </button>
        </form>
      </div>

      {/* Existing Portfolios List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Your Portfolios ({portfolios.length})</h3>
            <p className="text-xs text-zinc-400">Ownership re-derived on server • Data persisted in PostgreSQL</p>
          </div>
          <button onClick={loadPortfolios} className="text-xs text-blue-400 hover:underline font-mono">Refresh List</button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs font-mono text-zinc-400">Loading portfolios...</div>
        ) : portfolios.length === 0 ? (
          <EmptyState
            icon="🎨"
            title="No Portfolios Yet"
            description="Create your first portfolio using the form above, or import a resume to automatically generate your showcase."
          />
        ) : (
          <div className="space-y-4">
            {portfolios.map((p) => {
              const isSelected = p.id === activePortfolioId;
              const isEditing = p.id === editingId;

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-xl border transition ${
                    isSelected
                      ? 'bg-zinc-950/90 border-blue-500/50 shadow-lg shadow-blue-500/5'
                      : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-700 rounded text-white"
                        />
                        <input
                          type="text"
                          value={editSlug}
                          onChange={(e) => setEditSlug(e.target.value)}
                          className="px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-700 rounded text-white font-mono"
                        />
                        <select
                          value={editStatus}
                          onChange={(e: any) => setEditStatus(e.target.value)}
                          className="px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-700 rounded text-white"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>

                      {/* Section Order Reordering */}
                      <div className="p-3 bg-zinc-900/80 rounded border border-zinc-800">
                        <p className="text-[11px] font-mono text-zinc-400 uppercase mb-2">Section Order (Drag / Reorder):</p>
                        <div className="flex flex-wrap gap-2">
                          {editSections.map((sec, idx) => (
                            <div key={sec} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-200">
                              <span className="font-mono text-[11px]">{sec}</span>
                              <div className="flex gap-0.5">
                                {idx > 0 && <button type="button" onClick={() => moveSection(idx, 'up')} className="text-zinc-400 hover:text-white">↑</button>}
                                {idx < editSections.length - 1 && <button type="button" onClick={() => moveSection(idx, 'down')} className="text-zinc-400 hover:text-white">↓</button>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(p.id)}
                          className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded font-medium"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{p.title}</h4>
                          <span
                            className={`px-2 py-0.5 text-[10px] rounded font-mono border ${
                              p.status === 'published'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}
                          >
                            {p.status}
                          </span>
                          {isSelected && (
                            <span className="px-2 py-0.5 text-[10px] rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                              Active Workspace
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 font-mono mt-0.5">
                          slug: <span className="text-blue-400">{p.slug}</span> • Projects: {p.projectCount || 0}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-mono mt-1">
                          Sections: {p.sectionOrder?.join(' → ') || 'default'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectPortfolio(p)}
                          className={`px-3 py-1.5 text-xs font-medium rounded transition ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                          }`}
                        >
                          {isSelected ? 'Managing Projects' : 'Select Portfolio'}
                        </button>
                        {onOpenEditor && (
                          <button
                            onClick={() => onOpenEditor(p)}
                            className="px-3 py-1.5 text-xs font-semibold rounded bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm transition flex items-center gap-1"
                          >
                            <span>🎨 Editor</span>
                          </button>
                        )}
                        <button
                          onClick={() => startEdit(p)}
                          className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition"
                        >
                          Configure
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded border border-red-500/20 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
