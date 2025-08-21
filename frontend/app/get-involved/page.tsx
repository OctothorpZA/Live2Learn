// frontend/app/get-involved/page.tsx

import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { getPageQuery, type Page } from '@/sanity/lib/queries'
import PageBuilder from '@/app/components/PageBuilder'

export default async function GetInvolvedPage() {
  const page = await client.fetch<Page | null>(getPageQuery, {
    slug: 'get-involved',
  })

  if (!page) {
    return notFound()
  }

  return (
    <div>
      {/* CORRECTED: Pass the entire 'page' object to the 'page' prop */}
      <PageBuilder page={page} />
    </div>
  )
}
