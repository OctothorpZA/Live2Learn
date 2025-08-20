import Image from 'next/image'
import Link from 'next/link'

// Define the type for the props this component will accept
// This should match the structure of the data from our allProgramsQuery
type ProgramCardProps = {
  programName?: string | null
  slug?: string | null
  coverImage?: string | null
  excerpt?: string | null
}

export default function ProgramCard({
  programName,
  slug,
  coverImage,
  excerpt,
}: ProgramCardProps) {
  // Use a placeholder if the cover image is not available
  const imageUrl = coverImage || 'https://placeholder.co/600x400?text=Program+Image'

  // Construct the link to the individual program page
  const href = slug ? `/programs/${slug}` : '#'

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={programName || 'Program cover image'}
          className="object-cover"
          fill
        />
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold font-heading text-ltl-deep-blue group-hover:underline">
          {programName || 'Program Title'}
        </h3>
        <p className="mt-2 text-base text-charcoal">
          {excerpt || 'A brief summary of the program goes here.'}
        </p>
      </div>
    </Link>
  )
}
