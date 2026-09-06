import React from 'react';
import { ThemeTokens, FullProfileDto, PortfolioSummary } from '@cove/shared';

interface Props {
  portfolio: PortfolioSummary;
  profile: FullProfileDto | null;
  tokens: ThemeTokens;
}

export function Footer({ portfolio, profile, tokens }: Props) {
  const currentYear = new Date().getFullYear();
  const creator = profile?.name || portfolio.title;

  return (
    <footer className="py-12 px-6 border-t transition-colors"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.border
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-4"
        style={{ color: tokens.colors.textMuted }}
      >
        <div className="flex items-center gap-2">
          <span>© {currentYear} {creator}. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
