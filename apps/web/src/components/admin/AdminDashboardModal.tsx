import { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}

interface AdminStats {
  metrics: {
    totalUsers: number;
    totalPortfolios: number;
    publishedPortfolios: number;
    draftPortfolios: number;
    totalProjects: number;
    totalAssets: number;
    publishRate: number;
  };
  templateDistribution: Array<{
    templateId: string;
    count: number;
  }>;
  serverTime: string;
}

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
  portfolioCount: number;
  projectCount: number;
  createdAt: string;
}

export function AdminDashboardModal({ isOpen, onClose, token }: Props) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users'>('overview');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, usersRes] = await Promise.all([
        fetch('/api/v1/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/v1/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (!statsRes.ok || !usersRes.ok) {
        if (statsRes.status === 403 || usersRes.status === 403) {
          throw new Error('Administrative privileges required to access dashboard.');
        }
        throw new Error('Failed to load administrative analytics.');
      }

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();

      setStats(statsData.data);
      setUsers(usersData.data.users);
    } catch (err: any) {
      setError(err.message || 'Error communicating with admin server.');
    } finally {
      setLoading(false);
    }
  }

  async function toggleUserRole(userId: string, currentRole: 'USER' | 'ADMIN') {
    const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      const res = await fetch(`/api/v1/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: nextRole })
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
        );
      }
    } catch (err) {
      console.error('Role update error:', err);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
              ⚙️
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Cove System Administration</h2>
              <p className="text-xs text-zinc-400">Platform telemetry, template adoption & user governance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2 border-b border-zinc-800 flex gap-4 bg-zinc-950/20">
          <button
            onClick={() => setActiveTab('overview')}
            className={`text-xs font-medium pb-2 border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            📊 System Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`text-xs font-medium pb-2 border-b-2 transition ${
              activeTab === 'users'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            👥 User Registry ({users.length})
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-zinc-400 text-xs font-mono">
              Loading platform analytics & telemetry...
            </div>
          ) : activeTab === 'overview' && stats ? (
            <div className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Total Users</span>
                  <p className="text-2xl font-bold text-white mt-1">{stats.metrics.totalUsers}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Total Portfolios</span>
                  <p className="text-2xl font-bold text-white mt-1">{stats.metrics.totalPortfolios}</p>
                  <span className="text-[10px] text-zinc-400">{stats.metrics.publishedPortfolios} published</span>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Projects Showcased</span>
                  <p className="text-2xl font-bold text-white mt-1">{stats.metrics.totalProjects}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Publication Rate</span>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.metrics.publishRate}%</p>
                </div>
              </div>

              {/* Template Adoption Breakdown */}
              <div className="p-5 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                  Active Template Distribution
                </h3>
                {stats.templateDistribution.length === 0 ? (
                  <p className="text-xs text-zinc-500">No portfolios assigned to templates yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {stats.templateDistribution.map((t) => (
                      <div key={t.templateId} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                        <span className="text-xs font-mono text-zinc-300 truncate mr-2">{t.templateId}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded-md">
                          {t.count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'users' ? (
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-500 font-mono text-[11px] border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Portfolios</th>
                    <th className="py-3 px-4">Projects</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-800/30 transition">
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">{u.name || 'Unnamed'}</div>
                        <div className="text-[11px] text-zinc-500 font-mono">{u.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            u.role === 'ADMIN'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{u.portfolioCount}</td>
                      <td className="py-3 px-4 font-mono">{u.projectCount}</td>
                      <td className="py-3 px-4 text-zinc-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => toggleUserRole(u.id, u.role)}
                          className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition"
                        >
                          {u.role === 'ADMIN' ? 'Demote to User' : 'Promote to Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
