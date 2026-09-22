import { ThemeTokens } from '@cove/shared';

export type HeroVariant =
  | 'centered'
  | 'split'
  | 'fullscreen-image'
  | 'minimal-text'
  | 'asymmetric-offset'
  | 'stacked-media'
  | 'marquee-text'
  | 'side-panel-nav'
  | 'video-background'
  | 'diagonal-split';

export type ProjectLayout =
  | 'grid'
  | 'list'
  | 'masonry'
  | 'horizontal-scroll'
  | 'timeline-stack'
  | 'featured-plus-grid';

export type SceneArchetype3D =
  | 'rotating-hero-object'
  | '3d-gallery-arc'
  | 'depth-parallax-scroll'
  | 'floating-project-cards'
  | 'particle-field-hero'
  | 'orbit-camera-showcase'
  | '3d-card-flip-casestudy'
  | 'tunnel-scroll'
  | 'isometric-diorama'
  | 'morphing-geometry-hero'
  | 'interactive-sphere-cloud'
  | 'wireframe-terrain-wire';

export type MaterialPreset3D =
  | 'matte-studio'
  | 'glass-refractive'
  | 'neon-emissive'
  | 'soft-pastel-toon'
  | 'brushed-metal'
  | 'paper-craft-flat'
  | 'chrome-liquid'
  | 'warm-film-grain'
  | 'monochrome-wire'
  | 'gradient-mesh'
  | 'holographic-iridescent'
  | 'clay-claymation';

export type CameraBehavior3D =
  | 'orbit-drag'
  | 'scroll-driven-fly-through'
  | 'auto-rotate-idle'
  | 'click-to-focus'
  | 'mouse-parallax-tilt'
  | 'scroll-triggered-camera-path'
  | 'gyro-pointer-look'
  | 'elastic-spring-pan';

export interface Scene3DConfig {
  archetype: SceneArchetype3D;
  materialPreset: MaterialPreset3D;
  cameraBehavior: CameraBehavior3D;
  rotationSpeed?: number;
  cameraDistance?: number;
}

export interface InteractionProfile {
  customCursor: boolean;
  magneticButtons: boolean;
  cardTilt: boolean;
  scrollReveal: boolean;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: 'minimal' | 'editorial' | 'studio' | '3d';
  description: string;
  heroVariant: HeroVariant;
  fallbackHeroVariant: HeroVariant;
  projectLayout: ProjectLayout;
  tokens: ThemeTokens;
  interactionProfile: InteractionProfile;
  supportedSections: string[];
  sectionOrder: string[];
  version: string;
  is3D?: boolean;
  scene3DConfig?: Scene3DConfig;
}
