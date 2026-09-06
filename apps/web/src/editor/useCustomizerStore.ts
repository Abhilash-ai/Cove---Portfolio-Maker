import { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeTokens, PortfolioSummary, ProjectDto, FullProfileDto, MINIMAL_PRESET, EDITORIAL_PRESET, STUDIO_PRESET } from '@cove/shared';
import { SEEDED_TEMPLATES } from '../engine/templates/seededTemplates.js';
import { HeroVariant } from '../engine/primitives/Hero.js';
import { ProjectLayout } from '../engine/templates/templateTypes.js';
import { ViewportMode, SaveStatus } from './editorTypes.js';

const API_BASE = 'http://localhost:4000/api/v1';

interface CustomizerConfig {
  portfolioId?: string;
  token?: string;
}

export function useCustomizerStore({ portfolioId, token }: CustomizerConfig) {
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [profile, setProfile] = useState<FullProfileDto | null>(null);

  const [templateId, setTemplateId] = useState<string>('tpl-minimal-pure');
  const [tokens, setTokens] = useState<ThemeTokens>(MINIMAL_PRESET);
  const [sectionOrder, setSectionOrder] = useState<string[]>(['hero', 'projects', 'skills', 'experience', 'contact']);
  const [hiddenSections, setHiddenSections] = useState<string[]>([]);
  const [heroVariant, setHeroVariant] = useState<HeroVariant>('centered');
  const [projectLayout, setProjectLayout] = useState<ProjectLayout>('grid');

  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [scale, setScale] = useState<number>(1);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');

  // Undo / Redo history
  const historyRef = useRef<ThemeTokens[]>([MINIMAL_PRESET]);
  const historyIndexRef = useRef<number>(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Auto-save timer ref
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoadRef = useRef(true);

  // 1. Fetch initial portfolio, project, and profile data
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!token) return;

      try {
        // Fetch Profile
        const profileRes = await fetch(`${API_BASE}/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (profileRes.ok) {
          const profileJson = await profileRes.json();
          if (isMounted) setProfile(profileJson.data.profile);
        }

        // Fetch Portfolio if portfolioId is present
        if (portfolioId) {
          const portRes = await fetch(`${API_BASE}/portfolios/${portfolioId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (portRes.ok) {
            const portJson = await portRes.json();
            const p = portJson.data.portfolio;
            if (isMounted) {
              setPortfolio(p);
              setProjects(p.projects || []);

              if (p.sectionOrder && Array.isArray(p.sectionOrder)) {
                setSectionOrder(p.sectionOrder);
              }

              // Load custom tokens or default preset
              if (p.customTokens && p.customTokens.colors) {
                setTokens(p.customTokens);
                historyRef.current = [p.customTokens];
                historyIndexRef.current = 0;
              } else if (p.activeTemplateId) {
                const found = SEEDED_TEMPLATES.find((t) => t.id === p.activeTemplateId);
                if (found) {
                  setTemplateId(found.id);
                  setTokens(found.tokens);
                  setHeroVariant(found.heroVariant);
                  setProjectLayout(found.projectLayout);
                  historyRef.current = [found.tokens];
                  historyIndexRef.current = 0;
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load visual editor data:', err);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            isInitialLoadRef.current = false;
          }, 300);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [portfolioId, token]);

  // Helper to sync undo/redo state
  const updateHistoryState = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  // Push token change to history
  const pushTokensToHistory = useCallback((newTokens: ThemeTokens) => {
    // Cut forward history if in middle
    const currentHist = historyRef.current.slice(0, historyIndexRef.current + 1);
    currentHist.push(newTokens);
    if (currentHist.length > 30) currentHist.shift(); // keep last 30
    historyRef.current = currentHist;
    historyIndexRef.current = currentHist.length - 1;
    updateHistoryState();
  }, [updateHistoryState]);

  // Auto-save trigger
  const triggerAutoSave = useCallback(() => {
    if (isInitialLoadRef.current || !portfolioId || !token) return;

    setSaveStatus('unsaved');
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        const res = await fetch(`${API_BASE}/portfolios/${portfolioId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            customTokens: tokens,
            activeTemplateId: templateId,
            sectionOrder
          })
        });

        if (res.ok) {
          setSaveStatus('saved');
        } else {
          setSaveStatus('unsaved');
        }
      } catch (err) {
        console.error('Auto-save error:', err);
        setSaveStatus('unsaved');
      }
    }, 1000);
  }, [portfolioId, token, tokens, templateId, sectionOrder]);

  // Trigger auto-save whenever tokens or sectionOrder changes
  useEffect(() => {
    if (!isInitialLoadRef.current) {
      triggerAutoSave();
    }
  }, [tokens, sectionOrder, templateId, triggerAutoSave]);

  // Manual save
  const saveNow = useCallback(async () => {
    if (!portfolioId || !token) return;
    setSaveStatus('saving');
    try {
      const res = await fetch(`${API_BASE}/portfolios/${portfolioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          customTokens: tokens,
          activeTemplateId: templateId,
          sectionOrder
        })
      });
      if (res.ok) {
        setSaveStatus('saved');
      } else {
        setSaveStatus('unsaved');
      }
    } catch (err) {
      console.error('Manual save failed:', err);
      setSaveStatus('unsaved');
    }
  }, [portfolioId, token, tokens, templateId, sectionOrder]);

  // 2. Actions: Template Switching
  const selectTemplate = useCallback((tplId: string) => {
    const tpl = SEEDED_TEMPLATES.find((t) => t.id === tplId);
    if (!tpl) return;

    setTemplateId(tpl.id);
    setTokens(tpl.tokens);
    setHeroVariant(tpl.heroVariant);
    setProjectLayout(tpl.projectLayout);
    pushTokensToHistory(tpl.tokens);
  }, [pushTokensToHistory]);

  // 3. Actions: Token Updates
  const updateColor = useCallback((key: keyof ThemeTokens['colors'], hex: string) => {
    setTokens((prev) => {
      const next = {
        ...prev,
        colors: {
          ...prev.colors,
          [key]: hex
        }
      };
      pushTokensToHistory(next);
      return next;
    });
  }, [pushTokensToHistory]);

  const updateFontHeading = useCallback((fontFamily: string) => {
    setTokens((prev) => {
      const next = {
        ...prev,
        typography: {
          ...prev.typography,
          fontHeading: fontFamily
        }
      };
      pushTokensToHistory(next);
      return next;
    });
  }, [pushTokensToHistory]);

  const updateFontBody = useCallback((fontFamily: string) => {
    setTokens((prev) => {
      const next = {
        ...prev,
        typography: {
          ...prev.typography,
          fontBody: fontFamily
        }
      };
      pushTokensToHistory(next);
      return next;
    });
  }, [pushTokensToHistory]);

  const updateRadius = useCallback((radius: string) => {
    setTokens((prev) => {
      const next = {
        ...prev,
        spacing: {
          ...prev.spacing,
          radius
        }
      };
      pushTokensToHistory(next);
      return next;
    });
  }, [pushTokensToHistory]);

  const updateContainerMax = useCallback((containerMax: string) => {
    setTokens((prev) => {
      const next = {
        ...prev,
        spacing: {
          ...prev.spacing,
          containerMax
        }
      };
      pushTokensToHistory(next);
      return next;
    });
  }, [pushTokensToHistory]);

  // 4. Actions: Layout & Sections
  const moveSection = useCallback((index: number, direction: 'up' | 'down') => {
    setSectionOrder((prev) => {
      const next = [...prev];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIdx];
      next[targetIdx] = temp;
      return next;
    });
  }, []);

  const toggleSectionVisibility = useCallback((sectionKey: string) => {
    setHiddenSections((prev) => {
      if (prev.includes(sectionKey)) {
        return prev.filter((s) => s !== sectionKey);
      } else {
        return [...prev, sectionKey];
      }
    });
  }, []);

  // 5. Actions: Undo / Redo
  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const target = historyRef.current[historyIndexRef.current];
      setTokens(target);
      updateHistoryState();
    }
  }, [updateHistoryState]);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const target = historyRef.current[historyIndexRef.current];
      setTokens(target);
      updateHistoryState();
    }
  }, [updateHistoryState]);

  return {
    portfolio,
    projects,
    profile,
    templateId,
    tokens,
    sectionOrder,
    hiddenSections,
    heroVariant,
    projectLayout,
    viewport,
    scale,
    saveStatus,
    canUndo,
    canRedo,
    setViewport,
    setScale,
    selectTemplate,
    updateColor,
    updateFontHeading,
    updateFontBody,
    updateRadius,
    updateContainerMax,
    setHeroVariant,
    setProjectLayout,
    moveSection,
    toggleSectionVisibility,
    undo,
    redo,
    saveNow,
  };
}
