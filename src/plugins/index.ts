// import { payloadCloudPlugin } from '@payloadcms/payload-cloud' // This was already correctly removed
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
// import { revalidateRedirects } from '@/hooks/revalidateRedirects' // Temporarily disabled
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post, Program, TeamMember, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

// Adjusted the type to include our new collections
const generateTitle: GenerateTitle<Post | Page | Program | TeamMember | Product> = ({ doc }) => {
  // Use 'programTitle' for Programs, 'name' for TeamMembers, and 'title' for others
  const title = doc?.programTitle || doc?.name || doc?.title
  return title ? `${title} | Living Through Learning` : 'Living Through Learning'
}

// Adjusted the type to include our new collections
const generateURL: GenerateURL<Post | Page | Program | TeamMember | Product> = ({ doc }) => {
  const url = getServerSideURL()
  switch (doc.collection) {
    case 'pages':
      return doc.slug ? `${url}/${doc.slug}` : undefined
    case 'posts':
      return doc.slug ? `${url}/posts/${doc.slug}` : undefined
    case 'programs':
      return doc.slug ? `${url}/programs/${doc.slug}` : undefined
    // Add cases for other collections if they have public-facing URLs
    default:
      return undefined
  }
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                ...field.admin,
                description:
                  'Example: /old-path. The path to redirect from, without the domain name. Note: query strings are not supported in this field.',
              },
            }
          }
          return field
        })
      },
      // hooks: {
      //   afterChange: [revalidateRedirects], // Temporarily disabled
      // },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    // Added our new collections to the plugin's scope
    collections: ['pages', 'posts', 'programs', 'team-members', 'products'],
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts', 'pages', 'programs'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  // payloadCloudPlugin(),
]
