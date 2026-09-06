import React, { useState } from 'react';
import { ThemeTokens, FullProfileDto, PortfolioSummary } from '@cove/shared';
import { MagneticButton } from '../interactions/MagneticButton.js';

interface Props {
  portfolio: PortfolioSummary;
  profile: FullProfileDto | null;
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
  onContactClick?: () => void;
}

export function StickyNav({ portfolio, profile, tokens, forcedTouchMode = false, onContactClick }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brandTitle = profile?.name || portfolio.title;

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md border-b transition-colors"
      style={{
        backgroundColor: `${tokens.colors.background}cc`,
        borderColor: tokens.colors.border
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-bold text-sm tracking-tight transition hover:opacity-80"
          style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
        >
          {brandTitle}
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono">
          <a href="#work" className="transition hover:opacity-100" style={{ color: tokens.colors.textSecondary }}>Work</a>
          <a href="#skills" className="transition hover:opacity-100" style={{ color: tokens.colors.textSecondary }}>Skills</a>
          <a href="#experience" className="transition hover:opacity-100" style={{ color: tokens.colors.textSecondary }}>Experience</a>
          <a href="#contact" className="transition hover:opacity-100" style={{ color: tokens.colors.textSecondary }}>Contact</a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <MagneticButton
            forcedTouchMode={forcedTouchMode}
            onClick={onContactClick}
            className="px-4 py-2 rounded-full text-xs font-mono font-medium transition"
            style={{ backgroundColor: tokens.colors.accent, color: tokens.colors.background }}
          >
            Let's Talk
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-xs font-mono rounded border"
          style={{ borderColor: tokens.colors.border, color: tokens.colors.textPrimary }}
        >
          {mobileMenuOpen ? 'Close ✕' : 'Menu ☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden p-6 border-b space-y-4 text-sm font-mono"
          style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
        >
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1"
            style={{ color: tokens.colors.textPrimary }}
          >
            → Work
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1"
            style={{ color: tokens.colors.textPrimary }}
          >
            → Skills
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1"
            style={{ color: tokens.colors.textPrimary }}
          >
            → Experience
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1"
            style={{ color: tokens.colors.textPrimary }}
          >
            → Contact
          </a>
        </div>
      )}
    </header>
  );
}
