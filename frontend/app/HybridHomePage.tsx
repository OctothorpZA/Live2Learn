'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HomePageQueryResult } from '@/sanity.types'
import PageBuilder from '@/app/components/PageBuilder'

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

type HybridHomePageProps = {
  pageData?: HomePageQueryResult | null
}

export default function HybridHomePage({ pageData }: HybridHomePageProps) {
  // Extract hero data from pageBuilder if available
  const heroSection = pageData?.pageBuilder?.find((section: any) => section._type === 'hero') as any
  
  // Impact metrics - Real LTL achievements
  const impactMetrics = [
    {
      icon: UsersIcon,
      value: 150000,
      suffix: "+",
      label: "Learners Trained",
      description: "Students who have participated in our literacy programs"
    },
    {
      icon: AcademicCapIcon,
      value: 700,
      suffix: "+",
      label: "Educators Trained", 
      description: "Teachers equipped with our proven methodology"
    },
    {
      icon: BookOpenIcon,
      value: 30000,
      suffix: "+",
      label: "Using Our Curriculum",
      description: "Children actively learning with our Foundation Phase program"
    },
    {
      icon: StarIcon,
      value: 80,
      suffix: "%",
      label: "Literacy Improvement",
      description: "Average increase in literacy scores achieved"
    }
  ]

  // Check if pageBuilder has sections
  const hasPageBuilderSections = pageData?.pageBuilder && Array.isArray(pageData.pageBuilder) && pageData.pageBuilder.length > 0

  return (
    <div className="overflow-x-hidden">
      <ScrollProgress />
      
      {/* Modern Hero Section - Always shown, but uses pageBuilder data if available */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ltl-deep-blue via-blue-600 to-ltl-deep-blue">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 md:w-32 md:h-32 bg-hopeful-yellow/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 md:w-24 md:h-24 bg-orange-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 md:w-18 md:h-18 bg-yellow-300/25 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 md:w-40 md:h-40 bg-blue-400/15 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '8s' }}></div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-ltl-deep-blue/80 via-blue-600/70 to-purple-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-hopeful-yellow/10 to-orange-500/20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-5xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-8 animate-fade-in-up border border-white/30">
              <span className="w-2 h-2 bg-hopeful-yellow rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white">Awakening Africa through Early Literacy</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 text-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {heroSection?.heading ? (
                <>
                  {heroSection.heading.split(' ').slice(0, -2).join(' ')}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopeful-yellow via-yellow-300 to-orange-400 drop-shadow-sm">
                    {heroSection.heading.split(' ').slice(-2).join(' ')}
                  </span>
                </>
              ) : (
                <>
                  Every Child is a 
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopeful-yellow via-yellow-300 to-orange-400 drop-shadow-sm">
                    National Asset
                  </span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {heroSection?.subheading || 'Since 2010, we have transformed foundation phase literacy education across South Africa, empowering over 150,000 learners and 700+ educators with our proven Gattegno methodology.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {heroSection?.primaryCta?.link?.label && heroSection?.primaryCta?.link?.url ? (
                <Link
                  href={heroSection.primaryCta.link.url}
                  className="group bg-gradient-to-r from-hopeful-yellow to-orange-400 text-ltl-deep-blue font-bold py-4 px-10 rounded-full hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center space-x-2"
                >
                  <span>{heroSection.primaryCta.link.label}</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              ) : (
                <Link
                  href="/programs"
                  className="group bg-gradient-to-r from-hopeful-yellow to-orange-400 text-ltl-deep-blue font-bold py-4 px-10 rounded-full hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center space-x-2"
                >
                  <span>Explore Our Programs</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              )}
              
              {heroSection?.secondaryCta?.link?.label && heroSection?.secondaryCta?.link?.url ? (
                <Link
                  href={heroSection.secondaryCta.link.url}
                  className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-all duration-300 text-lg flex items-center space-x-2"
                >
                  <PlayIcon className="w-5 h-5" />
                  <span>{heroSection.secondaryCta.link.label}</span>
                </Link>
              ) : (
                <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-all duration-300 text-lg flex items-center space-x-2">
                  <PlayIcon className="w-5 h-5" />
                  <span>Watch Our Story</span>
                </button>
              )}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
                <div className="w-1 h-3 bg-hopeful-yellow rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Impact Metrics Section - Always shown unless overridden by page builder */}
      {!hasPageBuilderSections || !pageData?.pageBuilder?.some((section: any) => section._type === 'impact' || section._type === 'modernImpact') ? (
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
      ) : null}

      {/* Page Builder Sections - Insert any additional sections from Sanity */}
      {hasPageBuilderSections && (
        <PageBuilder page={pageData} />
      )}

      {/* Our Programs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-charcoal mb-6">
                Our Proven Programs
              </h2>
              <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
                Transforming literacy education through innovative Reading Adventure Rooms, 
                comprehensive teacher training, and the proven Gattegno methodology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-ltl-deep-blue/5 to-ltl-deep-blue/10 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-ltl-deep-blue rounded-2xl flex items-center justify-center mb-6">
                  <BookOpenIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-ltl-deep-blue mb-4">Reading Adventure Rooms</h3>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  Themed literacy classrooms in 30+ schools with step-by-step phonics curriculum, 
                  benefiting 3,000+ learners and 105 educators annually.
                </p>
                <div className="text-sm text-ltl-deep-blue font-semibold">
                  10-20% literacy improvement within one term
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-hopeful-yellow/20 to-hopeful-yellow/30 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-hopeful-yellow rounded-2xl flex items-center justify-center mb-6">
                  <UsersIcon className="w-8 h-8 text-ltl-deep-blue" />
                </div>
                <h3 className="text-2xl font-bold text-ltl-deep-blue mb-4">Educator Training</h3>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  Professional development workshops covering classroom management, communication, 
                  and the Gattegno &quot;Words in Colour&quot; methodology.
                </p>
                <div className="text-sm text-ltl-deep-blue font-semibold">
                  700+ educators trained to date
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-charcoal rounded-2xl flex items-center justify-center mb-6">
                  <AcademicCapIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-ltl-deep-blue mb-4">Foundation Phase Curriculum</h3>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  Comprehensive literacy curriculum used by 30,000+ children, 
                  achieving up to 80% increase in average literacy scores.
                </p>
                <div className="text-sm text-ltl-deep-blue font-semibold">
                  35+ years of proven methodology
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section - Always shown */}
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
              Founded by Sonja Botha in 2010, Living Through Learning brings over 35 years of educational excellence 
              to disadvantaged communities across South Africa. Our mission: ensuring every child can read with meaning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/about"
                className="bg-hopeful-yellow text-ltl-deep-blue font-bold py-4 px-8 rounded-xl hover:bg-yellow-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Learn About Our Story
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

      {/* Success Stories Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-light-slate to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-charcoal mb-6">
                Real Results, Real Impact
              </h2>
              <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
                Hear from educators and see the measurable improvements in schools across South Africa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-ltl-deep-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">LM</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-ltl-deep-blue">Mrs. L Mntujani</h4>
                    <p className="text-charcoal/70 text-sm">Nooitgedacht Primary School</p>
                  </div>
                </div>
                <blockquote className="text-charcoal/80 italic leading-relaxed">
                  &quot;Our learners can now form letters correctly and are so much more prepared for grade 2. 
                  Children who couldn&apos;t speak English can now name objects and participate actively in class.&quot;
                </blockquote>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-hopeful-yellow rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-ltl-deep-blue font-bold">MP</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-ltl-deep-blue">Mrs. Petersen</h4>
                    <p className="text-charcoal/70 text-sm">Bontebok Primary School</p>
                  </div>
                </div>
                <blockquote className="text-charcoal/80 italic leading-relaxed">
                  &quot;Students are enthusiastic about English lessons now. They confidently participate 
                  in English conversations, and the classroom resources make learning so engaging.&quot;
                </blockquote>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-ltl-deep-blue/5 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-ltl-deep-blue mb-4">Proven Results</h3>
                <p className="text-lg text-charcoal/80">
                  In 2015, CAPS results in CRAR schools increased by <strong>9%</strong> from 1st to 2nd term, 
                  with an overall average increase of <strong>18%</strong> from baseline assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA Section - Always shown */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-hopeful-yellow/10 to-hopeful-yellow/5 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-charcoal mb-6 animate-fade-in-up">
              Join Our Mission
            </h2>
            <p className="text-lg md:text-xl text-charcoal/70 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Partner with us to transform foundation phase literacy education across South Africa.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Partner Schools", desc: "Implement Reading Adventure Rooms", href: "/contact" },
                { title: "Support Educators", desc: "Fund teacher training programs", href: "/contact" },
                { title: "Shop Materials", desc: "Purchase our proven curriculum", href: "/shop" }
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