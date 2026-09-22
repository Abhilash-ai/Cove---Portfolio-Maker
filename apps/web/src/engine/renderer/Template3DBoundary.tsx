import React, { Component, ReactNode, Suspense } from 'react';
import { useDeviceCapabilities } from '../interactions/useDeviceCapabilities.js';
import { Hero, HeroVariant } from '../primitives/Hero.js';
import { FullProfileDto, PortfolioSummary, ProjectDto, ThemeTokens } from '@cove/shared';
import { TemplateDefinition } from '../templates/templateTypes.js';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
  onCatch?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class React3DErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('[Template3DBoundary] 3D runtime error caught, degrading to 2D fallback:', error, errorInfo);
    this.props.onCatch?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Lazy-load the heavy 3D Hero component so Three.js is not loaded until a 3D template is selected
const LazyHero3D = React.lazy(() => import('../primitives3d/Hero3D.js'));

interface BoundaryProps {
  template: TemplateDefinition;
  profile: FullProfileDto | null;
  projects: ProjectDto[];
  portfolio: PortfolioSummary;
  tokens: ThemeTokens;
  forcedTouchMode?: boolean;
  onContactClick?: () => void;
  simulateNoWebGL?: boolean;
}

export function Template3DBoundary({
  template,
  profile,
  projects,
  portfolio,
  tokens,
  forcedTouchMode = false,
  onContactClick,
  simulateNoWebGL = false
}: BoundaryProps) {
  const capabilities = useDeviceCapabilities();
  const effectiveFallback: HeroVariant = template.fallbackHeroVariant || 'centered';

  const fallback2D = (
    <Hero
      variant={effectiveFallback}
      profile={profile}
      portfolio={portfolio}
      tokens={tokens}
      forcedTouchMode={forcedTouchMode}
      onContactClick={onContactClick}
    />
  );

  // Device capability check (WebGL availability, low performance, prefers reduced motion)
  const is3DSupported = !simulateNoWebGL && capabilities.supports3D;

  if (!is3DSupported) {
    return fallback2D;
  }

  return (
    <React3DErrorBoundary fallback={fallback2D}>
      <Suspense fallback={fallback2D}>
        <LazyHero3D
          template={template}
          profile={profile}
          projects={projects}
          portfolio={portfolio}
          tokens={tokens}
          forcedTouchMode={forcedTouchMode}
          onContactClick={onContactClick}
        />
      </Suspense>
    </React3DErrorBoundary>
  );
}
