import React, { useState, useEffect } from 'react';
import { CriticReportDto, CriticSeverity } from '@cove/shared';

interface Props {
  portfolioId: string;
  portfolioTitle: string;
  token?: string;
  onClose: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export function PortfolioCriticModal({
  portfolioId,
  portfolioTitle,
  token,
  onClose,
  onNavigateToSection
}: Props) {
  const [report, setReport] = useState<CriticReportDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dismissedItemIds, setDismissedItemIds] = useState<Set<string>>(new Set());
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeSeverityFilter, setActiveSeverityFilter] = useState<string>('all');

  async function fetchEvaluation() {
    if (!token || !portfolioId) {
      setError('Authentication token or portfolio identifier is required.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/v1/ai/critic/${portfolioId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok && data.success && data.data?.report) {
        setReport(data.data.report);
      } else {
        throw new Error(data.error?.message || 'Failed to evaluate portfolio.');
      }
    } catch (err: any) {
      console.error('Critic fetch error:', err);
      setError(err.message || 'An unexpected error occurred during evaluation.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvaluation();
  }, [portfolioId, token]);

  const handleDismiss = (id: string) => {
    setDismissedItemIds((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });
  };

  const getSeverityBadge = (severity: CriticSeverity) => {
    switch (severity) {
      case 'high':
        return (
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30">
            High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Recommended
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/30">
            Enhancement
          </span>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 70) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const activeItems = (report?.feedbackItems || []).filter((item) => {
    if (dismissedItemIds.has(item.id)) return false;
    if (activeCategoryFilter !== 'all' && item.category !== activeCategoryFilter) return false;
    if (activeSeverityFilter !== 'all' && item.severity !== activeSeverityFilter) return false;
    return true;
  });

  return (
    <div
      role="dialog"
      aria-labelledby="critic-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-lg text-violet-300 shadow-inner">
              🎯
            </div>
            <div>
              <h2 id="critic-modal-title" className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                <span>AI Portfolio Critic</span>
                <span className="text-xs font-normal text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">
                  {portfolioTitle}
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Actionable, dismissible design & narrative audit to elevate portfolio quality.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchEvaluation}
              disabled={loading}
              type="button"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-zinc-400"
              title="Re-run critic analysis"
            >
              <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Re-audit</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition focus-visible:ring-2 focus-visible:ring-zinc-400"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-zinc-300">Auditing narrative, visual density & mobile readiness...</p>
              <p className="text-xs text-zinc-500">Evaluating clarity, storytelling, media hierarchy, and contact discoverability</p>
            </div>
          )}

          {error && !loading && (
            <div className="p-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center space-y-3">
              <p className="text-sm text-rose-300 font-medium">{error}</p>
              <button
                onClick={fetchEvaluation}
                type="button"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
              >
                Retry Audit
              </button>
            </div>
          )}

          {report && !loading && (
            <>
              {/* Score & Dimension Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Overall Score */}
                <div className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center ${getScoreColor(report.overallScore)}`}>
                  <div className="text-4xl font-extrabold tracking-tight mb-1">
                    {report.overallScore}<span className="text-lg opacity-70 font-normal">/100</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {report.overallScore >= 85 ? 'Exemplary Craft' : report.overallScore >= 70 ? 'Strong Baseline' : 'Needs Polish'}
                  </span>
                  <p className="text-[11px] opacity-80 mt-1 max-w-[180px]">
                    Overall readiness score across all audited dimensions
                  </p>
                </div>

                {/* Dimension Bars */}
                <div className="md:col-span-2 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between space-y-2.5">
                  <div className="space-y-2">
                    {[
                      { label: 'Completeness & Discovery', val: report.breakdown.completeness },
                      { label: 'Storytelling & Context', val: report.breakdown.storytelling },
                      { label: 'Visual Hierarchy & Media', val: report.breakdown.visualHierarchy },
                      { label: 'Mobile Viewport Pacing', val: report.breakdown.mobileReadiness },
                      { label: 'Contact Friction', val: report.breakdown.contactClarity },
                    ].map((metric) => (
                      <div key={metric.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-400">{metric.label}</span>
                          <span className="font-mono text-zinc-200">{metric.val}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-500 rounded-full transition-all duration-500"
                            style={{ width: `${metric.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strengths Section */}
              {report.strengths && report.strengths.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>✓</span> Verified Strengths
                  </h3>
                  <ul className="space-y-1">
                    {report.strengths.map((str, idx) => (
                      <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actionable Feedback Section */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                      <span>Actionable Suggestions</span>
                      <span className="text-xs font-normal text-zinc-500">
                        ({activeItems.length} active)
                      </span>
                    </h3>
                  </div>

                  {/* Filter controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={activeCategoryFilter}
                      onChange={(e) => setActiveCategoryFilter(e.target.value)}
                      className="bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="all">All Topics</option>
                      <option value="completeness">Completeness</option>
                      <option value="narrative">Narrative</option>
                      <option value="visual_hierarchy">Visuals</option>
                      <option value="mobile">Mobile</option>
                      <option value="contact">Contact</option>
                    </select>

                    <select
                      value={activeSeverityFilter}
                      onChange={(e) => setActiveSeverityFilter(e.target.value)}
                      className="bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="all">All Severities</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Recommended</option>
                      <option value="low">Enhancement</option>
                    </select>
                  </div>
                </div>

                {activeItems.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-900/20 border border-zinc-800 rounded-xl space-y-2">
                    <span className="text-2xl">🎉</span>
                    <h4 className="text-sm font-semibold text-zinc-200">Zero Critical Polish Issues Outstanding</h4>
                    <p className="text-xs text-zinc-400">
                      All suggestions have been addressed or dismissed. Your portfolio is primed for publishing!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 transition space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getSeverityBadge(item.severity)}
                              <span className="text-xs font-semibold text-zinc-200">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDismiss(item.id)}
                            type="button"
                            className="text-xs text-zinc-500 hover:text-zinc-300 transition p-1 hover:bg-zinc-800 rounded"
                            title="Dismiss suggestion"
                          >
                            Dismiss
                          </button>
                        </div>

                        {/* Actionable recommendation box */}
                        <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between gap-3">
                          <div className="text-xs text-zinc-300 font-mono flex items-center gap-2">
                            <span className="text-violet-400">⚡</span>
                            <span>{item.actionableRecommendation}</span>
                          </div>

                          {item.affectedSection && onNavigateToSection && (
                            <button
                              onClick={() => {
                                onNavigateToSection(item.affectedSection!);
                                onClose();
                              }}
                              type="button"
                              className="shrink-0 px-2.5 py-1 text-[11px] font-medium rounded bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 transition"
                            >
                              Go to {item.affectedSection} →
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between text-xs text-zinc-500">
          <span>Engine: {report?.provider === 'claude' ? 'Claude 3.5 Sonnet' : 'Local Heuristic Rule Engine'}</span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
