// Define the type for the props this component will accept
// This should match the structure of the 'impact' data from our GROQ query
type Metric = {
  _key: string
  value: string
  label: string
}

type ImpactSectionProps = {
  heading: string
  metrics: Metric[]
}

export default function ImpactSection({ heading, metrics }: ImpactSectionProps) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-charcoal mb-12">
          {heading || 'Our Impact'}
        </h2>

        {/* Responsive grid for the metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {metrics?.map((metric) => (
            <div key={metric._key}>
              <p className="text-5xl md:text-6xl font-bold font-heading text-ltl-deep-blue">
                {metric.value}
              </p>
              <p className="text-lg font-medium text-charcoal mt-2">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
