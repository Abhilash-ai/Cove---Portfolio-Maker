import React, { useEffect, useState } from 'react';
import { PortfolioSummary, ThemeTokens, EXPANDED_STYLE_PRESETS } from '@cove/shared';
import { WebsiteRenderer } from '../engine/renderer/WebsiteRenderer.js';
import { DISTINCT_WEBSITE_TEMPLATES, WebsiteTemplateDefinition } from '../engine/templates/templateRegistry.js';
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Eye,
  Globe,
  Monitor,
  Palette,
  Save,
  Share2,
  Smartphone,
  Sparkles,
  Tablet,
  Type,
  X
} from 'lucide-react';

interface Props {
  websiteId?: string;
  portfolioId?: string;
  token: string;
  onBack: () => void;
}

export function WebsiteEditor({ websiteId, portfolioId, token, onBack }: Props) {
  const targetId = websiteId || portfolioId || '';
  const [website, setWebsite] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'templates' | 'content' | 'style'>('content');

  // Active editable state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(DISTINCT_WEBSITE_TEMPLATES[0].id);
  const [customContent, setCustomContent] = useState<any>({});
  const [customTokens, setCustomTokens] = useState<ThemeTokens | null>(null);

  // Load website on mount
  useEffect(() => {
    async function loadWebsite() {
      if (!targetId) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/portfolios/${targetId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (res.ok && json.success) {
          const w: PortfolioSummary = json.data.portfolio;
          setWebsite(w);
          if (w.activeTemplateId) {
            setSelectedTemplateId(w.activeTemplateId);
          }
          if (w.customTokens?.websiteContent) {
            setCustomContent(w.customTokens.websiteContent);
          }
          if (w.customTokens?.tokens) {
            setCustomTokens(w.customTokens.tokens);
          }
        }
      } catch (err) {
        console.error('Failed to load website:', err);
      } finally {
        setLoading(false);
      }
    }
    loadWebsite();
  }, [targetId, token]);

  // Active template reference
  const currentTemplate =
    DISTINCT_WEBSITE_TEMPLATES.find((t) => t.id === selectedTemplateId) || DISTINCT_WEBSITE_TEMPLATES[0];

  const mergedContent = {
    ...currentTemplate.defaultContent,
    ...customContent,
  };

  const baseTokens = EXPANDED_STYLE_PRESETS.studio;
  const activeTokens: ThemeTokens = customTokens || {
    ...baseTokens,
    colors: {
      ...baseTokens.colors,
      ...currentTemplate.tokens.colors,
    },
    typography: {
      ...baseTokens.typography,
      fontHeading: currentTemplate.tokens.typography.fontHeading,
      fontBody: currentTemplate.tokens.typography.fontBody,
    },
  };

  // Save changes
  async function handleSave() {
    if (!website) return;
    try {
      setSaving(true);
      await fetch(`/api/v1/portfolios/${website.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activeTemplateId: selectedTemplateId,
          customTokens: {
            websiteContent: customContent,
            tokens: activeTokens,
          },
        }),
      });
    } catch (err) {
      console.error('Failed to save website:', err);
    } finally {
      setSaving(false);
    }
  }

  // Publish website
  async function handlePublish() {
    if (!website) return;
    try {
      setPublishing(true);
      const res = await fetch(`/api/v1/portfolios/${website.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'published',
          activeTemplateId: selectedTemplateId,
          customTokens: {
            websiteContent: customContent,
            tokens: activeTokens,
          },
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setWebsite({ ...website, status: 'published' });
        setPublishedUrl(`${window.location.origin}/w/${website.slug}`);
      }
    } catch (err) {
      console.error('Failed to publish website:', err);
    } finally {
      setPublishing(false);
    }
  }

  if (loading || !website) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white font-mono">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mb-4" />
        <p className="text-xs text-zinc-400">Loading Website Studio...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0A0A0C] text-zinc-100 overflow-hidden select-none font-sans">
      {/* 1. Editor Top Navigation */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-950/80 px-4 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <div className="h-4 w-px bg-zinc-800" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white truncate max-w-xs">{website.title}</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              /w/{website.slug}
            </span>
          </div>
        </div>

        {/* Viewport switchers */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg text-xs transition ${
              viewport === 'desktop' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
            title="Desktop view"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg text-xs transition ${
              viewport === 'tablet' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
            title="Tablet view"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg text-xs transition ${
              viewport === 'mobile' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
            title="Mobile view"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={publishing}
            className="px-4 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{publishing ? 'Publishing...' : 'Publish Website'}</span>
          </button>
        </div>
      </header>

      {/* 2. Workspace Body: Left Sidebar + Center Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Controls */}
        <aside className="w-80 sm:w-96 border-r border-zinc-800 bg-zinc-950/60 flex flex-col shrink-0">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-zinc-800 text-xs font-semibold p-2 gap-1 bg-zinc-900/40">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'content' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'templates' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Templates ({DISTINCT_WEBSITE_TEMPLATES.length})
            </button>
            <button
              onClick={() => setActiveTab('style')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'style' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Theme & Style
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {activeTab === 'templates' && (
              <div className="space-y-3">
                <p className="text-[11px] font-mono text-zinc-500 uppercase">
                  Select Genuinely Distinct Website Design:
                </p>
                {DISTINCT_WEBSITE_TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedTemplateId === tpl.id
                        ? 'border-emerald-500 bg-emerald-950/20 shadow-sm'
                        : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{tpl.name}</h4>
                      {tpl.is3D && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          3D
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-4 text-xs">
                {/* Brand & Navbar */}
                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
                  <span className="font-bold text-zinc-300 block">Navbar & Branding</span>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500">Brand Name</label>
                    <input
                      type="text"
                      value={mergedContent.navbar.brandName}
                      onChange={(e) =>
                        setCustomContent({
                          ...customContent,
                          navbar: { ...mergedContent.navbar, brandName: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500">Navbar CTA Label</label>
                    <input
                      type="text"
                      value={mergedContent.navbar.ctaLabel}
                      onChange={(e) =>
                        setCustomContent({
                          ...customContent,
                          navbar: { ...mergedContent.navbar, ctaLabel: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-0.5"
                    />
                  </div>
                </div>

                {/* Hero Section */}
                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
                  <span className="font-bold text-zinc-300 block">Hero Section</span>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500">Badge Text</label>
                    <input
                      type="text"
                      value={mergedContent.hero.badge}
                      onChange={(e) =>
                        setCustomContent({
                          ...customContent,
                          hero: { ...mergedContent.hero, badge: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500">Headline</label>
                    <textarea
                      rows={2}
                      value={mergedContent.hero.headline}
                      onChange={(e) =>
                        setCustomContent({
                          ...customContent,
                          hero: { ...mergedContent.hero, headline: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500">Tagline</label>
                    <textarea
                      rows={3}
                      value={mergedContent.hero.tagline}
                      onChange={(e) =>
                        setCustomContent({
                          ...customContent,
                          hero: { ...mergedContent.hero, tagline: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-0.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-500">Primary CTA</label>
                      <input
                        type="text"
                        value={mergedContent.hero.primaryCta}
                        onChange={(e) =>
                          setCustomContent({
                            ...customContent,
                            hero: { ...mergedContent.hero, primaryCta: e.target.value },
                          })
                        }
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-zinc-500">Secondary CTA</label>
                      <input
                        type="text"
                        value={mergedContent.hero.secondaryCta}
                        onChange={(e) =>
                          setCustomContent({
                            ...customContent,
                            hero: { ...mergedContent.hero, secondaryCta: e.target.value },
                          })
                        }
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-0.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing / Offerings */}
                {mergedContent.pricing && (
                  <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
                    <span className="font-bold text-zinc-300 block">Pricing Headline</span>
                    <input
                      type="text"
                      value={mergedContent.pricing.title}
                      onChange={(e) =>
                        setCustomContent({
                          ...customContent,
                          pricing: { ...mergedContent.pricing, title: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white"
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'style' && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-3">
                  <span className="font-bold text-zinc-300 block">Color Palette</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-500">Background</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="color"
                          value={activeTokens.colors.background}
                          onChange={(e) =>
                            setCustomTokens({
                              ...activeTokens,
                              colors: { ...activeTokens.colors, background: e.target.value },
                            })
                          }
                          className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                        />
                        <span className="font-mono text-[11px] text-zinc-400">
                          {activeTokens.colors.background}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-500">Accent Color</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="color"
                          value={activeTokens.colors.accent}
                          onChange={(e) =>
                            setCustomTokens({
                              ...activeTokens,
                              colors: { ...activeTokens.colors, accent: e.target.value },
                            })
                          }
                          className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                        />
                        <span className="font-mono text-[11px] text-zinc-400">
                          {activeTokens.colors.accent}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-3">
                  <span className="font-bold text-zinc-300 block">Typography Family</span>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500">Heading Font</label>
                    <select
                      value={activeTokens.typography.fontHeading}
                      onChange={(e) =>
                        setCustomTokens({
                          ...activeTokens,
                          typography: { ...activeTokens.typography, fontHeading: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white mt-1"
                    >
                      <option value="'Space Grotesk', system-ui, sans-serif">Space Grotesk (Modern Sans)</option>
                      <option value="'Playfair Display', Georgia, serif">Playfair Display (Editorial Serif)</option>
                      <option value="'Inter', system-ui, sans-serif">Inter (Clean Neutral)</option>
                      <option value="'Syne', system-ui, sans-serif">Syne (Creative Display)</option>
                      <option value="'JetBrains Mono', monospace">JetBrains Mono (Technical)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Center Live Canvas */}
        <main className="flex-1 bg-zinc-900/60 p-4 sm:p-6 overflow-y-auto flex items-start justify-center">
          <div
            className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 ${
              viewport === 'mobile'
                ? 'w-[375px] min-h-[667px]'
                : viewport === 'tablet'
                ? 'w-[768px] min-h-[900px]'
                : 'w-full max-w-6xl min-h-[900px]'
            }`}
          >
            <WebsiteRenderer
              website={website}
              templateId={selectedTemplateId}
              overrideTokens={activeTokens}
              overrideContent={customContent}
            />
          </div>
        </main>
      </div>

      {/* 3. Published Confirmation Modal */}
      {publishedUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Website Live on Cove</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your website is now deployed globally on its independent public URL.
              </p>
            </div>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between font-mono text-xs text-emerald-400">
              <span className="truncate">{publishedUrl}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(publishedUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-1 text-zinc-400 hover:text-white"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <a
                href={publishedUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setPublishedUrl(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
