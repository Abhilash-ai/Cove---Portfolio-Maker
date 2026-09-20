import React, { useState, useEffect } from 'react';
import { PortfolioSummary, AuthenticatedUser } from '@cove/shared';
import { PortfolioManager } from './components/crud/PortfolioManager.js';
import { ProjectManager } from './components/crud/ProjectManager.js';
import { ProfileEditor } from './components/crud/ProfileEditor.js';
import { DesignEngineCanvas } from './components/preview/DesignEngineCanvas.js';
import { VisualEditor } from './editor/VisualEditor.js';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage.js';
import { LandingPage } from './pages/LandingPage.js';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard.js';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal.js';
import { UserSettingsModal } from './components/settings/UserSettingsModal.js';
import { CoveLogo } from './assets/CoveLogo.js';
import { ThemeToggle } from './components/common/ThemeToggle.js';
import { Settings, Shield, LogOut, ArrowLeft } from 'lucide-react';

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
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Landing vs Auth view state for logged-out visitors
  const [showAuthScreen, setShowAuthScreen] = useState(false);

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
        headers: { Authorization: `Bearer ${authToken}` },
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
        body: JSON.stringify(body),
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
      setShowAuthScreen(false);
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
    setShowAuthScreen(false);
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

  // 2. If logged out and NOT on the auth screen, show real animated Landing Page at "/"
  if (!token && !currentUser && !showAuthScreen) {
    return (
      <LandingPage
        onGetStarted={() => {
          setIsLogin(false);
          setShowAuthScreen(true);
        }}
        onSignIn={() => {
          setIsLogin(true);
          setShowAuthScreen(true);
        }}
        onSelectFeature={(feature) => {
          if (feature === 'portfolio' || feature === 'website') {
            setIsLogin(false);
            setShowAuthScreen(true);
          }
        }}
      />
    );
  }

  // 3. If in Visual Editor mode, render full-screen IDE experience
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
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0C] text-[#1A1A1A] dark:text-[#F4F4F6] flex flex-col selection:bg-[#FF6B4A] selection:text-white transition-colors duration-200">
      {/* Top Navigation Bar */}
      <header className="border-b border-[#E5E5E0] dark:border-zinc-800 bg-white/90 dark:bg-[#0A0A0C]/90 backdrop-blur sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CoveLogo size="md" />
          </div>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <nav className="flex items-center gap-1 bg-[#FAFAF8] dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 p-1 rounded-xl shadow-soft">
                <button
                  onClick={() => setActiveTab('portfolios')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    activeTab === 'portfolios'
                      ? 'bg-[#FF6B4A] text-white shadow-soft'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Portfolios
                </button>
                <button
                  onClick={() => {
                    if (activePortfolio) setActiveTab('projects');
                  }}
                  disabled={!activePortfolio}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition disabled:opacity-40 ${
                    activeTab === 'projects'
                      ? 'bg-[#FF6B4A] text-white shadow-soft'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Projects {activePortfolio && `(${activePortfolio.title})`}
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    activeTab === 'profile'
                      ? 'bg-[#FF6B4A] text-white shadow-soft'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('visual-editor')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition border ${
                    activeTab === 'visual-editor'
                      ? 'bg-[#FF6B4A] text-white border-[#FF6B4A] shadow-soft'
                      : 'text-[#FF6B4A] border-[#FF6B4A]/30 bg-[#FF6B4A]/5 hover:bg-[#FF6B4A]/10'
                  }`}
                >
                  🎨 Editor
                </button>
                <button
                  onClick={() => {
                    if (activePortfolio) setActiveTab('analytics');
                  }}
                  disabled={!activePortfolio}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition disabled:opacity-40 ${
                    activeTab === 'analytics'
                      ? 'bg-[#FF6B4A] text-white shadow-soft'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  📊 Analytics
                </button>
                <button
                  onClick={() => setActiveTab('design-engine')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    activeTab === 'design-engine'
                      ? 'bg-[#FF6B4A] text-white shadow-soft'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Canvas
                </button>
              </nav>

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#E5E5E0] dark:border-zinc-800 text-xs">
                <ThemeToggle />
                {currentUser.role === 'ADMIN' && (
                  <button
                    onClick={() => setShowAdminModal(true)}
                    className="px-2.5 py-1.5 text-xs font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl border border-amber-300 dark:border-amber-700/50 transition flex items-center gap-1 bg-white dark:bg-zinc-900"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                )}
                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl border border-[#E5E5E0] dark:border-zinc-800 bg-white dark:bg-zinc-900 transition flex items-center gap-1 shadow-soft"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>
                <span className="text-zinc-500 dark:text-zinc-400 truncate max-w-xs font-mono text-[11px] ml-1">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/50 transition bg-white dark:bg-zinc-900 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setShowAuthScreen(false)}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
            </div>
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
                userName={currentUser.name || undefined}
              />
            )}

            {activeTab === 'projects' && activePortfolio && (
              <ProjectManager portfolio={activePortfolio} token={token} />
            )}

            {activeTab === 'profile' && <ProfileEditor token={token} />}

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
          <div className="max-w-md mx-auto mt-8 sm:mt-14">
            <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-soft-lg transition-colors">
              <div className="text-center mb-6">
                <CoveLogo size="lg" className="justify-center mb-3" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {isLogin ? 'Sign in to Cove' : 'Create your account'}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {isLogin
                    ? 'Welcome back! Manage your portfolios and showcases.'
                    : 'Start building your standout showcase in minutes.'}
                </p>
              </div>

              <div className="flex rounded-xl bg-[#FAFAF8] dark:bg-zinc-950 p-1 mb-6 border border-[#E5E5E0] dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setAuthError(null);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                    isLogin
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-soft'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setAuthError(null);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                    !isLogin
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-soft'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  Register
                </button>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-xl">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@cove.design"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#FF6B4A] hover:bg-[#F04E27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition disabled:opacity-50 shadow-soft hover:shadow-coral"
                >
                  {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setShowAuthScreen(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition"
                >
                  ← Return to Landing Page
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Dashboard Modal */}
        {token && (
          <AdminDashboardModal
            isOpen={showAdminModal}
            onClose={() => setShowAdminModal(false)}
            token={token}
          />
        )}

        {/* User Settings Modal */}
        {token && (
          <UserSettingsModal
            isOpen={showSettingsModal}
            onClose={() => setShowSettingsModal(false)}
            token={token}
            userEmail={currentUser?.email}
            userName={currentUser?.name || undefined}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Clean, Non-Developer Footer */}
      <footer className="border-t border-[#E5E5E0] dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400 font-mono bg-[#FAFAF8] dark:bg-[#0A0A0C] transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CoveLogo size="sm" showWordmark={false} />
            <span>Cove — by AM Studio</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
            <span>Privacy</span>
            <span>•</span>
            <span>Terms</span>
            <span>•</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
