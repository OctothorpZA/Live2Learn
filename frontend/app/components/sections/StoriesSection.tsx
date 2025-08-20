import Image from 'next/image'

// Define the type for the props this component will accept
// This should match the structure of the 'story' data from our GROQ query
type Person = {
  name: string
  role: string
  image: string
}

type StoriesSectionProps = {
  heading: string
  quote: string
  person: Person
}

export default function StoriesSection({ heading, quote, person }: StoriesSectionProps) {
  const personImage = person?.image || 'https://placeholder.co/400x400?text=Person'

  return (
    <section className="bg-light-slate py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-charcoal mb-12">
          {heading || 'A Story of Change'}
        </h2>

        <div className="max-w-3xl mx-auto text-center">
          <Image
            src={personImage}
            alt={person?.name || 'Testimonial person'}
            className="w-24 h-24 rounded-full mx-auto mb-6"
            width={96}
            height={96}
          />
          {/* The large quote/testimonial */}
          <blockquote className="text-2xl md:text-3xl font-light text-charcoal italic mb-6">
            <p>&quot;{quote || 'This is a default testimonial quote. It should be impactful.'}&quot;</p>
          </blockquote>
          {/* The person's name and role */}
          <footer className="text-lg font-bold font-heading text-ltl-deep-blue">
            {person?.name || 'Person Name'}
            <cite className="block text-base font-medium text-charcoal not-italic mt-1">
              {person?.role || 'Role or Title'}
            </cite>
          </footer>
        </div>
      </div>
    </section>
  )
}
