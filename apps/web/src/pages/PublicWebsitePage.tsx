import React, { useEffect, useState } from 'react';
import { PortfolioSummary } from '@cove/shared';
import { WebsiteRenderer } from '../engine/renderer/WebsiteRenderer.js';
import { DISTINCT_WEBSITE_TEMPLATES } from '../engine/templates/templateRegistry.js';
import { ArrowLeft, Globe } from 'lucide-react';

interface Props {
  slug: string;
  onGoHome?: () => void;
}

export function PublicWebsitePage({ slug, onGoHome }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState<PortfolioSummary | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPublicWebsite() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/v1/public/w/${encodeURIComponent(slug)}`);
        const json = await res.json();

        if (res.ok && json.success) {
          if (isMounted) {
            setWebsite(json.data.website);

            // Apply SEO title and meta description
            if (json.data.seo) {
              document.title = json.data.seo.metaTitle;
              let metaDesc = document.querySelector('meta[name="description"]');
              if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
              }
              metaDesc.setAttribute('content', json.data.seo.metaDescription);
            }
          }
        } else {
          if (isMounted) {
            setError(json.error?.message || 'Website not found or is currently private/unpublished.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to connect to Cove network.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPublicWebsite();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090C] flex flex-col items-center justify-center p-6 text-white font-mono">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mb-4" />
        <p className="text-xs text-zinc-400">Loading Published Website...</p>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="min-h-screen bg-[#09090C] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="max-w-md p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <Globe className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Website Unavailable</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {error || 'This website is either in draft mode or does not exist.'}
          </p>
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="px-4 py-2 bg-[#FF6B4A] hover:bg-[#F04E27] text-white text-xs font-semibold rounded-xl transition shadow-coral"
            >
              Return to Cove
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <WebsiteRenderer website={website} />

      {/* Subtle Fixed Cove Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 text-white text-[11px] font-semibold hover:border-zinc-700 shadow-xl transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Made with Cove</span>
        </a>
      </div>
    </div>
  );
}
