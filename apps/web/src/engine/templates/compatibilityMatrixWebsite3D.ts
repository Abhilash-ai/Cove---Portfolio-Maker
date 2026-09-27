import { TemplateDefinition, SceneArchetype3D, MaterialPreset3D, CameraBehavior3D, HeroVariant, ProjectLayout } from './templateTypes.js';
import { EXPANDED_STYLE_PRESETS } from '@cove/shared';

export interface WebsiteCombination3D {
  archetype: SceneArchetype3D;
  material: MaterialPreset3D;
  camera: CameraBehavior3D;
  fallbackHero: HeroVariant;
  projectLayout: ProjectLayout;
  name: string;
  description: string;
  presetKey: string;
}

export const WEBSITE_COMBINATIONS_3D: WebsiteCombination3D[] = [
  {
    "archetype": "product-showcase-3d",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Matte Studio Orbit Drag",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Matte Studio Auto Rotate Idle",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Matte Studio Mouse Parallax Tilt",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Matte Studio Elastic Spring Pan",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Matte Studio Click To Focus",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Matte Studio Scroll Driven Fly Through",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Matte Studio Gyro Pointer Look",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Matte Studio Scroll Triggered Camera Path",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Glass Refractive Auto Rotate Idle",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Glass Refractive Mouse Parallax Tilt",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Glass Refractive Elastic Spring Pan",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Glass Refractive Click To Focus",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Glass Refractive Scroll Driven Fly Through",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Glass Refractive Gyro Pointer Look",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Glass Refractive Scroll Triggered Camera Path",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Glass Refractive Orbit Drag",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "neon-emissive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Neon Emissive Mouse Parallax Tilt",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "neon-emissive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Neon Emissive Elastic Spring Pan",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "neon-emissive",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Neon Emissive Click To Focus",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Neon Emissive with Click To Focus camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Neon Emissive Scroll Driven Fly Through",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "product-showcase-3d",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "featured-plus-grid",
    "name": "Keynote Pedestal — Neon Emissive Gyro Pointer Look",
    "description": "Elevated hardware showcase on an interactive pedestal with orbital halo rings and hotspot beacons. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "team-space-3d",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Matte Studio Auto Rotate Idle",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "team-space-3d",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Matte Studio Mouse Parallax Tilt",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "team-space-3d",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Matte Studio Elastic Spring Pan",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "team-space-3d",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Matte Studio Click To Focus",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "team-space-3d",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Matte Studio Scroll Driven Fly Through",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "team-space-3d",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Matte Studio Gyro Pointer Look",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "team-space-3d",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Matte Studio Scroll Triggered Camera Path",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "team-space-3d",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Matte Studio Orbit Drag",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "team-space-3d",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Glass Refractive Mouse Parallax Tilt",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "team-space-3d",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Glass Refractive Elastic Spring Pan",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "team-space-3d",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Glass Refractive Click To Focus",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "team-space-3d",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Glass Refractive Scroll Driven Fly Through",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "team-space-3d",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Glass Refractive Gyro Pointer Look",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "team-space-3d",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Glass Refractive Scroll Triggered Camera Path",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "team-space-3d",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Glass Refractive Orbit Drag",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "team-space-3d",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Glass Refractive Auto Rotate Idle",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "team-space-3d",
    "material": "neon-emissive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Neon Emissive Elastic Spring Pan",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "team-space-3d",
    "material": "neon-emissive",
    "camera": "click-to-focus",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Neon Emissive Click To Focus",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Neon Emissive with Click To Focus camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "team-space-3d",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Neon Emissive Scroll Driven Fly Through",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "team-space-3d",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Neon Emissive Gyro Pointer Look",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "team-space-3d",
    "material": "neon-emissive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "grid",
    "name": "Studio Presence — Neon Emissive Scroll Triggered Camera Path",
    "description": "Interactive 3D spatial podiums arranged in an arc, highlighting team members and leadership roles. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Matte Studio Mouse Parallax Tilt",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Matte Studio Elastic Spring Pan",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Matte Studio Click To Focus",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Matte Studio Scroll Driven Fly Through",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Matte Studio Gyro Pointer Look",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Matte Studio Scroll Triggered Camera Path",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Matte Studio Orbit Drag",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Matte Studio Auto Rotate Idle",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Glass Refractive Elastic Spring Pan",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Glass Refractive Click To Focus",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Glass Refractive Scroll Driven Fly Through",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Glass Refractive Gyro Pointer Look",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Glass Refractive Scroll Triggered Camera Path",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Glass Refractive Orbit Drag",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Glass Refractive Auto Rotate Idle",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Glass Refractive Mouse Parallax Tilt",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "neon-emissive",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Neon Emissive Click To Focus",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Neon Emissive with Click To Focus camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Neon Emissive Scroll Driven Fly Through",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Neon Emissive Gyro Pointer Look",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "neon-emissive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Neon Emissive Scroll Triggered Camera Path",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "floating-pricing-cards",
    "material": "neon-emissive",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Spatial Tiers — Neon Emissive Orbit Drag",
    "description": "Floating 3D tier cards positioned at staggered depth with dynamic hover tilt and glowing featured tier. Rendered in Neon Emissive with Orbit Drag camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Matte Studio Elastic Spring Pan",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Matte Studio Click To Focus",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Matte Studio Scroll Driven Fly Through",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Matte Studio Gyro Pointer Look",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Matte Studio Scroll Triggered Camera Path",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Matte Studio Orbit Drag",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Matte Studio Auto Rotate Idle",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Matte Studio Mouse Parallax Tilt",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Glass Refractive Click To Focus",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Glass Refractive Scroll Driven Fly Through",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Glass Refractive Gyro Pointer Look",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Glass Refractive Scroll Triggered Camera Path",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Glass Refractive Orbit Drag",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Glass Refractive Auto Rotate Idle",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Glass Refractive Mouse Parallax Tilt",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Glass Refractive Elastic Spring Pan",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Neon Emissive Scroll Driven Fly Through",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Neon Emissive Gyro Pointer Look",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "neon-emissive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Neon Emissive Scroll Triggered Camera Path",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "neon-emissive",
    "camera": "orbit-drag",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Neon Emissive Orbit Drag",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Neon Emissive with Orbit Drag camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "interactive-logo-cloud-3d",
    "material": "neon-emissive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "marquee-text",
    "projectLayout": "grid",
    "name": "Partner Constellation — Neon Emissive Auto Rotate Idle",
    "description": "Dynamic 3D constellation of brand and partner logo tiles floating on a spherical orbital shell. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "service-orbit",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Matte Studio Click To Focus",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "service-orbit",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Matte Studio Scroll Driven Fly Through",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "service-orbit",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Matte Studio Gyro Pointer Look",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "service-orbit",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Matte Studio Scroll Triggered Camera Path",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "service-orbit",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Matte Studio Orbit Drag",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "service-orbit",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Matte Studio Auto Rotate Idle",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "service-orbit",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Matte Studio Mouse Parallax Tilt",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "service-orbit",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Matte Studio Elastic Spring Pan",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "service-orbit",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Glass Refractive Scroll Driven Fly Through",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "service-orbit",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Glass Refractive Gyro Pointer Look",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "service-orbit",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Glass Refractive Scroll Triggered Camera Path",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "service-orbit",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Glass Refractive Orbit Drag",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "service-orbit",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Glass Refractive Auto Rotate Idle",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "service-orbit",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Glass Refractive Mouse Parallax Tilt",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "service-orbit",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Glass Refractive Elastic Spring Pan",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "service-orbit",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Glass Refractive Click To Focus",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "service-orbit",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Neon Emissive Gyro Pointer Look",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "service-orbit",
    "material": "neon-emissive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Neon Emissive Scroll Triggered Camera Path",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "service-orbit",
    "material": "neon-emissive",
    "camera": "orbit-drag",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Neon Emissive Orbit Drag",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Neon Emissive with Orbit Drag camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "service-orbit",
    "material": "neon-emissive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Neon Emissive Auto Rotate Idle",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "service-orbit",
    "material": "neon-emissive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ecosystem Core — Neon Emissive Mouse Parallax Tilt",
    "description": "Central core service node with dual concentric orbital rings carrying capability capsules. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Matte Studio Scroll Driven Fly Through",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Matte Studio Gyro Pointer Look",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Matte Studio Scroll Triggered Camera Path",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Matte Studio Orbit Drag",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Matte Studio Auto Rotate Idle",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Matte Studio Mouse Parallax Tilt",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Matte Studio Elastic Spring Pan",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Matte Studio Click To Focus",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Glass Refractive Gyro Pointer Look",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Glass Refractive Scroll Triggered Camera Path",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Glass Refractive Orbit Drag",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Glass Refractive Auto Rotate Idle",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Glass Refractive Mouse Parallax Tilt",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Glass Refractive Elastic Spring Pan",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Glass Refractive Click To Focus",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Glass Refractive Scroll Driven Fly Through",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "neon-emissive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Neon Emissive Scroll Triggered Camera Path",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "neon-emissive",
    "camera": "orbit-drag",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Neon Emissive Orbit Drag",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Neon Emissive with Orbit Drag camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "neon-emissive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Neon Emissive Auto Rotate Idle",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "neon-emissive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Neon Emissive Mouse Parallax Tilt",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "testimonial-carousel-3d",
    "material": "neon-emissive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "split",
    "projectLayout": "horizontal-scroll",
    "name": "Praise Amphitheater — Neon Emissive Elastic Spring Pan",
    "description": "Cylindrical carousel of 3D quote plates spaced around the viewer with rating stars and author badge podiums. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Matte Studio Gyro Pointer Look",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Matte Studio Scroll Triggered Camera Path",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Matte Studio Orbit Drag",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Matte Studio Auto Rotate Idle",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Matte Studio Mouse Parallax Tilt",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Matte Studio Elastic Spring Pan",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Matte Studio Click To Focus",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Matte Studio Scroll Driven Fly Through",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Glass Refractive Scroll Triggered Camera Path",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Glass Refractive Orbit Drag",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Glass Refractive Auto Rotate Idle",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Glass Refractive Mouse Parallax Tilt",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Glass Refractive Elastic Spring Pan",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Glass Refractive Click To Focus",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Glass Refractive Scroll Driven Fly Through",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Glass Refractive Gyro Pointer Look",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "neon-emissive",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Neon Emissive Orbit Drag",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Neon Emissive with Orbit Drag camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "neon-emissive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Neon Emissive Auto Rotate Idle",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "neon-emissive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Neon Emissive Mouse Parallax Tilt",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "neon-emissive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Neon Emissive Elastic Spring Pan",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "rotating-hero-object",
    "material": "neon-emissive",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "grid",
    "name": "Orbital Monolith — Neon Emissive Click To Focus",
    "description": "Sculptural central form suspended in space with reactive orbital rings displaying key capabilities. Rendered in Neon Emissive with Click To Focus camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "particle-field-hero",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Matte Studio Scroll Triggered Camera Path",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "particle-field-hero",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Matte Studio Orbit Drag",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "particle-field-hero",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Matte Studio Auto Rotate Idle",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "particle-field-hero",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Matte Studio Mouse Parallax Tilt",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "particle-field-hero",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Matte Studio Elastic Spring Pan",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "particle-field-hero",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Matte Studio Click To Focus",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "particle-field-hero",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Matte Studio Scroll Driven Fly Through",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "particle-field-hero",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Matte Studio Gyro Pointer Look",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "particle-field-hero",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Glass Refractive Orbit Drag",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "particle-field-hero",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Glass Refractive Auto Rotate Idle",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "particle-field-hero",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Glass Refractive Mouse Parallax Tilt",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "particle-field-hero",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Glass Refractive Elastic Spring Pan",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "particle-field-hero",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Glass Refractive Click To Focus",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "particle-field-hero",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Glass Refractive Scroll Driven Fly Through",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "particle-field-hero",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Glass Refractive Gyro Pointer Look",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "particle-field-hero",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Glass Refractive Scroll Triggered Camera Path",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "particle-field-hero",
    "material": "neon-emissive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Neon Emissive Auto Rotate Idle",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "particle-field-hero",
    "material": "neon-emissive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Neon Emissive Mouse Parallax Tilt",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "particle-field-hero",
    "material": "neon-emissive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Neon Emissive Elastic Spring Pan",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "particle-field-hero",
    "material": "neon-emissive",
    "camera": "click-to-focus",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Neon Emissive Click To Focus",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Neon Emissive with Click To Focus camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "particle-field-hero",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "minimal-text",
    "projectLayout": "masonry",
    "name": "Ambient Constellation — Neon Emissive Scroll Driven Fly Through",
    "description": "Interactive particle storm responding to cursor coordinates with dynamic velocity vectors. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Matte Studio Orbit Drag",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Matte Studio Auto Rotate Idle",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Matte Studio Mouse Parallax Tilt",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Matte Studio Elastic Spring Pan",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Matte Studio Click To Focus",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Matte Studio Scroll Driven Fly Through",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Matte Studio Gyro Pointer Look",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Matte Studio Scroll Triggered Camera Path",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Glass Refractive Auto Rotate Idle",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Glass Refractive Mouse Parallax Tilt",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Glass Refractive Elastic Spring Pan",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Glass Refractive Click To Focus",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Glass Refractive Scroll Driven Fly Through",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Glass Refractive Gyro Pointer Look",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Glass Refractive Scroll Triggered Camera Path",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Glass Refractive Orbit Drag",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "neon-emissive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Neon Emissive Mouse Parallax Tilt",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "neon-emissive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Neon Emissive Elastic Spring Pan",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "neon-emissive",
    "camera": "click-to-focus",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Neon Emissive Click To Focus",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Neon Emissive with Click To Focus camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Neon Emissive Scroll Driven Fly Through",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "morphing-geometry-hero",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "centered",
    "projectLayout": "horizontal-scroll",
    "name": "Topological Metamorphosis — Neon Emissive Gyro Pointer Look",
    "description": "Fluid organic shape continuously interpolating between mathematical surfaces. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Matte Studio Auto Rotate Idle",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Matte Studio Mouse Parallax Tilt",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Matte Studio Elastic Spring Pan",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Matte Studio Click To Focus",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Matte Studio Scroll Driven Fly Through",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Matte Studio Gyro Pointer Look",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Matte Studio Scroll Triggered Camera Path",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Matte Studio Orbit Drag",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Glass Refractive Mouse Parallax Tilt",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Glass Refractive Elastic Spring Pan",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Glass Refractive Click To Focus",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Glass Refractive Scroll Driven Fly Through",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Glass Refractive Gyro Pointer Look",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Glass Refractive Scroll Triggered Camera Path",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Glass Refractive Orbit Drag",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Glass Refractive Auto Rotate Idle",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "neon-emissive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Neon Emissive Elastic Spring Pan",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "neon-emissive",
    "camera": "click-to-focus",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Neon Emissive Click To Focus",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Neon Emissive with Click To Focus camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Neon Emissive Scroll Driven Fly Through",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Neon Emissive Gyro Pointer Look",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "orbit-camera-showcase",
    "material": "neon-emissive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "fullscreen-image",
    "projectLayout": "timeline-stack",
    "name": "Panoramic Showcase — Neon Emissive Scroll Triggered Camera Path",
    "description": "Continuous orbital camera sweep revealing multi-dimensional project stages. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Matte Studio Mouse Parallax Tilt",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Matte Studio Elastic Spring Pan",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Matte Studio Click To Focus",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Matte Studio Scroll Driven Fly Through",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Matte Studio Gyro Pointer Look",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Matte Studio Scroll Triggered Camera Path",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Matte Studio Orbit Drag",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Matte Studio Auto Rotate Idle",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Glass Refractive Elastic Spring Pan",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Glass Refractive Click To Focus",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Glass Refractive Scroll Driven Fly Through",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Glass Refractive Gyro Pointer Look",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Glass Refractive Scroll Triggered Camera Path",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Glass Refractive Orbit Drag",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Glass Refractive Auto Rotate Idle",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Glass Refractive Mouse Parallax Tilt",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "neon-emissive",
    "camera": "click-to-focus",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Neon Emissive Click To Focus",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Neon Emissive with Click To Focus camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Neon Emissive Scroll Driven Fly Through",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Neon Emissive Gyro Pointer Look",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "neon-emissive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Neon Emissive Scroll Triggered Camera Path",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "3d-card-flip-casestudy",
    "material": "neon-emissive",
    "camera": "orbit-drag",
    "fallbackHero": "stacked-media",
    "projectLayout": "grid",
    "name": "Prismatic Deck — Neon Emissive Orbit Drag",
    "description": "Interactive 3D case study cards that flip 180 degrees to reveal technical metrics and architectural diagrams. Rendered in Neon Emissive with Orbit Drag camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "isometric-diorama",
    "material": "matte-studio",
    "camera": "elastic-spring-pan",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Matte Studio Elastic Spring Pan",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "isometric-diorama",
    "material": "matte-studio",
    "camera": "click-to-focus",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Matte Studio Click To Focus",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Matte Studio with Click To Focus camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "isometric-diorama",
    "material": "matte-studio",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Matte Studio Scroll Driven Fly Through",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "isometric-diorama",
    "material": "matte-studio",
    "camera": "gyro-pointer-look",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Matte Studio Gyro Pointer Look",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "isometric-diorama",
    "material": "matte-studio",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Matte Studio Scroll Triggered Camera Path",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "isometric-diorama",
    "material": "matte-studio",
    "camera": "orbit-drag",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Matte Studio Orbit Drag",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Matte Studio with Orbit Drag camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "isometric-diorama",
    "material": "matte-studio",
    "camera": "auto-rotate-idle",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Matte Studio Auto Rotate Idle",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "isometric-diorama",
    "material": "matte-studio",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Matte Studio Mouse Parallax Tilt",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "isometric-diorama",
    "material": "glass-refractive",
    "camera": "click-to-focus",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Glass Refractive Click To Focus",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Glass Refractive with Click To Focus camera dynamics.",
    "presetKey": "monochrome"
  },
  {
    "archetype": "isometric-diorama",
    "material": "glass-refractive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Glass Refractive Scroll Driven Fly Through",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "darkTechnical"
  },
  {
    "archetype": "isometric-diorama",
    "material": "glass-refractive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Glass Refractive Gyro Pointer Look",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.",
    "presetKey": "magazine"
  },
  {
    "archetype": "isometric-diorama",
    "material": "glass-refractive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Glass Refractive Scroll Triggered Camera Path",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "academic"
  },
  {
    "archetype": "isometric-diorama",
    "material": "glass-refractive",
    "camera": "orbit-drag",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Glass Refractive Orbit Drag",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Glass Refractive with Orbit Drag camera dynamics.",
    "presetKey": "luxury"
  },
  {
    "archetype": "isometric-diorama",
    "material": "glass-refractive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Glass Refractive Auto Rotate Idle",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.",
    "presetKey": "playful"
  },
  {
    "archetype": "isometric-diorama",
    "material": "glass-refractive",
    "camera": "mouse-parallax-tilt",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Glass Refractive Mouse Parallax Tilt",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.",
    "presetKey": "minimal"
  },
  {
    "archetype": "isometric-diorama",
    "material": "glass-refractive",
    "camera": "elastic-spring-pan",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Glass Refractive Elastic Spring Pan",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.",
    "presetKey": "editorial"
  },
  {
    "archetype": "isometric-diorama",
    "material": "neon-emissive",
    "camera": "scroll-driven-fly-through",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Neon Emissive Scroll Driven Fly Through",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.",
    "presetKey": "studio"
  },
  {
    "archetype": "isometric-diorama",
    "material": "neon-emissive",
    "camera": "gyro-pointer-look",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Neon Emissive Gyro Pointer Look",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.",
    "presetKey": "brutalist"
  },
  {
    "archetype": "isometric-diorama",
    "material": "neon-emissive",
    "camera": "scroll-triggered-camera-path",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Neon Emissive Scroll Triggered Camera Path",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.",
    "presetKey": "swiss"
  },
  {
    "archetype": "isometric-diorama",
    "material": "neon-emissive",
    "camera": "orbit-drag",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Neon Emissive Orbit Drag",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Neon Emissive with Orbit Drag camera dynamics.",
    "presetKey": "cinematic"
  },
  {
    "archetype": "isometric-diorama",
    "material": "neon-emissive",
    "camera": "auto-rotate-idle",
    "fallbackHero": "split",
    "projectLayout": "featured-plus-grid",
    "name": "Isometric Stage — Neon Emissive Auto Rotate Idle",
    "description": "Miniature isometric digital workshop with elevated project monoliths and directional lighting. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.",
    "presetKey": "monochrome"
  }
];

export function generateWebsite3DCatalog(): TemplateDefinition[] {
  const seen = new Set<string>();
  const templates: TemplateDefinition[] = [];

  WEBSITE_COMBINATIONS_3D.forEach((combo, idx) => {
    const tripleKey = `${combo.archetype}__${combo.material}__${combo.camera}`;
    if (seen.has(tripleKey)) {
      throw new Error(`Duplicate Website 3D triple detected: ${tripleKey}`);
    }
    seen.add(tripleKey);

    const id = `tpl-web-3d-${String(idx + 1).padStart(3, '0')}`;
    const tokens = EXPANDED_STYLE_PRESETS[combo.presetKey] || EXPANDED_STYLE_PRESETS.minimal;

    templates.push({
      id,
      name: combo.name,
      category: '3d',
      description: combo.description,
      heroVariant: 'centered',
      fallbackHeroVariant: combo.fallbackHero,
      projectLayout: combo.projectLayout,
      tokens,
      interactionProfile: {
        customCursor: true,
        magneticButtons: true,
        cardTilt: true,
        scrollReveal: true
      },
      supportedSections: ['hero', 'projects', 'pricing', 'testimonials', 'skills', 'faq', 'contact'],
      sectionOrder: ['hero', 'projects', 'pricing', 'testimonials', 'skills', 'faq', 'contact'],
      version: '1.0.0',
      is3D: true,
      scene3DConfig: {
        archetype: combo.archetype,
        materialPreset: combo.material,
        cameraBehavior: combo.camera,
        rotationSpeed: 1.0,
        cameraDistance: 6.0
      }
    });
  });

  if (templates.length !== 252) {
    throw new Error(`Expected exactly 252 Website 3D templates, got ${templates.length}`);
  }

  return templates;
}

export const ALL_WEBSITE_3D_TEMPLATES: TemplateDefinition[] = generateWebsite3DCatalog();
