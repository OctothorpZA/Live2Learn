// frontend/sanity/lib/client.ts

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Set useCdn to false for development to ensure fresh data
  useCdn: false,
  perspective: 'published',
  stega: {
    studioUrl,
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
})
