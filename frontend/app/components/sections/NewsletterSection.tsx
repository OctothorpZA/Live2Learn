'use client'

import { useState } from 'react'

// Custom Icons
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

type NewsletterSectionProps = {
  heading?: string
  subheading?: string
  benefits?: string[]
  placeholder?: string
  buttonText?: string
  backgroundColor?: 'light' | 'dark' | 'gradient' | 'white'
  layout?: 'centered' | 'split'
}

export default function NewsletterSection({
  heading = "Stay Connected with Our Impact",
  subheading = "Get the latest updates on our literacy programs, success stories, and ways to get involved in transforming communities.",
  benefits = [
    "Monthly impact reports and success stories",
    "Early access to volunteer opportunities",
    "Updates on new programs and initiatives",
    "Educational resources and literacy tips"
  ],
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  backgroundColor = 'gradient',
  layout = 'split'
}: NewsletterSectionProps) {

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    // Simulate API call - replace with actual newsletter subscription
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setMessage('Thank you for subscribing! Check your email to confirm.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const bgClasses = {
    light: 'bg-gradient-to-br from-gray-50 to-white',
    dark: 'bg-gradient-to-br from-ltl-deep-blue to-ltl-deep-blue/90 text-white',
    gradient: 'bg-gradient-to-r from-ltl-deep-blue via-ltl-deep-blue to-ltl-deep-blue/90 text-white',
    white: 'bg-white'
  }

  const textClasses = {
    light: 'text-charcoal',
    dark: 'text-white',
    gradient: 'text-white',
    white: 'text-charcoal'
  }

  const cardBgClasses = {
    light: 'bg-white',
    dark: 'bg-white/10 backdrop-blur-sm border-white/20',
    gradient: 'bg-white/10 backdrop-blur-sm border-white/20',
    white: 'bg-gray-50'
  }

  return (
    <section className={`py-16 md:py-24 ${bgClasses[backgroundColor]} relative overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-hopeful-yellow rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className={`${layout === 'centered' ? 'text-center' : 'grid md:grid-cols-2 gap-12 md:gap-16 items-center'}`}>
          
          {/* Content Side */}
          <div className={layout === 'centered' ? 'max-w-3xl mx-auto' : ''}>
            <div className={layout === 'centered' ? 'mb-8' : 'mb-6'}>
              <h2 className={`text-3xl md:text-5xl font-bold font-heading ${textClasses[backgroundColor]} mb-4 animate-fade-in-up`}>
                {heading}
              </h2>
              <p className={`text-lg md:text-xl ${backgroundColor === 'white' || backgroundColor === 'light' ? 'text-charcoal/70' : 'text-white/90'} leading-relaxed animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
                {subheading}
              </p>
            </div>

            {/* Benefits List - Only show in split layout */}
            {layout === 'split' && benefits && benefits.length > 0 && (
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckIcon className={`w-5 h-5 ${backgroundColor === 'white' || backgroundColor === 'light' ? 'text-ltl-deep-blue' : 'text-hopeful-yellow'} flex-shrink-0 mt-0.5`} />
                      <span className={`${backgroundColor === 'white' || backgroundColor === 'light' ? 'text-charcoal/80' : 'text-white/80'}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Form Side */}
          <div className="animate-fade-in-up" style={{ animationDelay: layout === 'centered' ? '0.2s' : '0.3s' }}>
            <div className={`${cardBgClasses[backgroundColor]} rounded-2xl p-8 shadow-xl border ${backgroundColor === 'white' || backgroundColor === 'light' ? 'border-gray-100' : 'border-white/20'}`}>
              
              {/* Form Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${backgroundColor === 'white' || backgroundColor === 'light' ? 'bg-ltl-deep-blue/10' : 'bg-white/20'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <MailIcon className={`w-8 h-8 ${backgroundColor === 'white' || backgroundColor === 'light' ? 'text-ltl-deep-blue' : 'text-white'}`} />
                </div>
                <h3 className={`text-xl font-bold ${textClasses[backgroundColor]}`}>
                  Join Our Community
                </h3>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    disabled={status === 'loading'}
                    className={`w-full px-4 py-3 rounded-xl border ${backgroundColor === 'white' || backgroundColor === 'light' ? 'border-gray-200 bg-white text-charcoal' : 'border-white/20 bg-white/10 text-white placeholder-white/60'} focus:outline-none focus:ring-2 focus:ring-hopeful-yellow focus:border-transparent transition-all duration-300 disabled:opacity-50`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-hopeful-yellow text-ltl-deep-blue font-bold py-3 px-6 rounded-xl hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                >
                  <span>
                    {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : buttonText}
                  </span>
                  {status === 'idle' && (
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                  {status === 'success' && (
                    <CheckIcon className="w-4 h-4" />
                  )}
                </button>

                {/* Status Message */}
                {message && (
                  <div className={`text-sm ${status === 'success' ? (backgroundColor === 'white' || backgroundColor === 'light' ? 'text-green-600' : 'text-green-300') : (backgroundColor === 'white' || backgroundColor === 'light' ? 'text-red-600' : 'text-red-300')} text-center animate-fade-in-up`}>
                    {message}
                  </div>
                )}
              </form>

              {/* Privacy Note */}
              <p className={`text-xs ${backgroundColor === 'white' || backgroundColor === 'light' ? 'text-charcoal/60' : 'text-white/60'} text-center mt-4`}>
                We respect your privacy and will never spam you. Unsubscribe at any time.
              </p>
            </div>
          </div>
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