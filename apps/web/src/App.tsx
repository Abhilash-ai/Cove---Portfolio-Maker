import React, { useState, useEffect } from 'react';
import { PortfolioSummary, AuthenticatedUser } from '@cove/shared';
import { PortfolioManager } from './components/crud/PortfolioManager.js';
import { ProjectManager } from './components/crud/ProjectManager.js';
import { ProfileEditor } from './components/crud/ProfileEditor.js';
import { DesignEngineCanvas } from './components/preview/DesignEngineCanvas.js';
import { VisualEditor } from './editor/VisualEditor.js';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage.js';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard.js';

export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('cove_token'));
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(false);

  // Detect public portfolio slug from URL e.g. /p/:slug or ?p=:slug
  const [publicSlug, setPublicSlug] = useState<string | null>(() => {
    const pathname = window.location.pathname;
    const match = pathname.match(/^\/p\/([a-zA-Z0-9-_]+)/);
    if (match) return match[1];
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('p');
  });

  // Tab State: 'portfolios' | 'projects' | 'profile' | 'design-engine' | 'visual-editor' | 'analytics'
  const [activeTab, setActiveTab] = useState<'portfolios' | 'projects' | 'profile' | 'design-engine' | 'visual-editor' | 'analytics'>('portfolios');
  const [activePortfolio, setActivePortfolio] = useState<PortfolioSummary | null>(null);

  // Auth Form State
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    }
  }, [token]);

  async function fetchCurrentUser(authToken: string) {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentUser(data.data.user);
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    } finally {
      setLoading(false);
    }
  }

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);

    const endpoint = isLogin ? '/api/v1/auth/login' : '/api/v1/auth/signup';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setAuthError(result.error?.message || 'Authentication failed');
        return;
      }

      const authToken = result.data.token;
      localStorage.setItem('cove_token', authToken);
      setToken(authToken);
      setCurrentUser(result.data.user);
    } catch (err: any) {
      setAuthError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('cove_token');
    setToken(null);
    setCurrentUser(null);
    setActivePortfolio(null);
    setActiveTab('portfolios');
  }

  function handleSelectPortfolio(p: PortfolioSummary) {
    setActivePortfolio(p);
    setActiveTab('projects');
  }

  function handleOpenEditor(p: PortfolioSummary) {
    setActivePortfolio(p);
    setActiveTab('visual-editor');
  }

  // 1. If public portfolio route is active, render public viewer
  if (publicSlug) {
    return (
      <PublicPortfolioPage
        slug={publicSlug}
        onGoHome={() => {
          window.history.pushState({}, '', '/');
          setPublicSlug(null);
        }}
      />
    );
  }

  // 2. If in Visual Editor mode, render full-screen IDE experience
  if (currentUser && token && activeTab === 'visual-editor') {
    return (
      <VisualEditor
        portfolioId={activePortfolio?.id}
        token={token}
        onBack={() => setActiveTab('portfolios')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <h1 className="text-lg font-bold tracking-tight text-white font-mono">COVE</h1>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Phase 6 Publishing & Analytics
            </span>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <nav className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('portfolios')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                    activeTab === 'portfolios' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Portfolios
                </button>
                <button
                  onClick={() => { if (activePortfolio) setActiveTab('projects'); }}
                  disabled={!activePortfolio}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition disabled:opacity-40 ${
                    activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Projects {activePortfolio && `(${activePortfolio.title})`}
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                    activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('visual-editor')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition border ${
                    activeTab === 'visual-editor'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : 'text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/10'
                  }`}
                >
                  🎨 Editor
                </button>
                <button
                  onClick={() => { if (activePortfolio) setActiveTab('analytics'); }}
                  disabled={!activePortfolio}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition disabled:opacity-40 ${
                    activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📊 Analytics
                </button>
                <button
                  onClick={() => setActiveTab('design-engine')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                    activeTab === 'design-engine' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Canvas
                </button>
              </nav>

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-zinc-800 text-xs">
                <span className="text-zinc-400 truncate max-w-xs">{currentUser.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded border border-red-500/20 transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-zinc-500 font-mono">Authentication Required</div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
        {currentUser && token ? (
          <div>
            {activeTab === 'portfolios' && (
              <PortfolioManager
                token={token}
                onSelectPortfolio={handleSelectPortfolio}
                onOpenEditor={handleOpenEditor}
                activePortfolioId={activePortfolio?.id}
              />
            )}

            {activeTab === 'projects' && activePortfolio && (
              <ProjectManager portfolio={activePortfolio} token={token} />
            )}

            {activeTab === 'profile' && (
              <ProfileEditor token={token} />
            )}

            {activeTab === 'analytics' && activePortfolio && (
              <AnalyticsDashboard
                portfolio={activePortfolio}
                token={token}
                onRefreshPortfolio={() => {
                  fetchCurrentUser(token);
                }}
              />
            )}

            {activeTab === 'design-engine' && (
              <DesignEngineCanvas portfolio={activePortfolio} token={token} />
            )}
          </div>
        ) : (
          /* Authentication Screen */
          <div className="max-w-md mx-auto mt-12">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Sign In to Cove</h2>
                <p className="text-xs text-zinc-400 mt-1">Access the Phase 2 Content Engine</p>
              </div>

              <div className="flex rounded-lg bg-zinc-950 p-1 mb-6 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => { setIsLogin(true); setAuthError(null); }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition ${
                    isLogin ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setAuthError(null); }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition ${
                    !isLogin ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Register
                </button>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@cove.design"
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-800/80 py-4 text-center text-xs text-zinc-500 font-mono">
        Cove Content Engine • PostgreSQL 18.4 • Prisma 5.22 • Express REST API
      </footer>
    </div>
  );
}
