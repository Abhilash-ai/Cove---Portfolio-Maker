import { TemplateDefinition } from './templateTypes.js';
import { EXPANDED_STYLE_PRESETS, ThemeTokens, ColorTokens } from '@cove/shared';

function makeTokens(
  presetKey: string,
  colors: Partial<ColorTokens>,
  fontHeading: string,
  fontBody: string
): ThemeTokens {
  const base = EXPANDED_STYLE_PRESETS[presetKey] || EXPANDED_STYLE_PRESETS.minimal;
  return {
    ...base,
    colors: {
      ...base.colors,
      ...colors,
    },
    typography: {
      ...base.typography,
      fontHeading,
      fontBody,
    },
  };
}

// ============================================================================
// COVE CURATED DISTINCT TEMPLATE REGISTRY
// AM Studio Flagship: Genuinely distinct designs across layout, typography,
// color systems, and 2D/3D compositions — ZERO permutation inflation.
// ============================================================================

export const DISTINCT_PORTFOLIO_TEMPLATES: TemplateDefinition[] = [
  // 1. The Monolith 3D (Immersive Spatial Portfolio)
  {
    id: 'tpl-portfolio-monolith-3d',
    name: 'The Monolith 3D',
    category: '3d',
    description: 'Immersive spatial hero with reactive 3D monolithic core, floating badges, and high-impact case study cards.',
    heroVariant: 'centered',
    fallbackHeroVariant: 'centered',
    projectLayout: 'featured-plus-grid',
    is3D: true,
    scene3DConfig: {
      archetype: 'rotating-hero-object',
      materialPreset: 'matte-studio',
      cameraBehavior: 'orbit-drag',
    },
    tokens: makeTokens(
      'studio',
      {
        background: '#09090B',
        surface: '#18181B',
        textPrimary: '#F4F4F6',
        textSecondary: '#A1A1AA',
        accent: '#FF6B4A',
        accentHover: '#F04E27',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      "'Space Grotesk', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 2. Kinetic Particle 3D (Spatial Creative Tech)
  {
    id: 'tpl-portfolio-kinetic-3d',
    name: 'Kinetic Particle 3D',
    category: '3d',
    description: 'Dynamic 3D particle field reacting to mouse motion with horizontal project track for creative technologists.',
    heroVariant: 'centered',
    fallbackHeroVariant: 'centered',
    projectLayout: 'horizontal-scroll',
    is3D: true,
    scene3DConfig: {
      archetype: 'particle-field-hero',
      materialPreset: 'neon-emissive',
      cameraBehavior: 'mouse-parallax-tilt',
    },
    tokens: makeTokens(
      'studio',
      {
        background: '#030712',
        surface: '#0B1329',
        textPrimary: '#F9FAFB',
        textSecondary: '#94A3B8',
        accent: '#06B6D4',
        accentHover: '#0891B2',
        border: 'rgba(6, 182, 212, 0.2)',
      },
      "'Syne', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 3. Swiss Precision (High-Modernist Grid System)
  {
    id: 'tpl-portfolio-swiss',
    name: 'Swiss Precision',
    category: 'swiss' as any,
    description: 'Strict 12-column grid system with authoritative Grotesk type, generous whitespace, and international red accents.',
    heroVariant: 'asymmetric-offset',
    fallbackHeroVariant: 'asymmetric-offset',
    projectLayout: 'grid',
    tokens: makeTokens(
      'swiss',
      {
        background: '#FFFFFF',
        surface: '#F4F4F5',
        textPrimary: '#0A0A0A',
        textSecondary: '#52525B',
        accent: '#FF2A00',
        accentHover: '#CC2200',
        border: '#E4E4E7',
      },
      "'Space Grotesk', -apple-system, sans-serif",
      "'Inter', -apple-system, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 4. The Editorial Gazette (Magazine Asymmetric Layout)
  {
    id: 'tpl-portfolio-editorial',
    name: 'The Editorial',
    category: 'editorial',
    description: 'Magazine-inspired editorial layout with distinguished serif titles, pull-quotes, and warm cream paper aesthetics.',
    heroVariant: 'split',
    fallbackHeroVariant: 'split',
    projectLayout: 'list',
    tokens: makeTokens(
      'editorial',
      {
        background: '#FBF8F3',
        surface: '#F2ECE4',
        textPrimary: '#1C1917',
        textSecondary: '#78716C',
        accent: '#C2410C',
        accentHover: '#9A3412',
        border: 'rgba(28, 25, 23, 0.12)',
      },
      "'Playfair Display', Georgia, serif",
      "'Plus Jakarta Sans', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'experience', 'skills', 'contact'],
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
    version: '2.0.0',
  },

  // 5. Atelier Minimal (Quiet Monochromatic Content-First)
  {
    id: 'tpl-portfolio-minimal',
    name: 'Atelier Minimal',
    category: 'minimal',
    description: 'Quiet, reductionist design with airy whitespace, hairline dividers, and pure focus on creative deliverables.',
    heroVariant: 'minimal-text',
    fallbackHeroVariant: 'minimal-text',
    projectLayout: 'masonry',
    tokens: makeTokens(
      'minimal',
      {
        background: '#FAFAFA',
        surface: '#F4F4F6',
        textPrimary: '#18181B',
        textSecondary: '#71717A',
        accent: '#18181B',
        accentHover: '#27272A',
        border: '#E4E4E7',
      },
      "'Inter', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 6. Neo-Brutalist Matrix (High Contrast Graphic Design)
  {
    id: 'tpl-portfolio-brutalist',
    name: 'Neo-Brutalist',
    category: 'brutalist' as any,
    description: 'Unconventional graphic language with bold 2px borders, hard drop-shadows, monospace type, and tactile cards.',
    heroVariant: 'marquee-text',
    fallbackHeroVariant: 'marquee-text',
    projectLayout: 'grid',
    tokens: makeTokens(
      'brutalist',
      {
        background: '#121214',
        surface: '#1E1E22',
        textPrimary: '#FFFFFF',
        textSecondary: '#A1A1AA',
        accent: '#FACC15',
        accentHover: '#EAB308',
        border: '#FFFFFF',
      },
      "'JetBrains Mono', monospace",
      "'JetBrains Mono', monospace"
    ),
    interactionProfile: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: false },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 7. Academic Scholar (Research, Citations & Papers)
  {
    id: 'tpl-portfolio-academic',
    name: 'Academic Scholar',
    category: 'academic' as any,
    description: 'Structured layout for researchers and scientists featuring publication bibliographies, credentials, and institutional hierarchy.',
    heroVariant: 'side-panel-nav',
    fallbackHeroVariant: 'side-panel-nav',
    projectLayout: 'timeline-stack',
    tokens: makeTokens(
      'academic',
      {
        background: '#FDFBF7',
        surface: '#F5F2EB',
        textPrimary: '#1E293B',
        textSecondary: '#64748B',
        accent: '#1E3A8A',
        accentHover: '#172554',
        border: 'rgba(30, 41, 59, 0.12)',
      },
      "'Playfair Display', Georgia, serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'experience', 'skills', 'contact'],
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
    version: '2.0.0',
  },

  // 8. Visual First Gallery (Media-First Showcase)
  {
    id: 'tpl-portfolio-gallery',
    name: 'Visual Gallery',
    category: 'studio',
    description: 'Media-forward layout engineered for designers, architects, and artists with large-format image grids and lightboxes.',
    heroVariant: 'fullscreen-image',
    fallbackHeroVariant: 'fullscreen-image',
    projectLayout: 'masonry',
    tokens: makeTokens(
      'cinematic',
      {
        background: '#0A0A0A',
        surface: '#141414',
        textPrimary: '#EDEDED',
        textSecondary: '#888888',
        accent: '#FF6B4A',
        accentHover: '#F04E27',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      "'Plus Jakarta Sans', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: true, magneticButtons: true, cardTilt: true, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },

  // 9. Career Chronicle (Narrative Timeline Spine)
  {
    id: 'tpl-portfolio-timeline',
    name: 'Career Chronicle',
    category: 'studio',
    description: 'Chronological visual spine charting milestones, career promotions, case studies, and engineering achievements.',
    heroVariant: 'centered',
    fallbackHeroVariant: 'centered',
    projectLayout: 'timeline-stack',
    tokens: makeTokens(
      'studio',
      {
        background: '#18181B',
        surface: '#27272A',
        textPrimary: '#FAFAFA',
        textSecondary: '#A1A1AA',
        accent: '#10B981',
        accentHover: '#059669',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      "'Space Grotesk', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'experience', 'skills', 'contact'],
    sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact'],
    version: '2.0.0',
  },

  // 10. Warm Linen (Warm Light Palette)
  {
    id: 'tpl-portfolio-warm-linen',
    name: 'Warm Linen',
    category: 'minimal',
    description: 'Warm, natural organic aesthetic on woven linen paper with terracotta accents and humanist sans typography.',
    heroVariant: 'split',
    fallbackHeroVariant: 'split',
    projectLayout: 'grid',
    tokens: makeTokens(
      'editorial',
      {
        background: '#F8F6F0',
        surface: '#EEECE4',
        textPrimary: '#262626',
        textSecondary: '#737373',
        accent: '#D97706',
        accentHover: '#B45309',
        border: 'rgba(38, 38, 38, 0.1)',
      },
      "'Plus Jakarta Sans', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif"
    ),
    interactionProfile: { customCursor: false, magneticButtons: false, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'projects', 'skills', 'experience', 'contact'],
    sectionOrder: ['hero', 'projects', 'skills', 'experience', 'contact'],
    version: '2.0.0',
  },
];

// ============================================================================
// DISTINCT WEBSITE TEMPLATES
// Completely separated from Portfolio. Includes website-specific structures:
// Navbar, Hero, Feature Grid, Services, Pricing, Testimonials, FAQ, CTA, Footer.
// ============================================================================

export interface WebsiteTemplateDefinition {
  id: string;
  name: string;
  category: 'saas' | 'agency' | 'hospitality' | 'hardware' | 'event' | 'creator';
  description: string;
  is3D?: boolean;
  tokens: {
    colors: {
      background: string;
      surface: string;
      textPrimary: string;
      textSecondary: string;
      accent: string;
      accentHover: string;
      border: string;
      cardBackground: string;
    };
    typography: {
      fontHeading: string;
      fontBody: string;
    };
  };
  defaultContent: {
    navbar: {
      brandName: string;
      links: { label: string; href: string }[];
      ctaLabel: string;
    };
    hero: {
      badge: string;
      headline: string;
      tagline: string;
      primaryCta: string;
      secondaryCta: string;
    };
    features: {
      title: string;
      subtitle: string;
      items: { icon: string; title: string; description: string }[];
    };
    services?: {
      title: string;
      subtitle: string;
      items: { title: string; description: string; deliverables: string[] }[];
    };
    pricing?: {
      title: string;
      subtitle: string;
      tiers: {
        name: string;
        price: string;
        period: string;
        description: string;
        highlighted?: boolean;
        features: string[];
        cta: string;
      }[];
    };
    testimonials?: {
      title: string;
      quotes: { author: string; role: string; company: string; quote: string }[];
    };
    faq?: {
      title: string;
      items: { q: string; a: string }[];
    };
    cta: {
      headline: string;
      subline: string;
      buttonText: string;
    };
    footer: {
      copyright: string;
      columns: { title: string; links: { label: string; href: string }[] }[];
    };
  };
}

export const DISTINCT_WEBSITE_TEMPLATES: WebsiteTemplateDefinition[] = [
  // 1. SaaS Velocity 3D
  {
    id: 'tpl-website-saas-velocity',
    name: 'SaaS Velocity 3D',
    category: 'saas',
    description: 'High-converting software landing page with interactive 3D hero, feature matrix, pricing table, and FAQ accordions.',
    is3D: true,
    tokens: {
      colors: {
        background: '#09090C',
        surface: '#121217',
        textPrimary: '#FFFFFF',
        textSecondary: '#94A3B8',
        accent: '#6366F1',
        accentHover: '#4F46E5',
        border: 'rgba(255, 255, 255, 0.08)',
        cardBackground: 'rgba(18, 18, 23, 0.8)',
      },
      typography: {
        fontHeading: "'Space Grotesk', system-ui, sans-serif",
        fontBody: "'Inter', system-ui, sans-serif",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Velocity AI',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ],
        ctaLabel: 'Get Started Free',
      },
      hero: {
        badge: '⚡ NEXT-GEN CLOUD PLATFORM',
        headline: 'Automate your creative workflow at scale.',
        tagline: 'Velocity connects your design engines, data models, and team delivery into one fluid high-performance cloud.',
        primaryCta: 'Start Free Trial',
        secondaryCta: 'Book Interactive Demo',
      },
      features: {
        title: 'Built for enterprise velocity',
        subtitle: 'Everything your teams need to ship digital products faster with zero friction.',
        items: [
          { icon: '⚡', title: 'Real-Time Sync', description: 'Collaborative live multiplayer state synchronized across all client surfaces.' },
          { icon: '🛡️', title: 'Bank-Grade Security', description: 'End-to-end encryption, strict IDOR prevention, and role-based permissions.' },
          { icon: '🌐', title: 'Global CDN Delivery', description: 'Edge-distributed asset caching ensuring sub-50ms render latency worldwide.' },
          { icon: '📊', title: 'Live Telemetry', description: 'Built-in privacy-compliant analytics tracking conversion and engagement.' },
        ],
      },
      pricing: {
        title: 'Simple, transparent pricing',
        subtitle: 'Scale smoothly from solo creator to high-growth enterprise.',
        tiers: [
          {
            name: 'Starter',
            price: '$0',
            period: '/mo',
            description: 'Perfect for exploring and small personal projects.',
            features: ['3 Public Sites', 'Community Support', 'Standard Analytics', 'Free cove.app Subdomain'],
            cta: 'Get Started',
          },
          {
            name: 'Pro',
            price: '$29',
            period: '/mo',
            description: 'For growing studios, agencies, and professional creators.',
            highlighted: true,
            features: ['Unlimited Sites & Decks', 'Custom Domain Publishing', 'Full 3D Rendering Engine', 'Priority 24/7 Support'],
            cta: 'Upgrade to Pro',
          },
          {
            name: 'Enterprise',
            price: '$99',
            period: '/mo',
            description: 'Custom governance, SLAs, and dedicated compute instances.',
            features: ['Unlimited Team Seats', 'Dedicated Edge Node', 'Custom AI Fine-Tuning', 'Custom Contract & SLA'],
            cta: 'Contact Sales',
          },
        ],
      },
      testimonials: {
        title: 'Loved by leading product creators',
        quotes: [
          { author: 'Marcus Sterling', role: 'Head of Product', company: 'Apex Studio', quote: 'Velocity transformed our launch cycle from weeks to hours. The spatial rendering is unparalleled.' },
          { author: 'Elena Rostova', role: 'Founder', company: 'Synthetix', quote: 'The cleanest platform we have ever deployed on. Our conversion rates rose by 42% in month one.' },
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { q: 'How does the publishing system work?', a: 'Every site is published immediately to a global edge network with instant cache invalidation and custom domain mapping.' },
          { q: 'Can I export or customize the code?', a: 'Yes, full JSON state and static builds can be exported at any time.' },
          { q: 'Does it support 3D on mobile devices?', a: 'Yes, our adaptive WebGL boundary scales shaders and polygon budgets dynamically to keep 60 FPS on iOS and Android.' },
        ],
      },
      cta: {
        headline: 'Ready to build your flagship digital presence?',
        subline: 'Join thousands of creative professionals building on Cove today.',
        buttonText: 'Deploy Your First Site Free',
      },
      footer: {
        copyright: '© 2026 Velocity Technologies Inc. Powered by Cove.',
        columns: [
          { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Changelog', href: '#' }] },
          { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Security', href: '#' }] },
        ],
      },
    },
  },

  // 2. Studio Craft Agency
  {
    id: 'tpl-website-studio-craft',
    name: 'Studio Craft Agency',
    category: 'agency',
    description: 'Sophisticated creative agency aesthetic with dark luxury palette, interactive service deliverables, and client showcases.',
    tokens: {
      colors: {
        background: '#0D0D0E',
        surface: '#161618',
        textPrimary: '#F4F4F6',
        textSecondary: '#A1A1AA',
        accent: '#FF6B4A',
        accentHover: '#F04E27',
        border: 'rgba(255, 255, 255, 0.1)',
        cardBackground: '#131315',
      },
      typography: {
        fontHeading: "'Playfair Display', Georgia, serif",
        fontBody: "'Plus Jakarta Sans', system-ui, sans-serif",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Studio Atelier',
        links: [
          { label: 'Services', href: '#services' },
          { label: 'Work', href: '#work' },
          { label: 'Contact', href: '#contact' },
        ],
        ctaLabel: 'Start a Project',
      },
      hero: {
        badge: 'CREATIVE STRATEGY & SPATIAL DESIGN',
        headline: 'We design identities and digital worlds that endure.',
        tagline: 'An independent creative consultancy shaping high-conviction brands at the intersection of technology and architecture.',
        primaryCta: 'Explore Selected Work',
        secondaryCta: 'Our Ethos',
      },
      features: {
        title: 'Our Core Competencies',
        subtitle: 'Bespoke design solutions tailored for ambitious market leaders.',
        items: [
          { icon: '📐', title: 'Brand Identity', description: 'Comprehensive design systems, wordmarks, typography guidelines, and digital brand toolkits.' },
          { icon: '🌐', title: 'Interactive Web', description: 'Award-winning digital experiences designed with fluid physics, Three.js, and modern typography.' },
          { icon: '🏛️', title: 'Spatial Environments', description: 'Exhibition architecture, 3D experiential stages, and virtual brand showrooms.' },
        ],
      },
      services: {
        title: 'Disciplines & Deliverables',
        subtitle: 'End-to-end design stewardship from concept to global launch.',
        items: [
          { title: 'Brand System Architecture', description: 'Complete strategic brand foundations, visual language, and tokenized design systems.', deliverables: ['Design Guidelines', 'Custom Typography', 'Brand Book'] },
          { title: 'Digital Product Experience', description: 'Full-stack UI/UX design, interactive prototyping, and responsive production code.', deliverables: ['Design Tokens', 'React Components', 'Animation Curves'] },
        ],
      },
      cta: {
        headline: 'Have an ambitious project in mind?',
        subline: 'We partner with a limited number of clients each quarter to guarantee uncompromising craftsmanship.',
        buttonText: 'Schedule Discovery Call',
      },
      footer: {
        copyright: '© 2026 Studio Atelier. All rights reserved.',
        columns: [
          { title: 'Connect', links: [{ label: 'Twitter', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Instagram', href: '#' }] },
        ],
      },
    },
  },

  // 3. Artisan Café & Culinary
  {
    id: 'tpl-website-artisan-cafe',
    name: 'Artisan Café & Bistro',
    category: 'hospitality',
    description: 'Warm cream and terracotta palette tailored for restaurants, roasteries, and bakeries with menu grids and reservation booking.',
    tokens: {
      colors: {
        background: '#FAF8F5',
        surface: '#F2ECE4',
        textPrimary: '#292524',
        textSecondary: '#78716C',
        accent: '#D97706',
        accentHover: '#B45309',
        border: 'rgba(41, 37, 36, 0.12)',
        cardBackground: '#FFFFFF',
      },
      typography: {
        fontHeading: "'Playfair Display', Georgia, serif",
        fontBody: "'Plus Jakarta Sans', system-ui, sans-serif",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Café Terroir',
        links: [
          { label: 'Menu', href: '#menu' },
          { label: 'Story', href: '#story' },
          { label: 'Reservations', href: '#reservations' },
        ],
        ctaLabel: 'Reserve Table',
      },
      hero: {
        badge: 'ORGANIC • SINGLE-ORIGIN • ARTISAN',
        headline: 'Handcrafted pastries and micro-lot coffees.',
        tagline: 'Rooted in heritage farming and slow craftsmanship. Located in the historic quarter of Brooklyn.',
        primaryCta: 'View Seasonal Menu',
        secondaryCta: 'Book a Table',
      },
      features: {
        title: 'Our Culinary Philosophy',
        subtitle: 'Seasonal ingredients sourced exclusively from local organic purveyors.',
        items: [
          { icon: '☕', title: 'Direct-Trade Sourcing', description: 'Beans roasted in-house weekly in collaboration with family-owned estates.' },
          { icon: '🥐', title: 'Slow Sourdough Baking', description: '48-hour natural fermentation using heritage ancient grains.' },
          { icon: '🌿', title: 'Zero Waste Kitchen', description: 'Closed-loop organic composting and eco-conscious packaging.' },
        ],
      },
      cta: {
        headline: 'Join us for brunch or afternoon coffee',
        subline: 'Open daily from 7:00 AM to 6:00 PM. Walk-ins warmly welcomed.',
        buttonText: 'Reserve Your Table Online',
      },
      footer: {
        copyright: '© 2026 Café Terroir Ltd.',
        columns: [
          { title: 'Visit Us', links: [{ label: '142 Grand Street, Brooklyn, NY', href: '#' }, { label: '(555) 349-9210', href: '#' }] },
        ],
      },
    },
  },

  // 4. Venture Hardware 3D
  {
    id: 'tpl-website-venture-hardware',
    name: 'Venture Hardware 3D',
    category: 'hardware',
    description: 'Spatial product showcase engineered for physical technology with interactive 3D pedestal, technical specs, and preorder tiers.',
    is3D: true,
    tokens: {
      colors: {
        background: '#0F172A',
        surface: '#1E293B',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        accent: '#38BDF8',
        accentHover: '#0284C7',
        border: 'rgba(56, 189, 248, 0.2)',
        cardBackground: 'rgba(30, 41, 59, 0.8)',
      },
      typography: {
        fontHeading: "'Space Grotesk', system-ui, sans-serif",
        fontBody: "'Inter', system-ui, sans-serif",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Aero Labs',
        links: [
          { label: 'Technology', href: '#features' },
          { label: 'Specifications', href: '#specs' },
          { label: 'Pre-order', href: '#pricing' },
        ],
        ctaLabel: 'Pre-Order Now',
      },
      hero: {
        badge: 'PRECISION HARDWARE ARCHITECTURE',
        headline: 'Next-generation spatial sensory computing.',
        tagline: 'Aerospace-grade titanium enclosure, dual Neural Coprocessors, and sub-millimeter biometric tracking.',
        primaryCta: 'Pre-order Edition 01',
        secondaryCta: 'View Full Specs',
      },
      features: {
        title: 'Engineered without compromise',
        subtitle: 'Breakthrough spatial sensors integrated into a monolithic milled chassis.',
        items: [
          { icon: '🔋', title: '48-Hour Battery', description: 'Solid-state battery cells engineered for continuous spatial telepresence.' },
          { icon: '🔬', title: 'Quantum Photonic Sensors', description: 'Captures 120 FPS high-dynamic range spatial depth point clouds.' },
          { icon: '🛡️', title: 'Titanium Grade 5', description: 'Lightweight milled chassis with diamond-like carbon scratch protection.' },
        ],
      },
      cta: {
        headline: 'Be among the first to experience Edition 01',
        subline: 'Limited initial production run of 1,000 serialized units.',
        buttonText: 'Secure Your Reservation',
      },
      footer: {
        copyright: '© 2026 Aero Labs Inc.',
        columns: [
          { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Press Kit', href: '#' }] },
        ],
      },
    },
  },
];

// Unified catalog export
export const ALL_COVE_TEMPLATES: TemplateDefinition[] = [
  ...DISTINCT_PORTFOLIO_TEMPLATES,
  ...DISTINCT_WEBSITE_TEMPLATES.map((w) => ({
    id: w.id,
    name: w.name,
    category: '3d' as any,
    description: w.description,
    heroVariant: 'centered' as any,
    fallbackHeroVariant: 'centered' as any,
    projectLayout: 'grid' as any,
    tokens: makeTokens('studio', w.tokens.colors, w.tokens.typography.fontHeading, w.tokens.typography.fontBody),
    interactionProfile: { customCursor: false, magneticButtons: true, cardTilt: false, scrollReveal: true },
    supportedSections: ['hero', 'features', 'pricing', 'testimonials', 'faq', 'cta'],
    sectionOrder: ['hero', 'features', 'pricing', 'testimonials', 'faq', 'cta'],
    version: '2.0.0',
    is3D: w.is3D,
    scene3DConfig: w.is3D
      ? {
          archetype: 'product-showcase-3d' as any,
          materialPreset: 'matte-studio' as any,
          cameraBehavior: 'orbit-drag' as any,
        }
      : undefined,
  })),
];
