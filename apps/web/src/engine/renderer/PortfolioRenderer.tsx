import React from 'react';
import { ProjectDto, FullProfileDto, PortfolioSummary, ThemeTokens } from '@cove/shared';
import { TemplateDefinition } from '../templates/templateTypes.js';
import { Hero, HeroVariant } from '../primitives/Hero.js';
import { StickyNav } from '../primitives/StickyNav.js';
import { ProjectGrid } from '../primitives/ProjectGrid.js';
import { ProjectList } from '../primitives/ProjectList.js';
import { Skills } from '../primitives/Skills.js';
import { Experience } from '../primitives/Experience.js';
import { Contact } from '../primitives/Contact.js';
import { Footer } from '../primitives/Footer.js';
import { CustomCursor } from '../interactions/CustomCursor.js';

interface Props {
  portfolio: PortfolioSummary;
  projects: ProjectDto[];
  profile: FullProfileDto | null;
  template: TemplateDefinition;
  overrideHeroVariant?: HeroVariant;
  overrideProjectLayout?: 'grid' | 'list';
  overrideSectionOrder?: string[];
  hiddenSections?: string[];
  overrideTokens?: ThemeTokens;
  forcedTouchMode?: boolean;
}

export function PortfolioRenderer({
  portfolio,
  projects,
  profile,
  template,
  overrideHeroVariant,
  overrideProjectLayout,
  overrideSectionOrder,
  hiddenSections = [],
  overrideTokens,
  forcedTouchMode = false
}: Props) {
  const activeTokens = overrideTokens || template.tokens;
  const activeHeroVariant = overrideHeroVariant || template.heroVariant;
  const activeProjectLayout = overrideProjectLayout || template.projectLayout;

  function scrollToContact() {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  // Section sequence based on override order, portfolio order, or template order
  const rawSections = overrideSectionOrder && overrideSectionOrder.length > 0
    ? overrideSectionOrder
    : (portfolio.sectionOrder && portfolio.sectionOrder.length > 0 ? portfolio.sectionOrder : template.sectionOrder);

  const sections = rawSections.filter((s) => !hiddenSections.includes(s));

  return (
    <div
      className="w-full min-h-screen transition-colors duration-300 relative selection:bg-blue-600 selection:text-white"
      style={{
        backgroundColor: activeTokens.colors.background,
        color: activeTokens.colors.textPrimary,
        fontFamily: activeTokens.typography.fontBody,
      }}
    >
      {/* 1. Cursor Reactive Layer (Suppressed on touch) */}
      {template.interactionProfile.customCursor && (
        <CustomCursor
          enabled={true}
          forcedTouchMode={forcedTouchMode}
          accentColor={activeTokens.colors.accent}
        />
      )}

      {/* 2. Navigation */}
      <StickyNav
        portfolio={portfolio}
        profile={profile}
        tokens={activeTokens}
        forcedTouchMode={forcedTouchMode}
        onContactClick={scrollToContact}
      />

      {/* 3. Render Sections Dynamically */}
      <main>
        {sections.map((sec) => {
          switch (sec) {
            case 'hero':
              return (
                <Hero
                  key="hero"
                  variant={activeHeroVariant}
                  profile={profile}
                  portfolio={portfolio}
                  tokens={activeTokens}
                  forcedTouchMode={forcedTouchMode}
                  onContactClick={scrollToContact}
                />
              );

            case 'projects':
              return activeProjectLayout === 'list' ? (
                <ProjectList
                  key="projects"
                  projects={projects}
                  tokens={activeTokens}
                  forcedTouchMode={forcedTouchMode}
                />
              ) : (
                <ProjectGrid
                  key="projects"
                  projects={projects}
                  tokens={activeTokens}
                  forcedTouchMode={forcedTouchMode}
                />
              );

            case 'skills':
              return <Skills key="skills" profile={profile} tokens={activeTokens} />;

            case 'experience':
              return <Experience key="experience" profile={profile} tokens={activeTokens} />;

            case 'contact':
              return (
                <Contact
                  key="contact"
                  profile={profile}
                  tokens={activeTokens}
                  forcedTouchMode={forcedTouchMode}
                />
              );

            default:
              return null;
          }
        })}
      </main>

      {/* 4. Footer */}
      <Footer portfolio={portfolio} profile={profile} tokens={activeTokens} />
    </div>
  );
}
