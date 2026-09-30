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

  // 5. Spatial Atelier Architecture 3D
  {
    id: 'tpl-website-architecture-spatial',
    name: 'Spatial Atelier 3D',
    category: 'agency',
    description: 'Immersive architecture studio showcase with 3D monolithic viewport, commission inquiries, and material studies.',
    is3D: true,
    tokens: {
      colors: {
        background: '#121214',
        surface: '#1A1A1E',
        textPrimary: '#FAFAFA',
        textSecondary: '#A3A3A3',
        accent: '#E2E8F0',
        accentHover: '#FFFFFF',
        border: 'rgba(255, 255, 255, 0.15)',
        cardBackground: '#18181B',
      },
      typography: {
        fontHeading: "'Space Grotesk', system-ui, sans-serif",
        fontBody: "'Inter', system-ui, sans-serif",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Spatial Atelier',
        links: [
          { label: 'Monographs', href: '#features' },
          { label: 'Philosophy', href: '#story' },
          { label: 'Contact', href: '#contact' },
        ],
        ctaLabel: 'Inquire',
      },
      hero: {
        badge: 'ARCHITECTURAL RESIDENCES & CULTURAL SPACES',
        headline: 'Form defined by light, void, and natural mass.',
        tagline: 'Designing enduring ecological sanctuaries harmonized with geographic contours.',
        primaryCta: 'View Selected Works',
        secondaryCta: 'Material Archive',
      },
      features: {
        title: 'Architectural Inquiries',
        subtitle: 'From private residential sanctuaries to regional cultural institutions.',
        items: [
          { icon: '🏛️', title: 'Thermal Mass Stone', description: 'Quarried volcanic basalt and local granite providing passive geothermal stability.' },
          { icon: '🌲', title: 'Mass Timber Structural Systems', description: 'Sustainably managed Nordic spruce engineered for seismic resilience.' },
          { icon: '☀️', title: 'Daylight Optimization', description: 'Computational solar orientation maximizing natural illuminance throughout the seasons.' },
        ],
      },
      cta: {
        headline: 'Commission a private architectural sanctuary',
        subline: 'Studio accepts five select commissions annually to ensure meticulous execution.',
        buttonText: 'Initiate Architectural Inquiry',
      },
      footer: {
        copyright: '© 2026 Spatial Atelier Architects. Stockholm / Zurich.',
        columns: [
          { title: 'Locations', links: [{ label: 'Stockholm: Birger Jarlsgatan 14', href: '#' }, { label: 'Zurich: Neugasse 29', href: '#' }] },
        ],
      },
    },
  },

  // 6. Creator Monograph
  {
    id: 'tpl-website-creator-collective',
    name: 'Creator Monograph',
    category: 'creator',
    description: 'Minimalist personal publication website for essayists, podcast hosts, and independent thinkers.',
    tokens: {
      colors: {
        background: '#FAF9F6',
        surface: '#F4F1EA',
        textPrimary: '#1C1917',
        textSecondary: '#78716C',
        accent: '#0284C7',
        accentHover: '#0369A1',
        border: 'rgba(28, 25, 23, 0.1)',
        cardBackground: '#FFFFFF',
      },
      typography: {
        fontHeading: "'Playfair Display', Georgia, serif",
        fontBody: "'Inter', system-ui, sans-serif",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Julian Vance',
        links: [
          { label: 'Essays', href: '#features' },
          { label: 'Books', href: '#pricing' },
          { label: 'Newsletter', href: '#faq' },
        ],
        ctaLabel: 'Subscribe',
      },
      hero: {
        badge: 'ESSAYS ON DESIGN, TECH & CULTURE',
        headline: 'Observations on tools that shape human cognition.',
        tagline: 'A weekly publication examining the unintended consequences of algorithmic systems and tactile interfaces.',
        primaryCta: 'Read Latest Essay',
        secondaryCta: 'Browse Archive',
      },
      features: {
        title: 'Featured Publications',
        subtitle: 'Essays read by over 120,000 engineers, designers, and founders.',
        items: [
          { icon: '📖', title: 'The Tactile Machine', description: 'Why sensory feedback is disappearing from personal computing and how to reclaim it.' },
          { icon: '⏳', title: 'Enduring Software', description: 'Designing software artifacts that remain legible and functional fifty years from now.' },
          { icon: '🌐', title: 'The Decentralized Scribe', description: 'Independent media economics in the era of generative intelligence.' },
        ],
      },
      cta: {
        headline: 'Join the Sunday dispatch',
        subline: 'Delivered directly to your inbox every Sunday morning. No ads or sponsored content.',
        buttonText: 'Subscribe for Free',
      },
      footer: {
        copyright: '© 2026 Julian Vance. All thoughts open-source.',
        columns: [
          { title: 'Index', links: [{ label: 'RSS Feed', href: '#' }, { label: 'Colophon', href: '#' }, { label: 'Twitter', href: '#' }] },
        ],
      },
    },
  },

  // 7. DevTools Cloud IDE
  {
    id: 'tpl-website-devtools-cloud',
    name: 'DevTools Cloud IDE',
    category: 'saas',
    description: 'High-performance developer platform landing page with terminal previews, API benchmarks, and SDK quickstarts.',
    tokens: {
      colors: {
        background: '#0B0F19',
        surface: '#111827',
        textPrimary: '#F9FAFB',
        textSecondary: '#9CA3AF',
        accent: '#10B981',
        accentHover: '#059669',
        border: 'rgba(16, 185, 129, 0.2)',
        cardBackground: '#1F2937',
      },
      typography: {
        fontHeading: "'Space Grotesk', system-ui, sans-serif",
        fontBody: "'JetBrains Mono', monospace",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Synthetix Dev',
        links: [
          { label: 'Documentation', href: '#features' },
          { label: 'CLI', href: '#specs' },
          { label: 'Pricing', href: '#pricing' },
        ],
        ctaLabel: 'npm install synthetix',
      },
      hero: {
        badge: 'v4.2 ENGINE RELEASED',
        headline: 'Zero-latency edge compilation for distributed teams.',
        tagline: 'Sub-millisecond hot module reload across distributed edge nodes with instant state replication.',
        primaryCta: 'Read the Docs',
        secondaryCta: 'View on GitHub',
      },
      features: {
        title: 'Engineered for Performance',
        subtitle: 'Everything required to deploy global infrastructure with a single keystroke.',
        items: [
          { icon: '⚡', title: 'Instant Cold Starts', description: 'Sub-5ms startup times via pre-warmed WebAssembly sandboxes.' },
          { icon: '🔒', title: 'Isolated Memory', description: 'Hardened kernel security boundaries preventing cross-tenant leakage.' },
          { icon: '📦', title: 'Deterministic Builds', description: 'Bit-for-bit reproducible container builds with automatic SHA verification.' },
        ],
      },
      cta: {
        headline: 'Build your first microservice in 60 seconds',
        subline: 'Get started free with $50 monthly cloud compute credits included.',
        buttonText: 'Start Deploying Now',
      },
      footer: {
        copyright: '© 2026 Synthetix Systems Inc.',
        columns: [
          { title: 'Resources', links: [{ label: 'GitHub', href: '#' }, { label: 'Discord', href: '#' }, { label: 'Status', href: '#' }] },
        ],
      },
    },
  },

  // 8. FinTech Ledger & Treasury
  {
    id: 'tpl-website-fintech-ledger',
    name: 'FinTech Ledger & Treasury',
    category: 'saas',
    description: 'Clean financial technology marketing page with currency matrices, compliance badges, and enterprise security tiers.',
    tokens: {
      colors: {
        background: '#040711',
        surface: '#0B132B',
        textPrimary: '#FFFFFF',
        textSecondary: '#8E9AAF',
        accent: '#3B82F6',
        accentHover: '#2563EB',
        border: 'rgba(59, 130, 246, 0.25)',
        cardBackground: 'rgba(11, 19, 43, 0.85)',
      },
      typography: {
        fontHeading: "'Space Grotesk', system-ui, sans-serif",
        fontBody: "'Inter', system-ui, sans-serif",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Aegis Treasury',
        links: [
          { label: 'Platform', href: '#features' },
          { label: 'Security', href: '#security' },
          { label: 'Enterprise', href: '#pricing' },
        ],
        ctaLabel: 'Open Treasury Account',
      },
      hero: {
        badge: 'SOC2 TYPE II • PCI-DSS LEVEL 1',
        headline: 'Global liquidity infrastructure for modern digital enterprises.',
        tagline: 'Automate multi-currency treasury operations, programmable yield, and real-time cross-border settlements.',
        primaryCta: 'Open Enterprise Account',
        secondaryCta: 'Explore API Docs',
      },
      features: {
        title: 'Institutional Grade Security',
        subtitle: 'Trusted by over 400 financial institutions handling $12B+ in annual volume.',
        items: [
          { icon: '🏦', title: 'Multi-Bank Redundancy', description: 'Automated sweep networks spreading capital across top-tier clearing banks.' },
          { icon: '🛡️', title: 'Hardware Security Modules', description: 'Private keys generated and held in dedicated FIPS 140-2 Level 3 HSM enclaves.' },
          { icon: '📈', title: 'Automated Cash Yield', description: 'Dynamic algorithmic allocation maximizing returns on unencumbered operating capital.' },
        ],
      },
      cta: {
        headline: 'Transform your company treasury today',
        subline: 'Dedicated onboarding specialist assigned to every enterprise account within 24 hours.',
        buttonText: 'Schedule Executive Briefing',
      },
      footer: {
        copyright: '© 2026 Aegis Global Financial Corp.',
        columns: [
          { title: 'Governance', links: [{ label: 'Regulatory Filings', href: '#' }, { label: 'Disclosures', href: '#' }, { label: 'Security Whitepaper', href: '#' }] },
        ],
      },
    },
  },

  // 9. HealthTech Biomimetic AI
  {
    id: 'tpl-website-healthtech-bio',
    name: 'HealthTech Biomimetic AI',
    category: 'saas',
    description: 'Clean medical and bioinformatics web presence with clinical trial metrics, molecular visualizations, and patient data compliance.',
    tokens: {
      colors: {
        background: '#FFFFFF',
        surface: '#F8FAFC',
        textPrimary: '#0F172A',
        textSecondary: '#475569',
        accent: '#0EA5E9',
        accentHover: '#0284C7',
        border: 'rgba(14, 165, 233, 0.2)',
        cardBackground: '#FFFFFF',
      },
      typography: {
        fontHeading: "'Plus Jakarta Sans', system-ui, sans-serif",
        fontBody: "'Inter', system-ui, sans-serif",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Helix Therapeutics',
        links: [
          { label: 'Pipeline', href: '#features' },
          { label: 'Science', href: '#specs' },
          { label: 'Trials', href: '#trials' },
        ],
        ctaLabel: 'Partner with Us',
      },
      hero: {
        badge: 'CLINICAL PHASE II VALIDATED',
        headline: 'Generative protein design for targeted oncology therapies.',
        tagline: 'Synthesizing precision molecular binders in hours instead of years using proprietary deep biophysical models.',
        primaryCta: 'Review Pipeline Data',
        secondaryCta: 'Scientific Publications',
      },
      features: {
        title: 'Computational Biology Engine',
        subtitle: 'Transforming drug discovery through atomic-resolution generative simulation.',
        items: [
          { icon: '🧬', title: 'Atomic Accuracy', description: 'Sub-angstrom resolution predictions validated across 10,000+ laboratory assays.' },
          { icon: '🔬', title: 'Targeted Specificity', description: 'Zero off-target binding observed in in-vitro preclinical cellular models.' },
          { icon: '⏱️', title: '10x Faster Iteration', description: 'Compressing hit-to-lead validation cycles from 18 months down to 6 weeks.' },
        ],
      },
      cta: {
        headline: 'Accelerate your therapeutic pipeline',
        subline: 'Partnering with global biopharma leaders to unlock previously undruggable targets.',
        buttonText: 'Contact Corporate Development',
      },
      footer: {
        copyright: '© 2026 Helix Therapeutics Inc. Cambridge, MA.',
        columns: [
          { title: 'Science', links: [{ label: 'Peer-Reviewed Papers', href: '#' }, { label: 'Advisory Board', href: '#' }, { label: 'Clinical Protocols', href: '#' }] },
        ],
      },
    },
  },

  // 10. CyberSec Threat Mesh
  {
    id: 'tpl-website-cybersec-mesh',
    name: 'CyberSec Threat Mesh',
    category: 'saas',
    description: 'Technical cybersecurity operations platform with real-time threat feed, zero-trust matrices, and SOC compliance frameworks.',
    tokens: {
      colors: {
        background: '#05070E',
        surface: '#0C1222',
        textPrimary: '#F1F5F9',
        textSecondary: '#94A3B8',
        accent: '#EF4444',
        accentHover: '#DC2626',
        border: 'rgba(239, 68, 68, 0.25)',
        cardBackground: '#0F172A',
      },
      typography: {
        fontHeading: "'Space Grotesk', system-ui, sans-serif",
        fontBody: "'JetBrains Mono', monospace",
      },
    },
    defaultContent: {
      navbar: {
        brandName: 'Vanguard Cyber',
        links: [
          { label: 'Threat Intel', href: '#features' },
          { label: 'Zero Trust', href: '#specs' },
          { label: 'SOC Platform', href: '#pricing' },
        ],
        ctaLabel: 'Scan My Domain',
      },
      hero: {
        badge: 'REAL-TIME HEURISTIC DEFENSE',
        headline: 'Autonomous threat neutralisation at the packet boundary.',
        tagline: 'Vanguard monitors enterprise surfaces against zero-day exploits with microsecond kernel enforcement.',
        primaryCta: 'Run Instant Threat Audit',
        secondaryCta: 'Live Threat Feed',
      },
      features: {
        title: 'Zero Trust Architecture',
        subtitle: 'Continuous behavioral verification for global hybrid enterprise workforces.',
        items: [
          { icon: '🛡️', title: 'Kernel-Level Isolation', description: 'Sandboxing untrusted binaries before execution reach user memory.' },
          { icon: '📡', title: 'Distributed Honeypots', description: 'Early warning signals intercepting botnets across 80 worldwide vantage points.' },
          { icon: '⚡', title: 'Autonomous Remediation', description: 'Instant network segmentation neutralizing lateral movement in under 50ms.' },
        ],
      },
      cta: {
        headline: 'Secure your perimeter before the next breach',
        subline: 'Enterprise deployment takes less than 30 minutes with zero downtime.',
        buttonText: 'Request Security Assessment',
      },
      footer: {
        copyright: '© 2026 Vanguard Cyber Technologies.',
        columns: [
          { title: 'Intel', links: [{ label: 'CVE Tracker', href: '#' }, { label: 'Incident Response', href: '#' }, { label: 'Bug Bounty', href: '#' }] },
        ],
      },
    },
  },
];

// Helper to generate additional specialized website archetypes up to 50
const SPECIALIZED_ARCHETYPES = [
  { id: 'vineyard-estate', name: 'Vineyard & Wine Estate', cat: 'hospitality', bg: '#1C1917', surf: '#292524', acc: '#B45309', serif: true },
  { id: 'type-foundry', name: 'Minimalist Type Foundry', cat: 'agency', bg: '#FFFFFF', surf: '#F5F5F5', acc: '#000000', serif: false },
  { id: 'brutalist-concrete', name: 'Brutalist Concrete Studio', cat: 'agency', bg: '#171717', surf: '#262626', acc: '#737373', serif: false },
  { id: 'robotics-fleet', name: 'Autonomous Robotics Fleet', cat: 'hardware', bg: '#090D16', surf: '#10172A', acc: '#06B6D4', serif: false },
  { id: 'ai-summit', name: 'AI World Summit 2026', cat: 'event', bg: '#0A051B', surf: '#170E38', acc: '#8B5CF6', serif: false },
  { id: 'sound-motion', name: 'Sound & Motion Studio', cat: 'agency', bg: '#080808', surf: '#141414', acc: '#F59E0B', serif: false },
  { id: 'matcha-sanctuary', name: 'Matcha Sanctuary', cat: 'hospitality', bg: '#F4F7F4', surf: '#E5EDE5', acc: '#15803D', serif: true },
  { id: 'timber-works', name: 'Scandinavian Timber Works', cat: 'agency', bg: '#FDFBF7', surf: '#F5F0E6', acc: '#A16207', serif: false },
  { id: 'chronograph-horology', name: 'Luxury Chronograph Horology', cat: 'hardware', bg: '#0B0B0C', surf: '#161618', acc: '#EAB308', serif: true },
  { id: 'tech-journalist', name: 'Independent Tech Journalist', cat: 'creator', bg: '#FCFCFC', surf: '#F3F4F6', acc: '#2563EB', serif: true },
  { id: 'neuroflow-mind', name: 'NeuroFlow Workspace', cat: 'saas', bg: '#0E131F', surf: '#1A233A', acc: '#6366F1', serif: false },
  { id: 'climate-energy', name: 'Global Climate & Energy Forum', cat: 'event', bg: '#041F1E', surf: '#083332', acc: '#14B8A6', serif: false },
  { id: 'mediterranean-villa', name: 'Mediterranean Seaside Villa', cat: 'hospitality', bg: '#FBF9F5', surf: '#F4EFEA', acc: '#0284C7', serif: true },
  { id: 'acoustic-audio', name: 'Ergonomic Acoustic Audio', cat: 'hardware', bg: '#111113', surf: '#1C1C20', acc: '#FB7185', serif: false },
  { id: 'botanical-dining', name: 'Botanical Plant-Based Dining', cat: 'hospitality', bg: '#F6F9F4', surf: '#E8F0E4', acc: '#166534', serif: true },
  { id: 'brand-strategy', name: 'Hyperlink Strategy Collective', cat: 'agency', bg: '#000000', surf: '#121212', acc: '#FF6B4A', serif: false },
  { id: 'logistics-edge', name: 'Logistics Edge Network', cat: 'saas', bg: '#0A0F1D', surf: '#131D36', acc: '#38BDF8', serif: false },
  { id: 'masterclass-academy', name: 'Masterclass Creative Academy', cat: 'creator', bg: '#100E17', surf: '#1D1A2B', acc: '#A855F7', serif: false },
  { id: 'ceramic-atelier', name: 'Ceramic & Clay Atelier', cat: 'creator', bg: '#F8F6F2', surf: '#EEEAE0', acc: '#C2410C', serif: true },
  { id: 'electric-hypercar', name: 'Electric Mobility Hypercar', cat: 'hardware', bg: '#050505', surf: '#111111', acc: '#00F0FF', serif: false },
  { id: 'design-biennale', name: 'Design Biennale Milano', cat: 'event', bg: '#FFFFFF', surf: '#F0F0F0', acc: '#FF0055', serif: false },
  { id: 'sourdough-bakery', name: 'Heritage Sourdough Bakery', cat: 'hospitality', bg: '#FAF6ED', surf: '#F0E8D5', acc: '#B45309', serif: true },
  { id: 'penthouse-residences', name: 'Penthouse Sky Residences', cat: 'hospitality', bg: '#0F1015', surf: '#1C1E26', acc: '#D4AF37', serif: true },
  { id: 'camera-optics', name: 'Precision Camera Optics', cat: 'hardware', bg: '#0A0A0B', surf: '#141416', acc: '#3B82F6', serif: false },
  { id: 'deepwork-podcast', name: 'Deep Work Podcast & Radio', cat: 'creator', bg: '#0F0E17', surf: '#1A1826', acc: '#F97316', serif: false },
  { id: 'api-gateway', name: 'Cloud API Gateway & Mesh', cat: 'saas', bg: '#060B14', surf: '#0D1628', acc: '#22C55E', serif: false },
  { id: 'alpine-chalet', name: 'Boutique Alpine Ski Chalet', cat: 'hospitality', bg: '#1B1C22', surf: '#262832', acc: '#38BDF8', serif: true },
  { id: 'fashion-monograph', name: 'Avant-Garde Fashion Monograph', cat: 'creator', bg: '#000000', surf: '#0D0D0D', acc: '#E2E8F0', serif: true },
  { id: 'modular-living', name: 'Modular Living Units', cat: 'agency', bg: '#F7F7F7', surf: '#ECECEC', acc: '#059669', serif: false },
  { id: 'smart-energy', name: 'Solid-State Smart Energy', cat: 'hardware', bg: '#071013', surf: '#0E1F26', acc: '#10B981', serif: false },
  { id: 'music-festival', name: 'Electronic Music Festival', cat: 'event', bg: '#080014', surf: '#140033', acc: '#EC4899', serif: false },
  { id: 'farm-gastronomy', name: 'Farm-to-Table Gastronomy', cat: 'hospitality', bg: '#F9F8F3', surf: '#ECE8DB', acc: '#65A30D', serif: true },
  { id: 'minimal-furniture', name: 'Minimal Furniture Workshop', cat: 'agency', bg: '#FAFAF8', surf: '#F2F2EC', acc: '#854D0E', serif: false },
  { id: 'director-reel', name: 'Cinema & Director Portfolio', cat: 'creator', bg: '#080808', surf: '#121212', acc: '#E11D48', serif: false },
  { id: 'data-mesh', name: 'Data Mesh Analytics', cat: 'saas', bg: '#040914', surf: '#0B1630', acc: '#60A5FA', serif: false },
  { id: 'cocktail-lab', name: 'Speakeasy Cocktail Laboratory', cat: 'hospitality', bg: '#0B0907', surf: '#181410', acc: '#F59E0B', serif: true },
  { id: 'landscape-urban', name: 'Landscape Urbanism Office', cat: 'agency', bg: '#F5F8F6', surf: '#E4EDE7', acc: '#047857', serif: false },
  { id: 'biowearable-ring', name: 'Bio-Wearable Health Ring', cat: 'hardware', bg: '#080C14', surf: '#111929', acc: '#06B6D4', serif: false },
  { id: 'literary-press', name: 'Independent Literary Press', cat: 'creator', bg: '#FAF7F0', surf: '#EDE7D8', acc: '#78350F', serif: true },
  { id: 'quantum-compute', name: 'Quantum Compute Framework', cat: 'saas', bg: '#02030A', surf: '#080C21', acc: '#818CF8', serif: false },
];

SPECIALIZED_ARCHETYPES.forEach((spec, idx) => {
  const fullId = `tpl-website-${spec.id}`;
  const fontHeading = spec.serif ? "'Playfair Display', Georgia, serif" : "'Space Grotesk', system-ui, sans-serif";
  const fontBody = spec.serif ? "'Newsreader', Georgia, serif" : "'Inter', system-ui, sans-serif";

  DISTINCT_WEBSITE_TEMPLATES.push({
    id: fullId,
    name: spec.name,
    category: spec.cat as any,
    description: `Distinct ${spec.name} web design with custom palette, typography, responsive grid, and live publishing.`,
    is3D: idx % 3 === 0,
    tokens: {
      colors: {
        background: spec.bg,
        surface: spec.surf,
        textPrimary: spec.bg.startsWith('#F') ? '#18181B' : '#F4F4F6',
        textSecondary: spec.bg.startsWith('#F') ? '#71717A' : '#A1A1AA',
        accent: spec.acc,
        accentHover: spec.acc,
        border: spec.bg.startsWith('#F') ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.12)',
        cardBackground: spec.surf,
      },
      typography: {
        fontHeading,
        fontBody,
      },
    },
    defaultContent: {
      navbar: {
        brandName: spec.name.split(' ')[0],
        links: [
          { label: 'Overview', href: '#features' },
          { label: 'Offerings', href: '#pricing' },
          { label: 'Contact', href: '#contact' },
        ],
        ctaLabel: 'Learn More',
      },
      hero: {
        badge: `${spec.name.toUpperCase()} • EDITION 2026`,
        headline: `Crafted for excellence in ${spec.name.toLowerCase()}.`,
        tagline: 'Delivering exceptional precision, tactile materiality, and enduring digital engagement.',
        primaryCta: 'Explore Collection',
        secondaryCta: 'Inquire Online',
      },
      features: {
        title: 'Core Competencies',
        subtitle: 'Uncompromising attention to detail across every dimension.',
        items: [
          { icon: '✦', title: 'Precision Engineering', description: 'Meticulously crafted components built for durability and elegance.' },
          { icon: '🌿', title: 'Sustainable Stewardship', description: 'Mindful sourcing, ethical labor, and ecological environmental harmony.' },
          { icon: '⚡', title: 'Seamless Execution', description: 'Flawless responsive performance designed to delight users across devices.' },
        ],
      },
      pricing: {
        title: 'Tiers & Commissioning',
        subtitle: 'Transparent investment levels tailored to your scale.',
        tiers: [
          {
            name: 'Essential',
            price: '$199',
            period: '/project',
            description: 'Foundational delivery for focused engagements.',
            features: ['Complete Design System', 'Responsive Build', 'One-Click Publish', 'Full Source Code'],
            cta: 'Select Essential',
          },
          {
            name: 'Signature',
            price: '$499',
            period: '/project',
            description: 'Our most sought-after tier with full bespoke customization.',
            highlighted: true,
            features: ['Bespoke 3D Interactive Model', 'Multi-Language Support', 'Custom Domain Setup', 'Priority VIP Care'],
            cta: 'Select Signature',
          },
        ],
      },
      cta: {
        headline: `Ready to elevate your ${spec.name.toLowerCase()} presence?`,
        subline: 'Get started today on Cove with immediate live edge deployment.',
        buttonText: 'Start Building Now',
      },
      footer: {
        copyright: `© 2026 ${spec.name}. All rights reserved.`,
        columns: [
          { title: 'Navigation', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Contact', href: '#' }] },
        ],
      },
    },
  });
});
