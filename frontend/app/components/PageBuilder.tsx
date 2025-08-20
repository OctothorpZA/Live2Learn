'use client'

// Import the auto-generated types for our page queries
import { GetPageQueryResult, HomePageQueryResult } from '@/sanity.types'

// Import all the custom and generic section components
import HeroSection from '@/app/components/sections/HeroSection'
import ChallengeSection from '@/app/components/sections/ChallengeSection'
import SolutionSection from '@/app/components/sections/SolutionSection'
import ImpactSection from '@/app/components/sections/ImpactSection'
import StoriesSection from '@/app/components/sections/StoriesSection'
import Cta from '@/app/components/Cta'
import InfoSection from '@/app/components/InfoSection'

// This is the mapping from Sanity schema types to our React components
const components: { [key: string]: React.ComponentType<any> } = {
  hero: HeroSection,
  challenge: ChallengeSection,
  solution: SolutionSection,
  impact: ImpactSection,
  story: StoriesSection,
  callToAction: Cta,
  infoSection: InfoSection,
}

// **Crucial Fix**: Define a simple, explicit type for any section.
// This tells TypeScript that every section will have at least a _key and a _type.
type AnySection = {
  _key: string
  _type: string
  [key: string]: any // Allow any other properties
}

// Create a universal type for the page prop
type UniversalPageData = HomePageQueryResult | GetPageQueryResult

export default function PageBuilder({ page }: { page: UniversalPageData }) {
  // Safely access the pageBuilder array and cast it to our new universal section type
  const sections = (page?.pageBuilder as AnySection[]) || []

  if (sections.length === 0) {
    // Render a fallback message if there are no sections.
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">This page has no content yet.</h1>
        <p className="mt-4">
          Please add sections to this page in the Sanity Studio.
        </p>
      </div>
    )
  }

  return (
    <>
      {sections.map((section) => {
        const Component = components[section._type]

        if (!Component) {
          console.warn('Unknown section type:', section._type)
          return null
        }

        // The generic components from the template expect a prop named 'block'
        if (section._type === 'callToAction' || section._type === 'infoSection') {
          return <Component key={section._key} block={section} />
        }

        return <Component key={section._key} {...section} />
      })}
    </>
  )
}
