import React, { useEffect, useState } from 'react';
import { ViewportMode, SaveStatus } from './editorTypes.js';
import { PortfolioSummary } from '@cove/shared';
import { ArrowLeft, Monitor, Tablet, Smartphone, Undo2, Redo2, Eye, FileText, Sparkles, Target, ExternalLink, Check, Copy, X } from 'lucide-react';

interface Props {
  portfolio: PortfolioSummary | null;
  viewport: ViewportMode;
  scale: number;
  saveStatus: SaveStatus;
  canUndo: boolean;
  canRedo: boolean;
  onSetViewport: (v: ViewportMode) => void;
  onSetScale: (scale: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSaveNow: () => void;
  onBack: () => void;
  onPreviewPublic: () => void;
  onExportPdf?: () => void;
  onOpenCopilot?: () => void;
  onOpenCritic?: () => void;
}

export function EditorTopBar({
  portfolio,
  viewport,
  scale,
  saveStatus,
  canUndo,
  canRedo,
  onSetViewport,
  onSetScale,
  onUndo,
  onRedo,
  onSaveNow,
  onBack,
  onPreviewPublic,
  onExportPdf,
  onOpenCopilot,
  onOpenCritic,
}: Props) {
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handlePublish() {
    if (!portfolio?.id) return;
    try {
      setPublishing(true);
      setPublishError(null);
      const token = localStorage.getItem('cove_token');
      const res = await fetch(`/api/v1/portfolios/${portfolio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: 'published' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const liveSlug = data.data?.portfolio?.slug || portfolio.slug;
        const liveUrl = `${window.location.origin}/p/${liveSlug}`;
        setPublishedUrl(liveUrl);
      } else {
        setPublishError(data.error?.message || 'Publishing failed');
      }
    } catch (err: any) {
      setPublishError(err.message || 'Network error while publishing');
    } finally {
      setPublishing(false);
    }
  }

  // Listen for keyboard shortcuts: Cmd/Ctrl + Z, Cmd/Ctrl + Shift + Z
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          if (canRedo) onRedo();
        } else {
          if (canUndo) onUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        if (canRedo) onRedo();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, onUndo, onRedo]);

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md px-4 flex items-center justify-between z-30 shrink-0 select-none text-zinc-900 dark:text-white transition-colors">
      {/* 1. Left: Back & Portfolio Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors font-medium"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate max-w-[180px] sm:max-w-xs">
            {portfolio ? portfolio.title : 'Loading...'}
          </span>
          {portfolio?.slug && (
            <span className="text-[11px] font-mono text-[#FF6B4A] bg-[#FF6B4A]/10 px-2 py-0.5 rounded-md border border-[#FF6B4A]/20 font-semibold">
              /{portfolio.slug}
            </span>
          )}
        </div>
      </div>

      {/* 2. Center: Viewport Mode Switcher & Scale */}
      <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => onSetViewport('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            viewport === 'desktop'
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
          title="Desktop Full Fluid View"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Desktop</span>
        </button>

        <button
          onClick={() => onSetViewport('tablet')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            viewport === 'tablet'
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
          title="Tablet 768px View"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tablet</span>
          <span className="text-[10px] opacity-60">768</span>
        </button>

        <button
          onClick={() => onSetViewport('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            viewport === 'mobile'
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
          title="Mobile 375px View (Simulates Touch Screen)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mobile</span>
          <span className="text-[10px] opacity-60">375</span>
        </button>

        <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

        {/* Zoom controls */}
        <select
          value={scale}
          onChange={(e) => onSetScale(parseFloat(e.target.value))}
          className="bg-transparent text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 focus:outline-none cursor-pointer pr-1 font-mono"
        >
          <option value={1} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">100%</option>
          <option value={0.85} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">85%</option>
          <option value={0.75} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">75%</option>
          <option value={0.5} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">50%</option>
        </select>
      </div>

      {/* 3. Right: Undo, Redo, Auto-save status, Live Preview */}
      <div className="flex items-center gap-2">
        {/* Undo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-1.5 rounded-lg border text-xs transition-colors ${
            canUndo
              ? 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm'
              : 'border-transparent text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>

        {/* Redo */}
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-1.5 rounded-lg border text-xs transition-colors ${
            canRedo
              ? 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm'
              : 'border-transparent text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

        {/* Save indicator */}
        <button
          onClick={onSaveNow}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors font-medium"
          title="Click to force save"
        >
          {saveStatus === 'saving' && (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-500 font-mono text-[11px]">Saving...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-zinc-600 dark:text-zinc-400 text-[11px] font-mono">Saved</span>
            </>
          )}
          {saveStatus === 'unsaved' && (
            <>
              <span className="w-2 h-2 rounded-full bg-[#FF6B4A] animate-pulse" />
              <span className="text-[#FF6B4A] text-[11px] font-mono">Unsaved</span>
            </>
          )}
        </button>

        {/* Export PDF button */}
        {onExportPdf && (
          <button
            onClick={onExportPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all shadow-sm"
            title="Export as paginated PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        )}

        {/* Cove Copilot Assistant button */}
        {onOpenCopilot && (
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#FF6B4A]/30 bg-[#FF6B4A]/10 text-[#FF6B4A] hover:bg-[#FF6B4A]/20 transition-all shadow-sm"
            title="Open Cove Copilot AI Writing Assistant"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copilot</span>
          </button>
        )}

        {/* AI Portfolio Critic button */}
        {onOpenCritic && (
          <button
            onClick={onOpenCritic}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300 hover:bg-violet-500/20 transition-all shadow-sm"
            title="Open AI Portfolio Critic"
          >
            <Target className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Critic</span>
          </button>
        )}

        {/* Live Site link */}
        {portfolio?.slug && (
          <a
            href={`/p/${portfolio.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
            title="View Live Public URL"
          >
            <span>Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {/* Preview Modal button */}
        <button
          onClick={onPreviewPublic}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all border border-zinc-200 dark:border-zinc-700 shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview</span>
        </button>

        {/* Real Publish Button */}
        <button
          onClick={handlePublish}
          disabled={publishing || !portfolio}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#FF6B4A] hover:bg-[#F04E27] text-white shadow-soft transition-all disabled:opacity-50"
          title="Publish live to public URL"
        >
          <span>{publishing ? 'Publishing...' : 'Publish'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Published Live URL Modal Dialog */}
      {publishedUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-base text-zinc-900 dark:text-white">Portfolio Published Live!</h3>
              </div>
              <button
                onClick={() => setPublishedUrl(null)}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
              Your portfolio is now live and accessible to the public at this URL:
            </p>

            <div className="flex items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-5">
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 truncate flex-1 select-all">
                {publishedUrl}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(publishedUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-1.5 rounded-lg text-xs font-medium bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition flex items-center gap-1 shrink-0"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setPublishedUrl(null)}
                className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Close
              </button>
              <a
                href={publishedUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {publishError && (
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl shadow-lg flex items-center gap-2 text-xs">
          <span>Failed to publish: {publishError}</span>
          <button onClick={() => setPublishError(null)} className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
}
