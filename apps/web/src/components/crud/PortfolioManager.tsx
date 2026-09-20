import React, { useState, useEffect } from 'react';
import { PortfolioSummary, FullProfileDto } from '@cove/shared';
import { Sparkles, FileText, Plus, RefreshCw, ExternalLink, Trash2, Sliders, CheckCircle2 } from 'lucide-react';
import { ResumeUploadModal } from '../resume/ResumeUploadModal.js';

interface Props {
  token: string;
  onSelectPortfolio: (portfolio: PortfolioSummary) => void;
  onOpenEditor?: (portfolio: PortfolioSummary) => void;
  activePortfolioId?: string;
  userName?: string;
}

export function PortfolioManager({
  token,
  onSelectPortfolio,
  onOpenEditor,
  activePortfolioId,
  userName = 'Creator',
}: Props) {
  const [portfolios, setPortfolios] = useState<PortfolioSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New portfolio state & creation UI toggle
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [creating, setCreating] = useState(false);

  // Resume modal state
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [profile, setProfile] = useState<FullProfileDto | null>(null);

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editStatus, setEditStatus] = useState<'draft' | 'published'>('draft');
  const [editSections, setEditSections] = useState<string[]>([]);

  useEffect(() => {
    loadPortfolios();
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await fetch('/api/v1/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(data.data.profile);
      }
    } catch {
      // Profile load is optional here
    }
  }

  async function loadPortfolios() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/v1/portfolios/mine', {
        headers: { Authorization: `Bearer ${token}` },
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, slug }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTitle('');
        setSlug('');
        setShowCreateForm(false);
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          slug: editSlug,
          status: editStatus,
          sectionOrder: editSections,
        }),
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
        headers: { Authorization: `Bearer ${token}` },
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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* First-Run Experience (When user has 0 portfolios) */}
      {!loading && portfolios.length === 0 && !showCreateForm && (
        <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-soft transition-colors">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF6B4A]/10 text-[#FF6B4A] border border-[#FF6B4A]/20 mb-4">
              <span>First-Run Setup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Welcome to Cove, {userName}! 👋
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Let's create your personal showcase. Choose how you want to build your first portfolio:
            </p>
          </div>

          {/* Two Side-by-Side Primary Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Card 1: Resume Upload */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#FF6B4A]/50 transition-all duration-300 shadow-soft hover:shadow-soft-lg group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  Upload your resume
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Have an existing resume? Upload your PDF or paste text to automatically extract experience, skills, and projects with AI.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => setShowResumeModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#FF6B4A] hover:bg-[#F04E27] text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-coral transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Upload Resume</span>
                </button>
              </div>
            </div>

            {/* Card 2: Start from Scratch */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#FF6B4A]/50 transition-all duration-300 shadow-soft hover:shadow-soft-lg group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  Start from scratch
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Set up a clean, blank portfolio canvas with your choice of title and custom URL slug. Add projects and sections as you go.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(true)}
                  className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-semibold shadow-soft transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#FF6B4A]" />
                  <span>Create from Scratch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creation Box (Shown if user clicks to create or already has portfolios and wants another) */}
      {showCreateForm && (
        <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-soft transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                Create New Portfolio
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Each portfolio gets its own projects, customized sections, and public slug.
              </p>
            </div>
            {portfolios.length > 0 && (
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                Cancel
              </button>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Portfolio Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Design Showcase 2026"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                }}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Public Slug (URL)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. alex-showcase"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-mono focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={creating}
                className="flex-1 py-2.5 px-4 bg-[#FF6B4A] hover:bg-[#F04E27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition shadow-soft hover:shadow-coral disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Save & Start'}
              </button>
              {portfolios.length === 0 && (
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="py-2.5 px-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                >
                  Back
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Existing Portfolios List */}
      {(portfolios.length > 0 || (!loading && showCreateForm)) && (
        <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-soft transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6 gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>Your Portfolios</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                  {portfolios.length}
                </span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Manage your live showcases, customize projects, and configure templates.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowResumeModal(true)}
                className="px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#FF6B4A]" />
                <span>Import Resume</span>
              </button>
              {!showCreateForm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#FF6B4A] hover:bg-[#F04E27] rounded-xl shadow-soft transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Portfolio</span>
                </button>
              )}
              <button
                onClick={loadPortfolios}
                title="Refresh list"
                className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-xs font-mono text-zinc-400">
              Loading portfolios...
            </div>
          ) : portfolios.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-xs text-zinc-500">No portfolios created yet. Use the form above to add one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolios.map((p) => {
                const isSelected = p.id === activePortfolioId;
                const isEditing = p.id === editingId;

                return (
                  <div
                    key={p.id}
                    className={`p-5 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-orange-50/50 dark:bg-zinc-950 border-[#FF6B4A]/50 shadow-soft'
                        : 'bg-white dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-soft'
                    }`}
                  >
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Title"
                            className="px-3.5 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
                          />
                          <input
                            type="text"
                            value={editSlug}
                            onChange={(e) => setEditSlug(e.target.value)}
                            placeholder="Slug"
                            className="px-3.5 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-mono"
                          />
                          <select
                            value={editStatus}
                            onChange={(e: any) => setEditStatus(e.target.value)}
                            className="px-3.5 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>

                        {/* Section Order Reordering */}
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                          <p className="text-[11px] font-mono text-zinc-500 uppercase mb-2">
                            Section Order:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {editSections.map((sec, idx) => (
                              <div
                                key={sec}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs text-zinc-800 dark:text-zinc-200 shadow-sm"
                              >
                                <span className="font-mono text-[11px]">{sec}</span>
                                <div className="flex gap-1 ml-1 text-zinc-400">
                                  {idx > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => moveSection(idx, 'up')}
                                      className="hover:text-zinc-900 dark:hover:text-white"
                                    >
                                      ↑
                                    </button>
                                  )}
                                  {idx < editSections.length - 1 && (
                                    <button
                                      type="button"
                                      onClick={() => moveSection(idx, 'down')}
                                      className="hover:text-zinc-900 dark:hover:text-white"
                                    >
                                      ↓
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="px-3.5 py-1.5 text-xs bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(p.id)}
                            className="px-4 py-1.5 text-xs bg-[#FF6B4A] hover:bg-[#F04E27] text-white rounded-xl font-semibold shadow-soft"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                              {p.title}
                            </h4>
                            <span
                              className={`px-2.5 py-0.5 text-[10px] font-medium rounded-full border ${
                                p.status === 'published'
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                              }`}
                            >
                              {p.status}
                            </span>
                            {isSelected && (
                              <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-[#FF6B4A]/10 text-[#FF6B4A] border border-[#FF6B4A]/20">
                                Active Workspace
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1 flex items-center gap-2">
                            <span>
                              slug:{' '}
                              <span className="text-[#FF6B4A] font-semibold">/{p.slug}</span>
                            </span>
                            <span>•</span>
                            <span>Projects: {p.projectCount || 0}</span>
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => onSelectPortfolio(p)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                              isSelected
                                ? 'bg-[#FF6B4A] text-white shadow-soft'
                                : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                            }`}
                          >
                            {isSelected ? 'Managing' : 'Select'}
                          </button>
                          {onOpenEditor && (
                            <button
                              onClick={() => onOpenEditor(p)}
                              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#FF6B4A] to-rose-500 hover:from-[#F04E27] hover:to-rose-600 text-white shadow-soft transition flex items-center gap-1"
                            >
                              <span>🎨 Editor</span>
                            </button>
                          )}
                          <button
                            onClick={() => startEdit(p)}
                            className="px-2.5 py-1.5 text-xs bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl transition"
                          >
                            Configure
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-2.5 py-1.5 text-xs bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-xl transition"
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
      )}

      {/* Resume Upload Modal */}
      {showResumeModal && (
        <ResumeUploadModal
          token={token}
          currentProfile={profile}
          onClose={() => setShowResumeModal(false)}
          onSuccess={() => {
            setShowResumeModal(false);
            loadPortfolios();
          }}
        />
      )}
    </div>
  );
}
