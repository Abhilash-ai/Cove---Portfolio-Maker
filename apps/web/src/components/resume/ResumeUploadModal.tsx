import React, { useState } from 'react';
import {
  ParsedResumeDto,
  ParsedExperience,
  ParsedSkill,
  ResumeMergePayload,
  FullProfileDto
} from '@cove/shared';

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

  // Parsed results
  const [parsed, setParsed] = useState<ParsedResumeDto | null>(null);

  // Selection states for diff & merge
  const [selectedContactFields, setSelectedContactFields] = useState<Record<string, boolean>>({
    name: true,
    headline: true,
    bio: true,
    location: true,
    email: false, // by default keep existing account email unless chosen
    phone: true,
    linkedin: true,
    github: true,
  });

  const [selectedExpIndices, setSelectedExpIndices] = useState<Set<number>>(new Set());
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

        // Pre-select all experiences and skills
        setSelectedExpIndices(new Set(data.experiences.map((_, i) => i)));
        setSelectedSkills(new Set(data.skills.map((s) => s.name)));
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
      selectedExperiences: parsed.experiences.filter((_, i) => selectedExpIndices.has(i)),
      selectedEducations: parsed.educations,
      selectedSkills: parsed.skills.filter((s) => selectedSkills.has(s.name)),
      selectedCertifications: parsed.certifications,
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
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Import from Resume</h3>
              <p className="text-xs text-zinc-400">Extract skills, experience, and bio with zero destructive overwrite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded-lg">
              {error}
            </div>
          )}

          {!parsed ? (
            /* STEP 1: Upload or Paste Input */
            <div className="space-y-4">
              <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800 w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                    activeTab === 'upload' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Upload File (PDF / DOC)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('paste')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                    activeTab === 'paste' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Paste Resume Text
                </button>
              </div>

              {activeTab === 'upload' ? (
                <div
                  className="border-2 border-dashed border-zinc-800 hover:border-blue-500/50 rounded-xl p-8 text-center bg-zinc-900/30 transition-colors cursor-pointer"
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
                  <div className="w-12 h-12 rounded-full bg-zinc-800/80 mx-auto flex items-center justify-center text-zinc-400 mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-zinc-200">
                    {file ? file.name : 'Click to upload or drag resume file'}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">PDF or plain text up to 25MB</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-300">Paste raw text from your resume:</label>
                  <textarea
                    rows={10}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste resume text including contact information, experience, education, and skills..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleParse}
                disabled={parsing || (activeTab === 'upload' && !file) || (activeTab === 'paste' && !rawText.trim())}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/10"
              >
                {parsing ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>Extracting & Parsing Resume Content...</span>
                  </>
                ) : (
                  <span>Extract & Review Resume Data</span>
                )}
              </button>
            </div>
          ) : (
            /* STEP 2: Diff & Merge Review Screen */
            <div className="space-y-6">
              {/* Summary Stats Banner */}
              <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-zinc-200">
                    Extracted {parsed.skills.length} skills, {parsed.experiences.length} positions, {parsed.educations.length} schools
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setParsed(null)}
                  className="text-xs text-zinc-400 hover:text-white underline font-mono"
                >
                  Upload different file
                </button>
              </div>

              {/* 1. Contact & Profile Info Diff */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-1">
                  1. Profile & Bio Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Name */}
                  {parsed.contact.name && (
                    <label className="flex items-start gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700">
                      <input
                        type="checkbox"
                        checked={!!selectedContactFields.name}
                        onChange={() => toggleContactField('name')}
                        className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Name</span>
                        <span className="text-xs font-semibold text-white">{parsed.contact.name}</span>
                      </div>
                    </label>
                  )}

                  {/* Headline */}
                  {parsed.contact.headline && (
                    <label className="flex items-start gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700">
                      <input
                        type="checkbox"
                        checked={!!selectedContactFields.headline}
                        onChange={() => toggleContactField('headline')}
                        className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Headline</span>
                        <span className="text-xs font-semibold text-white">{parsed.contact.headline}</span>
                      </div>
                    </label>
                  )}

                  {/* Email */}
                  {parsed.contact.email && (
                    <label className="flex items-start gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700">
                      <input
                        type="checkbox"
                        checked={!!selectedContactFields.email}
                        onChange={() => toggleContactField('email')}
                        className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Contact Email</span>
                        <span className="text-xs text-zinc-200">{parsed.contact.email}</span>
                      </div>
                    </label>
                  )}

                  {/* Phone */}
                  {parsed.contact.phone && (
                    <label className="flex items-start gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700">
                      <input
                        type="checkbox"
                        checked={!!selectedContactFields.phone}
                        onChange={() => toggleContactField('phone')}
                        className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Contact Phone</span>
                        <span className="text-xs text-zinc-200">{parsed.contact.phone}</span>
                      </div>
                    </label>
                  )}
                </div>

                {/* Bio */}
                {parsed.contact.bio && (
                  <label className="flex items-start gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700">
                    <input
                      type="checkbox"
                      checked={!!selectedContactFields.bio}
                      onChange={() => toggleContactField('bio')}
                      className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Professional Bio</span>
                      <p className="text-xs text-zinc-300 leading-relaxed mt-0.5">{parsed.contact.bio}</p>
                    </div>
                  </label>
                )}
              </div>

              {/* 2. Skills Multi-Select Cloud */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    2. Matched Skills ({selectedSkills.size} selected)
                  </h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSkills(new Set(parsed.skills.map((s) => s.name)))}
                      className="text-[11px] text-blue-400 hover:underline"
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
                        className={`px-3 py-1 text-xs rounded-lg border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-950/40 border-blue-500 text-blue-200 font-medium'
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
                <div className="flex items-center justify-between border-b border-zinc-800 pb-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    3. Work Experience ({selectedExpIndices.size} selected)
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {parsed.experiences.map((exp, idx) => {
                    const isSelected = selectedExpIndices.has(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleExperience(idx)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-zinc-900/90 border-blue-500/50 shadow-sm'
                            : 'bg-zinc-900/30 border-zinc-800/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="mt-1 rounded border-zinc-700 bg-zinc-800 text-blue-600"
                            />
                            <div>
                              <h5 className="text-xs font-bold text-white">{exp.position}</h5>
                              <p className="text-xs text-zinc-400">{exp.company}</p>
                              {(exp.startDate || exp.endDate) && (
                                <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                                  {exp.startDate || ''} — {exp.isCurrent ? 'Present' : exp.endDate || ''}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="mt-2 pl-6 list-disc space-y-1 text-xs text-zinc-400">
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
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-950">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition"
          >
            Cancel
          </button>

          {parsed && (
            <button
              type="button"
              onClick={handleApply}
              disabled={applying}
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl flex items-center gap-2 transition shadow-lg shadow-blue-600/20"
            >
              {applying ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Merging into Profile...</span>
                </>
              ) : (
                <span>Apply Selected Data to Profile</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
