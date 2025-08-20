import { sanityFetch } from '@/sanity/lib/live'
// Import both the page query and the team members query
import { getPageQuery, allTeamMembersQuery } from '@/sanity/lib/queries'
import { GetPageQueryResult, GetAllTeamMembersQueryResult } from '@/sanity.types'

// Import our universal PageBuilder component
import PageBuilder from '@/app/components/PageBuilder'

export default async function AboutPage() {
  // **Crucial Fix**: Fetch both the page data and the team members data at the same time.
  const [{ data: page }, { data: teamMembers }] = await Promise.all([
    sanityFetch<GetPageQueryResult>({
      query: getPageQuery,
      params: { slug: 'about' },
    }),
    sanityFetch<GetAllTeamMembersQueryResult>({
      query: allTeamMembersQuery,
    }),
  ])

  // If no page data is found, render a fallback
  if (!page) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="mt-4">
          The page with the slug &quot;about&quot; could not be found in Sanity Studio.
        </p>
      </div>
    )
  }

  // **Crucial Fix**: Pass both the page data and the teamMembers data to the PageBuilder.
  return <PageBuilder page={page} teamMembers={teamMembers} />
}
