import React, { useState, useEffect } from 'react';
import { FullProfileDto, SkillDto, ExperienceDto, SocialLinkDto } from '@cove/shared';
import { ResumeUploadModal } from '../resume/ResumeUploadModal.js';
import { FileText, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface Props {
  token: string;
}

export function ProfileEditor({ token }: Props) {
  const [profile, setProfile] = useState<FullProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [availableForWork, setAvailableForWork] = useState(true);

  // Relational lists
  const [skills, setSkills] = useState<SkillDto[]>([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('');

  const [experiences, setExperiences] = useState<ExperienceDto[]>([]);
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpPosition, setNewExpPosition] = useState('');

  const [socialLinks, setSocialLinks] = useState<SocialLinkDto[]>([]);
  const [newPlatform, setNewPlatform] = useState('github');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/profile/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const p: FullProfileDto = data.data.profile;
        setProfile(p);
        setName(p.name || '');
        setHeadline(p.headline || '');
        setBio(p.bio || '');
        setLocation(p.location || '');
        setContactEmail(p.contactEmail || '');
        setContactPhone(p.contactPhone || '');
        setPhotoUrl(p.photoUrl || '');
        setAvailableForWork(p.availableForWork);
        setSkills(p.skills || []);
        setExperiences(p.experiences || []);
        setSocialLinks(p.socialLinks || []);
      }
    } catch {
      setStatusMsg('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      setStatusMsg(null);
      const res = await fetch('/api/v1/profile/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          headline,
          bio,
          location,
          contactEmail,
          contactPhone,
          photoUrl,
          availableForWork,
          skills,
          experiences,
          socialLinks,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg('Profile successfully saved!');
        setTimeout(() => setStatusMsg(null), 3500);
      } else {
        setStatusMsg(data.error?.message || 'Save failed');
      }
    } catch (err: any) {
      setStatusMsg(err.message || 'Network error');
    } finally {
      setSaving(false);
    }
  }

  function addSkill() {
    if (!newSkillName.trim()) return;
    setSkills([...skills, { name: newSkillName.trim(), category: newSkillCategory.trim() || 'General' }]);
    setNewSkillName('');
    setNewSkillCategory('');
  }

  function removeSkill(index: number) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  function addExperience() {
    if (!newExpCompany.trim() || !newExpPosition.trim()) return;
    setExperiences([
      ...experiences,
      {
        company: newExpCompany.trim(),
        position: newExpPosition.trim(),
        startDate: new Date().toISOString().split('T')[0],
        isCurrent: true,
        highlights: [],
      },
    ]);
    setNewExpCompany('');
    setNewExpPosition('');
  }

  function removeExperience(index: number) {
    setExperiences(experiences.filter((_, i) => i !== index));
  }

  function addSocialLink() {
    if (!newUrl.trim()) return;
    setSocialLinks([...socialLinks, { platform: newPlatform, url: newUrl.trim() }]);
    setNewUrl('');
  }

  function removeSocialLink(index: number) {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  }

  if (loading) {
    return <div className="p-10 text-center text-xs font-mono text-zinc-400">Loading profile data...</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-[#E5E5E0] dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-soft transition-colors max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Creator Profile</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manage your full professional details, skills, experience, and links
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowResumeModal(true)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#FF6B4A] hover:bg-[#F04E27] text-white shadow-soft hover:shadow-coral transition flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Import from Resume</span>
          </button>
          {statusMsg && (
            <span className="text-xs font-mono px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{statusMsg}</span>
            </span>
          )}
        </div>
      </div>

      {showResumeModal && (
        <ResumeUploadModal
          token={token}
          currentProfile={profile}
          onClose={() => setShowResumeModal(false)}
          onSuccess={() => {
            loadProfile();
            setStatusMsg('Profile successfully updated from resume!');
            setTimeout(() => setStatusMsg(null), 4000);
          }}
        />
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Professional Headline
            </label>
            <input
              type="text"
              value={headline}
              placeholder="e.g. Product Designer & Creative Technologist"
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Contact Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Location</label>
            <input
              type="text"
              value={location}
              placeholder="e.g. Brooklyn, NY"
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Biography / About</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell your professional story..."
            className="w-full px-3.5 py-2.5 text-xs bg-[#FAFAF8] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-[#FF6B4A] focus:ring-1 focus:ring-[#FF6B4A]"
          />
        </div>

        {/* Skills Section */}
        <div className="p-5 bg-[#FAFAF8] dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <h3 className="text-xs font-mono uppercase text-zinc-800 dark:text-zinc-200 font-bold mb-3">
            Skills & Capabilities
          </h3>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="text"
              placeholder="Skill (e.g. React & TypeScript)"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Category (e.g. Engineering)"
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="w-full sm:w-40 px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 text-xs bg-[#FF6B4A] hover:bg-[#F04E27] text-white rounded-xl font-semibold shadow-soft"
            >
              Add Skill
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-zinc-800 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-sm"
              >
                <span>{s.name}</span>
                <span className="text-[10px] text-zinc-400">({s.category})</span>
                <button
                  type="button"
                  onClick={() => removeSkill(idx)}
                  className="text-zinc-400 hover:text-red-500 text-xs ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="p-5 bg-[#FAFAF8] dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <h3 className="text-xs font-mono uppercase text-zinc-800 dark:text-zinc-200 font-bold mb-3">
            Work Experience
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            <input
              type="text"
              placeholder="Company / Studio"
              value={newExpCompany}
              onChange={(e) => setNewExpCompany(e.target.value)}
              className="px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Position / Title"
              value={newExpPosition}
              onChange={(e) => setNewExpPosition(e.target.value)}
              className="px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
            />
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="mb-3 px-4 py-2 text-xs bg-[#FF6B4A] hover:bg-[#F04E27] text-white rounded-xl font-semibold shadow-soft"
          >
            Add Experience Record
          </button>
          <div className="space-y-2">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs shadow-sm"
              >
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">{exp.position}</span>
                  <span className="text-zinc-500"> at {exp.company}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeExperience(idx)}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="p-5 bg-[#FAFAF8] dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <h3 className="text-xs font-mono uppercase text-zinc-800 dark:text-zinc-200 font-bold mb-3">
            Social & External Links
          </h3>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
            >
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter / X</option>
              <option value="dribbble">Dribbble</option>
              <option value="behance">Behance</option>
              <option value="website">Personal Website</option>
            </select>
            <input
              type="url"
              placeholder="https://..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white"
            />
            <button
              type="button"
              onClick={addSocialLink}
              className="px-4 py-2 text-xs bg-[#FF6B4A] hover:bg-[#F04E27] text-white rounded-xl font-semibold shadow-soft"
            >
              Add Link
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((s, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-zinc-900 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono shadow-sm"
              >
                <span className="uppercase text-[10px] text-[#FF6B4A] font-bold">{s.platform}</span>
                <span className="truncate max-w-xs">{s.url}</span>
                <button
                  type="button"
                  onClick={() => removeSocialLink(idx)}
                  className="text-zinc-400 hover:text-red-500 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 px-4 bg-[#FF6B4A] hover:bg-[#F04E27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition shadow-soft hover:shadow-coral disabled:opacity-50"
        >
          {saving ? 'Saving Profile...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}
