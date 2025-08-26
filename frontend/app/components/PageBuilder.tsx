'use client'

// Import the auto-generated types for our page queries
// FIX: Corrected the import name for the team members query result type
import {
  AllTeamMembersQueryResult,
  GetPageQueryResult,
  HomePageQueryResult,
} from '@/sanity.types'

// Import all the custom and generic section components
import HeroSection from '@/app/components/sections/HeroSection'
import ChallengeSection from '@/app/components/sections/ChallengeSection'
import SolutionSection from '@/app/components/sections/SolutionSection'
import ImpactSection from '@/app/components/sections/ImpactSection'
import StoriesSection from '@/app/components/sections/StoriesSection'
import TeamGrid from '@/app/components/sections/TeamGrid'
import Cta from '@/app/components/Cta'
import InfoSection from '@/app/components/InfoSection'

// This is the mapping from Sanity schema types to our React components
const components: { [key: string]: React.ComponentType<any> } = {
  hero: HeroSection,
  challenge: ChallengeSection,
  solution: SolutionSection,
  impact: ImpactSection,
  story: StoriesSection,
  teamGrid: TeamGrid,
  callToAction: Cta,
  infoSection: InfoSection,
}

type AnySection = {
  _key: string
  _type: string
  [key: string]: any
}

type UniversalPageData = HomePageQueryResult | GetPageQueryResult

// The PageBuilder now accepts an optional 'teamMembers' prop
export default function PageBuilder({
  page,
  teamMembers = [],
}: {
  page: UniversalPageData
  // FIX: Use the corrected type name for the teamMembers prop
  teamMembers?: AllTeamMembersQueryResult
}) {
  const sections = (page?.pageBuilder as AnySection[]) || []

  if (sections.length === 0) {
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
        if (
          section._type === 'callToAction' ||
          section._type === 'infoSection'
        ) {
          return <Component key={section._key} block={section} />
        }

        // If the section is a teamGrid, pass the teamMembers data to it
        if (section._type === 'teamGrid') {
          return (
            <Component key={section._key} {...section} teamMembers={teamMembers} />
          )
        }

        return <Component key={section._key} {...section} />
      })}
    </>
  )
}
