import { person } from './documents/person'
import { page } from './documents/page'
import { post } from './documents/post'
import { callToAction } from './objects/callToAction'
import { infoSection } from './objects/infoSection'
import { settings } from './singletons/settings'
import { link } from './objects/link'
import { blockContent } from './objects/blockContent'

// Import the new section schemas
import { hero } from './objects/hero'
import { challenge } from './objects/challenge'
import { solution, solutionItem } from './objects/solution' // Import solutionItem
import { impact, metricItem } from './objects/impact' // Import metricItem
import { story } from './objects/story'

// Export an array of all the schema types. This is used in the Sanity Studio configuration.
export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  // Add the new page builder sections here
  hero,
  challenge,
  solution,
  solutionItem, // Register solutionItem
  impact,
  metricItem, // Register metricItem
  story,
]
