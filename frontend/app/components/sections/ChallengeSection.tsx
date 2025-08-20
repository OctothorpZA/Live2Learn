// Define the type for the props this component will accept
// This should match the structure of the 'challenge' data from our GROQ query
type ChallengeSectionProps = {
  statistic: string
  description: string
}

export default function ChallengeSection({ statistic, description }: ChallengeSectionProps) {
  return (
    <section className="bg-light-slate py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* The large, impactful statistic */}
        <p className="text-5xl md:text-7xl font-bold font-heading text-ltl-deep-blue mb-4">
          {statistic || 'X%'}
        </p>
        {/* The brief explanation of the statistic */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-charcoal">
          {description || 'Default description of why this statistic matters.'}
        </p>
      </div>
    </section>
  )
}
