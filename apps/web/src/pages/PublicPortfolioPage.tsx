import React, { useEffect, useState } from 'react';
import { PortfolioSummary, ProjectDto, FullProfileDto, ThemeTokens } from '@cove/shared';
import { PortfolioRenderer } from '../engine/renderer/PortfolioRenderer.js';
import { SEEDED_TEMPLATES } from '../engine/templates/seededTemplates.js';

interface Props {
  slug: string;
  onGoHome?: () => void;
}

export function PublicPortfolioPage({ slug, onGoHome }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [profile, setProfile] = useState<FullProfileDto | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPublicPortfolio() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/v1/public/p/${encodeURIComponent(slug)}`);
        const json = await res.json();

        if (res.ok && json.success) {
          if (isMounted) {
            setPortfolio(json.data.portfolio);
            setProjects(json.data.projects || []);
            setProfile(json.data.profile || null);
          }

          // Non-blocking analytics pageview beacon
          fetch('/api/v1/public/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              slug,
              eventType: 'view',
              referrer: document.referrer || null,
            }),
          }).catch(() => {});
        } else {
          if (isMounted) {
            setError(json.error?.message || 'Portfolio not found or is currently private.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to connect to Cove server.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPublicPortfolio();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6 text-white font-mono">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-4" />
        <p className="text-xs text-zinc-400">Loading Portfolio...</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="max-w-md p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-11a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Portfolio Unavailable</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {error || 'This portfolio is either in draft mode or does not exist.'}
          </p>
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white transition"
            >
              Back to Cove
            </button>
          )}
        </div>
      </div>
    );
  }

  const activeTemplate =
    SEEDED_TEMPLATES.find((t) => t.id === portfolio.activeTemplateId) || SEEDED_TEMPLATES[0];

  const customTokens = (portfolio as any).customTokens as ThemeTokens | undefined;

  return (
    <div className="w-full min-h-screen bg-[#09090B] text-white">
      <PortfolioRenderer
        portfolio={portfolio}
        projects={projects}
        profile={profile}
        template={activeTemplate}
        overrideTokens={customTokens}
        overrideSectionOrder={portfolio.sectionOrder}
      />

      {/* Subtle Cove attribution badge */}
      <footer className="w-full py-6 border-t border-zinc-900/40 text-center text-xs text-zinc-600 font-mono">
        Built with{' '}
        <a href="/" className="text-zinc-400 hover:text-zinc-200 underline font-semibold transition-colors">
          Cove
        </a>
      </footer>
    </div>
  );
}
