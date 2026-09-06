import React, { useEffect } from 'react';
import { ViewportMode, SaveStatus } from './editorTypes.js';
import { PortfolioSummary } from '@cove/shared';

interface Props {
  portfolio: PortfolioSummary | null;
  viewport: ViewportMode;
  scale: number;
  saveStatus: SaveStatus;
  canUndo: boolean;
  canRedo: boolean;
  onSetViewport: (v: ViewportMode) => void;
  onSetScale: (s: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSaveNow: () => void;
  onBack: () => void;
  onPreviewPublic: () => void;
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
}: Props) {
  // Global keyboard shortcuts: Ctrl+Z for undo, Ctrl+Y or Ctrl+Shift+Z for redo
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) onUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        if (canRedo) onRedo();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, onUndo, onRedo]);

  return (
    <header className="h-14 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-4 flex items-center justify-between z-30 shrink-0 select-none">
      {/* 1. Left: Back & Portfolio Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-zinc-900 transition-colors"
          title="Back to Dashboard"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Dashboard</span>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-zinc-100 truncate max-w-[180px] sm:max-w-xs">
            {portfolio ? portfolio.title : 'Loading...'}
          </span>
          {portfolio?.slug && (
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              /{portfolio.slug}
            </span>
          )}
        </div>
      </div>

      {/* 2. Center: Viewport Mode Switcher & Scale */}
      <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
        <button
          onClick={() => onSetViewport('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            viewport === 'desktop'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Desktop Full Fluid View"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline">Desktop</span>
        </button>

        <button
          onClick={() => onSetViewport('tablet')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            viewport === 'tablet'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Tablet 768px View"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline">Tablet</span>
          <span className="text-[10px] opacity-60">768</span>
        </button>

        <button
          onClick={() => onSetViewport('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            viewport === 'mobile'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Mobile 375px View (Simulates Touch Screen)"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline">Mobile</span>
          <span className="text-[10px] opacity-60">375</span>
        </button>

        <div className="h-3 w-px bg-zinc-800 mx-1" />

        {/* Zoom controls */}
        <select
          value={scale}
          onChange={(e) => onSetScale(parseFloat(e.target.value))}
          className="bg-transparent text-xs text-zinc-400 hover:text-zinc-200 focus:outline-none cursor-pointer pr-1"
        >
          <option value={1} className="bg-zinc-900 text-white">100%</option>
          <option value={0.85} className="bg-zinc-900 text-white">85%</option>
          <option value={0.75} className="bg-zinc-900 text-white">75%</option>
          <option value={0.5} className="bg-zinc-900 text-white">50%</option>
        </select>
      </div>

      {/* 3. Right: Undo, Redo, Auto-save status, Live Preview */}
      <div className="flex items-center gap-2">
        {/* Undo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-1.5 rounded-md border text-xs transition-colors ${
            canUndo
              ? 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
              : 'border-transparent text-zinc-600 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2m0 0l-4-4m4 4l4-4" transform="matrix(-1 0 0 1 24 0)" />
          </svg>
        </button>

        {/* Redo */}
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-1.5 rounded-md border text-xs transition-colors ${
            canRedo
              ? 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
              : 'border-transparent text-zinc-600 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a5 5 0 00-5 5v2m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>

        <div className="h-4 w-px bg-zinc-800 mx-0.5" />

        {/* Save indicator */}
        <button
          onClick={onSaveNow}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 transition-colors"
          title="Click to force save"
        >
          {saveStatus === 'saving' && (
            <>
              <svg className="animate-spin w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="text-amber-400">Saving...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-zinc-400 text-[11px]">Saved</span>
            </>
          )}
          {saveStatus === 'unsaved' && (
            <>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 text-[11px]">Unsaved</span>
            </>
          )}
        </button>

        {/* Live Site link if published or configured */}
        {portfolio?.slug && (
          <a
            href={`/p/${portfolio.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
            title="View Live Public URL"
          >
            <span>Live Site</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {/* Preview Modal button */}
        <button
          onClick={onPreviewPublic}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-900 hover:bg-white hover:shadow transition-all"
        >
          <span>Preview</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
