'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HomePageQueryResult } from '@/sanity.types'

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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
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

// Scroll Progress Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-ltl-deep-blue to-hopeful-yellow transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

type ModernHomePageProps = {
  pageData?: HomePageQueryResult | null
}

export default function ModernHomePage({ pageData }: ModernHomePageProps) {
  // Extract hero data from pageBuilder if available
  const heroSection = pageData?.pageBuilder?.find((section: any) => section._type === 'hero') as any
  const impactSection = pageData?.pageBuilder?.find((section: any) => section._type === 'impact')
  const storySection = pageData?.pageBuilder?.find((section: any) => section._type === 'story')

  // Impact metrics
  const impactMetrics = [
    {
      icon: BookOpenIcon,
      value: 15000,
      suffix: "+",
      label: "Books Distributed",
      description: "Physical and digital resources reaching communities"
    },
    {
      icon: UsersIcon,
      value: 2450,
      suffix: "+",
      label: "Students Reached",
      description: "Young learners actively participating in our programs"
    },
    {
      icon: AcademicCapIcon,
      value: 45,
      suffix: "+",
      label: "Partner Schools",
      description: "Educational institutions in our growing network"
    },
    {
      icon: StarIcon,
      value: 89,
      suffix: "%",
      label: "Success Rate",
      description: "Students showing measurable literacy improvement"
    }
  ]

  return (
    <div className="overflow-x-hidden">
      <ScrollProgress />
      
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ltl-deep-blue via-ltl-deep-blue to-ltl-deep-blue/90">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 md:w-32 md:h-32 bg-hopeful-yellow/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 md:w-18 md:h-18 bg-hopeful-yellow/30 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '8s' }}></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ltl-deep-blue/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-5xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-8 animate-fade-in-up border border-white/30">
              <span className="w-2 h-2 bg-hopeful-yellow rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white">Transforming Lives Through Literacy</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 animate-fade-in-up text-white" style={{ animationDelay: '0.2s' }}>
              {heroSection?.heading || 'Unlocking Every Child\'s'}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopeful-yellow via-yellow-300 to-hopeful-yellow drop-shadow-sm">
                Potential Through Literacy
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {heroSection?.subheading || 'We partner with schools across South Africa to provide innovative literacy programs that transform communities, one reader at a time.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link
                href="/programs"
                className="group bg-hopeful-yellow text-ltl-deep-blue font-bold py-4 px-8 rounded-xl hover:bg-yellow-400 transition-all duration-300 text-lg flex items-center space-x-2 hover:shadow-2xl hover:-translate-y-1"
              >
                <span>Explore Our Programs</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <button className="group bg-transparent border-2 border-white/30 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 text-lg flex items-center space-x-2">
                <PlayIcon className="w-5 h-5" />
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-32 h-32 bg-ltl-deep-blue rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-hopeful-yellow rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-charcoal mb-4 animate-fade-in-up">
              Our Impact in Numbers
            </h2>
            <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Real results from real partnerships across South African communities
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {impactMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-ltl-deep-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <metric.icon className="w-8 h-8 md:w-10 md:h-10 text-ltl-deep-blue" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-ltl-deep-blue mb-2">
                    <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2 text-sm md:text-base">{metric.label}</h3>
                  <p className="text-charcoal/60 text-xs md:text-sm leading-relaxed hidden md:block">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-ltl-deep-blue to-ltl-deep-blue/90 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8 animate-fade-in-up">
              Every Child Deserves the Gift of Reading
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              We believe that literacy is the foundation of opportunity. Through innovative programs, dedicated partnerships, and community-centered approaches, we&apos;re building a South Africa where every child can read, learn, and thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/about"
                className="bg-hopeful-yellow text-ltl-deep-blue font-bold py-4 px-8 rounded-xl hover:bg-yellow-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Learn About Our Mission
              </Link>
              <Link
                href="/impact"
                className="bg-transparent border-2 border-white/30 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                See Our Impact Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-hopeful-yellow/10 to-hopeful-yellow/5 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-charcoal mb-6 animate-fade-in-up">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg md:text-xl text-charcoal/70 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Join our community of educators, volunteers, and partners working together to transform lives through literacy.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Volunteer", desc: "Share your time and skills", href: "/get-involved" },
                { title: "Partner", desc: "Collaborate with us", href: "/contact" },
                { title: "Donate", desc: "Support our programs", href: "/shop" }
              ].map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                >
                  <h3 className="text-xl font-bold text-ltl-deep-blue mb-2 group-hover:text-hopeful-yellow transition-colors duration-300">{item.title}</h3>
                  <p className="text-charcoal/70">{item.desc}</p>
                </Link>
              ))}
            </div>
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
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}