import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from 'next-sanity'

import { sanityFetch } from '@/sanity/lib/live'
import { programPageQuery, programSlugsQuery } from '@/sanity/lib/queries'
// FIX: Corrected the import name for the query result type
import { ProgramPageQueryResult } from '@/sanity.types'

// Import the new components
import ProgramHeader from '@/app/components/program/ProgramHeader'
import ProgramBody from '@/app/components/program/ProgramBody'

// FIX: The type for params is now a Promise, aligning with Next.js 15.
type PageProps = {
  params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 * This tells Next.js which program pages to pre-build at build time.
 */
export async function generateStaticParams() {
  // FIX: Removed the incorrect generic type from sanityFetch.
  const { data: slugs } = await sanityFetch({
    query: programSlugsQuery,
    perspective: 'published',
    stega: false,
  })

  // FIX: Explicitly type the 'slug' parameter to resolve the 'any' type error.
  return (slugs || []).map((slug: string) => ({
    slug,
  }))
}

/**
 * Generate metadata for the page (e.g., the <title> tag).
 */
export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise
  // FIX: Removed the incorrect generic type from sanityFetch.
  const { data: program } = await sanityFetch({
    query: programPageQuery,
    params,
    stega: false,
  })

  return {
    title: program?.programName || 'Program Page',
    description: `Learn more about the ${
      program?.programName || 'LTL'
    } program.`,
  }
}

export default async function ProgramPage({
  params: paramsPromise, // Renamed to avoid confusion
}: PageProps) {
  // FIX: Await the params promise to get the resolved value.
  const params = await paramsPromise
  // FIX: Removed the incorrect generic type from sanityFetch.
  const { data: program } = await sanityFetch({
    query: programPageQuery,
    params,
  })

  // If no program data is found, render the 404 page
  if (!program) {
    return notFound()
  }

  return (
    <div>
      {/* Assemble the page using our new components */}
      <ProgramHeader
        programName={program.programName}
        coverImage={program.coverImage}
      />
      <ProgramBody
        description={program.description as PortableTextBlock[]}
        status={program.status}
        targetAudience={program.targetAudience}
        keyMetrics={program.keyMetrics}
      />
      {/* You can add more sections like "Success Stories" here in the future */}
    </div>
  )
}
