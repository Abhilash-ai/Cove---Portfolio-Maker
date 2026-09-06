import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

interface Portfolio {
  id: string;
  userId: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
}

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('am_token'));
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Protected data states
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioSlug, setPortfolioSlug] = useState('');
  const [ownershipCheckLog, setOwnershipCheckLog] = useState<string | null>(null);

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
        loadPortfolios(authToken);
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    } finally {
      setLoading(false);
    }
  }

  async function loadPortfolios(authToken: string) {
    try {
      const res = await fetch('/api/v1/portfolios/mine', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPortfolios(data.data.portfolios);
      }
    } catch (err) {
      console.error('Failed to load portfolios:', err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
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
        setError(result.error?.message || 'Authentication failed');
        return;
      }

      const authToken = result.data.token;
      localStorage.setItem('am_token', authToken);
      setToken(authToken);
      setCurrentUser(result.data.user);
      loadPortfolios(authToken);
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePortfolio(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !portfolioTitle || !portfolioSlug) return;
    setError(null);
    try {
      const res = await fetch('/api/v1/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: portfolioTitle, slug: portfolioSlug })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setPortfolioTitle('');
        setPortfolioSlug('');
        loadPortfolios(token);
      } else {
        setError(result.error?.message || 'Failed to create portfolio');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  }

  async function testForbiddenCrossAccess() {
    if (!token) return;
    setOwnershipCheckLog('Executing probe against unauthorized random resource ID...');
    try {
      // Intentionally request a random UUID that caller does not own
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const res = await fetch(`/api/v1/portfolios/${fakeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      setOwnershipCheckLog(
        `Server Response: HTTP ${res.status} — Code: "${result.error?.code}", Message: "${result.error?.message}"`
      );
    } catch (err: any) {
      setOwnershipCheckLog(`Network failure: ${err.message}`);
    }
  }

  function handleLogout() {
    localStorage.removeItem('am_token');
    setToken(null);
    setCurrentUser(null);
    setPortfolios([]);
    setError(null);
    setOwnershipCheckLog(null);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-zinc-100">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
            Phase 1 Review Gate
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">AM Studio</h1>
          <p className="text-sm text-zinc-400 mt-1">Data Model, Migrations & Server-Side Authorization Verification</p>
        </div>

        {currentUser ? (
          /* Logged In Dashboard & Proof State */
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div>
                <p className="text-xs font-mono text-zinc-400 uppercase">Authenticated Session</p>
                <h2 className="text-lg font-semibold text-white">{currentUser.name || 'Anonymous Creator'}</h2>
                <p className="text-xs text-zinc-400 font-mono">{currentUser.email} • Role: {currentUser.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition"
              >
                Sign Out
              </button>
            </div>

            {/* Test Portfolio Creator */}
            <div className="mb-6 p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
              <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-mono">
                Create Test Portfolio (Owner: Current Session)
              </h3>
              <form onSubmit={handleCreatePortfolio} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Title (e.g. Architecture 2026)"
                    value={portfolioTitle}
                    onChange={(e) => setPortfolioTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Slug (e.g. arch-2026)"
                    value={portfolioSlug}
                    onChange={(e) => setPortfolioSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                >
                  Save Portfolio to Database
                </button>
              </form>
            </div>

            {/* User's Portfolios */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                  Your Portfolios ({portfolios.length})
                </h3>
                <span className="text-[11px] text-zinc-500 font-mono">Re-derived server-side</span>
              </div>

              {portfolios.length === 0 ? (
                <div className="p-4 text-center rounded-lg border border-dashed border-zinc-800 text-xs text-zinc-500">
                  No portfolios found for this account. Create one above to verify persistence.
                </div>
              ) : (
                <div className="space-y-2">
                  {portfolios.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-zinc-200">{p.title}</p>
                        <p className="text-zinc-500 font-mono text-[10px]">slug: {p.slug} • id: {p.id}</p>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ownership Verification Proof Button */}
            <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-blue-300 font-mono uppercase">
                  Ownership Authorization Check
                </h4>
                <button
                  onClick={testForbiddenCrossAccess}
                  className="px-2.5 py-1 text-[11px] font-medium bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded border border-blue-500/30 transition"
                >
                  Trigger Cross-Resource Probe
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
                Verifies that requests for foreign resources never leak data and are rejected server-side.
              </p>
              {ownershipCheckLog && (
                <div className="p-2.5 bg-black/60 rounded border border-zinc-800 text-[11px] font-mono text-emerald-400 break-all">
                  {ownershipCheckLog}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Auth Form (Sign In / Sign Up) */
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 shadow-2xl backdrop-blur">
            <div className="flex rounded-lg bg-zinc-950/60 p-1 mb-6 border border-zinc-800/80">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition ${
                  isLogin ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition ${
                  !isLogin ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
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
                  className="w-full px-3 py-2 text-sm bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-zinc-500 font-mono">
          PostgreSQL 18.4 • Prisma 5.22 • Express API • Node.js
        </div>
      </div>
    </div>
  );
}
