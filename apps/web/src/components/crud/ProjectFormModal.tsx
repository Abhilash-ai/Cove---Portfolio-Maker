import React, { useState } from 'react';
import { ProjectDto, ProjectMediaDto } from '@cove/shared';
import { CoveCopilotModal } from '../copilot/CoveCopilotModal.js';

interface Props {
  portfolioId: string;
  token: string;
  project?: ProjectDto | null;
  onClose: () => void;
  onSaved: () => void;
}

export function ProjectFormModal({ portfolioId, token, project, onClose, onSaved }: Props) {
  const isEdit = Boolean(project);

  // 16 Fields
  const [title, setTitle] = useState(project?.title || '');
  const [year, setYear] = useState(project?.year || '');
  const [category, setCategory] = useState(project?.category || '');
  const [location, setLocation] = useState(project?.location || '');
  const [shortDescription, setShortDescription] = useState(project?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(project?.fullDescription || '');
  const [role, setRole] = useState(project?.role || '');
  const [toolsStr, setToolsStr] = useState(project?.tools ? project.tools.join(', ') : '');
  const [duration, setDuration] = useState(project?.duration || '');
  const [collaboratorsStr, setCollaboratorsStr] = useState(project?.collaborators ? project.collaborators.join(', ') : '');
  const [outcome, setOutcome] = useState(project?.outcome || '');
  const [githubLink, setGithubLink] = useState(project?.githubLink || '');
  const [customSectionOrderStr, setCustomSectionOrderStr] = useState(
    project?.customSectionOrder ? project.customSectionOrder.join(', ') : ''
  );

  // Copilot assistant state
  const [showCopilot, setShowCopilot] = useState(false);
  const [copilotField, setCopilotField] = useState<'title' | 'shortDescription' | 'fullDescription'>('fullDescription');

  // Media state
  const [mediaList, setMediaList] = useState<ProjectMediaDto[]>(project?.media || []);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setSaving(true);
      setError(null);

      const payload = {
        title: title.trim(),
        year: year.trim() || null,
        category: category.trim() || null,
        location: location.trim() || null,
        shortDescription: shortDescription || null,
        fullDescription: fullDescription || null,
        role: role.trim() || null,
        duration: duration.trim() || null,
        outcome: outcome || null,
        githubLink: githubLink.trim() || null,
        tools: toolsStr ? toolsStr.split(',').map((s) => s.trim()).filter(Boolean) : [],
        collaborators: collaboratorsStr ? collaboratorsStr.split(',').map((s) => s.trim()).filter(Boolean) : [],
        customSectionOrder: customSectionOrderStr
          ? customSectionOrderStr.split(',').map((s) => s.trim()).filter(Boolean)
          : null
      };

      const url = isEdit
        ? `/api/v1/projects/${project!.id}`
        : `/api/v1/portfolios/${portfolioId}/projects`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onSaved();
      } else {
        setError(data.error?.message || 'Save failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setSaving(false);
    }
  }

  // Media Upload handler
  async function handleFileUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (!project?.id) {
      alert('Please save the project first before uploading media.');
      return;
    }

    setUploading(true);
    setUploadProgress('Uploading file...');
    setError(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', project.id);

      try {
        const res = await fetch('/api/v1/media/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        const data = await res.json();
        if (res.ok && data.success && data.data.media) {
          setMediaList((prev) => [...prev, data.data.media]);
        } else {
          setError(data.error?.message || 'Upload failed');
        }
      } catch (err: any) {
        setError(err.message || 'Upload error');
      }
    }

    setUploading(false);
    setUploadProgress(null);
  }

  // Set Cover Image
  async function handleSetCover(mediaId: string) {
    if (!project?.id) return;
    try {
      const res = await fetch(`/api/v1/projects/${project.id}/media/${mediaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isCover: true })
      });
      if (res.ok) {
        setMediaList((prev) =>
          prev.map((m) => ({
            ...m,
            isCover: m.id === mediaId
          }))
        );
      }
    } catch (err) {
      console.error('Failed to set cover:', err);
    }
  }

  // Update Media Alt Text
  async function handleUpdateAlt(mediaId: string, altText: string) {
    if (!project?.id) return;
    try {
      await fetch(`/api/v1/projects/${project.id}/media/${mediaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ altText })
      });
      setMediaList((prev) =>
        prev.map((m) => (m.id === mediaId ? { ...m, altText } : m))
      );
    } catch (err) {
      console.error('Failed to update alt text:', err);
    }
  }

  // Delete Media
  async function handleDeleteMedia(mediaId: string) {
    if (!project?.id) return;
    try {
      const res = await fetch(`/api/v1/projects/${project.id}/media/${mediaId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== mediaId));
      }
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  }

  // Reorder Media
  async function handleReorderMedia(index: number, direction: 'left' | 'right') {
    if (!project?.id) return;
    const newIdx = direction === 'left' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= mediaList.length) return;

    const copy = [...mediaList];
    const [item] = copy.splice(index, 1);
    copy.splice(newIdx, 0, item);
    setMediaList(copy);

    try {
      await fetch(`/api/v1/projects/${project.id}/media/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mediaIds: copy.map((m) => m.id) })
      });
    } catch (err) {
      console.error('Failed to reorder media:', err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-3xl shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">
              {isEdit ? `Edit Project: ${project?.title}` : 'Create New Project'}
            </h2>
            <p className="text-xs text-zinc-400">Complete 16-field specification • Media upload with drag-and-drop</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-800 font-mono text-xs"
          >
            ✕ Close
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fjord Eco Pavilion"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Architecture, Spatial, Web"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
          </div>

          {/* Row 2: Year, Location, Role, Duration */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Stockholm"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Your Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Lead Designer"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="6 months"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-zinc-400 font-medium">Short Description</label>
              <button
                type="button"
                onClick={() => {
                  setCopilotField('shortDescription');
                  setShowCopilot(true);
                }}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/30 transition-colors"
              >
                <span>✨</span> Cove Copilot
              </button>
            </div>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="One-line summary for project cards"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
            />
          </div>

          {/* Full Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-zinc-400 font-medium">Full Description / Case Narrative</label>
              <button
                type="button"
                onClick={() => {
                  setCopilotField('fullDescription');
                  setShowCopilot(true);
                }}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/30 transition-colors"
              >
                <span>✨</span> Cove Copilot (Case Study / Tone)
              </button>
            </div>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="In-depth project breakdown, methodology, and context..."
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
            />
          </div>

          {/* Tools & Collaborators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Tools / Software (comma-separated)</label>
              <input
                type="text"
                value={toolsStr}
                onChange={(e) => setToolsStr(e.target.value)}
                placeholder="Rhino, Blender, React, Figma"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Collaborators (comma-separated)</label>
              <input
                type="text"
                value={collaboratorsStr}
                onChange={(e) => setCollaboratorsStr(e.target.value)}
                placeholder="Studio ABC, Structural Engineering"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
          </div>

          {/* Outcome & GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Outcome / Results</label>
              <input
                type="text"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder="Award winner, 50k users, completed on time"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">GitHub / Source Repository Link</label>
              <input
                type="url"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white font-mono focus:border-blue-500"
              />
            </div>
          </div>

          {/* Profession-Specific Section Order */}
          <div>
            <label className="block text-zinc-400 mb-1 font-medium">
              Optional Custom Section Order (comma-separated)
            </label>
            <input
              type="text"
              value={customSectionOrderStr}
              onChange={(e) => setCustomSectionOrderStr(e.target.value)}
              placeholder="e.g. Concept, Materiality, Plans, Sections, Renders"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white font-mono focus:border-blue-500"
            />
          </div>

          {/* Media Upload Abstraction Section */}
          <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono uppercase text-zinc-300 font-semibold text-[11px]">
                Project Media Gallery ({mediaList.length})
              </h3>
              {uploadProgress && (
                <span className="text-[11px] font-mono text-blue-400 animate-pulse">{uploadProgress}</span>
              )}
            </div>

            {isEdit ? (
              <>
                {/* Drag-and-drop Dropzone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFileUpload(e.dataTransfer.files);
                  }}
                  className={`p-6 border-2 border-dashed rounded-xl text-center transition cursor-pointer ${
                    dragOver
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                  onClick={() => document.getElementById('project-media-input')?.click()}
                >
                  <input
                    id="project-media-input"
                    type="file"
                    multiple
                    accept="image/*,video/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <p className="text-zinc-300 font-medium">
                    {uploading ? 'Processing file...' : 'Drag & drop media files here, or click to browse'}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">
                    Supports Images (JPG, PNG, WebP, SVG), Videos (MP4, WebM), and PDFs up to 50MB
                  </p>
                </div>

                {/* Media Thumbnails Grid */}
                {mediaList.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {mediaList.map((m, idx) => (
                      <div
                        key={m.id}
                        className={`p-2 rounded-lg border bg-zinc-900 relative ${
                          m.isCover ? 'border-blue-500' : 'border-zinc-800'
                        }`}
                      >
                        <div className="h-28 bg-zinc-950 rounded overflow-hidden flex items-center justify-center mb-2 relative">
                          {m.type === 'IMAGE' ? (
                            <img src={m.url} alt={m.altText || ''} className="w-full h-full object-cover" />
                          ) : (
                            <div className="font-mono text-[10px] text-zinc-400 uppercase">{m.type} file</div>
                          )}
                          {m.isCover && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-[9px] font-mono text-white rounded">
                              COVER
                            </span>
                          )}
                        </div>

                        {/* Alt text field */}
                        <input
                          type="text"
                          placeholder="Alt text"
                          defaultValue={m.altText || ''}
                          onBlur={(e) => handleUpdateAlt(m.id, e.target.value)}
                          className="w-full px-2 py-1 text-[10px] bg-zinc-950 border border-zinc-800 rounded text-zinc-300 mb-1.5"
                        />

                        {/* Controls */}
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex gap-1">
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => handleReorderMedia(idx, 'left')}
                                className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300 hover:text-white"
                              >
                                ←
                              </button>
                            )}
                            {idx < mediaList.length - 1 && (
                              <button
                                type="button"
                                onClick={() => handleReorderMedia(idx, 'right')}
                                className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-300 hover:text-white"
                              >
                                →
                              </button>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {!m.isCover && (
                              <button
                                type="button"
                                onClick={() => handleSetCover(m.id)}
                                className="px-1.5 py-0.5 text-blue-400 hover:text-blue-300 rounded hover:bg-blue-500/10"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteMedia(m.id)}
                              className="px-1.5 py-0.5 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-zinc-500 text-[11px] italic">
                Save this project first to enable media upload.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg uppercase tracking-wider disabled:opacity-50"
            >
              {saving ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>

      {/* Cove Copilot Assistant Modal */}
      {showCopilot && (
        <CoveCopilotModal
          token={token}
          contextTitle={title || 'Project Draft'}
          initialText={copilotField === 'shortDescription' ? shortDescription : fullDescription}
          contextType="project"
          metadata={{
            title,
            category,
            role,
            tools: toolsStr ? toolsStr.split(',').map((s) => s.trim()) : [],
            images: mediaList.map((m) => ({ id: m.id, url: m.url, caption: m.caption || undefined, altText: m.altText || undefined }))
          }}
          onApply={(newText, metaUpdates) => {
            if (copilotField === 'shortDescription') {
              setShortDescription(newText);
            } else {
              setFullDescription(newText);
              if (metaUpdates?.caseStudy?.outcome && !outcome) {
                setOutcome(metaUpdates.caseStudy.outcome);
              }
            }
          }}
          onClose={() => setShowCopilot(false)}
        />
      )}
    </div>
  );
}
