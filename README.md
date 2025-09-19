# Living Through Learning (LTL) Marketing Site

A comprehensive Next.js 15 marketing website for Living Through Learning, an educational non-profit organization focused on literacy development and school partnerships in South Africa.

## 🚀 Project Overview

Built as a modern monorepo with Next.js 15 and Sanity CMS, this website serves as the primary digital presence for LTL, showcasing their educational programs, impact stories, team, and providing e-commerce capabilities for educational resources.

### Key Features

- **📊 Interactive Impact Hub**: Leaflet-powered map showing school partnerships and geographic reach
- **🛒 E-Commerce Platform**: Complete product catalog with shopping cart functionality
- **📰 Content Management**: Dynamic news, stories, and blog system with category filtering
- **👥 Team Showcase**: Comprehensive about section with team member profiles
- **📚 Program Directory**: Detailed program pages with metrics and impact data
- **📞 Contact Integration**: Brevo API-powered contact forms and engagement tools
- **🎨 Page Builder**: Modular content system with drag-and-drop editing capabilities
- **📱 Responsive Design**: Mobile-first approach with optimized performance

## 🏗️ Technical Architecture

**Frontend Stack:**

- Next.js 15 with App Router
- TypeScript with strict configuration
- Tailwind CSS 4.x with custom design tokens
- Zustand for client-side state management
- Leaflet + React-Leaflet for interactive mapping

**Backend & CMS:**

- Sanity.io with Live Content API
- Real-time visual editing capabilities
- Custom content schemas for educational content
- Structured page builder system

**Integrations:**

- Brevo API for email marketing and contact management
- PayFast payment gateway (South African e-commerce)
- Vercel Analytics and Speed Insights
- Google Fonts (Poppins + Noto Sans)

## 🎯 Project Status

**Development Phase**: Sprints 1-15 Complete ✅

- All core functionality implemented
- Production-ready build system
- 98% feature completion

**Current Status**: Production-ready with one technical debt item

- ⚠️ PayFast payment integration blocked by signature validation issue
- ✅ All other systems fully functional

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity CLI (`npm install -g @sanity/cli`)

### Development Setup

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd ltl-marketing-site
   npm install
   ```

2. **Environment Configuration**

   Copy the example environment files and configure:

   ```bash
   cp frontend/.env.example frontend/.env.local
   cp studio/.env.example studio/.env
   ```

   Required environment variables:

   ```bash
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-10-28
   SANITY_API_READ_TOKEN=your-read-token

   # Brevo API (Contact Forms)
   BREVO_API_KEY=your-brevo-key

   # PayFast (E-commerce)
   PAYFAST_MERCHANT_ID=your-merchant-id
   PAYFAST_MERCHANT_KEY=your-merchant-key
   PAYFAST_PASSPHRASE=your-passphrase
   ```

3. **Start Development Servers**

   ```bash
   npm run dev
   ```

   This runs both:
   - Frontend: <http://localhost:3000>
   - Sanity Studio: <http://localhost:3333>

### Content Management

1. **Import Sample Data** (Optional)

   ```bash
   npm run import-sample-data
   ```

2. **Access Sanity Studio**
   - Navigate to <http://localhost:3333>
   - Sign in with your Sanity account
   - Start creating content using the predefined schemas

## 📦 Available Commands

### Development

```bash
npm run dev              # Start both frontend and studio
npm run dev:next         # Frontend only (port 3000)
npm run dev:studio       # Studio only (port 3333)
```

### Building & Testing

```bash
npm run build            # Build for production
npm run lint             # ESLint frontend code
npm run type-check       # TypeScript validation
npm run format           # Prettier code formatting
```

### Content Management

```bash
npm run import-sample-data    # Import sample content
npm run typegen              # Generate TypeScript types from Sanity schemas
```

## 🏢 Site Structure

- **Homepage**: Hero, challenge, solution, impact, and stories sections
- **/about**: Team information and organizational overview
- **/programs**: Educational program catalog and individual program pages
- **/news**: News, blog posts, and newsletters with category filtering
- **/shop**: E-commerce catalog with product detail pages and shopping cart
- **/get-involved**: Volunteer and engagement opportunities
- **/contact**: Contact forms with Brevo integration
- **/impact**: Interactive map showing school partnerships and impact

## 🔧 Content Schemas

**Documents:**

- `page` - Dynamic pages with page builder
- `post` - News, blog posts, newsletters with categories
- `person` - Team members and authors
- `program` - Educational programs with metrics
- `product` - E-commerce items (digital/physical)
- `schoolPartner` - Partner schools with coordinates

**Page Builder Components:**

- Hero sections with CTAs
- Challenge statements
- Solution presentations
- Impact metrics displays
- Story testimonials
- Team member grids
- Info sections and call-to-actions

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Import project to Vercel from GitHub
   - Set build command: `npm run build`
   - Set output directory: `frontend/.next`

2. **Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Ensure production values for APIs and services

3. **Deploy Sanity Studio**

   ```bash
   cd studio
   npx sanity deploy
   ```

## 🛠️ Technical Debt & Known Issues

**PayFast Integration**:

- Payment processing blocked by signature mismatch error
- Shopping cart fully functional, checkout requires resolution
- Resolution: Requires PayFast developer support engagement

## 🎨 Design System

**Brand Colors:**

- LTL Deep Blue: `#0057B8`
- Hopeful Yellow: `#FFC72C`
- Light Slate: `#F0F4F8`
- Charcoal: `#1D2939`

**Typography:**

- Headings: Poppins
- Body: Noto Sans

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🤝 Contributing

This project follows a sprint-based development approach. See `CLAUDE.md` for detailed development context and architectural decisions.

## 📄 License

Private project for Living Through Learning organization.