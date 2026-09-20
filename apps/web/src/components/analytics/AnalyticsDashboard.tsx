import React, { useEffect, useState } from 'react';
import { PortfolioSummary } from '@cove/shared';
import { Globe, Eye, Users, MousePointerClick, ExternalLink, RefreshCw, Smartphone, Monitor, Tablet, ShieldCheck } from 'lucide-react';

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
      <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-2xl p-12 text-center text-xs font-mono text-zinc-400 max-w-5xl mx-auto shadow-soft">
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
      <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{portfolio.title}</h2>
            <span
              className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border font-semibold ${
                isPublished
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
              }`}
            >
              {isPublished ? '● Live Online' : 'Draft Only'}
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1">
            Public Link:{' '}
            {isPublished ? (
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#FF6B4A] hover:underline font-semibold"
              >
                {publicUrl}
              </a>
            ) : (
              <span className="text-zinc-400">{publicUrl} (Unpublished)</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isPublished && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Visit Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={togglePublishStatus}
            disabled={publishing}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition shadow-soft ${
              isPublished
                ? 'bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                : 'bg-[#FF6B4A] hover:bg-[#F04E27] text-white shadow-coral'
            }`}
          >
            {publishing ? 'Updating...' : isPublished ? 'Unpublish' : '🚀 Publish Live'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs rounded-xl">
          {error}
        </div>
      )}

      {/* 2. Four Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Views */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Views</span>
            <div className="w-8 h-8 rounded-xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2 font-mono">{data?.totalViews || 0}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Zero-cookie tracked</p>
        </div>

        {/* Unique Visitors */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Unique Visitors</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2 font-mono">{data?.uniqueVisitors || 0}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Hashed daily identities</p>
        </div>

        {/* Project Clicks */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Case Study Opens</span>
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2 font-mono">{data?.projectClicks || 0}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Project detail engagement</p>
        </div>

        {/* Link Clicks */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">External Clicks</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2 font-mono">{data?.linkClicks || 0}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Outbound social & repo links</p>
        </div>
      </div>

      {/* 3. Daily Views Chart & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Views Histogram */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Daily View Trends</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Page visits over the past 7 days</p>
            </div>
            <button
              onClick={loadAnalytics}
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {data?.dailyViews.map((day) => {
              const heightPct = Math.max(Math.round((day.views / maxDayViews) * 100), 8);
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.views}
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-[#FF6B4A] to-[#FFAF9E] rounded-t-lg transition-all hover:brightness-110"
                  />
                  <span className="text-[10px] font-mono text-zinc-500">{day.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Device Breakdown</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Visitor hardware profile</p>

            {/* Visual multi-segment bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-zinc-100 dark:bg-zinc-800 mt-6">
              <div style={{ width: `${desktopPct}%` }} className="bg-[#FF6B4A]" title={`Desktop: ${desktopPct}%`} />
              <div style={{ width: `${tabletPct}%` }} className="bg-purple-500" title={`Tablet: ${tabletPct}%`} />
              <div style={{ width: `${mobilePct}%` }} className="bg-emerald-500" title={`Mobile: ${mobilePct}%`} />
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B4A]" />
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Desktop</span>
                </div>
                <span className="font-mono text-zinc-500">{desktopPct}% ({data?.devices.desktop || 0})</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Tablet</span>
                </div>
                <span className="font-mono text-zinc-500">{tabletPct}% ({data?.devices.tablet || 0})</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Mobile</span>
                </div>
                <span className="font-mono text-zinc-500">{mobilePct}% ({data?.devices.mobile || 0})</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 text-[11px] text-zinc-500 font-mono mt-4 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% privacy-first analytics. No cookies or IP tracking.</span>
          </div>
        </div>
      </div>

      {/* 4. Top Referrers */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-soft">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">Top Inbound Referrers</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Where your audience is discovering your portfolio</p>

        {(!data?.topReferrers || data.topReferrers.length === 0) ? (
          <div className="p-6 text-center text-xs font-mono text-zinc-500 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
            No external referrers logged yet. Visits from direct links or private bookmarks.
          </div>
        ) : (
          <div className="space-y-2">
            {data.topReferrers.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 text-xs"
              >
                <span className="font-mono text-zinc-800 dark:text-zinc-300 truncate max-w-md">{r.referrer}</span>
                <span className="font-mono px-2.5 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
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
