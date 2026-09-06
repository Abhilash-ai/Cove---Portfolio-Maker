import React from 'react';
import { PortfolioDetail, ProfileDto, SocialLinkDto, SkillDto, ExperienceDto } from '@cove/shared';

interface Props {
  portfolio: PortfolioDetail;
  profile: ProfileDto | null;
  onClose: () => void;
}

export function PdfExportView({ portfolio, profile, onClose }: Props) {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="fixed inset-0 z-[120] bg-stone-950/90 backdrop-blur-md overflow-y-auto flex flex-col items-center">
      {/* Non-printed Floating Action Bar */}
      <div className="no-print sticky top-4 z-50 flex items-center justify-between w-full max-w-4xl px-6 py-3 bg-stone-900/90 border border-stone-700/80 rounded-2xl shadow-2xl backdrop-blur-md my-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-stone-100">📄 PDF & Print Preview</span>
          <span className="text-xs text-stone-400">Paginates cleanly • Respects typography & margins</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 active:scale-95"
          >
            <span>🖨️</span> Print / Save to PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-stone-400 hover:text-stone-200 text-xs font-medium transition-colors"
          >
            Exit Preview
          </button>
        </div>
      </div>

      {/* Embedded Print & Pagination Stylesheet */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 14mm 14mm 14mm 14mm;
          }
          body {
            background-color: #ffffff !important;
            color: #111827 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .pdf-document-container {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            background: #ffffff !important;
            color: #111827 !important;
          }
          .print-avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-force-break {
            page-break-before: always !important;
            break-before: page !important;
          }
        }
      `}</style>

      {/* High-Fidelity Printable Document Canvas */}
      <div className="pdf-document-container w-full max-w-4xl bg-white text-stone-900 rounded-xl shadow-2xl border border-stone-200 p-12 mb-16 space-y-10 font-sans">
        {/* Document Header */}
        <header className="border-b border-stone-200 pb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6 print-avoid-break">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">
              {profile?.name || 'Creator Portfolio'}
            </h1>
            {profile?.headline && (
              <p className="text-base text-stone-600 font-medium mt-1">
                {profile.headline}
              </p>
            )}
            <p className="text-xs text-stone-400 tracking-wider uppercase font-semibold mt-2">
              Portfolio: {portfolio.title}
            </p>
          </div>

          <div className="text-xs text-stone-600 space-y-1 text-left md:text-right">
            {profile?.email && <p className="font-mono">✉️ {profile.email}</p>}
            {profile?.contactPhone && <p>📞 {profile.contactPhone}</p>}
            {profile?.location && <p>📍 {profile.location}</p>}
            {profile?.socialLinks && profile.socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 md:justify-end pt-1">
                {profile.socialLinks.map((link: SocialLinkDto) => (
                  <span key={link.id} className="text-[11px] font-mono text-indigo-600 underline">
                    {link.label || link.platform}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Bio / Summary */}
        {profile?.bio && (
          <section className="print-avoid-break">
            <h2 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2">
              Profile Summary
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {profile.bio}
            </p>
          </section>
        )}

        {/* Skills Grid */}
        {profile?.skills && profile.skills.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2.5">
              Core Competencies & Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s: SkillDto) => (
                <span
                  key={s.id}
                  className="px-2.5 py-1 text-xs bg-stone-100 border border-stone-300 rounded text-stone-800 font-medium"
                >
                  {s.name} {s.category && <span className="text-stone-400 text-[10px]">({s.category})</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects / Case Studies Section */}
        <section className="space-y-8">
          <h2 className="text-xs uppercase tracking-wider font-bold text-stone-400 border-b border-stone-200 pb-2">
            Selected Projects & Case Studies ({portfolio.projects.length})
          </h2>

          {portfolio.projects.map((project, idx) => (
            <article
              key={project.id}
              className={`space-y-4 print-avoid-break border border-stone-200 rounded-xl p-6 bg-stone-50/50 ${
                idx > 0 ? 'mt-6' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                    {project.year && <span>Year: <strong>{project.year}</strong></span>}
                    {project.category && <span>Category: <strong>{project.category}</strong></span>}
                    {project.role && <span>Role: <strong>{project.role}</strong></span>}
                  </div>
                </div>

                {project.githubLink && (
                  <span className="text-xs font-mono text-stone-500">
                    Repo: {project.githubLink}
                  </span>
                )}
              </div>

              {/* Short & Full Description */}
              {project.shortDescription && (
                <p className="text-sm font-medium text-stone-800 leading-snug">
                  {project.shortDescription}
                </p>
              )}

              {project.fullDescription && (
                <div className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap">
                  {project.fullDescription}
                </div>
              )}

              {/* Outcome */}
              {project.outcome && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-700 block mb-0.5">
                    Measurable Outcome
                  </span>
                  {project.outcome}
                </div>
              )}

              {/* Tools & Collaborators */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2 border-t border-stone-200">
                {project.tools && project.tools.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-stone-700">Tools:</span>
                    <span>{project.tools.join(', ')}</span>
                  </div>
                )}
                {project.collaborators && project.collaborators.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-stone-700">Collaborators:</span>
                    <span>{project.collaborators.join(', ')}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* Experience Section */}
        {profile?.experiences && profile.experiences.length > 0 && (
          <section className="space-y-4 print-avoid-break">
            <h2 className="text-xs uppercase tracking-wider font-bold text-stone-400 border-b border-stone-200 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {profile.experiences.map((exp: ExperienceDto) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-bold text-stone-900">{exp.position} — {exp.company}</h4>
                    <span className="text-xs text-stone-500 font-mono">
                      {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : ''}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-stone-600">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-stone-600 space-y-0.5 pl-1">
                      {exp.highlights.map((h: string, i: number) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Document Footer */}
        <footer className="pt-6 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400 print-avoid-break">
          <span>Created with <strong>Cove</strong> Portfolio Maker</span>
          <span>Generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </footer>
      </div>
    </div>
  );
}
