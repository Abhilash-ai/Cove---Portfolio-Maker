# Cove — AI Portfolio Maker

<div align="center">

![Cove Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80)

**An intelligent, design-first portfolio maker for architects, designers, engineers, and creative technologists.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.20-black.svg?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18.4-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748.svg?logo=prisma)](https://www.prisma.io/)
[![Claude AI](https://img.shields.io/badge/Claude-3.5_Sonnet-D97706.svg)](https://anthropic.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[Features](#key-features) • [Architecture](#architecture) • [Getting Started](#getting-started) • [Automated Test Suite](#automated-test-suite) • [Templates Catalog](#template-archetypes-library)

</div>

---

## Overview

**Cove** is a modern, full-stack portfolio maker engineered to turn raw project archives and resumes into publication-ready, design-driven portfolios. Built around an invariant of **zero data loss**, Cove decouples user content from visual presentation, allowing creators to seamlessly switch between hundreds of archetypal templates without rewriting or corrupting their case studies.

---

## Key Features

### 🎨 Combinatorial Template Library (219+ Interactive Archetypes)
- **12 Aesthetic Presets**: Minimal, Editorial, Studio, Brutalist, Swiss, Cinematic, Monochrome, Dark Technical, Magazine, Academic, Luxury, and Playful.
- **Micro-Interaction Profiles**: Scroll reveal, magnetic buttons, 3D card tilt, and interactive cursor physics.
- **Strict Invariant**: Swapping templates instantly preserves 100% of user data, case study outcomes, media assets, and profile details without duplication or layout corruption.

### 🧠 Cove Copilot & AI Writing Assistant
- **Writing Refinement**: Inline AI transformations (`make_professional`, `make_shorter`, `suggest_title`).
- **Deep Case Study Architect**: Converts brief notes into structured case studies featuring *Problem*, *Approach*, *Solution*, and *Quantitative Outcome*.
- **Media Curation Advisor**: Recommends optimal image and render placements based on project typography and narrative pacing.
- **Instant Rollback**: Full undo/accept state cycle.

### 🎯 AI Portfolio Critic
- **Automated Holistic Evaluation**: Analyzes published or draft portfolios across 5 critical dimensions:
  1. *Completeness* (bio, avatar, contact links)
  2. *Storytelling* (quantifiable outcomes, problem statements)
  3. *Visual Hierarchy* (cover presence, media variety)
  4. *Mobile Pacing* (project density, readability)
  5. *Contact Friction* (frictionless inquiries, verified socials)
- **Actionable Guidance**: Non-destructive, severity-ranked (`high`, `medium`, `low`) improvement items with "Go to section" shortcuts.

### 📄 Resume Parser & Smart Populator
- **Intelligent PDF/Text Ingestion**: Extracts roles, duration, biographical summaries, and contact links.
- **Skill Taxonomy Normalization**: Standardizes skills against an industry taxonomy across Engineering, Design, Architecture, and Research.
- **Atomic Merge**: Non-destructive sync with manual review before committing to database.

### 🌐 Publishing Engine & Privacy-Preserving Analytics
- **Custom Vanity Slugs**: Real-time availability checking with reserved word protection.
- **Instant Unauthenticated Viewing**: High-speed, responsive public portfolio pages at `/p/:slug`.
- **Zero-Cookie Analytics**: Privacy-first telemetry tracking unique visitors, device categories (Desktop, Mobile, Tablet), referral sources, and project click interactions.

### ⚙️ Admin Governance & GDPR Privacy
- **Platform Telemetry**: Aggregated system metrics (user growth, portfolio adoption, publication rates, active template distribution).
- **Role-Based Access Control**: Strict `requireAdmin` middleware separating `USER` and `ADMIN` capabilities.
- **GDPR Data Portability**: Single-click complete machine-readable JSON data export (`GET /api/v1/user/export`).
- **GDPR Account Purge**: Permanent cascading account deletion removing all records, portfolios, and uploaded assets.

---

## Architecture

Cove is structured as a TypeScript monorepo with strict separation of concerns:

```
cove/
├── packages/
│   └── shared/                 # Shared TypeScript models, DTOs, design tokens, template types
├── apps/
│   ├── server/                 # Express REST API
│   │   ├── prisma/             # PostgreSQL schema & migrations
│   │   ├── src/
│   │   │   ├── modules/        # auth, portfolio, project, profile, media, resume, public, ai, templates, admin, user
│   │   │   ├── services/       # AI Copilot, Portfolio Critic, Template Recommender, Storage Abstraction
│   │   │   ├── middleware/     # JWT authentication, role guards
│   │   │   └── scripts/        # 10 comprehensive phase test suites
│   │   └── uploads/            # Disk storage for local media assets
│   └── web/                    # React 18 + Vite SPA
│       └── src/
│           ├── components/     # PortfolioManager, ProjectManager, EmptyState, AdminModal, SettingsModal
│           ├── editor/         # VisualEditor, EditorTopBar, CustomizerCanvas
│           ├── templates/      # Template catalog, discovery modal, dynamic design presets
│           └── pages/          # Public portfolio viewer & analytics dashboards
```

### Data Model Flow

```mermaid
erDiagram
    User ||--o{ Portfolio : owns
    User ||--o{ Project : authors
    User ||--o| Profile : has
    Portfolio ||--o{ Project : showcases
    Project ||--o{ ProjectMedia : contains
    User ||--o{ Asset : uploads
    Portfolio }|--|| Template : implements
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later
- **PostgreSQL**: Native PostgreSQL instance running on port `5433` (or configured in `.env`)
- **npm** or **pnpm**

### Installation

1. **Clone Repository**:
   ```bash
   git clone https://github.com/Abhilash-ai/Cove---Portfolio-Maker.git
   cd Cove---Portfolio-Maker
   ```

2. **Install Monorepo Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create `apps/server/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:password@127.0.0.1:5433/cove"
   JWT_SECRET="cove-super-secret-jwt-key-for-development-382910"
   PORT=4000
   ANTHROPIC_API_KEY="" # Optional: Claude 3.5 Sonnet key (heuristic engine active by default)
   ```

4. **Initialize Database Schema**:
   ```bash
   npm run prisma:generate
   npm run db:push
   ```

5. **Start Development Environment**:
   ```bash
   # Starts Express backend (http://localhost:4000)
   npm run dev

   # In a separate terminal, start Vite frontend (http://localhost:5173)
   npm run dev:web
   ```

---

## Automated Test Suite

Cove features 10 automated test suites covering every phase from authentication to final QA:

| Suite | Command | What It Tests |
|---|---|---|
| **Phase 1: Auth & Ownership** | `npm run test:auth` | Registration, bcrypt hashing, JWT validation, multi-tenant isolation |
| **Phase 2: Content Engine** | `npm run test:crud` | 16-field project schema, portfolio CRUD, S3/disk media upload abstraction |
| **Phase 4: Visual Editor** | `npm run test:editor` | Custom tokens, active template assignment, realtime layout persistence |
| **Phase 5: Resume Parser** | `npm run test:resume` | Text/PDF ingestion, taxonomy skill matching, atomic profile merge |
| **Phase 6: Publishing & Analytics**| `npm run test:public` | Vanity slug reservation, unauthenticated viewer, privacy telemetry |
| **Phase 7: Copilot & PDF Export** | `npm run test:copilot` | Tone refactoring, case study generation, zero-data-loss switch invariant |
| **Phase 8: AI Recommender** | `npm run test:recommender`| Multi-dimensional catalog filters, archetype scoring, bookmarking |
| **Phase 9: 200+ Template Scale** | `npm run test:scale` | 219 archetype generator, 12 presets, interaction profiles |
| **Phase 10: Portfolio Critic** | `npm run test:critic` | 5-dimension grading, actionable feedback, cross-tenant security |
| **Phase 11: Admin & Final QA** | `npm run test:final-qa` | Admin telemetry, role promotion, password rotation, GDPR purge |

To run the entire test suite:
```bash
npm run test:auth && npm run test:crud && npm run test:editor && npm run test:resume && npm run test:public && npm run test:copilot && npm run test:recommender && npm run test:scale && npm run test:critic && npm run test:final-qa
```

---

## Template Archetypes Library

| Style Preset | Archetypes Available | Aesthetic Attributes | Best Suited For |
|---|---|---|---|
| **Minimal** | 19 variants | Generous whitespace, mono accents, high legibility | Software engineers, writers |
| **Editorial** | 19 variants | Serif display, asymmetric editorial grids, drop caps | Researchers, journalists, art directors |
| **Studio** | 19 variants | Dark slate, cinematic imagery, high visual density | Architects, 3D artists, game developers |
| **Brutalist** | 18 variants | Monospace typography, raw borders, high contrast | Creative technologists, web3 developers |
| **Swiss** | 18 variants | Strict modular grids, bold sans-serif, mathematical order | Graphic designers, design systems leads |
| **Cinematic** | 18 variants | Fullscreen imagery, atmospheric dark palettes, letterbox framing | Videographers, motion designers |
| **Monochrome** | 18 variants | Pure black-and-white, halftone effects, high contrast | Photographers, printmakers |
| **Dark Technical** | 18 variants | Terminal accents, glowing meters, blueprint wireframes | DevOps, cybersecurity, backend specialists |
| **Magazine** | 18 variants | Multi-column layouts, editorial callouts, pull quotes | Fashion designers, creative strategists |
| **Academic** | 18 variants | Formal typography, citation formatting, archival styling | Professors, PhD candidates, scientists |
| **Luxury** | 18 variants | Warm metallics, muted neutrals, generous margins | Luxury brands, interior architects |
| **Playful** | 18 variants | Vibrant palettes, rounded geometry, interactive micro-animations | Illustrators, game artists, product builders |

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
Built with precision for <strong>Cove</strong> • Google DeepMind Advanced Agentic Coding
</div>
