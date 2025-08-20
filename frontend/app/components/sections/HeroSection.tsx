import Link from 'next/link'

// Define the type for the props this component will accept
// This now correctly matches the nested 'link' structure from our GROQ query
type Cta = {
  link: {
    label: string
    url: string
  }
}

type HeroSectionProps = {
  heading: string
  subheading: string
  backgroundImage: string
  primaryCta: Cta
  secondaryCta: Cta
}

export default function HeroSection({
  heading,
  subheading,
  backgroundImage,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  // Use a placeholder if the background image is not available
  const bgImage = backgroundImage || 'https://placeholder.co/1920x1080?text=LTL+Learners'

  return (
    <section
      className="relative flex items-center justify-center h-[70vh] min-h-[500px] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline (H1) */}
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 leading-tight">
          {heading || 'Default Heading'}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          {subheading || 'Default subheading text goes here.'}
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCta?.link?.label && primaryCta?.link?.url && (
            <Link
              href={primaryCta.link.url}
              className="bg-hopeful-yellow text-charcoal font-bold py-3 px-8 rounded-md hover:bg-yellow-400 transition-colors duration-200 text-lg"
            >
              {primaryCta.link.label}
            </Link>
          )}
          {secondaryCta?.link?.label && secondaryCta?.link?.url && (
            <Link
              href={secondaryCta.link.url}
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-charcoal transition-colors duration-200 text-lg"
            >
              {secondaryCta.link.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
