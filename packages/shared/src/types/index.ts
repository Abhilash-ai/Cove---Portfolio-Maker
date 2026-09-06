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

export type ProfileDto = FullProfileDto;

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
  customTokens?: any;
  activeTemplateId?: string | null;
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

export type CopilotCommand =
  | 'make_professional'
  | 'make_shorter'
  | 'suggest_title'
  | 'turn_case_study'
  | 'which_images';

export interface CopilotInput {
  command: CopilotCommand;
  contextType: 'project' | 'profile' | 'portfolio';
  text: string;
  metadata?: {
    title?: string;
    category?: string;
    role?: string;
    tools?: string[];
    images?: { id?: string; url: string; caption?: string; altText?: string }[];
  };
}

export interface CopilotOutput {
  command: CopilotCommand;
  suggestion: string;
  titles?: string[];
  caseStudy?: {
    problem: string;
    approach: string;
    solution: string;
    outcome: string;
  };
  imageRecommendations?: {
    imageIndex: number;
    recommendedRole: 'hero' | 'detail' | 'process';
    rationale: string;
  }[];
  rationale: string;
  diffSummary: string;
  provider: 'claude' | 'local_demo';
  undoToken: string;
}

export interface ProfileSignals {
  profession?: string;
  portfolioPurpose?: 'job_search' | 'freelance' | 'academic' | 'studio' | 'personal';
  yearsOfExperience?: number;
  projectCount?: number;
  textDensity?: 'minimal' | 'balanced' | 'rich';
  mediaDensity?: 'minimal' | 'balanced' | 'rich';
  desiredPersonality?: string;
}

export interface TemplateRecommendationDto {
  templateId: string;
  name: string;
  score: number;
  matchPercentage: number;
  rationale: string;
  suitableProfessions: string[];
  interactionStyle: string;
  contentFitSummary: string;
  category: string;
}

export interface TemplateDiscoveryFilter {
  category?: string;
  profession?: string;
  style?: string;
  interactionLevel?: 'subtle' | 'standard' | 'expressive';
  theme?: 'light' | 'dark' | 'adaptive';
  query?: string;
}

export type CriticSeverity = 'high' | 'medium' | 'low';
export type CriticCategory =
  | 'narrative'
  | 'completeness'
  | 'visual_hierarchy'
  | 'mobile'
  | 'contact';

export interface CriticFeedbackItem {
  id: string;
  category: CriticCategory;
  severity: CriticSeverity;
  title: string;
  description: string;
  actionableRecommendation: string;
  affectedSection?: string;
  affectedProjectId?: string;
}

export interface CriticScoreBreakdown {
  completeness: number; // 0-100
  storytelling: number; // 0-100
  visualHierarchy: number; // 0-100
  mobileReadiness: number; // 0-100
  contactClarity: number; // 0-100
}

export interface CriticReportDto {
  portfolioId: string;
  overallScore: number; // 0-100
  breakdown: CriticScoreBreakdown;
  strengths: string[];
  feedbackItems: CriticFeedbackItem[];
  analyzedAt: string;
  provider: 'claude' | 'local_demo';
}


