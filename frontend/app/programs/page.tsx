import { sanityFetch } from '@/sanity/lib/live'
import { allProgramsQuery } from '@/sanity/lib/queries'

// Import the real ProgramCard component
import ProgramCard from '@/app/components/program/ProgramCard'

// Define a local, explicit type for a Program to bypass the faulty generated type.
type ProgramType = {
  _id: string
  programName?: string | null
  slug?: string | null
  coverImage?: string | null
  excerpt?: string | null
}

export default async function OurWorkPage() {
  // FIX: Remove the generic from sanityFetch to avoid the constraint error.
  const { data: programs } = await sanityFetch({
    query: allProgramsQuery,
  })

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Main Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-charcoal">
            Our Work
          </h1>
          {/* Introductory Paragraph */}
          <p className="mt-4 text-lg max-w-3xl mx-auto text-charcoal">
            At Living Through Learning, we develop and implement a range of
            targeted programs designed to address the literacy crisis at its
            roots. Explore our key initiatives below to see how we&apos;re making a
            difference.
          </p>
        </div>

        {/* Responsive Grid Layout for Program Cards */}
        {programs && programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FIX: Cast programs to 'any' to bypass the incorrect 'never[]' type from Sanity Typegen */}
            {(programs as any).map((program: ProgramType) => (
              <ProgramCard
                key={program._id}
                programName={program.programName}
                slug={program.slug}
                coverImage={program.coverImage}
                excerpt={program.excerpt}
              />
            ))}
          </div>
        ) : (
          // Fallback message if no programs are found in the CMS
          <div className="text-center">
            <p>No programs found. Please add programs in the Sanity Studio.</p>
          </div>
        )}
      </div>
    </div>
  )
}
