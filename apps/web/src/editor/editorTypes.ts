import { ThemeTokens, PortfolioSummary, ProjectDto, FullProfileDto } from '@cove/shared';
import { HeroVariant } from '../engine/primitives/Hero.js';
import { ProjectLayout } from '../engine/templates/templateTypes.js';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type EditorTab = 'templates' | 'typography' | 'colors' | 'layout' | 'sections';

export type SaveStatus = 'saved' | 'saving' | 'unsaved';

export interface EditorState {
  portfolio: PortfolioSummary | null;
  projects: ProjectDto[];
  profile: FullProfileDto | null;
  templateId: string;
  tokens: ThemeTokens;
  sectionOrder: string[];
  hiddenSections: string[];
  heroVariant: HeroVariant;
  projectLayout: ProjectLayout;
  viewport: ViewportMode;
  scale: number;
  saveStatus: SaveStatus;
  canUndo: boolean;
  canRedo: boolean;
}
