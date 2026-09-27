import React, { useState } from 'react';
import {
  ParsedResumeDto,
  ParsedExperience,
  ParsedSkill,
  ParsedProject,
  ParsedEducation,
  ResumeMergePayload,
  FullProfileDto
} from '@cove/shared';
import {
  Check,
  CheckCircle2,
  FileText,
  Sparkles,
  Upload,
  X,
  Edit2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  User,
  Plus
} from 'lucide-react';

interface Props {
  token: string;
  currentProfile: FullProfileDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ResumeUploadModal({ token, currentProfile, onClose, onSuccess }: Props) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parsed results (editable)
  const [parsed, setParsed] = useState<ParsedResumeDto | null>(null);

  // Selection states for diff & merge
  const [selectedContactFields, setSelectedContactFields] = useState<Record<string, boolean>>({
    name: true,
    headline: true,
    bio: true,
    location: true,
    email: false,
    phone: true,
    linkedin: true,
    github: true,
  });

  const [selectedExpIndices, setSelectedExpIndices] = useState<Set<number>>(new Set());
  const [selectedEduIndices, setSelectedEduIndices] = useState<Set<number>>(new Set());
  const [selectedProjectIndices, setSelectedProjectIndices] = useState<Set<number>>(new Set());
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  // Handle parsing submit
  async function handleParse() {
    setError(null);
    setParsing(true);

    try {
      let res: Response;
      if (activeTab === 'upload' && file) {
        const formData = new FormData();
        formData.append('file', file);
        res = await fetch('/api/v1/resume/parse', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else if (rawText.trim()) {
        res = await fetch('/api/v1/resume/parse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ text: rawText }),
        });
      } else {
        setError('Please select a resume file or paste resume text.');
        setParsing(false);
        return;
      }

      const json = await res.json();
      if (res.ok && json.success) {
        const data: ParsedResumeDto = json.data.parsed;
        setParsed(data);

        // Pre-select all
        setSelectedExpIndices(new Set((data.experiences || []).map((_, i) => i)));
        setSelectedEduIndices(new Set((data.educations || []).map((_, i) => i)));
        setSelectedProjectIndices(new Set((data.projects || []).map((_, i) => i)));
        setSelectedSkills(new Set((data.skills || []).map((s) => s.name)));
      } else {
        setError(json.error?.message || 'Failed to parse resume document');
      }
    } catch (err: any) {
      setError(err.message || 'Network error during resume parsing');
    } finally {
      setParsing(false);
    }
  }

  // Handle applying merge
  async function handleApply() {
    if (!parsed) return;
    setApplying(true);
    setError(null);

    const payload: ResumeMergePayload = {
      selectedContactFields,
      contact: parsed.contact,
      selectedExperiences: (parsed.experiences || []).filter((_, i) => selectedExpIndices.has(i)),
      selectedEducations: (parsed.educations || []).filter((_, i) => selectedEduIndices.has(i)),
      selectedSkills: (parsed.skills || []).filter((s) => selectedSkills.has(s.name)),
      selectedProjects: (parsed.projects || []).filter((_, i) => selectedProjectIndices.has(i)),
      selectedCertifications: parsed.certifications || [],
    };

    try {
      const res = await fetch('/api/v1/resume/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        onSuccess();
        onClose();
      } else {
        setError(json.error?.message || 'Failed to merge resume data');
      }
    } catch (err: any) {
      setError(err.message || 'Network error while saving profile');
    } finally {
      setApplying(false);
    }
  }

  function toggleSkill(name: string) {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function toggleExperience(idx: number) {
    setSelectedExpIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function toggleEducation(idx: number) {
    setSelectedEduIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function toggleProject(idx: number) {
    setSelectedProjectIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function toggleContactField(field: string) {
    setSelectedContactFields((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FF6B4A]/10 border border-[#FF6B4A]/20 flex items-center justify-center text-[#FF6B4A]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Resume Import Engine</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Zero Destructive Overwrite
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Extract identity, skills, experience, projects, and credentials with granular review before applying.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded-xl flex items-center gap-2">
              <span className="text-sm">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {!parsed ? (
            /* STEP 1: Upload or Paste Input */
            <div className="space-y-4">
              <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    activeTab === 'upload' ? 'bg-[#FF6B4A] text-white shadow-soft' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Upload File (PDF / DOCX)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('paste')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    activeTab === 'paste' ? 'bg-[#FF6B4A] text-white shadow-soft' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Paste Resume Text
                </button>
              </div>

              {activeTab === 'upload' ? (
                <div
                  className="border-2 border-dashed border-zinc-800 hover:border-[#FF6B4A]/50 rounded-2xl p-10 text-center bg-zinc-900/30 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('resume-file-input')?.click()}
                >
                  <input
                    id="resume-file-input"
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 mx-auto flex items-center justify-center text-zinc-400 mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7 text-[#FF6B4A]" />
                  </div>
                  <p className="text-sm font-bold text-zinc-200">
                    {file ? file.name : 'Click to select or drag and drop your resume file'}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    Supported: PDF, DOCX, TXT up to 25MB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-300">
                    Paste raw text from your resume or CV:
                  </label>
                  <textarea
                    rows={12}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#FF6B4A] font-mono leading-relaxed"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleParse}
                disabled={parsing || (activeTab === 'upload' && !file) || (activeTab === 'paste' && !rawText.trim())}
                className="w-full py-3 bg-[#FF6B4A] hover:bg-[#F04E27] disabled:opacity-50 text-white rounded-xl text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition shadow-coral"
              >
                {parsing ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>Extracting Structured Profile Data...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Extract & Review Resume Data</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* STEP 2: Diff & Merge Review Screen */
            <div className="space-y-6">
              {/* Structured Checklist Banner per Requirement 6 */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    Extraction Results Checklist
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-300 font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Name
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Skills ({parsed.skills?.length || 0})
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Experience ({parsed.experiences?.length || 0})
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Projects ({parsed.projects?.length || 0})
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Education ({parsed.educations?.length || 0})
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setParsed(null)}
                  className="text-xs text-zinc-400 hover:text-white underline font-mono text-left sm:text-right"
                >
                  Upload different file
                </button>
              </div>

              {/* 1. Contact & Profile Info Diff */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                    1. Identity & Contact Information
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Name */}
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                    <label className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                      <span>Full Name</span>
                      <input
                        type="checkbox"
                        checked={!!selectedContactFields.name}
                        onChange={() => toggleContactField('name')}
                        className="rounded border-zinc-700 bg-zinc-800 text-[#FF6B4A]"
                      />
                    </label>
                    <input
                      type="text"
                      value={parsed.contact.name || ''}
                      onChange={(e) =>
                        setParsed({
                          ...parsed,
                          contact: { ...parsed.contact, name: e.target.value }
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF6B4A]"
                    />
                  </div>

                  {/* Headline */}
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                    <label className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                      <span>Professional Headline</span>
                      <input
                        type="checkbox"
                        checked={!!selectedContactFields.headline}
                        onChange={() => toggleContactField('headline')}
                        className="rounded border-zinc-700 bg-zinc-800 text-[#FF6B4A]"
                      />
                    </label>
                    <input
                      type="text"
                      value={parsed.contact.headline || ''}
                      onChange={(e) =>
                        setParsed({
                          ...parsed,
                          contact: { ...parsed.contact, headline: e.target.value }
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF6B4A]"
                    />
                  </div>

                  {/* Contact Email */}
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                    <label className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                      <span>Contact Email</span>
                      <input
                        type="checkbox"
                        checked={!!selectedContactFields.email}
                        onChange={() => toggleContactField('email')}
                        className="rounded border-zinc-700 bg-zinc-800 text-[#FF6B4A]"
                      />
                    </label>
                    <input
                      type="email"
                      value={parsed.contact.email || ''}
                      onChange={(e) =>
                        setParsed({
                          ...parsed,
                          contact: { ...parsed.contact, email: e.target.value }
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF6B4A]"
                    />
                  </div>

                  {/* Contact Phone */}
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                    <label className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                      <span>Phone</span>
                      <input
                        type="checkbox"
                        checked={!!selectedContactFields.phone}
                        onChange={() => toggleContactField('phone')}
                        className="rounded border-zinc-700 bg-zinc-800 text-[#FF6B4A]"
                      />
                    </label>
                    <input
                      type="text"
                      value={parsed.contact.phone || ''}
                      onChange={(e) =>
                        setParsed({
                          ...parsed,
                          contact: { ...parsed.contact, phone: e.target.value }
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF6B4A]"
                    />
                  </div>
                </div>

                {/* Bio / Summary */}
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                  <label className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                    <span>Professional Bio / Summary</span>
                    <input
                      type="checkbox"
                      checked={!!selectedContactFields.bio}
                      onChange={() => toggleContactField('bio')}
                      className="rounded border-zinc-700 bg-zinc-800 text-[#FF6B4A]"
                    />
                  </label>
                  <textarea
                    rows={3}
                    value={parsed.contact.bio || ''}
                    onChange={(e) =>
                      setParsed({
                        ...parsed,
                        contact: { ...parsed.contact, bio: e.target.value }
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B4A]"
                  />
                </div>
              </div>

              {/* 2. Skills Multi-Select Cloud */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF6B4A]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                      2. Skills & Technologies ({selectedSkills.size} selected)
                    </h4>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSkills(new Set(parsed.skills.map((s) => s.name)))}
                      className="text-[11px] text-[#FF6B4A] hover:underline"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSkills(new Set())}
                      className="text-[11px] text-zinc-500 hover:underline"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {parsed.skills.map((skill) => {
                    const isSelected = selectedSkills.has(skill.name);
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => toggleSkill(skill.name)}
                        className={`px-3 py-1.5 text-xs rounded-xl border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#FF6B4A]/10 border-[#FF6B4A] text-[#FF6B4A] font-semibold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <span>{skill.name}</span>
                        {skill.category && (
                          <span className="text-[9px] opacity-60 font-mono">({skill.category})</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Work Experience Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                      3. Work Experience ({selectedExpIndices.size} selected)
                    </h4>
                  </div>
                </div>

                <div className="space-y-3">
                  {parsed.experiences.map((exp, idx) => {
                    const isSelected = selectedExpIndices.has(idx);
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all space-y-2 ${
                          isSelected
                            ? 'bg-zinc-900/90 border-emerald-500/50 shadow-sm'
                            : 'bg-zinc-900/30 border-zinc-800/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleExperience(idx)}
                              className="rounded border-zinc-700 bg-zinc-800 text-emerald-500"
                            />
                            <span className="text-xs font-bold text-white">{exp.company}</span>
                          </label>
                          <span className="text-[11px] font-mono text-zinc-500">
                            {exp.startDate || ''} — {exp.isCurrent ? 'Present' : exp.endDate || ''}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => {
                              const updated = [...parsed.experiences];
                              updated[idx].position = e.target.value;
                              setParsed({ ...parsed, experiences: updated });
                            }}
                            placeholder="Role / Title"
                            className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...parsed.experiences];
                              updated[idx].company = e.target.value;
                              setParsed({ ...parsed, experiences: updated });
                            }}
                            placeholder="Company"
                            className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="pl-5 list-disc space-y-1 text-xs text-zinc-400">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Projects Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-purple-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                      4. Projects & Case Studies ({selectedProjectIndices.size} selected)
                    </h4>
                  </div>
                </div>

                {(!parsed.projects || parsed.projects.length === 0) ? (
                  <p className="text-xs text-zinc-500 italic p-3 bg-zinc-900/30 rounded-xl border border-zinc-800">
                    No discrete project section detected. You can add projects manually in Portfolio workspace.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {parsed.projects.map((proj, idx) => {
                      const isSelected = selectedProjectIndices.has(idx);
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border transition-all space-y-2 ${
                            isSelected
                              ? 'bg-zinc-900/90 border-purple-500/50 shadow-sm'
                              : 'bg-zinc-900/30 border-zinc-800/60 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleProject(idx)}
                                className="rounded border-zinc-700 bg-zinc-800 text-purple-500"
                              />
                              <span className="text-xs font-bold text-white">{proj.title}</span>
                            </label>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                              {proj.role || 'Project'}
                            </span>
                          </div>

                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...(parsed.projects || [])];
                              updated[idx].title = e.target.value;
                              setParsed({ ...parsed, projects: updated });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500"
                          />

                          <textarea
                            rows={2}
                            value={proj.shortDescription || ''}
                            onChange={(e) => {
                              const updated = [...(parsed.projects || [])];
                              updated[idx].shortDescription = e.target.value;
                              setParsed({ ...parsed, projects: updated });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500"
                          />

                          {proj.tools && proj.tools.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {proj.tools.map((t) => (
                                <span key={t} className="text-[10px] font-mono bg-purple-950/40 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded-md">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 5. Education Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                      5. Education & Academics ({selectedEduIndices.size} selected)
                    </h4>
                  </div>
                </div>

                <div className="space-y-3">
                  {parsed.educations.map((edu, idx) => {
                    const isSelected = selectedEduIndices.has(idx);
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all space-y-2 ${
                          isSelected
                            ? 'bg-zinc-900/90 border-amber-500/50 shadow-sm'
                            : 'bg-zinc-900/30 border-zinc-800/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleEducation(idx)}
                              className="rounded border-zinc-700 bg-zinc-800 text-amber-500"
                            />
                            <span className="text-xs font-bold text-white">{edu.institution}</span>
                          </label>
                          {edu.endDate && (
                            <span className="text-[11px] font-mono text-zinc-500">
                              Graduation: {edu.endDate}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...parsed.educations];
                              updated[idx].degree = e.target.value;
                              setParsed({ ...parsed, educations: updated });
                            }}
                            placeholder="Degree"
                            className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...parsed.educations];
                              updated[idx].institution = e.target.value;
                              setParsed({ ...parsed, educations: updated });
                            }}
                            placeholder="Institution"
                            className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-950">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-900 transition"
          >
            Cancel
          </button>

          {parsed && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleApply}
                disabled={applying}
                className="px-5 py-2.5 text-xs font-bold bg-[#FF6B4A] hover:bg-[#F04E27] disabled:opacity-50 text-white rounded-xl flex items-center gap-2 transition shadow-coral uppercase tracking-wider"
              >
                {applying ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>Saving to Profile & Portfolio...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Apply to Cove</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
