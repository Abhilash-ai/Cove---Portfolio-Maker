import React, { useState } from 'react';
import { ShieldCheck, Download, Trash2, KeyRound, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  userEmail?: string;
  userName?: string;
  onLogout: () => void;
}

export function UserSettingsModal({ isOpen, onClose, token, userEmail, userName, onLogout }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // GDPR export
  const [exporting, setExporting] = useState(false);

  // Danger zone
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 8 characters' });
      return;
    }

    try {
      setUpdatingPassword(true);
      const res = await fetch('/api/v1/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordStatus({ type: 'success', message: 'Password successfully updated' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordStatus({ type: 'error', message: data.error?.message || 'Password update failed' });
      }
    } catch (err: any) {
      setPasswordStatus({ type: 'error', message: err.message || 'Network error' });
    } finally {
      setUpdatingPassword(false);
    }
  }

  async function handleExportData() {
    try {
      setExporting(true);
      const res = await fetch('/api/v1/user/export', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cove-account-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert('Export failed: ' + (err.message || 'Network error'));
    } finally {
      setExporting(false);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirmation !== 'DELETE') {
      setDeleteError('You must type DELETE in exact capital letters to confirm.');
      return;
    }

    try {
      setDeleting(true);
      setDeleteError(null);

      const res = await fetch('/api/v1/user/account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ confirmation: 'DELETE' }),
      });

      if (res.ok) {
        alert('Your account has been deleted permanently.');
        onLogout();
      } else {
        const data = await res.json();
        setDeleteError(data.error?.message || 'Failed to delete account');
      }
    } catch (err: any) {
      setDeleteError(err.message || 'Network error');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-900 dark:text-white">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">Account Settings & Privacy</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Security, data portability & account preferences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Identity Summary */}
          <div className="p-4 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Authenticated Identity</span>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">{userName || 'Cove Creator'}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{userEmail || 'creator@cove.dev'}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
              Active Session
            </span>
          </div>

          {/* Change Password */}
          <div className="p-5 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#FF6B4A]" />
              <span>Update Password</span>
            </h3>

            {passwordStatus && (
              <div
                className={`mb-3 p-3 rounded-lg text-xs ${
                  passwordStatus.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300'
                }`}
              >
                {passwordStatus.message}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div>
                <label className="block text-[11px] text-zinc-700 dark:text-zinc-300 font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-zinc-700 dark:text-zinc-300 font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-700 dark:text-zinc-300 font-medium mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={updatingPassword}
                className="px-4 py-2 bg-[#FF6B4A] hover:bg-[#F04E27] text-white text-xs font-semibold rounded-lg transition disabled:opacity-50 shadow-soft"
              >
                {updatingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* GDPR Portability */}
          <div className="p-5 rounded-xl bg-[#FAFAF8] dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#FF6B4A]" />
              <span>Data Portability</span>
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
              Export your entire profile, projects, media references, and custom styling tokens in a machine-readable JSON archive.
            </p>
            <button
              onClick={handleExportData}
              disabled={exporting}
              className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 transition flex items-center gap-2 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#FF6B4A]" />
              <span>{exporting ? 'Generating JSON Archive...' : 'Download Data Archive (.json)'}</span>
            </button>
          </div>

          {/* Danger Zone */}
          <div className="p-5 rounded-xl bg-red-50/50 dark:bg-rose-950/20 border border-red-200 dark:border-rose-900/30">
            <h3 className="text-xs font-bold text-red-600 dark:text-rose-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Danger Zone</span>
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
              Permanently purge your account, all published portfolios, and uploaded assets. This action is irreversible.
            </p>

            {deleteError && (
              <div className="mb-3 p-3 rounded-lg bg-red-100 dark:bg-rose-500/10 border border-red-200 dark:border-rose-500/20 text-red-700 dark:text-rose-300 text-xs">
                {deleteError}
              </div>
            )}

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-rose-600/20 dark:hover:bg-rose-600/30 text-red-600 dark:text-rose-300 text-xs font-semibold rounded-lg border border-red-200 dark:border-rose-500/30 transition"
              >
                Delete Account...
              </button>
            ) : (
              <div className="space-y-3 p-3.5 bg-white dark:bg-zinc-950/80 border border-red-200 dark:border-rose-900/50 rounded-xl">
                <p className="text-xs text-red-600 dark:text-rose-300 font-medium">
                  Type <span className="font-mono bg-red-100 dark:bg-rose-500/20 px-1 py-0.5 rounded text-red-700 dark:text-white">DELETE</span> to confirm permanent account purge:
                </p>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-3 py-1.5 text-xs bg-[#FAFAF8] dark:bg-zinc-900 border border-red-300 dark:border-rose-700/50 rounded-lg text-zinc-900 dark:text-white font-mono"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleting || deleteConfirmation !== 'DELETE'}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition disabled:opacity-40"
                  >
                    {deleting ? 'Deleting Account...' : 'Permanently Delete'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmation('');
                    }}
                    className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-lg hover:bg-zinc-200 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
