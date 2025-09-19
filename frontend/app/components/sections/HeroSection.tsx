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
    <section className="relative flex items-center justify-center h-[80vh] min-h-[600px] bg-gradient-to-br from-ltl-deep-blue via-blue-600 to-ltl-deep-blue text-white overflow-hidden">
      {/* Dynamic Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      
      {/* Colorful Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-ltl-deep-blue/80 via-blue-600/70 to-purple-900/60"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-hopeful-yellow/10 to-orange-500/20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-24 h-24 md:w-40 md:h-40 bg-hopeful-yellow/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 md:w-32 md:h-32 bg-orange-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 md:w-28 md:h-28 bg-yellow-300/25 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 md:w-48 md:h-48 bg-blue-400/15 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '8s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline (H1) */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight animate-fade-in-up">
          {heading ? (
            <>
              {heading.split(' ').slice(0, -2).join(' ')} 
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopeful-yellow via-yellow-300 to-orange-400 drop-shadow-lg">
                {heading.split(' ').slice(-2).join(' ')}
              </span>
            </>
          ) : (
            <>
              Unlocking Every Child's
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopeful-yellow via-yellow-300 to-orange-400 drop-shadow-lg">
                Learning Potential
              </span>
            </>
          )}
        </h1>

        {/* Sub-headline */}
        <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-10 leading-relaxed text-white/95 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {subheading || 'We partner with schools across South Africa to provide innovative literacy programs that transform communities, one reader at a time.'}
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {primaryCta?.link?.label && primaryCta?.link?.url && (
            <Link
              href={primaryCta.link.url}
              className="group bg-gradient-to-r from-hopeful-yellow to-orange-400 text-ltl-deep-blue font-bold py-4 px-10 rounded-full hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center space-x-2"
            >
              <span>{primaryCta.link.label}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
          {secondaryCta?.link?.label && secondaryCta?.link?.url && (
            <Link
              href={secondaryCta.link.url}
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>{secondaryCta.link.label}</span>
            </Link>
          )}
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
            <div className="w-1 h-3 bg-hopeful-yellow rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
