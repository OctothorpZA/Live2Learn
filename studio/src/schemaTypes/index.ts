import { person } from './documents/person'
import { page } from './documents/page'
import { post } from './documents/post'
import { callToAction } from './objects/callToAction'
import { infoSection } from './objects/infoSection'
import { settings } from './singletons/settings'
import { link } from './objects/link'
import { blockContent } from './objects/blockContent'

// Import the existing section schemas
import { hero } from './objects/hero'
import { challenge } from './objects/challenge'
import { solution, solutionItem } from './objects/solution'
import { impact, metricItem } from './objects/impact'
import { story } from './objects/story'
// Import our new teamGrid schema
import { teamGrid } from './objects/teamGrid'

// Export an array of all the schema types.
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
  // Page builder sections
  hero,
  challenge,
  solution,
  solutionItem,
  impact,
  metricItem,
  story,
  teamGrid, // Register the new teamGrid schema
]
