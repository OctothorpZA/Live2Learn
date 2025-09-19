'use client'

import { useState, useEffect } from 'react'

// Custom Icons
const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const AcademicCapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 50)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{count.toLocaleString()}{suffix}</span>
}

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  books: BookOpenIcon,
  users: UsersIcon,
  academic: AcademicCapIcon,
  star: StarIcon,
}

type ModernMetric = {
  _key: string
  value: number
  suffix?: string
  label: string
  description?: string
  icon?: string
}

type ModernImpactSectionProps = {
  heading?: string
  subheading?: string
  metrics?: ModernMetric[]
  backgroundColor?: 'light' | 'dark' | 'gradient'
}

export default function ModernImpactSection({
  heading = "Our Impact in Numbers",
  subheading = "Real results from real partnerships across South African communities",
  metrics = [],
  backgroundColor = 'light'
}: ModernImpactSectionProps) {
  
  // Default metrics if none provided
  const defaultMetrics: ModernMetric[] = [
    {
      _key: '1',
      value: 15000,
      suffix: '+',
      label: 'Books Distributed',
      description: 'Physical and digital resources reaching communities',
      icon: 'books'
    },
    {
      _key: '2',
      value: 2450,
      suffix: '+',
      label: 'Students Reached',
      description: 'Young learners actively participating in our programs',
      icon: 'users'
    },
    {
      _key: '3',
      value: 45,
      suffix: '+',
      label: 'Partner Schools',
      description: 'Educational institutions in our growing network',
      icon: 'academic'
    },
    {
      _key: '4',
      value: 89,
      suffix: '%',
      label: 'Success Rate',
      description: 'Students showing measurable literacy improvement',
      icon: 'star'
    }
  ]

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics

  const bgClasses = {
    light: 'bg-gradient-to-br from-gray-50 to-white',
    dark: 'bg-gradient-to-br from-ltl-deep-blue to-ltl-deep-blue/90 text-white',
    gradient: 'bg-gradient-to-br from-ltl-deep-blue via-ltl-deep-blue to-ltl-deep-blue/90 text-white'
  }

  const textClasses = {
    light: 'text-charcoal',
    dark: 'text-white',
    gradient: 'text-white'
  }

  return (
    <section className={`py-16 md:py-24 ${bgClasses[backgroundColor]} relative overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-ltl-deep-blue rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-hopeful-yellow rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold font-heading ${textClasses[backgroundColor]} mb-4 animate-fade-in-up`}>
            {heading}
          </h2>
          {subheading && (
            <p className={`text-lg md:text-xl ${backgroundColor === 'light' ? 'text-charcoal/70' : 'text-white/90'} max-w-2xl mx-auto animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayMetrics.map((metric, index) => {
            const IconComponent = metric.icon ? iconMap[metric.icon] : BookOpenIcon
            
            return (
              <div
                key={metric._key}
                className={`group ${backgroundColor === 'light' ? 'bg-white' : 'bg-white/10 backdrop-blur-sm'} rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border ${backgroundColor === 'light' ? 'border-gray-100' : 'border-white/20'} text-center animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="mb-4">
                  <div className={`w-16 h-16 md:w-20 md:h-20 ${backgroundColor === 'light' ? 'bg-ltl-deep-blue/10' : 'bg-white/20'} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${backgroundColor === 'light' ? 'text-ltl-deep-blue' : 'text-white'}`} />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold ${backgroundColor === 'light' ? 'text-ltl-deep-blue' : 'text-white'} mb-2`}>
                    <AnimatedCounter end={metric.value} suffix={metric.suffix || ''} />
                  </div>
                  <h3 className={`font-bold ${textClasses[backgroundColor]} mb-2 text-sm md:text-base`}>{metric.label}</h3>
                  {metric.description && (
                    <p className={`${backgroundColor === 'light' ? 'text-charcoal/60' : 'text-white/70'} text-xs md:text-sm leading-relaxed hidden md:block`}>
                      {metric.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}