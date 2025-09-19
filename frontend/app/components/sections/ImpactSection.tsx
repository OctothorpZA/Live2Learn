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
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-hopeful-yellow to-orange-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-ltl-deep-blue to-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-ltl-deep-blue via-blue-600 to-purple-700 mb-4">
            {heading || 'Our Measurable Impact'}
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Real numbers from real communities across South Africa
          </p>
        </div>

        {/* Responsive grid for the metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          {metrics?.map((metric, index) => {
            const gradientClasses = [
              'from-ltl-deep-blue to-blue-600',
              'from-hopeful-yellow to-orange-500', 
              'from-purple-600 to-pink-600'
            ]
            const bgClasses = [
              'from-ltl-deep-blue/10 to-blue-600/10',
              'from-hopeful-yellow/10 to-orange-500/10',
              'from-purple-600/10 to-pink-600/10'
            ]
            
            return (
              <div key={metric._key} className="group">
                <div className={`bg-gradient-to-br ${bgClasses[index % 3]} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${gradientClasses[index % 3]} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                  </div>
                  <p className={`text-6xl md:text-7xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r ${gradientClasses[index % 3]} mb-2`}>
                    {metric.value}
                  </p>
                  <p className="text-xl font-bold text-charcoal/90">{metric.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
