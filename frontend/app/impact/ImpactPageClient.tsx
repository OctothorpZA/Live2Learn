'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MapLoader from '@/app/components/impact/MapLoader'
import { LocationType } from './page'

// Custom SVG Icons
const SchoolIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const MapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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

type ImpactPageClientProps = {
  locations: LocationType[]
}

export default function ImpactPageClient({ locations }: ImpactPageClientProps) {
  const impactMetrics = [
    {
      icon: SchoolIcon,
      value: locations.length,
      suffix: "+",
      label: "Partner Schools",
      description: "Schools actively participating in our literacy programs",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: UsersIcon,
      value: 2450,
      suffix: "+",
      label: "Students Reached",
      description: "Young learners benefiting from our educational initiatives",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: BookIcon,
      value: 15000,
      suffix: "+",
      label: "Books Distributed",
      description: "Physical and digital books placed in communities",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: AwardIcon,
      value: 89,
      suffix: "%",
      label: "Improvement Rate",
      description: "Average literacy improvement across our programs",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-slate via-white to-light-slate">
      {/* Hero Section with Animated Background */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Animated Background Elements - Optimized for mobile */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-5 md:left-10 w-20 h-20 md:w-40 md:h-40 bg-ltl-deep-blue rounded-full animate-pulse"></div>
          <div className="absolute top-40 md:top-60 right-10 md:right-20 w-16 h-16 md:w-32 md:h-32 bg-hopeful-yellow rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 md:bottom-20 left-1/4 w-12 h-12 md:w-24 md:h-24 bg-ltl-deep-blue rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 md:bottom-40 right-1/3 w-18 h-18 md:w-36 md:h-36 bg-hopeful-yellow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-20 md:top-32 left-1/2 w-14 h-14 md:w-28 md:h-28 bg-ltl-deep-blue/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-ltl-deep-blue mb-4 md:mb-6">
                Our Impact{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ltl-deep-blue to-hopeful-yellow block sm:inline">
                  Network
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoal/80 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
                Discover how we&apos;re transforming communities across South Africa through strategic partnerships, innovative programs, and dedicated local engagement. Every dot on our map represents lives changed through literacy.
              </p>
            </div>
            <div className="animate-fade-in-up flex items-center justify-center space-x-2 md:space-x-3 text-ltl-deep-blue px-4" style={{ animationDelay: '0.4s' }}>
              <MapIcon className="w-5 h-5 md:w-7 md:h-7 flex-shrink-0" />
              <span className="text-sm md:text-lg font-medium text-center">Explore our interactive impact map below</span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Cards */}
      <section className="py-8 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-charcoal mb-3 md:mb-4 animate-fade-in-up">
              Measuring Our Success
            </h2>
            <p className="text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Real numbers that reflect real change in communities across South Africa
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
            {impactMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="group bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 md:duration-500 hover:-translate-y-1 md:hover:-translate-y-3 border border-gray-100 relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 md:duration-500`}></div>
                
                <div className="relative">
                  <div className={`w-10 h-10 md:w-14 md:h-14 ${metric.bgColor} rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4 group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300`}>
                    <metric.icon className={`w-5 h-5 md:w-7 md:h-7 ${metric.iconColor}`} />
                  </div>
                  
                  <div className="mb-1 md:mb-2">
                    <span className={`text-lg md:text-2xl lg:text-3xl font-bold font-heading bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                      <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                    </span>
                  </div>
                  
                  <h3 className="font-bold font-heading text-charcoal mb-1 md:mb-2 text-sm md:text-base">{metric.label}</h3>
                  <p className="text-charcoal/60 text-xs md:text-sm leading-relaxed hidden md:block">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-charcoal mb-3 md:mb-4 animate-fade-in-up">
                Interactive Impact Map
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-charcoal/70 max-w-3xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.1s' }}>
                Explore our network of partner schools and community centers. Tap on markers to learn more about each location.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Map Controls Bar */}
              <div className="bg-gradient-to-r from-ltl-deep-blue to-ltl-deep-blue/90 px-4 md:px-6 py-3 md:py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <MapIcon className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="font-semibold text-sm md:text-base">Live Impact Map</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs md:text-sm">
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <span className="text-white/80">
                        {locations.filter(l => l.latitude && l.longitude).length} Locations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Container with responsive heights */}
              <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full relative">
                <MapLoader locations={locations} />
              </div>
              
              {/* Mobile Map Instructions */}
              <div className="bg-gray-50 px-4 py-3 text-center md:hidden border-t border-gray-100">
                <p className="text-xs text-charcoal/60">
                  <span className="inline-block mr-2">📍</span>
                  Tap and drag to explore • Pinch to zoom • Tap markers for details
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Preview Section */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-ltl-deep-blue/5 to-hopeful-yellow/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-ltl-deep-blue mb-3 md:mb-4 animate-fade-in-up">
            Stories Behind the Numbers
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-charcoal/70 mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.1s' }}>
            Each marker on our map represents real people, real communities, and real transformation through literacy education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in-up max-w-md sm:max-w-none mx-auto" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/news"
              className="bg-ltl-deep-blue hover:bg-ltl-deep-blue/90 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Read Success Stories
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-50 text-ltl-deep-blue px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl border-2 border-ltl-deep-blue/20 text-sm md:text-base"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

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
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}