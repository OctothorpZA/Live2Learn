import { sanityFetch } from '@/sanity/lib/live'
// Import both the page query and the team members query
import { getPageQuery, allTeamMembersQuery } from '@/sanity/lib/queries'
// FIX: Corrected the import name for the team members query result type
import { GetPageQueryResult, AllTeamMembersQueryResult } from '@/sanity.types'

// Import our universal PageBuilder component
import PageBuilder from '@/app/components/PageBuilder'

export default async function AboutPage() {
  // Fetch both the page data and the team members data at the same time.
  // FIX: Removed explicit generic types from sanityFetch to allow for correct type inference.
  const [{ data: page }, { data: teamMembers }] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params: { slug: 'about' },
    }),
    sanityFetch({
      query: allTeamMembersQuery,
    }),
  ])

  // If no page data is found, render a fallback
  if (!page) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="mt-4">
          The page with the slug &quot;about&quot; could not be found in Sanity
          Studio.
        </p>
      </div>
    )
  }

  // Pass both the page data and the teamMembers data to the PageBuilder.
  // FIX: Added a type assertion to ensure teamMembers is correctly typed.
  return <PageBuilder page={page} teamMembers={teamMembers as AllTeamMembersQueryResult} />
}
