import { sanityFetch } from '@/sanity/lib/live'
import { homePageQuery } from '@/sanity/lib/queries'
import { HomePageQueryResult } from '@/sanity.types'

import PageBuilder from '@/app/components/PageBuilder'

export default async function HomePage() {
  // Correctly call sanityFetch without the incorrect generic type
  // TypeScript will now infer the return type correctly
  const { data: pageData } = await sanityFetch({
    query: homePageQuery,
  })

  // If there's no page data, render a fallback
  if (!pageData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="mt-4">
          The &apos;Home&apos; page document could not be found in Sanity Studio.
        </p>
      </div>
    )
  }

  // Pass the data directly. The updated PageBuilder now correctly accepts this type.
  return <PageBuilder page={pageData} />
}
