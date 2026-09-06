import React, { useState } from 'react';
import { useCustomizerStore } from './useCustomizerStore.js';
import { EditorTopBar } from './EditorTopBar.js';
import { EditorSidebar } from './EditorSidebar.js';
import { EditorCanvas } from './EditorCanvas.js';
import { PortfolioRenderer } from '../engine/renderer/PortfolioRenderer.js';
import { SEEDED_TEMPLATES } from '../engine/templates/seededTemplates.js';
import { PdfExportView } from '../components/export/PdfExportView.js';
import { CoveCopilotModal } from '../components/copilot/CoveCopilotModal.js';
import { TemplateDiscoveryModal } from '../components/templates/TemplateDiscoveryModal.js';
import { PortfolioCriticModal } from '../components/critic/PortfolioCriticModal.js';

interface Props {
  portfolioId?: string;
  token?: string;
  onBack: () => void;
}

export function VisualEditor({ portfolioId, token, onBack }: Props) {
  const store = useCustomizerStore({ portfolioId, token });
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showPdfExport, setShowPdfExport] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [showCritic, setShowCritic] = useState(false);

  const activeTemplate = SEEDED_TEMPLATES.find((t) => t.id === store.templateId) || SEEDED_TEMPLATES[0];

  return (
    <div className="w-full h-screen flex flex-col bg-zinc-950 text-white overflow-hidden select-none">
      {/* 1. Header Navigation & Controls */}
      <EditorTopBar
        portfolio={store.portfolio}
        viewport={store.viewport}
        scale={store.scale}
        saveStatus={store.saveStatus}
        canUndo={store.canUndo}
        canRedo={store.canRedo}
        onSetViewport={store.setViewport}
        onSetScale={store.setScale}
        onUndo={store.undo}
        onRedo={store.redo}
        onSaveNow={store.saveNow}
        onBack={onBack}
        onPreviewPublic={() => setShowFullPreview(true)}
        onExportPdf={() => setShowPdfExport(true)}
        onOpenCopilot={token ? () => setShowCopilot(true) : undefined}
        onOpenCritic={token && store.portfolio?.id ? () => setShowCritic(true) : undefined}
      />

      {/* 2. Workspace Split-Screen: Sidebar Controls on Left, Live Canvas on Right */}
      <div className="flex-1 flex overflow-hidden">
        <EditorSidebar
          tokens={store.tokens}
          templateId={store.templateId}
          sectionOrder={store.sectionOrder}
          hiddenSections={store.hiddenSections}
          heroVariant={store.heroVariant}
          projectLayout={store.projectLayout}
          onSelectTemplate={store.selectTemplate}
          onUpdateColor={store.updateColor}
          onUpdateFontHeading={store.updateFontHeading}
          onUpdateFontBody={store.updateFontBody}
          onUpdateRadius={store.updateRadius}
          onUpdateContainerMax={store.updateContainerMax}
          onSetHeroVariant={store.setHeroVariant}
          onSetProjectLayout={store.setProjectLayout}
          onMoveSection={store.moveSection}
          onToggleSectionVisibility={store.toggleSectionVisibility}
          onOpenDiscovery={() => setShowDiscovery(true)}
        />

        <EditorCanvas
          viewport={store.viewport}
          scale={store.scale}
          tokens={store.tokens}
          templateId={store.templateId}
          sectionOrder={store.sectionOrder}
          hiddenSections={store.hiddenSections}
          heroVariant={store.heroVariant}
          projectLayout={store.projectLayout}
          portfolio={store.portfolio}
          projects={store.projects}
          profile={store.profile}
        />
      </div>

      {/* 3. Full-Screen Preview Modal */}
      {showFullPreview && store.portfolio && (
        <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
          {/* Close preview float */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setShowFullPreview(false)}
              className="px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 backdrop-blur-md shadow-2xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Exit Preview</span>
            </button>
          </div>

          <PortfolioRenderer
            portfolio={store.portfolio}
            projects={store.projects}
            profile={store.profile}
            template={activeTemplate}
            overrideTokens={store.tokens}
            overrideHeroVariant={store.heroVariant}
            overrideProjectLayout={store.projectLayout}
            overrideSectionOrder={store.sectionOrder}
            hiddenSections={store.hiddenSections}
            forcedTouchMode={false}
          />
        </div>
      )}

      {/* 4. Real Print / PDF Export Canvas */}
      {showPdfExport && store.portfolio && (
        <PdfExportView
          portfolio={{
            ...store.portfolio,
            projects: store.projects,
          }}
          profile={store.profile}
          onClose={() => setShowPdfExport(false)}
        />
      )}

      {/* 5. Cove Copilot Assistant Modal */}
      {showCopilot && token && (
        <CoveCopilotModal
          token={token}
          contextTitle={store.portfolio?.title || 'Portfolio'}
          initialText={store.profile?.bio || store.portfolio?.title || ''}
          contextType="portfolio"
          onApply={(newText) => {
            console.log('Cove Copilot proposal applied:', newText);
          }}
          onClose={() => setShowCopilot(false)}
        />
      )}

      {/* 6. Template Discovery & AI Recommender Modal */}
      {showDiscovery && (
        <TemplateDiscoveryModal
          token={token}
          portfolio={store.portfolio}
          projects={store.projects}
          profile={store.profile}
          activeTemplateId={store.templateId}
          onSelectTemplate={(newTplId) => {
            store.selectTemplate(newTplId);
          }}
          onClose={() => setShowDiscovery(false)}
        />
      )}

      {/* 7. AI Portfolio Critic Modal */}
      {showCritic && store.portfolio && (
        <PortfolioCriticModal
          portfolioId={store.portfolio.id}
          portfolioTitle={store.portfolio.title}
          token={token}
          onClose={() => setShowCritic(false)}
        />
      )}
    </div>
  );
}
