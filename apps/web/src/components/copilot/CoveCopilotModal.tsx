import React, { useState } from 'react';
import { CopilotCommand, CopilotOutput } from '@cove/shared';

interface Props {
  token: string;
  contextTitle?: string;
  initialText: string;
  contextType?: 'project' | 'profile' | 'portfolio';
  metadata?: {
    title?: string;
    category?: string;
    role?: string;
    tools?: string[];
    images?: { id?: string; url: string; caption?: string; altText?: string }[];
  };
  onApply: (newText: string, metadataUpdates?: any) => void;
  onClose: () => void;
}

export function CoveCopilotModal({
  token,
  contextTitle,
  initialText,
  contextType = 'project',
  metadata,
  onApply,
  onClose
}: Props) {
  const [activeCommand, setActiveCommand] = useState<CopilotCommand>('make_professional');
  const [inputText, setInputText] = useState(initialText);
  const [proposedText, setProposedText] = useState('');
  const [editableProposal, setEditableProposal] = useState('');
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [copilotOutput, setCopilotOutput] = useState<CopilotOutput | null>(null);
  const [undoHistory, setUndoHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const COMMANDS: { id: CopilotCommand; label: string; icon: string; desc: string }[] = [
    { id: 'make_professional', label: 'Make More Professional', icon: '✨', desc: 'Elevate tone to authoritative active voice and executive vocabulary.' },
    { id: 'make_shorter', label: 'Make Shorter & Punchier', icon: '✂️', desc: 'Prune fluff and condense to high-impact essentials.' },
    { id: 'suggest_title', label: 'Suggest Better Title', icon: '💡', desc: 'Generate evocative, memorable project titles.' },
    { id: 'turn_case_study', label: 'Turn into Case Study', icon: '📐', desc: 'Structure into Challenge, Approach, Implementation & Outcome.' },
    { id: 'which_images', label: 'Media Curation Advice', icon: '🖼️', desc: 'Recommend Hero vs Process vs Detail framing for assets.' },
  ];

  async function handleRunCommand(cmd: CopilotCommand) {
    setActiveCommand(cmd);
    setLoading(true);
    setError(null);
    setAppliedNotice(null);

    try {
      const res = await fetch('/api/v1/ai/copilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          command: cmd,
          contextType,
          text: inputText,
          metadata: {
            ...metadata,
            title: metadata?.title || contextTitle
          }
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'Failed to generate AI suggestion');
      }

      const output: CopilotOutput = data.data;
      setCopilotOutput(output);
      setProposedText(output.suggestion);
      setEditableProposal(output.suggestion);
      setIsEditingProposal(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while contacting Cove Copilot');
    } finally {
      setLoading(false);
    }
  }

  function handleAccept() {
    if (!proposedText && !editableProposal) return;
    const finalContent = isEditingProposal ? editableProposal : proposedText;

    // Save previous state to undo stack
    setUndoHistory((prev) => [inputText, ...prev]);

    // Apply to parent
    onApply(finalContent, {
      caseStudy: copilotOutput?.caseStudy,
      imageRecommendations: copilotOutput?.imageRecommendations
    });

    // Notify user
    setAppliedNotice('Changes applied successfully! You can undo at any time.');
    setInputText(finalContent);
  }

  function handleUndo() {
    if (undoHistory.length === 0) return;
    const [previousState, ...remaining] = undoHistory;
    setUndoHistory(remaining);
    setInputText(previousState);
    setProposedText('');
    setCopilotOutput(null);
    onApply(previousState);
    setAppliedNotice('Restored original content via Undo.');
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-base shadow-inner">
              ✨
            </div>
            <div>
              <h2 className="text-stone-100 text-base font-semibold tracking-tight">
                Cove Copilot <span className="text-stone-400 text-xs font-normal">Writing & Curation Assistant</span>
              </h2>
              {contextTitle && (
                <p className="text-stone-400 text-xs truncate max-w-md">Target: <span className="text-stone-300 font-medium">{contextTitle}</span></p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {copilotOutput && (
              <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full border ${
                copilotOutput.provider === 'claude'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
              }`}>
                {copilotOutput.provider === 'claude' ? '● Claude 3.5 Sonnet' : '● Demo Mode (Local Engine)'}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 hover:text-stone-200 transition-colors p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Notice & Status banner */}
        {appliedNotice && (
          <div className="px-6 py-2 bg-emerald-950/40 border-b border-emerald-800/40 text-emerald-300 text-xs flex items-center justify-between">
            <span>✓ {appliedNotice}</span>
            {undoHistory.length > 0 && (
              <button
                type="button"
                onClick={handleUndo}
                className="underline font-semibold hover:text-emerald-100 transition-colors ml-4"
              >
                Undo Last Change
              </button>
            )}
          </div>
        )}

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Command Selector Pills */}
          <div>
            <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-2.5">
              Select Editorial Action
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {COMMANDS.map((cmd) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => handleRunCommand(cmd.id)}
                  disabled={loading}
                  className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                    activeCommand === cmd.id && copilotOutput
                      ? 'bg-indigo-950/30 border-indigo-500 text-white shadow-md'
                      : 'bg-stone-800/40 border-stone-700/60 text-stone-300 hover:bg-stone-800 hover:border-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium text-xs mb-1">
                    <span>{cmd.icon}</span>
                    <span>{cmd.label}</span>
                  </div>
                  <span className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">
                    {cmd.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-stone-400 font-medium">Cove Copilot is composing suggestions...</p>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 text-xs">
              ⚠️ {error}
            </div>
          )}

          {/* Results Comparison Workspace */}
          {copilotOutput && !loading && (
            <div className="space-y-4 pt-2 border-t border-stone-800/60">
              {/* Editorial rationale callout */}
              <div className="p-3.5 rounded-xl bg-stone-800/60 border border-stone-700/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-200">
                  <span className="flex items-center gap-1.5">
                    <span>🧠</span> Editorial Rationale
                  </span>
                  <span className="text-[11px] text-indigo-400 font-normal">
                    {copilotOutput.diffSummary}
                  </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {copilotOutput.rationale}
                </p>
              </div>

              {/* Title Suggestions (if command was suggest_title) */}
              {copilotOutput.titles && copilotOutput.titles.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-stone-400">Curated Title Options:</label>
                  <div className="grid grid-cols-1 gap-2">
                    {copilotOutput.titles.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setProposedText(t);
                          setEditableProposal(t);
                        }}
                        className={`text-left px-3.5 py-2.5 rounded-lg text-xs transition-colors border ${
                          proposedText === t
                            ? 'bg-indigo-600/30 border-indigo-500 text-white font-medium'
                            : 'bg-stone-800/40 border-stone-700/50 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Side-by-Side Diff / Before-After */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-stone-400 px-1">
                    <span>Current Draft</span>
                    <span className="text-[10px] text-stone-400">{inputText.length} chars</span>
                  </div>
                  <div className="flex-1 p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 text-stone-400 text-xs font-sans whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                    {inputText || <span className="italic text-stone-400">No initial text</span>}
                  </div>
                </div>

                {/* After (Proposed) */}
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-indigo-300 px-1">
                    <span>Proposed Enhancement</span>
                    <button
                      type="button"
                      onClick={() => setIsEditingProposal(!isEditingProposal)}
                      className="text-[11px] text-stone-400 hover:text-stone-200 underline"
                    >
                      {isEditingProposal ? 'Finish Editing' : '✏️ Fine-tune Proposal'}
                    </button>
                  </div>

                  {isEditingProposal ? (
                    <textarea
                      value={editableProposal}
                      onChange={(e) => setEditableProposal(e.target.value)}
                      rows={8}
                      className="w-full p-3.5 rounded-xl bg-stone-950 border border-indigo-500/60 text-stone-100 text-xs font-sans leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                    />
                  ) : (
                    <div className="flex-1 p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-stone-200 text-xs font-sans whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {editableProposal}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-800 bg-stone-950/60">
          <div>
            {undoHistory.length > 0 && (
              <button
                type="button"
                onClick={handleUndo}
                className="px-3.5 py-1.5 rounded-lg border border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
              >
                ↶ Undo Last ({undoHistory.length})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-medium transition-colors"
            >
              Close
            </button>

            {copilotOutput && (
              <button
                type="button"
                onClick={handleAccept}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
              >
                ✓ Apply to Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
