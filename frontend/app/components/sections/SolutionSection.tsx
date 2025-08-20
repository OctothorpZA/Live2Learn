import Image from 'next/image'

// Define the type for the props this component will accept
// This should match the structure of the 'solution' data from our GROQ query
type Solution = {
  _key: string
  title: string
  description: string
  icon: string
}

type SolutionSectionProps = {
  heading: string
  solutions: Solution[]
}

// A placeholder component for the icons
const SolutionIcon = ({ url }: { url: string }) => {
  const iconUrl = url || 'https://placeholder.co/80x80?text=Icon'
  // Using next/image for optimized images
  return <Image src={iconUrl} alt="" className="h-16 w-16 mx-auto mb-4" width={64} height={64} />
}

export default function SolutionSection({ heading, solutions }: SolutionSectionProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-charcoal mb-12">
          {heading || 'Our Solution'}
        </h2>

        {/* Three-column layout for the solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {solutions?.map((solution) => (
            <div key={solution._key} className="text-center">
              <SolutionIcon url={solution.icon} />
              <h3 className="text-xl font-bold font-heading mb-2">{solution.title}</h3>
              <p className="text-base text-charcoal">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
