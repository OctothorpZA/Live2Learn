import Image from 'next/image'

// Define the type for the props this component will accept
type ProgramHeaderProps = {
  programName?: string | null
  coverImage?: string | null
}

export default function ProgramHeader({ programName, coverImage }: ProgramHeaderProps) {
  // Use a placeholder if the cover image is not available
  const imageUrl = coverImage || 'https://placeholder.co/1600x600?text=Program+Banner'

  return (
    <section className="relative h-[40vh] min-h-[300px] w-full">
      {/* Background Image using next/image for optimization */}
      <Image
        src={imageUrl}
        alt={programName || 'Program banner image'}
        className="object-cover"
        fill
        priority
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Program Name (H1) */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl font-heading text-center">
          {programName || 'Program Name'}
        </h1>
      </div>
    </section>
  )
}
