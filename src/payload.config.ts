// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

// Original Collections
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'

// New LTL-Specific Collections
import { TeamMembers } from './collections/TeamMembers'
import { Programs } from './collections/Programs'
import { ProjectSites } from './collections/ProjectSites'

// Globals
import { Footer } from './Footer/config'
import { Header } from './Header/config'

import { plugins } from './plugins'
import { defaultLexical } from './fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // This is the new line that tells Payload its internal URL
  serverURL: process.env.PAYLOAD_INTERNAL_URL || process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    //importMap: {
    //  baseDir: path.resolve(dirname),
    //},
    //user: Users.slug,
    livePreview: {
      url: ({ data, collectionConfig, locale }) => {
        const { slug } = collectionConfig
        const { slug: docSlug } = data
        if (slug && docSlug) {
          const path = slug === 'pages' ? `/${docSlug}` : `/${slug}/${docSlug}`
          return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
        }
        return process.env.NEXT_PUBLIC_SERVER_URL
      },
      collections: ['pages', 'posts', 'programs', 'team-members'],
      globals: ['header', 'footer'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    // Core Content
    Pages,
    Posts,
    // LTL Specific
    Programs,
    TeamMembers,
    ProjectSites,
    // E-Commerce
    Products,
    Orders,
    // Supporting
    Media,
    Categories,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true
        if (
          req.headers.get('Authorization')?.replace('Bearer ', '') === process.env.PAYLOAD_CRON_KEY
        ) {
          return true
        }
        return false
      },
    },
  },
})
