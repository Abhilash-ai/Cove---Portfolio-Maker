import { useState, useEffect } from 'react';
import { Settings, BarChart2, Users, X } from 'lucide-react';

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
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/v1/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        }),
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: nextRole }),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-900 dark:text-white">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center font-bold text-sm">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">System Administration</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Platform telemetry, template adoption & user governance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2 border-b border-zinc-200 dark:border-zinc-800 flex gap-4 bg-zinc-50/50 dark:bg-zinc-950/20">
          <button
            onClick={() => setActiveTab('overview')}
            className={`text-xs font-semibold pb-2 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#FF6B4A] text-[#FF6B4A]'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>System Overview & Metrics</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`text-xs font-semibold pb-2 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'users'
                ? 'border-[#FF6B4A] text-[#FF6B4A]'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>User Registry ({users.length})</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-rose-500/10 border border-red-200 dark:border-rose-500/20 text-red-600 dark:text-rose-300 text-xs">
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
                <div className="p-4 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Total Users</span>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{stats.metrics.totalUsers}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Total Portfolios</span>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{stats.metrics.totalPortfolios}</p>
                  <span className="text-[10px] text-zinc-500">{stats.metrics.publishedPortfolios} published</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Projects Showcased</span>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{stats.metrics.totalProjects}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Publication Rate</span>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.metrics.publishRate}%</p>
                </div>
              </div>

              {/* Template Adoption Breakdown */}
              <div className="p-5 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-4">
                  Active Template Distribution
                </h3>
                {stats.templateDistribution.length === 0 ? (
                  <p className="text-xs text-zinc-500">No portfolios assigned to templates yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {stats.templateDistribution.map((t) => (
                      <div key={t.templateId} className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center shadow-sm">
                        <span className="text-xs font-mono text-zinc-800 dark:text-zinc-300 truncate mr-2">{t.templateId}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FF6B4A]/15 text-[#FF6B4A] rounded-md">
                          {t.count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'users' ? (
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-mono text-[11px] border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Portfolios</th>
                    <th className="py-3 px-4">Projects</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-zinc-900 dark:text-white">{u.name || 'Unnamed'}</div>
                        <div className="text-[11px] text-zinc-500 font-mono">{u.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            u.role === 'ADMIN'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
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
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium transition"
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
