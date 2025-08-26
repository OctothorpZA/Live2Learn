// frontend/app/get-involved/page.tsx

import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'
// FIX: The 'Page' type is imported from the auto-generated sanity.types.ts file
import type { Page } from '@/sanity.types'
import PageBuilder from '@/app/components/PageBuilder'

export default async function GetInvolvedPage() {
  // FIX: Removed the incorrect generic type from sanityFetch.
  // The return type will be correctly inferred from the getPageQuery.
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: {
      slug: 'get-involved',
    },
  })

  if (!page) {
    return notFound()
  }

  return (
    <div>
      {/* Pass the entire 'page' object to the 'page' prop */}
      <PageBuilder page={page} />
    </div>
  )
}
