# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Living Through Learning (LTL) Marketing Site** - A Next.js 15 marketing website for a South African educational non-profit organization with full Sanity CMS integration. Built as a monorepo with two workspaces:
- `frontend/` - Next.js 15 application with App Router
- `studio/` - Sanity Studio for content management

This is a comprehensive marketing site featuring e-commerce, interactive mapping, contact management, and a complete CMS-driven page builder system for Living Through Learning, a Cape Town-based NPO dedicated to foundation phase literacy education.

### About Living Through Learning
- **Founded**: 1990 (formalized as LTL in 2012) by Sonja Botha
- **Mission**: Provide training and interventions supporting educators and learners in South Africa, focusing on foundation phase literacy (ages 4-7)
- **Vision**: "Every child is a national asset and every child must be able to read with meaning"
- **Location**: 134 Main Rd, Diep River, Cape Town, 7800, South Africa
- **Methodology**: Gattegno's "Words in Colour" phonics-based approach
- **Impact**: 35+ years experience, curriculum used by 30,000+ learners, achieving up to 80% literacy rate improvements

### Key Programs
- **Coronation Reading Adventure Room (CRAR)**: Step-by-step English literacy curriculum in 17 schools, impacting 3,000+ learners and 105 educators annually
- **Educators Forum**: Validation and training to address common teaching challenges
- **ACSA Literacy Action Rooms**: Specialized learning environments in disadvantaged schools
- **Teachers in Training**: Professional development on discipline, behavioral management, and classroom strategies

## Project Status & Sprint Progression

**Current Status: Sprint 1-15 Complete (As of August 2025)**

The project has successfully completed 15 sprints following a structured development approach. All core functionality is implemented and functional, with only one critical technical debt item remaining.

### Completed Sprints Summary

**Phase I: Foundation (Sprints 1-4)**
- ✅ Sprint 1: Project setup, monorepo initialization, GitHub integration
- ✅ Sprint 2a: Technical discovery and code audit
- ✅ Sprint 2b: Content architecture and schema development
- ✅ Sprint 3: Visual strategy, wireframing, and design system
- ✅ Sprint 4: CMS content population and sample data

**Phase II: Core Development (Sprints 5-9)**
- ✅ Sprint 5: App shell and global components (Header/Footer)
- ✅ Sprint 6: Homepage with page builder sections
- ✅ Sprint 7: Dynamic program page templates
- ✅ Sprint 8: "Our Work" program index page
- ✅ Sprint 9: "About Us" page with team grid component

**Phase III: Feature Expansion (Sprints 10-12)**
- ✅ Sprint 10: E-shop UI (product gallery and detail pages)
- ✅ Sprint 11: "News & Stories" blog system
- ✅ Sprint 12: "Get Involved" and "Contact" pages with Brevo API

**Phase IV: Technical Resolution & Advanced Features (Sprints 13-15)**
- ✅ Sprint 13: Next.js 15 alignment and critical build fixes
- ✅ Sprint 14: Shopping cart functionality (PayFast integration blocked)
- ✅ Sprint 15: Impact Hub with interactive Leaflet mapping

### Critical Technical Debt

**PayFast Payment Integration**: 
- **Status**: Blocked by signature mismatch error
- **Impact**: E-commerce checkout non-functional
- **Resolution**: Requires PayFast developer support engagement
- **Location**: `/frontend/app/lib/payfast.ts` and `/frontend/app/actions.ts`

### Recent Build Fixes (September 2024)

**Vercel Deployment Build Failures Resolved**:
- **Status**: ✅ **RESOLVED** - All build errors fixed, deployment successful
- **Issues Fixed**:
  - **ESLint Errors**: 
    - Fixed unescaped apostrophes (`'` → `&apos;`) in HybridHomePage.tsx, ModernHomePage.tsx, HeroSection.tsx, SolutionSection.tsx
    - Replaced HTML `<a>` tags with Next.js `<Link>` components in contact/page.tsx and ImpactPageClient.tsx
  - **TypeScript Errors**:
    - Fixed hero section type errors with proper type assertions in home page components
    - Resolved Footer.tsx social media links filter method error with type casting
    - Fixed ImpactMap.tsx Leaflet integration errors (removed invalid `zoomControlOptions`, fixed `whenReady` callback)
    - Resolved SocialMediaIcon.tsx JSX namespace error with React import
- **Build Status**: ✅ Successfully compiles with 0 errors, all 19 static pages generated
- **Type Check**: ✅ All TypeScript errors resolved across frontend and studio workspaces

## Development Commands

Run all commands from the project root unless specified otherwise:

### Development
```bash
npm run dev                    # Start both frontend and studio in parallel
npm run dev:next              # Start only Next.js frontend (port 3000)
npm run dev:studio            # Start only Sanity Studio (port 3333)
```

### Building & Testing
```bash
npm run lint                  # Run ESLint on frontend
npm run type-check           # TypeScript check for all workspaces
npm run format              # Format code with Prettier
```

### Workspace-specific commands
```bash
# Frontend (from /frontend)
npm run build               # Build Next.js app
npm run typegen            # Generate Sanity types (runs before dev/build)
npm run dev                # Dev with Turbopack enabled

# Studio (from /studio)  
npm run build              # Build Sanity Studio
npm run deploy             # Deploy Studio to Sanity
npm run extract-types      # Extract schema types (runs before build)
```

### Sample Data
```bash
npm run import-sample-data  # Import sample dataset into Sanity
```

## Strategic Architecture

### Development Methodology
- **Approach**: "Content-first, platform-second" strategy prioritizing editorial workflow and user experience
- **Architecture**: Headless/decoupled CMS architecture for performance, security, and editorial flexibility
- **Framework**: Component-based design system enabling rapid iteration and consistent user experience
- **Analytics**: KPI-driven development with focus on user engagement, conversion rates, and educational impact metrics

### Target Audiences & User Personas
- **Primary**: School Principals and Educators (foundation phase literacy professionals)
- **Secondary**: Parents and Guardians (seeking literacy support for children ages 4-7)
- **Tertiary**: Education Researchers and Policymakers (literacy methodology advocates)
- **Quaternary**: Donors and Volunteers (supporters of educational NPOs)

## Architecture

### LTL Brand & Design System
- **Brand Colors**: LTL Deep Blue (`#0057B8`), Hopeful Yellow (`#FFC72C`), Light Slate (`#F0F4F8`), Charcoal (`#1D2939`)
- **Typography**: Poppins (headings), Noto Sans (body text) via Google Fonts
- **Component Library**: Custom components following LTL's educational design patterns

### Frontend Structure
- **Framework**: Next.js 15 App Router with TypeScript 5.9.2
- **Styling**: Tailwind CSS 4.x with custom LTL design tokens
- **State Management**: Zustand for client-side cart functionality with local storage persistence
- **CMS Integration**: next-sanity with Live Content API for real-time content updates
- **Maps**: Leaflet + react-leaflet for school partner impact visualization
- **Payments**: PayFast integration for South African e-commerce
- **Contact**: Brevo API integration for form submissions
- **Analytics**: Vercel Analytics and Speed Insights
- **Notifications**: Sonner for user feedback (cart, forms, etc.)

### CMS Schema (Sanity)
**Documents:**
- `page` - Dynamic pages with page builder
- `post` - News & stories content
- `person` - Team members and leadership
- `program` - Educational programs with metrics
- `product` - E-commerce products (physical/digital)
- `schoolPartner` - Partner schools with geocoordinates

**Singletons:**
- `settings` - Site-wide configuration (social links, etc.)

**Page Builder Sections:**
- `hero` - Landing page heroes with CTAs
- `challenge` - Problem statements
- `solution` - Solution presentations with icons
- `impact` - Metrics and impact data
- `story` - Testimonials and case studies
- `teamGrid` - Team member showcases
- `infoSection` - General content blocks
- `callToAction` - Action-driving sections

### Site Structure & Pages
```
/ (Home)              - Hero, Challenge, Solution, Impact, Stories
/about               - About Us with team grid
/programs            - Our Work listing + individual program pages
/get-involved        - Contact/involvement forms
/news                - News & Stories listing + individual posts
/shop                - E-commerce with cart functionality
/contact             - Contact form with Brevo integration
/impact              - Interactive map of school partnerships
```

### Key Features Implemented
1. **Educational Program Management**: Complete CRUD for programs with status tracking, metrics, and target audiences
2. **School Partnership Mapping**: Leaflet-based interactive map showing partner locations with custom icons
3. **E-commerce System**: Full shopping cart with PayFast payment integration (ZAR currency)
4. **Content Management**: Visual editing with Sanity Presentation Tool
5. **Contact Management**: Brevo API integration for lead capture
6. **Responsive Design**: Mobile-first approach with fixed header navigation

### File Organization
```
frontend/
├── app/                    # Next.js App Router
│   ├── components/        # React components
│   │   ├── sections/     # Page builder sections (Hero, Challenge, etc.)
│   │   ├── shop/         # E-commerce (ProductCard, Cart, CartIcon)
│   │   ├── impact/       # Map components (ImpactMap, MapLoader)
│   │   ├── program/      # Program-specific components
│   │   └── news/         # News & stories components
│   ├── store/            # Zustand stores (cart.ts)
│   ├── lib/              # Utilities (payfast.ts)
│   ├── actions.ts        # Server actions (Brevo integration)
│   └── [pages...]        # Route pages
├── sanity/               # Sanity integration
│   └── lib/              # Client, queries, utilities
└── public/images/        # Static brand assets

studio/
├── src/
│   ├── schemaTypes/      # Sanity schema definitions
│   │   ├── documents/    # Document types (page, post, program, etc.)
│   │   ├── objects/      # Page builder blocks & reusable objects
│   │   └── singletons/   # Site settings
│   └── structure/        # Studio organization
├── static/               # Studio assets (thumbnails, etc.)
└── sample-data.tar.gz   # Sample content for development
```

### Feature Completion Status

**✅ Fully Functional:**
- Homepage with modular page builder (Hero, Challenge, Solution, Impact, Stories sections)
- Dynamic program pages with detailed layouts and metrics
- "Our Work" program index with card-based listings
- "About Us" page with team member grid
- "News & Stories" blog system with filtering by category
- "Get Involved" and "Contact" pages with Brevo email integration
- E-shop product catalog with detailed product pages
- Shopping cart with local storage persistence and toast notifications
- Impact Hub with interactive Leaflet map showing school partnerships
- Responsive design with mobile navigation
- Real-time content updates via Sanity Live API
- Visual editing capabilities via Sanity Presentation Tool

**⚠️ Partially Functional:**
- E-commerce checkout flow (cart works, but payment processing blocked by PayFast signature issue)

**🚧 Technical Architecture Achievements:**
- Successfully aligned with Next.js 15 breaking changes (async params)
- Robust TypeScript implementation with Sanity type generation
- Client-side state management with Zustand
- Server-side form handling with Next.js Server Actions
- Custom page builder system with modular components
- Dynamic image optimization with Next.js Image component

### Environment Variables
Required environment variables (see .env.example files):
```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-28
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
SANITY_API_READ_TOKEN=your-read-token

# Brevo API (Contact Forms)
BREVO_API_KEY=your-brevo-key

# PayFast (E-commerce) 
PAYFAST_MERCHANT_ID=your-merchant-id
PAYFAST_MERCHANT_KEY=your-merchant-key
PAYFAST_PASSPHRASE=your-passphrase
```

### KPI Framework & Analytics
**Primary KPIs:**
- **User Engagement**: Page views, session duration, bounce rate by audience segment
- **Conversion Metrics**: Contact form submissions, newsletter sign-ups, donation clicks
- **E-commerce Performance**: Product page views, cart additions, checkout completions
- **Educational Impact**: Program inquiries, educator training requests, resource downloads

**Secondary KPIs:**
- **Content Performance**: Blog engagement, social media shares, video completion rates
- **Technical Metrics**: Page load speeds, mobile usability scores, accessibility compliance
- **Acquisition Channels**: Organic search, referral traffic, direct visits by user type

### Content Strategy Pillars
1. **Educational Authority**: Showcase 35+ years expertise and proven methodologies
2. **Impact Demonstration**: Highlight quantifiable outcomes and success stories
3. **Accessibility Focus**: Ensure content serves diverse literacy levels and technical capabilities
4. **Community Building**: Foster connections between educators, parents, and supporters
5. **Resource Provision**: Offer practical tools and materials for immediate implementation

### Development Notes
- **Ports**: Frontend (3000), Studio (3333)
- **TypeScript**: Strict configuration with auto-generated Sanity types
- **Images**: Configured for `cdn.sanity.io` and `placehold.co` domains
- **Styling**: Uses CSS custom properties for brand colors and font families
- **State Persistence**: Cart data persists in localStorage via Zustand
- **Client-Side Features**: Maps and cart require client components due to browser APIs
- **Visual Editing**: Full integration with Sanity's Presentation Tool for live editing
- **Methodology**: Implements Gattegno's "Words in Colour" phonics principles in digital interface design
- **Localization**: Optimized for South African context (ZAR currency, local payment methods, geographic references)