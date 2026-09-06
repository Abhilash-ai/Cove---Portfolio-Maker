export interface ParsedContact {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  headline?: string | null;
  bio?: string | null;
  website?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
}

export interface ParsedExperience {
  company: string;
  position: string;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  highlights: string[];
}

export interface ParsedEducation {
  institution: string;
  degree: string;
  fieldOfStudy?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  grade?: string | null;
}

export interface ParsedSkill {
  name: string;
  category?: string | null;
  level?: string | null;
}

export interface ParsedCertification {
  name: string;
  issuer: string;
  issueDate?: string | null;
}

export interface ParsedResumeDto {
  contact: ParsedContact;
  experiences: ParsedExperience[];
  educations: ParsedEducation[];
  skills: ParsedSkill[];
  certifications: ParsedCertification[];
  rawText: string;
}

export interface ResumeMergePayload {
  selectedContactFields?: {
    name?: boolean;
    headline?: boolean;
    bio?: boolean;
    location?: boolean;
    email?: boolean;
    phone?: boolean;
    linkedin?: boolean;
    github?: boolean;
  };
  contact?: ParsedContact;
  selectedExperiences: ParsedExperience[];
  selectedEducations: ParsedEducation[];
  selectedSkills: ParsedSkill[];
  selectedCertifications: ParsedCertification[];
}
