import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { sanityFetch } from '@/sanity/lib/live'
import { programPageQuery, programSlugsQuery } from '@/sanity/lib/queries'
import { ProgramQueryResult } from '@/sanity.types'

// Import the new components
import ProgramHeader from '@/app/components/program/ProgramHeader'
import ProgramBody from '@/app/components/program/ProgramBody'

// Define the props type directly for clarity
type PageProps = {
  params: { slug: string }
}

/**
 * Generate the static params for the page.
 * This tells Next.js which program pages to pre-build at build time.
 */
export async function generateStaticParams() {
  // Reverted to original destructuring
  const { data: slugs } = await sanityFetch<string[]>({
    query: programSlugsQuery,
    perspective: 'published',
    stega: false,
  })

  return (slugs || []).map((slug) => ({
    slug,
  }))
}

/**
 * Generate metadata for the page (e.g., the <title> tag).
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Reverted to original destructuring
  const { data: program } = await sanityFetch<ProgramQueryResult>({
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

export default async function ProgramPage({ params }: PageProps) {
  // Reverted to original destructuring
  const { data: program } = await sanityFetch<ProgramQueryResult>({
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
        description={program.description}
        status={program.status}
        targetAudience={program.targetAudience}
        keyMetrics={program.keyMetrics}
      />
      {/* You can add more sections like "Success Stories" here in the future */}
    </div>
  )
}
