import {
  ParsedResumeDto,
  ParsedContact,
  ParsedExperience,
  ParsedEducation,
  ParsedSkill,
  ParsedCertification
} from '@cove/shared';

// Taxonomy of skills across disciplines
const SKILLS_TAXONOMY: { name: string; category: string }[] = [
  // Frontend & UI
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'Svelte', category: 'Frontend' },
  { name: 'Redux', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },

  // Backend & Databases
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Prisma', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Go', category: 'Backend' },
  { name: 'Rust', category: 'Backend' },
  { name: 'Redis', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },

  // Design, 3D & Creative
  { name: 'Figma', category: 'Design' },
  { name: 'UI/UX Design', category: 'Design' },
  { name: 'Design Systems', category: 'Design' },
  { name: 'Three.js', category: 'Creative Tech' },
  { name: 'WebGL', category: 'Creative Tech' },
  { name: 'Blender', category: '3D' },
  { name: 'Photoshop', category: 'Design' },
  { name: 'Illustrator', category: 'Design' },
  { name: 'Typography', category: 'Design' },
  { name: 'Motion Design', category: 'Design' },

  // Architecture & Spatial
  { name: 'Rhino', category: 'Architecture' },
  { name: 'Grasshopper', category: 'Architecture' },
  { name: 'Parametric Design', category: 'Architecture' },
  { name: 'BIM', category: 'Architecture' },
  { name: 'Revit', category: 'Architecture' },
  { name: 'Computational Geometry', category: 'Architecture' },
  { name: 'Sustainable Architecture', category: 'Architecture' },
  { name: 'AutoCAD', category: 'Architecture' },
];

export class ResumeParserService {
  /**
   * Main entrypoint: Extracts text from Buffer or raw string, then parses structured sections.
   */
  async parseResume(bufferOrText: Buffer | string): Promise<ParsedResumeDto> {
    let rawText = '';

    if (typeof bufferOrText === 'string') {
      rawText = bufferOrText;
    } else if (Buffer.isBuffer(bufferOrText)) {
      // Detect if PDF
      if (bufferOrText.slice(0, 4).toString() === '%PDF') {
        try {
          // Dynamic import of pdf-parse for ESM compatibility
          const pdfParse = (await import('pdf-parse')).default || (await import('pdf-parse'));
          const pdfData = await (pdfParse as any)(bufferOrText);
          rawText = pdfData.text || '';
        } catch (pdfErr) {
          console.warn('PDF-parse failed, falling back to utf-8 text extract:', pdfErr);
          rawText = bufferOrText.toString('utf-8');
        }
      } else {
        rawText = bufferOrText.toString('utf-8');
      }
    }

    const cleanText = this.normalizeText(rawText);
    const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);

    const contact = this.extractContact(lines, cleanText);
    const sections = this.splitSections(cleanText);

    const experiences = this.extractExperiences(sections['experience'] || '');
    const educations = this.extractEducations(sections['education'] || '');
    const skills = this.extractSkills(cleanText);
    const certifications = this.extractCertifications(sections['certifications'] || '');

    return {
      contact,
      experiences,
      educations,
      skills,
      certifications,
      rawText: cleanText
    };
  }

  private normalizeText(text: string): string {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/[\t ]+/g, ' ');
  }

  private extractContact(lines: string[], fullText: string): ParsedContact {
    const contact: ParsedContact = {};

    // 1. Email Regex
    const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) contact.email = emailMatch[0];

    // 2. Phone Regex
    const phoneMatch = fullText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) contact.phone = phoneMatch[0];

    // 3. URLs
    const linkedinMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9-_]+)/i);
    if (linkedinMatch) contact.linkedinUrl = linkedinMatch[0];

    const githubMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-_]+)/i);
    if (githubMatch) contact.githubUrl = githubMatch[0];

    // 4. Name extraction: usually first non-empty line that isn't a header or email
    if (lines.length > 0) {
      const candidate = lines[0];
      if (candidate.length < 50 && !candidate.includes('@') && !candidate.toLowerCase().includes('resume') && !candidate.toLowerCase().includes('curriculum')) {
        contact.name = candidate;
      }
    }

    // 5. Headline: usually 2nd line if short
    if (lines.length > 1) {
      const candidateHeadline = lines[1];
      if (candidateHeadline.length < 70 && !candidateHeadline.includes('@') && !candidateHeadline.includes('http')) {
        contact.headline = candidateHeadline;
      }
    }

    // 6. Summary / Bio: check if there is a summary section
    const summaryRegex = /(?:summary|profile|about me|professional summary)[\s:]*\n([\s\S]*?)(?=\n[A-Z\s]{4,}|\n\n[A-Z]|$)/i;
    const summaryMatch = fullText.match(summaryRegex);
    if (summaryMatch && summaryMatch[1]) {
      contact.bio = summaryMatch[1].trim().slice(0, 400);
    }

    return contact;
  }

  private splitSections(fullText: string): Record<string, string> {
    const sections: Record<string, string> = {};
    const sectionHeaders = [
      { key: 'experience', patterns: ['experience', 'work experience', 'employment history', 'professional experience'] },
      { key: 'education', patterns: ['education', 'academic background', 'academic history'] },
      { key: 'skills', patterns: ['skills', 'technical skills', 'core competencies', 'technologies'] },
      { key: 'certifications', patterns: ['certifications', 'licenses', 'certificates'] },
      { key: 'projects', patterns: ['projects', 'selected works', 'case studies'] },
    ];

    const lines = fullText.split('\n');
    let currentKey = 'intro';
    let currentBuffer: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      const lower = trimmed.toLowerCase().replace(/[:#]/g, '');

      let matchedKey: string | null = null;
      if (trimmed.length < 35 && trimmed.length > 3) {
        for (const sec of sectionHeaders) {
          if (sec.patterns.some((p) => p === lower || lower.startsWith(p))) {
            matchedKey = sec.key;
            break;
          }
        }
      }

      if (matchedKey) {
        if (currentBuffer.length > 0) {
          sections[currentKey] = currentBuffer.join('\n');
        }
        currentKey = matchedKey;
        currentBuffer = [];
      } else {
        currentBuffer.push(line);
      }
    }

    if (currentBuffer.length > 0) {
      sections[currentKey] = currentBuffer.join('\n');
    }

    return sections;
  }

  private extractExperiences(experienceText: string): ParsedExperience[] {
    const experiences: ParsedExperience[] = [];
    if (!experienceText.trim()) return experiences;

    // Split text into chunks separated by empty lines or obvious date signatures
    const paragraphs = experienceText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

    for (const para of paragraphs) {
      const lines = para.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) continue;

      // Extract date if present
      const dateRegex = /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)?\s*\d{4})\s*[-–—to]+\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)?\s*\d{4}|Present|Current)/i;
      const dateMatch = para.match(dateRegex);

      const startDate = dateMatch ? dateMatch[1].trim() : undefined;
      const endDate = dateMatch ? dateMatch[2].trim() : undefined;
      const isCurrent = endDate ? /present|current/i.test(endDate) : false;

      // First line usually has role or company
      const line0 = lines[0] || '';
      let company = line0;
      let position = lines[1] || 'Specialist';

      if (line0.includes(' at ')) {
        const parts = line0.split(' at ');
        position = parts[0].trim();
        company = parts[1].trim();
      } else if (line0.includes(' - ') && !dateRegex.test(line0)) {
        const parts = line0.split(' - ');
        company = parts[0].trim();
        position = parts[1].trim();
      }

      // Collect highlights / bullet points
      const highlights: string[] = [];
      for (let i = 1; i < lines.length; i++) {
        const l = lines[i];
        if (/^[•\-*]\s*/.test(l)) {
          highlights.push(l.replace(/^[•\-*]\s*/, '').trim());
        }
      }

      if (company) {
        experiences.push({
          company: company.replace(dateRegex, '').trim(),
          position: position.replace(dateRegex, '').trim(),
          startDate,
          endDate,
          isCurrent,
          description: highlights.length === 0 && lines.length > 2 ? lines.slice(2).join(' ') : null,
          highlights: highlights.slice(0, 5)
        });
      }
    }

    return experiences.slice(0, 8);
  }

  private extractEducations(educationText: string): ParsedEducation[] {
    const educations: ParsedEducation[] = [];
    if (!educationText.trim()) return educations;

    const paragraphs = educationText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

    for (const para of paragraphs) {
      const lines = para.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) continue;

      const institution = lines[0];
      const degreeLine = lines[1] || 'Degree';

      // Year match
      const yearMatch = para.match(/\b(19\d\d|20\d\d)\b/);
      const year = yearMatch ? yearMatch[0] : undefined;

      educations.push({
        institution,
        degree: degreeLine,
        endDate: year,
      });
    }

    return educations.slice(0, 4);
  }

  private extractSkills(fullText: string): ParsedSkill[] {
    const matchedSkills: ParsedSkill[] = [];
    const lowerText = fullText.toLowerCase();

    for (const skill of SKILLS_TAXONOMY) {
      // Regex word boundary matching
      const escaped = skill.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(?:\\b|\\s)${escaped}(?:\\b|\\s|[,;])`, 'i');

      if (pattern.test(lowerText) || lowerText.includes(skill.name.toLowerCase())) {
        matchedSkills.push({
          name: skill.name,
          category: skill.category,
          level: 'Proficient'
        });
      }
    }

    return matchedSkills;
  }

  private extractCertifications(certText: string): ParsedCertification[] {
    const certs: ParsedCertification[] = [];
    if (!certText.trim()) return certs;

    const lines = certText.split('\n').map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (line.length > 3 && line.length < 90) {
        certs.push({
          name: line,
          issuer: 'Accredited Institution'
        });
      }
    }
    return certs.slice(0, 5);
  }
}

export const resumeParserService = new ResumeParserService();
