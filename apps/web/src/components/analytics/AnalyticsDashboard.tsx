import React, { useEffect, useState } from 'react';
import { PortfolioSummary } from '@cove/shared';

interface Props {
  portfolio: PortfolioSummary;
  token: string;
  onRefreshPortfolio?: () => void;
}

interface AnalyticsData {
  portfolioId: string;
  slug: string;
  totalViews: number;
  uniqueVisitors: number;
  projectClicks: number;
  linkClicks: number;
  devices: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  dailyViews: { date: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
}

export function AnalyticsDashboard({ portfolio, token, onRefreshPortfolio }: Props) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [portfolio.id]);

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/v1/public/portfolios/${portfolio.id}/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data.analytics);
      } else {
        setError(json.error?.message || 'Failed to load analytics');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function togglePublishStatus() {
    try {
      setPublishing(true);
      const nextStatus = portfolio.status === 'published' ? 'draft' : 'published';
      const res = await fetch(`/api/v1/portfolios/${portfolio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        if (onRefreshPortfolio) onRefreshPortfolio();
      }
    } catch (err) {
      console.error('Toggle status error:', err);
    } finally {
      setPublishing(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center text-xs font-mono text-zinc-400 max-w-5xl mx-auto">
        Loading analytics metrics...
      </div>
    );
  }

  const isPublished = portfolio.status === 'published';
  const publicUrl = `${window.location.origin}/p/${portfolio.slug}`;

  // Calculate percentages
  const totalDev = (data?.devices.desktop || 0) + (data?.devices.tablet || 0) + (data?.devices.mobile || 0) || 1;
  const desktopPct = Math.round(((data?.devices.desktop || 0) / totalDev) * 100);
  const tabletPct = Math.round(((data?.devices.tablet || 0) / totalDev) * 100);
  const mobilePct = Math.round(((data?.devices.mobile || 0) / totalDev) * 100);

  const maxDayViews = Math.max(...(data?.dailyViews.map((d) => d.views) || [1]), 1);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Publishing & Public URL Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">{portfolio.title}</h2>
            <span
              className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                isPublished
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {isPublished ? '● Live Online' : 'Draft Only'}
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Public Link:{' '}
            {isPublished ? (
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 underline font-semibold"
              >
                {publicUrl}
              </a>
            ) : (
              <span className="text-zinc-500">{publicUrl} (Unpublished)</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isPublished && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition flex items-center gap-1.5"
            >
              <span>Visit Live</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <button
            onClick={togglePublishStatus}
            disabled={publishing}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition ${
              isPublished
                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20'
            }`}
          >
            {publishing ? 'Updating...' : isPublished ? 'Unpublish' : '🚀 Publish Live'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded-xl">
          {error}
        </div>
      )}

      {/* 2. Four Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Views */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Total Views</span>
            <div className="w-6 h-6 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2 font-mono">{data?.totalViews || 0}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Zero-cookie tracked</p>
        </div>

        {/* Unique Visitors */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Unique Visitors</span>
            <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2 font-mono">{data?.uniqueVisitors || 0}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Hashed daily identities</p>
        </div>

        {/* Project Clicks */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Case Study Opens</span>
            <div className="w-6 h-6 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2 font-mono">{data?.projectClicks || 0}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Project detail engagement</p>
        </div>

        {/* Link Clicks */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">External Clicks</span>
            <div className="w-6 h-6 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2 font-mono">{data?.linkClicks || 0}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Outbound social & repo links</p>
        </div>
      </div>

      {/* 3. Daily Views Chart & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Views Histogram */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Daily View Trends</h3>
              <p className="text-xs text-zinc-400">Page visits over the past 7 days</p>
            </div>
            <button
              onClick={loadAnalytics}
              className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
              title="Refresh"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {data?.dailyViews.map((day) => {
              const heightPct = Math.max(Math.round((day.views / maxDayViews) * 100), 8);
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.views}
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md transition-all hover:brightness-125"
                  />
                  <span className="text-[10px] font-mono text-zinc-500">{day.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Device Breakdown</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Visitor hardware profile</p>

            {/* Visual multi-segment bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-zinc-800 mt-6">
              <div style={{ width: `${desktopPct}%` }} className="bg-blue-500" title={`Desktop: ${desktopPct}%`} />
              <div style={{ width: `${tabletPct}%` }} className="bg-purple-500" title={`Tablet: ${tabletPct}%`} />
              <div style={{ width: `${mobilePct}%` }} className="bg-emerald-500" title={`Mobile: ${mobilePct}%`} />
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-zinc-300">Desktop</span>
                </div>
                <span className="font-mono text-zinc-400">{desktopPct}% ({data?.devices.desktop || 0})</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-zinc-300">Tablet</span>
                </div>
                <span className="font-mono text-zinc-400">{tabletPct}% ({data?.devices.tablet || 0})</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-zinc-300">Mobile</span>
                </div>
                <span className="font-mono text-zinc-400">{mobilePct}% ({data?.devices.mobile || 0})</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-500 font-mono mt-4">
            🔒 100% GDPR compliant. No cookies, tracking pixels, or IP addresses stored.
          </div>
        </div>
      </div>

      {/* 4. Top Referrers */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-1">Top Inbound Referrers</h3>
        <p className="text-xs text-zinc-400 mb-4">Where your audience is discovering your portfolio</p>

        {(!data?.topReferrers || data.topReferrers.length === 0) ? (
          <div className="p-6 text-center text-xs font-mono text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
            No external referrers logged yet. Visits from direct links or private bookmarks.
          </div>
        ) : (
          <div className="space-y-2">
            {data.topReferrers.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs"
              >
                <span className="font-mono text-zinc-300 truncate max-w-md">{r.referrer}</span>
                <span className="font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {r.count} visit{r.count !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
