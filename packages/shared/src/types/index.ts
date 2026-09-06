export type PortfolioStatus = 'draft' | 'published';

export type MediaType = 'IMAGE' | 'VIDEO' | 'PDF' | 'DRAWING' | 'RENDER';

export interface SocialLinkDto {
  id?: string;
  platform: string;
  url: string;
  label?: string | null;
  sortOrder?: number;
}

export interface SkillDto {
  id?: string;
  name: string;
  category?: string | null;
  level?: string | null;
  sortOrder?: number;
}

export interface ExperienceDto {
  id?: string;
  company: string;
  position: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  highlights?: string[];
  sortOrder?: number;
}

export interface EducationDto {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string | null;
  grade?: string | null;
  activities?: string | null;
  sortOrder?: number;
}

export interface CertificationDto {
  id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialUrl?: string | null;
  credentialId?: string | null;
}

export interface AchievementDto {
  id?: string;
  title: string;
  description?: string | null;
  date?: string | null;
  url?: string | null;
}

export interface PublicationDto {
  id?: string;
  title: string;
  publisher: string;
  publicationDate?: string | null;
  url?: string | null;
  description?: string | null;
}

export interface FullProfileDto {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  headline?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  location?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  availableForWork: boolean;
  socialLinks: SocialLinkDto[];
  skills: SkillDto[];
  experiences: ExperienceDto[];
  educations: EducationDto[];
  certifications: CertificationDto[];
  achievements: AchievementDto[];
  publications: PublicationDto[];
  updatedAt: string;
}

export interface ProjectMediaDto {
  id: string;
  projectId: string;
  url: string;
  type: MediaType;
  caption?: string | null;
  altText?: string | null;
  isCover: boolean;
  sortOrder: number;
  metadata?: Record<string, any> | null;
  createdAt: string;
}

export interface ProjectDto {
  id: string;
  userId: string;
  portfolioId?: string | null;
  title: string;
  coverImage?: string | null;
  year?: string | null;
  category?: string | null;
  location?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  role?: string | null;
  duration?: string | null;
  outcome?: string | null;
  githubLink?: string | null;
  tools: string[];
  collaborators: string[];
  externalLinks: { label: string; url: string }[];
  customSectionOrder?: string[] | null;
  sortOrder: number;
  media: ProjectMediaDto[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSummary {
  id: string;
  userId: string;
  title: string;
  slug: string;
  status: PortfolioStatus;
  sectionOrder: string[];
  projectCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioDetail extends PortfolioSummary {
  projects: ProjectDto[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
