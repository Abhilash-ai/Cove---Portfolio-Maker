import { TemplateDefinition, SceneArchetype3D, MaterialPreset3D, CameraBehavior3D } from './templateTypes.js';
import { EXPANDED_STYLE_PRESETS } from '@cove/shared';

export interface Combination3D {
  archetype: SceneArchetype3D;
  material: MaterialPreset3D;
  camera: CameraBehavior3D;
  fallbackHero: any;
  projectLayout: any;
  name: string;
  description: string;
  presetKey: string;
}

export const COMBINATIONS_3D: Combination3D[] = [

  {
    archetype: 'rotating-hero-object',
    material: 'matte-studio',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Matte Studio Orbit Drag',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Matte Studio with Orbit Drag camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'matte-studio',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Matte Studio Auto Rotate Idle',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'matte-studio',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Matte Studio Mouse Parallax Tilt',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'matte-studio',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Matte Studio Elastic Spring Pan',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'matte-studio',
    camera: 'gyro-pointer-look',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Matte Studio Gyro Pointer Look',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'glass-refractive',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Glass Refractive Orbit Drag',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Glass Refractive with Orbit Drag camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'glass-refractive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Glass Refractive Auto Rotate Idle',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Glass Refractive Mouse Parallax Tilt',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'glass-refractive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Glass Refractive Elastic Spring Pan',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'glass-refractive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Glass Refractive Gyro Pointer Look',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'neon-emissive',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Neon Emissive Orbit Drag',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Neon Emissive with Orbit Drag camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'neon-emissive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Neon Emissive Auto Rotate Idle',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'neon-emissive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Neon Emissive Mouse Parallax Tilt',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'neon-emissive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Neon Emissive Elastic Spring Pan',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'neon-emissive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Neon Emissive Gyro Pointer Look',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'soft-pastel-toon',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Soft Pastel Toon Orbit Drag',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Soft Pastel Toon with Orbit Drag camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'soft-pastel-toon',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Soft Pastel Toon Auto Rotate Idle',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Soft Pastel Toon with Auto Rotate Idle camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'soft-pastel-toon',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Soft Pastel Toon Mouse Parallax Tilt',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Soft Pastel Toon with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'soft-pastel-toon',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Soft Pastel Toon Elastic Spring Pan',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Soft Pastel Toon with Elastic Spring Pan camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'soft-pastel-toon',
    camera: 'gyro-pointer-look',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Soft Pastel Toon Gyro Pointer Look',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Soft Pastel Toon with Gyro Pointer Look camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'rotating-hero-object',
    material: 'brushed-metal',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'grid',
    name: 'Orbital Monolith — Brushed Metal Orbit Drag',
    description: 'Sculptural central form suspended in space with reactive orbital rings displaying key competencies. Rendered in Brushed Metal with Orbit Drag camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'matte-studio',
    camera: 'click-to-focus',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Matte Studio Click To Focus',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Matte Studio with Click To Focus camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'matte-studio',
    camera: 'orbit-drag',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Matte Studio Orbit Drag',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Matte Studio with Orbit Drag camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'matte-studio',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Matte Studio Mouse Parallax Tilt',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'matte-studio',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Matte Studio Scroll Driven Fly Through',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'matte-studio',
    camera: 'elastic-spring-pan',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Matte Studio Elastic Spring Pan',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'glass-refractive',
    camera: 'click-to-focus',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Glass Refractive Click To Focus',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Glass Refractive with Click To Focus camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'glass-refractive',
    camera: 'orbit-drag',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Glass Refractive Orbit Drag',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Glass Refractive with Orbit Drag camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Glass Refractive Mouse Parallax Tilt',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'glass-refractive',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Glass Refractive Scroll Driven Fly Through',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'glass-refractive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Glass Refractive Elastic Spring Pan',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'brushed-metal',
    camera: 'click-to-focus',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Brushed Metal Click To Focus',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Brushed Metal with Click To Focus camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'brushed-metal',
    camera: 'orbit-drag',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Brushed Metal Orbit Drag',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Brushed Metal with Orbit Drag camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'brushed-metal',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Brushed Metal Mouse Parallax Tilt',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Brushed Metal with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'brushed-metal',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Brushed Metal Scroll Driven Fly Through',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Brushed Metal with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'brushed-metal',
    camera: 'elastic-spring-pan',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Brushed Metal Elastic Spring Pan',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Brushed Metal with Elastic Spring Pan camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'paper-craft-flat',
    camera: 'click-to-focus',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Paper Craft Flat Click To Focus',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Paper Craft Flat with Click To Focus camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'paper-craft-flat',
    camera: 'orbit-drag',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Paper Craft Flat Orbit Drag',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Paper Craft Flat with Orbit Drag camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'paper-craft-flat',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Paper Craft Flat Mouse Parallax Tilt',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Paper Craft Flat with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'paper-craft-flat',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Paper Craft Flat Scroll Driven Fly Through',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Paper Craft Flat with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'paper-craft-flat',
    camera: 'elastic-spring-pan',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Paper Craft Flat Elastic Spring Pan',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Paper Craft Flat with Elastic Spring Pan camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: '3d-gallery-arc',
    material: 'chrome-liquid',
    camera: 'click-to-focus',
    fallbackHero: 'stacked-media',
    projectLayout: 'masonry',
    name: 'Amphitheater Arc — Chrome Liquid Click To Focus',
    description: 'Curved panoramic amphitheater of interactive 3D project slates responding dynamically to user gaze. Rendered in Chrome Liquid with Click To Focus camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'matte-studio',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Matte Studio Scroll Driven Fly Through',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Matte Studio with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'matte-studio',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Matte Studio Scroll Triggered Camera Path',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Matte Studio with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'matte-studio',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Matte Studio Mouse Parallax Tilt',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'matte-studio',
    camera: 'auto-rotate-idle',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Matte Studio Auto Rotate Idle',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'matte-studio',
    camera: 'gyro-pointer-look',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Matte Studio Gyro Pointer Look',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'glass-refractive',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Glass Refractive Scroll Driven Fly Through',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'glass-refractive',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Glass Refractive Scroll Triggered Camera Path',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Glass Refractive with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Glass Refractive Mouse Parallax Tilt',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'glass-refractive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Glass Refractive Auto Rotate Idle',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'glass-refractive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Glass Refractive Gyro Pointer Look',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'neon-emissive',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Neon Emissive Scroll Driven Fly Through',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'neon-emissive',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Neon Emissive Scroll Triggered Camera Path',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'neon-emissive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Neon Emissive Mouse Parallax Tilt',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'neon-emissive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Neon Emissive Auto Rotate Idle',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'neon-emissive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Neon Emissive Gyro Pointer Look',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'soft-pastel-toon',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Soft Pastel Toon Scroll Driven Fly Through',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Soft Pastel Toon with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'soft-pastel-toon',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Soft Pastel Toon Scroll Triggered Camera Path',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Soft Pastel Toon with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'soft-pastel-toon',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Soft Pastel Toon Mouse Parallax Tilt',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Soft Pastel Toon with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'soft-pastel-toon',
    camera: 'auto-rotate-idle',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Soft Pastel Toon Auto Rotate Idle',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Soft Pastel Toon with Auto Rotate Idle camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'soft-pastel-toon',
    camera: 'gyro-pointer-look',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Soft Pastel Toon Gyro Pointer Look',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Soft Pastel Toon with Gyro Pointer Look camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'depth-parallax-scroll',
    material: 'brushed-metal',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'asymmetric-offset',
    projectLayout: 'horizontal-scroll',
    name: 'Strata Depth Field — Brushed Metal Scroll Driven Fly Through',
    description: 'Multi-plane spatial z-index choreography translating layered case-study assets along scroll depth. Rendered in Brushed Metal with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'floating-project-cards',
    material: 'matte-studio',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Matte Studio Click To Focus',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Matte Studio with Click To Focus camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'floating-project-cards',
    material: 'matte-studio',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Matte Studio Mouse Parallax Tilt',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'floating-project-cards',
    material: 'matte-studio',
    camera: 'auto-rotate-idle',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Matte Studio Auto Rotate Idle',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'floating-project-cards',
    material: 'matte-studio',
    camera: 'elastic-spring-pan',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Matte Studio Elastic Spring Pan',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'floating-project-cards',
    material: 'matte-studio',
    camera: 'orbit-drag',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Matte Studio Orbit Drag',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Matte Studio with Orbit Drag camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'floating-project-cards',
    material: 'glass-refractive',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Glass Refractive Click To Focus',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Glass Refractive with Click To Focus camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'floating-project-cards',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Glass Refractive Mouse Parallax Tilt',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'floating-project-cards',
    material: 'glass-refractive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Glass Refractive Auto Rotate Idle',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'floating-project-cards',
    material: 'glass-refractive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Glass Refractive Elastic Spring Pan',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'floating-project-cards',
    material: 'glass-refractive',
    camera: 'orbit-drag',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Glass Refractive Orbit Drag',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Glass Refractive with Orbit Drag camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'floating-project-cards',
    material: 'neon-emissive',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Neon Emissive Click To Focus',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Neon Emissive with Click To Focus camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'floating-project-cards',
    material: 'neon-emissive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Neon Emissive Mouse Parallax Tilt',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'floating-project-cards',
    material: 'neon-emissive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Neon Emissive Auto Rotate Idle',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'floating-project-cards',
    material: 'neon-emissive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Neon Emissive Elastic Spring Pan',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'floating-project-cards',
    material: 'neon-emissive',
    camera: 'orbit-drag',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Neon Emissive Orbit Drag',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Neon Emissive with Orbit Drag camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'floating-project-cards',
    material: 'soft-pastel-toon',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Soft Pastel Toon Click To Focus',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Soft Pastel Toon with Click To Focus camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'floating-project-cards',
    material: 'soft-pastel-toon',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Soft Pastel Toon Mouse Parallax Tilt',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Soft Pastel Toon with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'floating-project-cards',
    material: 'soft-pastel-toon',
    camera: 'auto-rotate-idle',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Soft Pastel Toon Auto Rotate Idle',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Soft Pastel Toon with Auto Rotate Idle camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'floating-project-cards',
    material: 'soft-pastel-toon',
    camera: 'elastic-spring-pan',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Soft Pastel Toon Elastic Spring Pan',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Soft Pastel Toon with Elastic Spring Pan camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'floating-project-cards',
    material: 'soft-pastel-toon',
    camera: 'orbit-drag',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Soft Pastel Toon Orbit Drag',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Soft Pastel Toon with Orbit Drag camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'floating-project-cards',
    material: 'brushed-metal',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'grid',
    name: 'Levitation Grid — Brushed Metal Click To Focus',
    description: 'Zero-gravity suspended project tiles with physics-influenced micro-tilt and smooth depth displacement. Rendered in Brushed Metal with Click To Focus camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'particle-field-hero',
    material: 'neon-emissive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Neon Emissive Mouse Parallax Tilt',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'particle-field-hero',
    material: 'neon-emissive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Neon Emissive Auto Rotate Idle',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'particle-field-hero',
    material: 'neon-emissive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Neon Emissive Gyro Pointer Look',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'particle-field-hero',
    material: 'neon-emissive',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Neon Emissive Scroll Driven Fly Through',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'particle-field-hero',
    material: 'neon-emissive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Neon Emissive Elastic Spring Pan',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'particle-field-hero',
    material: 'holographic-iridescent',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Holographic Iridescent Mouse Parallax Tilt',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Holographic Iridescent with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'particle-field-hero',
    material: 'holographic-iridescent',
    camera: 'auto-rotate-idle',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Holographic Iridescent Auto Rotate Idle',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Holographic Iridescent with Auto Rotate Idle camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'particle-field-hero',
    material: 'holographic-iridescent',
    camera: 'gyro-pointer-look',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Holographic Iridescent Gyro Pointer Look',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Holographic Iridescent with Gyro Pointer Look camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'particle-field-hero',
    material: 'holographic-iridescent',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Holographic Iridescent Scroll Driven Fly Through',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Holographic Iridescent with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'particle-field-hero',
    material: 'holographic-iridescent',
    camera: 'elastic-spring-pan',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Holographic Iridescent Elastic Spring Pan',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Holographic Iridescent with Elastic Spring Pan camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'particle-field-hero',
    material: 'monochrome-wire',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Monochrome Wire Mouse Parallax Tilt',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Monochrome Wire with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'particle-field-hero',
    material: 'monochrome-wire',
    camera: 'auto-rotate-idle',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Monochrome Wire Auto Rotate Idle',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Monochrome Wire with Auto Rotate Idle camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'particle-field-hero',
    material: 'monochrome-wire',
    camera: 'gyro-pointer-look',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Monochrome Wire Gyro Pointer Look',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Monochrome Wire with Gyro Pointer Look camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'particle-field-hero',
    material: 'monochrome-wire',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Monochrome Wire Scroll Driven Fly Through',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Monochrome Wire with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'particle-field-hero',
    material: 'monochrome-wire',
    camera: 'elastic-spring-pan',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Monochrome Wire Elastic Spring Pan',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Monochrome Wire with Elastic Spring Pan camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'particle-field-hero',
    material: 'warm-film-grain',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Warm Film Grain Mouse Parallax Tilt',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Warm Film Grain with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'particle-field-hero',
    material: 'warm-film-grain',
    camera: 'auto-rotate-idle',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Warm Film Grain Auto Rotate Idle',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Warm Film Grain with Auto Rotate Idle camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'particle-field-hero',
    material: 'warm-film-grain',
    camera: 'gyro-pointer-look',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Warm Film Grain Gyro Pointer Look',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Warm Film Grain with Gyro Pointer Look camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'particle-field-hero',
    material: 'warm-film-grain',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Warm Film Grain Scroll Driven Fly Through',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Warm Film Grain with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'particle-field-hero',
    material: 'warm-film-grain',
    camera: 'elastic-spring-pan',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Warm Film Grain Elastic Spring Pan',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Warm Film Grain with Elastic Spring Pan camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'particle-field-hero',
    material: 'gradient-mesh',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'fullscreen-image',
    projectLayout: 'featured-plus-grid',
    name: 'Constellation Cloud — Gradient Mesh Mouse Parallax Tilt',
    description: 'Reactive point-cloud galaxy clustering into project glyphs based on proximity and cursor trajectory. Rendered in Gradient Mesh with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'matte-studio',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Matte Studio Orbit Drag',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Matte Studio with Orbit Drag camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'matte-studio',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Matte Studio Auto Rotate Idle',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'matte-studio',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Matte Studio Mouse Parallax Tilt',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'matte-studio',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Matte Studio Elastic Spring Pan',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'glass-refractive',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Glass Refractive Orbit Drag',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Glass Refractive with Orbit Drag camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'glass-refractive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Glass Refractive Auto Rotate Idle',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Glass Refractive Mouse Parallax Tilt',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'glass-refractive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Glass Refractive Elastic Spring Pan',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'neon-emissive',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Neon Emissive Orbit Drag',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Neon Emissive with Orbit Drag camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'neon-emissive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Neon Emissive Auto Rotate Idle',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'neon-emissive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Neon Emissive Mouse Parallax Tilt',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'neon-emissive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Neon Emissive Elastic Spring Pan',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Neon Emissive with Elastic Spring Pan camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'soft-pastel-toon',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Soft Pastel Toon Orbit Drag',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Soft Pastel Toon with Orbit Drag camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'soft-pastel-toon',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Soft Pastel Toon Auto Rotate Idle',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Soft Pastel Toon with Auto Rotate Idle camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'soft-pastel-toon',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Soft Pastel Toon Mouse Parallax Tilt',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Soft Pastel Toon with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'soft-pastel-toon',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Soft Pastel Toon Elastic Spring Pan',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Soft Pastel Toon with Elastic Spring Pan camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'brushed-metal',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Brushed Metal Orbit Drag',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Brushed Metal with Orbit Drag camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'brushed-metal',
    camera: 'auto-rotate-idle',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Brushed Metal Auto Rotate Idle',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Brushed Metal with Auto Rotate Idle camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'brushed-metal',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Brushed Metal Mouse Parallax Tilt',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Brushed Metal with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'brushed-metal',
    camera: 'elastic-spring-pan',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Brushed Metal Elastic Spring Pan',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Brushed Metal with Elastic Spring Pan camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'orbit-camera-showcase',
    material: 'paper-craft-flat',
    camera: 'orbit-drag',
    fallbackHero: 'centered',
    projectLayout: 'timeline-stack',
    name: 'Turntable Studio — Paper Craft Flat Orbit Drag',
    description: 'Full 360-degree turntable pedestal placing the crown-jewel flagship project at center stage. Rendered in Paper Craft Flat with Orbit Drag camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'matte-studio',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Matte Studio Click To Focus',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Matte Studio with Click To Focus camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'matte-studio',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Matte Studio Mouse Parallax Tilt',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'matte-studio',
    camera: 'auto-rotate-idle',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Matte Studio Auto Rotate Idle',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'matte-studio',
    camera: 'elastic-spring-pan',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Matte Studio Elastic Spring Pan',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'matte-studio',
    camera: 'gyro-pointer-look',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Matte Studio Gyro Pointer Look',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Matte Studio with Gyro Pointer Look camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'paper-craft-flat',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Paper Craft Flat Click To Focus',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Paper Craft Flat with Click To Focus camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'paper-craft-flat',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Paper Craft Flat Mouse Parallax Tilt',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Paper Craft Flat with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'paper-craft-flat',
    camera: 'auto-rotate-idle',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Paper Craft Flat Auto Rotate Idle',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Paper Craft Flat with Auto Rotate Idle camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'paper-craft-flat',
    camera: 'elastic-spring-pan',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Paper Craft Flat Elastic Spring Pan',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Paper Craft Flat with Elastic Spring Pan camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'paper-craft-flat',
    camera: 'gyro-pointer-look',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Paper Craft Flat Gyro Pointer Look',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Paper Craft Flat with Gyro Pointer Look camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'clay-claymation',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Clay Claymation Click To Focus',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Clay Claymation with Click To Focus camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'clay-claymation',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Clay Claymation Mouse Parallax Tilt',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Clay Claymation with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'clay-claymation',
    camera: 'auto-rotate-idle',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Clay Claymation Auto Rotate Idle',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Clay Claymation with Auto Rotate Idle camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'clay-claymation',
    camera: 'elastic-spring-pan',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Clay Claymation Elastic Spring Pan',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Clay Claymation with Elastic Spring Pan camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'clay-claymation',
    camera: 'gyro-pointer-look',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Clay Claymation Gyro Pointer Look',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Clay Claymation with Gyro Pointer Look camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'glass-refractive',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Glass Refractive Click To Focus',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Glass Refractive with Click To Focus camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Glass Refractive Mouse Parallax Tilt',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'glass-refractive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Glass Refractive Auto Rotate Idle',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'glass-refractive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Glass Refractive Elastic Spring Pan',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'glass-refractive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Glass Refractive Gyro Pointer Look',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: '3d-card-flip-casestudy',
    material: 'brushed-metal',
    camera: 'click-to-focus',
    fallbackHero: 'split',
    projectLayout: 'list',
    name: 'Tactile Folio Flip — Brushed Metal Click To Focus',
    description: 'Physical card-flip mechanics switching instantaneously between editorial cover art and technical metrics. Rendered in Brushed Metal with Click To Focus camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'neon-emissive',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Neon Emissive Scroll Driven Fly Through',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'neon-emissive',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Neon Emissive Scroll Triggered Camera Path',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'neon-emissive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Neon Emissive Mouse Parallax Tilt',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'neon-emissive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Neon Emissive Gyro Pointer Look',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'monochrome-wire',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Monochrome Wire Scroll Driven Fly Through',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Monochrome Wire with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'monochrome-wire',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Monochrome Wire Scroll Triggered Camera Path',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Monochrome Wire with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'monochrome-wire',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Monochrome Wire Mouse Parallax Tilt',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Monochrome Wire with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'monochrome-wire',
    camera: 'gyro-pointer-look',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Monochrome Wire Gyro Pointer Look',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Monochrome Wire with Gyro Pointer Look camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'gradient-mesh',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Gradient Mesh Scroll Driven Fly Through',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Gradient Mesh with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'gradient-mesh',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Gradient Mesh Scroll Triggered Camera Path',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Gradient Mesh with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'gradient-mesh',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Gradient Mesh Mouse Parallax Tilt',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Gradient Mesh with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'gradient-mesh',
    camera: 'gyro-pointer-look',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Gradient Mesh Gyro Pointer Look',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Gradient Mesh with Gyro Pointer Look camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'chrome-liquid',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Chrome Liquid Scroll Driven Fly Through',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Chrome Liquid with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'chrome-liquid',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Chrome Liquid Scroll Triggered Camera Path',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Chrome Liquid with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'chrome-liquid',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Chrome Liquid Mouse Parallax Tilt',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Chrome Liquid with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'chrome-liquid',
    camera: 'gyro-pointer-look',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Chrome Liquid Gyro Pointer Look',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Chrome Liquid with Gyro Pointer Look camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'holographic-iridescent',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Holographic Iridescent Scroll Driven Fly Through',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Holographic Iridescent with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'holographic-iridescent',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Holographic Iridescent Scroll Triggered Camera Path',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Holographic Iridescent with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'holographic-iridescent',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Holographic Iridescent Mouse Parallax Tilt',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Holographic Iridescent with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'holographic-iridescent',
    camera: 'gyro-pointer-look',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Holographic Iridescent Gyro Pointer Look',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Holographic Iridescent with Gyro Pointer Look camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'tunnel-scroll',
    material: 'glass-refractive',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'diagonal-split',
    projectLayout: 'horizontal-scroll',
    name: 'Hyperspace Slipway — Glass Refractive Scroll Driven Fly Through',
    description: 'Continuous geometric wireframe corridor conveying high-speed forward progression as the user scrolls. Rendered in Glass Refractive with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'isometric-diorama',
    material: 'matte-studio',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Matte Studio Mouse Parallax Tilt',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'isometric-diorama',
    material: 'matte-studio',
    camera: 'orbit-drag',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Matte Studio Orbit Drag',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Matte Studio with Orbit Drag camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'isometric-diorama',
    material: 'matte-studio',
    camera: 'auto-rotate-idle',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Matte Studio Auto Rotate Idle',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Matte Studio with Auto Rotate Idle camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'isometric-diorama',
    material: 'matte-studio',
    camera: 'click-to-focus',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Matte Studio Click To Focus',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Matte Studio with Click To Focus camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'isometric-diorama',
    material: 'matte-studio',
    camera: 'elastic-spring-pan',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Matte Studio Elastic Spring Pan',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Matte Studio with Elastic Spring Pan camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'isometric-diorama',
    material: 'paper-craft-flat',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Paper Craft Flat Mouse Parallax Tilt',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Paper Craft Flat with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'isometric-diorama',
    material: 'paper-craft-flat',
    camera: 'orbit-drag',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Paper Craft Flat Orbit Drag',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Paper Craft Flat with Orbit Drag camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'isometric-diorama',
    material: 'paper-craft-flat',
    camera: 'auto-rotate-idle',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Paper Craft Flat Auto Rotate Idle',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Paper Craft Flat with Auto Rotate Idle camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'isometric-diorama',
    material: 'paper-craft-flat',
    camera: 'click-to-focus',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Paper Craft Flat Click To Focus',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Paper Craft Flat with Click To Focus camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'isometric-diorama',
    material: 'paper-craft-flat',
    camera: 'elastic-spring-pan',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Paper Craft Flat Elastic Spring Pan',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Paper Craft Flat with Elastic Spring Pan camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'isometric-diorama',
    material: 'clay-claymation',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Clay Claymation Mouse Parallax Tilt',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Clay Claymation with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'isometric-diorama',
    material: 'clay-claymation',
    camera: 'orbit-drag',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Clay Claymation Orbit Drag',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Clay Claymation with Orbit Drag camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'isometric-diorama',
    material: 'clay-claymation',
    camera: 'auto-rotate-idle',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Clay Claymation Auto Rotate Idle',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Clay Claymation with Auto Rotate Idle camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'isometric-diorama',
    material: 'clay-claymation',
    camera: 'click-to-focus',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Clay Claymation Click To Focus',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Clay Claymation with Click To Focus camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'isometric-diorama',
    material: 'clay-claymation',
    camera: 'elastic-spring-pan',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Clay Claymation Elastic Spring Pan',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Clay Claymation with Elastic Spring Pan camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'isometric-diorama',
    material: 'soft-pastel-toon',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Soft Pastel Toon Mouse Parallax Tilt',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Soft Pastel Toon with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'isometric-diorama',
    material: 'soft-pastel-toon',
    camera: 'orbit-drag',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Soft Pastel Toon Orbit Drag',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Soft Pastel Toon with Orbit Drag camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'isometric-diorama',
    material: 'soft-pastel-toon',
    camera: 'auto-rotate-idle',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Soft Pastel Toon Auto Rotate Idle',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Soft Pastel Toon with Auto Rotate Idle camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'isometric-diorama',
    material: 'soft-pastel-toon',
    camera: 'click-to-focus',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Soft Pastel Toon Click To Focus',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Soft Pastel Toon with Click To Focus camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'isometric-diorama',
    material: 'soft-pastel-toon',
    camera: 'elastic-spring-pan',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Soft Pastel Toon Elastic Spring Pan',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Soft Pastel Toon with Elastic Spring Pan camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'isometric-diorama',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'minimal-text',
    projectLayout: 'grid',
    name: 'Miniature Atelier — Glass Refractive Mouse Parallax Tilt',
    description: 'Tilt-shift miniature isometric architectural room staging projects across interactive volumetric pedestals. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'chrome-liquid',
    camera: 'auto-rotate-idle',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Chrome Liquid Auto Rotate Idle',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Chrome Liquid with Auto Rotate Idle camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'chrome-liquid',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Chrome Liquid Mouse Parallax Tilt',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Chrome Liquid with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'chrome-liquid',
    camera: 'orbit-drag',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Chrome Liquid Orbit Drag',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Chrome Liquid with Orbit Drag camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'chrome-liquid',
    camera: 'gyro-pointer-look',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Chrome Liquid Gyro Pointer Look',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Chrome Liquid with Gyro Pointer Look camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'chrome-liquid',
    camera: 'elastic-spring-pan',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Chrome Liquid Elastic Spring Pan',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Chrome Liquid with Elastic Spring Pan camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'gradient-mesh',
    camera: 'auto-rotate-idle',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Gradient Mesh Auto Rotate Idle',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Gradient Mesh with Auto Rotate Idle camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'gradient-mesh',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Gradient Mesh Mouse Parallax Tilt',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Gradient Mesh with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'gradient-mesh',
    camera: 'orbit-drag',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Gradient Mesh Orbit Drag',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Gradient Mesh with Orbit Drag camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'gradient-mesh',
    camera: 'gyro-pointer-look',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Gradient Mesh Gyro Pointer Look',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Gradient Mesh with Gyro Pointer Look camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'gradient-mesh',
    camera: 'elastic-spring-pan',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Gradient Mesh Elastic Spring Pan',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Gradient Mesh with Elastic Spring Pan camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'holographic-iridescent',
    camera: 'auto-rotate-idle',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Holographic Iridescent Auto Rotate Idle',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Holographic Iridescent with Auto Rotate Idle camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'holographic-iridescent',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Holographic Iridescent Mouse Parallax Tilt',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Holographic Iridescent with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'holographic-iridescent',
    camera: 'orbit-drag',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Holographic Iridescent Orbit Drag',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Holographic Iridescent with Orbit Drag camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'holographic-iridescent',
    camera: 'gyro-pointer-look',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Holographic Iridescent Gyro Pointer Look',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Holographic Iridescent with Gyro Pointer Look camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'holographic-iridescent',
    camera: 'elastic-spring-pan',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Holographic Iridescent Elastic Spring Pan',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Holographic Iridescent with Elastic Spring Pan camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'glass-refractive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Glass Refractive Auto Rotate Idle',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Glass Refractive Mouse Parallax Tilt',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'glass-refractive',
    camera: 'orbit-drag',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Glass Refractive Orbit Drag',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Glass Refractive with Orbit Drag camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'glass-refractive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Glass Refractive Gyro Pointer Look',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'glass-refractive',
    camera: 'elastic-spring-pan',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Glass Refractive Elastic Spring Pan',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Glass Refractive with Elastic Spring Pan camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'morphing-geometry-hero',
    material: 'brushed-metal',
    camera: 'auto-rotate-idle',
    fallbackHero: 'marquee-text',
    projectLayout: 'masonry',
    name: 'Metamorphic Core — Brushed Metal Auto Rotate Idle',
    description: 'Fluid mathematical polyhedra continually undulating and deforming in response to cursor interaction. Rendered in Brushed Metal with Auto Rotate Idle camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'glass-refractive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Glass Refractive Mouse Parallax Tilt',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Glass Refractive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'glass-refractive',
    camera: 'orbit-drag',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Glass Refractive Orbit Drag',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Glass Refractive with Orbit Drag camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'glass-refractive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Glass Refractive Auto Rotate Idle',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Glass Refractive with Auto Rotate Idle camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'glass-refractive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Glass Refractive Gyro Pointer Look',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Glass Refractive with Gyro Pointer Look camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'glass-refractive',
    camera: 'click-to-focus',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Glass Refractive Click To Focus',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Glass Refractive with Click To Focus camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'neon-emissive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Neon Emissive Mouse Parallax Tilt',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'neon-emissive',
    camera: 'orbit-drag',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Neon Emissive Orbit Drag',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Neon Emissive with Orbit Drag camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'neon-emissive',
    camera: 'auto-rotate-idle',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Neon Emissive Auto Rotate Idle',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Neon Emissive with Auto Rotate Idle camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'neon-emissive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Neon Emissive Gyro Pointer Look',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'neon-emissive',
    camera: 'click-to-focus',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Neon Emissive Click To Focus',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Neon Emissive with Click To Focus camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'holographic-iridescent',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Holographic Iridescent Mouse Parallax Tilt',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Holographic Iridescent with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'holographic-iridescent',
    camera: 'orbit-drag',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Holographic Iridescent Orbit Drag',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Holographic Iridescent with Orbit Drag camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'holographic-iridescent',
    camera: 'auto-rotate-idle',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Holographic Iridescent Auto Rotate Idle',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Holographic Iridescent with Auto Rotate Idle camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'holographic-iridescent',
    camera: 'gyro-pointer-look',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Holographic Iridescent Gyro Pointer Look',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Holographic Iridescent with Gyro Pointer Look camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'holographic-iridescent',
    camera: 'click-to-focus',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Holographic Iridescent Click To Focus',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Holographic Iridescent with Click To Focus camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'chrome-liquid',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Chrome Liquid Mouse Parallax Tilt',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Chrome Liquid with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'chrome-liquid',
    camera: 'orbit-drag',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Chrome Liquid Orbit Drag',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Chrome Liquid with Orbit Drag camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'chrome-liquid',
    camera: 'auto-rotate-idle',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Chrome Liquid Auto Rotate Idle',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Chrome Liquid with Auto Rotate Idle camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'chrome-liquid',
    camera: 'gyro-pointer-look',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Chrome Liquid Gyro Pointer Look',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Chrome Liquid with Gyro Pointer Look camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'chrome-liquid',
    camera: 'click-to-focus',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Chrome Liquid Click To Focus',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Chrome Liquid with Click To Focus camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'interactive-sphere-cloud',
    material: 'matte-studio',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'side-panel-nav',
    projectLayout: 'featured-plus-grid',
    name: 'Fibonacci Node Orb — Matte Studio Mouse Parallax Tilt',
    description: 'Self-organizing mathematical sphere where project nodes expand outward into full previews upon hover. Rendered in Matte Studio with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'monochrome-wire',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Monochrome Wire Scroll Driven Fly Through',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Monochrome Wire with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'monochrome-wire',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Monochrome Wire Scroll Triggered Camera Path',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Monochrome Wire with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'monochrome-wire',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Monochrome Wire Mouse Parallax Tilt',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Monochrome Wire with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'monochrome-wire',
    camera: 'gyro-pointer-look',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Monochrome Wire Gyro Pointer Look',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Monochrome Wire with Gyro Pointer Look camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'monochrome-wire',
    camera: 'orbit-drag',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Monochrome Wire Orbit Drag',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Monochrome Wire with Orbit Drag camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'neon-emissive',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Neon Emissive Scroll Driven Fly Through',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Neon Emissive with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'neon-emissive',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Neon Emissive Scroll Triggered Camera Path',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Neon Emissive with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'academic'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'neon-emissive',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Neon Emissive Mouse Parallax Tilt',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Neon Emissive with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'luxury'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'neon-emissive',
    camera: 'gyro-pointer-look',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Neon Emissive Gyro Pointer Look',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Neon Emissive with Gyro Pointer Look camera dynamics.',
    presetKey: 'playful'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'neon-emissive',
    camera: 'orbit-drag',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Neon Emissive Orbit Drag',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Neon Emissive with Orbit Drag camera dynamics.',
    presetKey: 'minimal'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'gradient-mesh',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Gradient Mesh Scroll Driven Fly Through',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Gradient Mesh with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'editorial'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'gradient-mesh',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Gradient Mesh Scroll Triggered Camera Path',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Gradient Mesh with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'studio'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'gradient-mesh',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Gradient Mesh Mouse Parallax Tilt',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Gradient Mesh with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'brutalist'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'gradient-mesh',
    camera: 'gyro-pointer-look',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Gradient Mesh Gyro Pointer Look',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Gradient Mesh with Gyro Pointer Look camera dynamics.',
    presetKey: 'swiss'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'gradient-mesh',
    camera: 'orbit-drag',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Gradient Mesh Orbit Drag',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Gradient Mesh with Orbit Drag camera dynamics.',
    presetKey: 'cinematic'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'warm-film-grain',
    camera: 'scroll-driven-fly-through',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Warm Film Grain Scroll Driven Fly Through',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Warm Film Grain with Scroll Driven Fly Through camera dynamics.',
    presetKey: 'monochrome'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'warm-film-grain',
    camera: 'scroll-triggered-camera-path',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Warm Film Grain Scroll Triggered Camera Path',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Warm Film Grain with Scroll Triggered Camera Path camera dynamics.',
    presetKey: 'darkTechnical'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'warm-film-grain',
    camera: 'mouse-parallax-tilt',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Warm Film Grain Mouse Parallax Tilt',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Warm Film Grain with Mouse Parallax Tilt camera dynamics.',
    presetKey: 'magazine'
  },
  {
    archetype: 'wireframe-terrain-wire',
    material: 'warm-film-grain',
    camera: 'gyro-pointer-look',
    fallbackHero: 'video-background',
    projectLayout: 'timeline-stack',
    name: 'Topographic Horizon — Warm Film Grain Gyro Pointer Look',
    description: 'Synthwave procedural wireframe terrain with glowing project beacon monoliths visible across the horizon. Rendered in Warm Film Grain with Gyro Pointer Look camera dynamics.',
    presetKey: 'academic'
  },
];

export function generate3DCatalog(): TemplateDefinition[] {
  const seen = new Set<string>();
  const templates: TemplateDefinition[] = [];

  COMBINATIONS_3D.forEach((combo, idx) => {
    const tripleKey = `${combo.archetype}__${combo.material}__${combo.camera}`;
    if (seen.has(tripleKey)) {
      throw new Error(`Duplicate 3D triple detected: ${tripleKey}`);
    }
    seen.add(tripleKey);

    const id = `tpl-3d-${String(idx + 1).padStart(3, '0')}`;
    const tokens = EXPANDED_STYLE_PRESETS[combo.presetKey] || EXPANDED_STYLE_PRESETS.minimal;

    templates.push({
      id,
      name: combo.name,
      category: '3d',
      description: combo.description,
      heroVariant: 'centered', // Standard placeholder for 2D selectors
      fallbackHeroVariant: combo.fallbackHero,
      projectLayout: combo.projectLayout,
      tokens,
      interactionProfile: {
        customCursor: true,
        magneticButtons: true,
        cardTilt: true,
        scrollReveal: true
      },
      supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
      sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
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

  if (templates.length !== 250) {
    throw new Error(`Expected exactly 250 3D templates, got ${templates.length}`);
  }

  return templates;
}

export const ALL_3D_TEMPLATES: TemplateDefinition[] = generate3DCatalog();
