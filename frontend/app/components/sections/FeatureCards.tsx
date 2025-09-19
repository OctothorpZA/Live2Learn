'use client'

import Link from 'next/link'

// Custom Icons
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const LightBulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  check: CheckIcon,
  lightbulb: LightBulbIcon,
  heart: HeartIcon,
  users: UsersIcon,
  globe: GlobeIcon,
  arrow: ArrowRightIcon,
}

type FeatureCard = {
  _key: string
  title: string
  description: string
  icon?: string
  link?: {
    url: string
    label: string
  }
  features?: string[]
}

type FeatureCardsProps = {
  heading?: string
  subheading?: string
  cards?: FeatureCard[]
  columns?: 2 | 3 | 4
  backgroundColor?: 'light' | 'dark' | 'white'
}

export default function FeatureCards({
  heading = "How We're Making a Difference",
  subheading = "Discover the key ways we're transforming education and communities",
  cards = [],
  columns = 3,
  backgroundColor = 'white'
}: FeatureCardsProps) {

  // Default cards if none provided
  const defaultCards: FeatureCard[] = [
    {
      _key: '1',
      title: 'Innovative Programs',
      description: 'We develop cutting-edge literacy programs that adapt to each community\'s unique needs and challenges.',
      icon: 'lightbulb',
      link: {
        url: '/programs',
        label: 'Explore Programs'
      },
      features: ['Adaptive Learning', 'Community-Centered', 'Research-Based']
    },
    {
      _key: '2', 
      title: 'Strong Partnerships',
      description: 'We work closely with schools, communities, and organizations to create lasting educational partnerships.',
      icon: 'users',
      link: {
        url: '/partnerships',
        label: 'Our Partners'
      },
      features: ['School Networks', 'Community Leaders', 'Educational NGOs']
    },
    {
      _key: '3',
      title: 'Measurable Impact',
      description: 'Our programs deliver real, trackable results in literacy rates and educational outcomes.',
      icon: 'check',
      link: {
        url: '/impact',
        label: 'View Impact'
      },
      features: ['Data-Driven', 'Transparent Reporting', 'Continuous Improvement']
    }
  ]

  const displayCards = cards.length > 0 ? cards : defaultCards

  const bgClasses = {
    light: 'bg-gray-50',
    dark: 'bg-ltl-deep-blue text-white',
    white: 'bg-white'
  }

  const cardBgClasses = {
    light: 'bg-white',
    dark: 'bg-white/10 backdrop-blur-sm border-white/20',
    white: 'bg-white'
  }

  const textClasses = {
    light: 'text-charcoal',
    dark: 'text-white',
    white: 'text-charcoal'
  }

  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className={`py-16 md:py-24 ${bgClasses[backgroundColor]} relative overflow-hidden`}>
      {/* Background Elements */}
      {backgroundColor !== 'white' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-40 h-40 bg-hopeful-yellow rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-ltl-deep-blue rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      )}

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold font-heading ${textClasses[backgroundColor]} mb-4 animate-fade-in-up`}>
            {heading}
          </h2>
          {subheading && (
            <p className={`text-lg md:text-xl ${backgroundColor === 'dark' ? 'text-white/90' : 'text-charcoal/70'} max-w-3xl mx-auto animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
              {subheading}
            </p>
          )}
        </div>

        {/* Feature Cards Grid */}
        <div className={`grid grid-cols-1 ${columnClasses[columns]} gap-8 md:gap-8`}>
          {displayCards.map((card, index) => {
            const IconComponent = card.icon ? iconMap[card.icon] : LightBulbIcon
            
            return (
              <div
                key={card._key}
                className={`group ${cardBgClasses[backgroundColor]} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border ${backgroundColor === 'dark' ? 'border-white/20' : 'border-gray-100'} animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${backgroundColor === 'light' || backgroundColor === 'white' ? 'bg-ltl-deep-blue/10' : 'bg-white/20'} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${backgroundColor === 'light' || backgroundColor === 'white' ? 'text-ltl-deep-blue' : 'text-white'}`} />
                </div>

                {/* Content */}
                <h3 className={`text-xl md:text-2xl font-bold font-heading ${textClasses[backgroundColor]} mb-4`}>
                  {card.title}
                </h3>
                
                <p className={`${backgroundColor === 'dark' ? 'text-white/80' : 'text-charcoal/70'} mb-6 leading-relaxed`}>
                  {card.description}
                </p>

                {/* Features List */}
                {card.features && card.features.length > 0 && (
                  <ul className="mb-6 space-y-2">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-center space-x-2 text-sm ${backgroundColor === 'dark' ? 'text-white/70' : 'text-charcoal/60'}`}>
                        <CheckIcon className={`w-4 h-4 ${backgroundColor === 'light' || backgroundColor === 'white' ? 'text-ltl-deep-blue' : 'text-hopeful-yellow'} flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Link */}
                {card.link && (
                  <Link
                    href={card.link.url}
                    className={`inline-flex items-center space-x-2 ${backgroundColor === 'light' || backgroundColor === 'white' ? 'text-ltl-deep-blue hover:text-hopeful-yellow' : 'text-white hover:text-hopeful-yellow'} font-medium transition-colors duration-300 group-hover:translate-x-1`}
                  >
                    <span>{card.link.label}</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform duration-300" />
                  </Link>
                )}
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