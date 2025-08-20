import type { Metadata } from 'next'
import Head from 'next/head'

import PageBuilder from '@/app/components/PageBuilder'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery, pagesSlugs } from '@/sanity/lib/queries'
import { PageOnboarding } from '@/app/components/Onboarding'
import { GetPageQueryResult } from '@/sanity.types'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data || []
}

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  // Correctly call sanityFetch without the incorrect generic type
  // TypeScript will now infer the return type correctly
  const { data: page } = await sanityFetch({ query: getPageQuery, params })

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    )
  }

  return (
    <div className="my-12 lg:my-24">
      <Head>
        <title>{page.heading}</title>
      </Head>
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                {page.heading}
              </h2>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {page.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Pass the page data directly. The updated PageBuilder now correctly accepts this type. */}
      <PageBuilder page={page} />
    </div>
  )
}
