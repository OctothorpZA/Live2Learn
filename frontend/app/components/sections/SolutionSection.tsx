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
  return (
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
      <Image src={iconUrl} alt="" className="h-8 w-8" width={32} height={32} />
    </div>
  )
}

export default function SolutionSection({ heading, solutions }: SolutionSectionProps) {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 py-20 sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-hopeful-yellow to-amber-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-4">
            {heading || 'Our Innovative Solutions'}
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Discover how we&apos;re transforming literacy education across South Africa
          </p>
        </div>

        {/* Three-column layout for the solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {solutions?.map((solution, index) => {
            const gradientClasses = [
              'from-orange-500 to-red-500',
              'from-hopeful-yellow to-orange-500', 
              'from-amber-500 to-yellow-600'
            ]
            const bgClasses = [
              'from-orange-500/10 to-red-500/10',
              'from-hopeful-yellow/10 to-orange-500/10',
              'from-amber-500/10 to-yellow-600/10'
            ]
            
            return (
              <div key={solution._key} className="group text-center">
                <div className={`bg-gradient-to-br ${bgClasses[index % 3]} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50`}>
                  <div className={`w-20 h-20 bg-gradient-to-r ${gradientClasses[index % 3]} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <SolutionIcon url={solution.icon} />
                  </div>
                  <h3 className={`text-2xl font-bold font-heading mb-4 text-transparent bg-clip-text bg-gradient-to-r ${gradientClasses[index % 3]}`}>
                    {solution.title}
                  </h3>
                  <p className="text-lg text-charcoal/80 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
