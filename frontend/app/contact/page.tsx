'use client'

import { useState } from 'react'
import { sendContactEmail } from '@/app/actions'

// Custom SVG Icons
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EnvelopeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const ChatBubbleLeftRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const PaperAirplaneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: '' })

    const result = await sendContactEmail(formData)

    if (result.success) {
      setStatus({ loading: false, success: true, error: '' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus({ loading: false, success: false, error: result.error || 'An unknown error occurred.' })
    }
  }

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Visit Our Office',
      detail: '123 Learning Lane',
      subDetail: 'Cape Town, 8001, South Africa',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      detail: '+27 21 123 4567',
      subDetail: 'Mon-Fri 9AM-5PM SAST',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      detail: 'info@livingthroughlearning.org',
      subDetail: 'We\'ll respond within 24 hours',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      detail: 'Monday - Friday',
      subDetail: '9:00 AM - 5:00 PM SAST',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  const subjectOptions = [
    'General Inquiry',
    'Partnership Opportunity',
    'Volunteer Interest',
    'Media & Press',
    'Technical Support',
    'Donations',
    'Other',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-slate via-white to-light-slate">
      {/* Hero Section with Animated Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-ltl-deep-blue rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-hopeful-yellow rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-ltl-deep-blue rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-hopeful-yellow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-ltl-deep-blue mb-6 animate-fade-in-up">
              Get in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ltl-deep-blue to-hopeful-yellow">
                Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Ready to unlock a child&apos;s potential? Let&apos;s start a conversation about making literacy accessible for everyone.
            </p>
            <div className="flex items-center justify-center space-x-2 text-ltl-deep-blue animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
              <span className="text-lg font-medium">We&apos;d love to hear from you</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <h3 className="font-bold font-heading text-charcoal mb-2">{info.title}</h3>
                <p className="text-charcoal font-medium mb-1">{info.detail}</p>
                <p className="text-charcoal/60 text-sm">{info.subDetail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Decorative */}
                <div className="bg-gradient-to-br from-ltl-deep-blue to-ltl-deep-blue/80 p-8 lg:p-12 text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>
                  
                  <div className="relative">
                    <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
                      Let&apos;s Build Something Amazing Together
                    </h2>
                    <p className="text-white/90 text-lg mb-8 leading-relaxed">
                      Whether you&apos;re a school looking for partnership, a volunteer ready to make a difference, or someone with innovative ideas for literacy development, we want to connect with you.
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-4">
                      {[
                        'Quick response within 24 hours',
                        'Personalized consultation available',
                        'Multiple ways to get involved',
                        'Expert guidance and support'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-hopeful-yellow flex-shrink-0" />
                          <span className="text-white/90">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 lg:p-12">
                  {status.success ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircleIcon className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold font-heading text-charcoal mb-4">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-charcoal/70 mb-6">
                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus({ loading: false, success: false, error: '' })}
                        className="text-ltl-deep-blue hover:text-ltl-deep-blue/80 font-medium"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold font-heading text-charcoal mb-2">
                          Send Us a Message
                        </h3>
                        <p className="text-charcoal/60">Fill out the form below and we&apos;ll be in touch soon.</p>
                      </div>

                      {/* Name Field */}
                      <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <UserIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-ltl-deep-blue' : 'text-gray-400'}`} />
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ltl-deep-blue focus:border-ltl-deep-blue transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <EnvelopeIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-ltl-deep-blue' : 'text-gray-400'}`} />
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ltl-deep-blue focus:border-ltl-deep-blue transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      {/* Subject Field */}
                      <div className="relative">
                        <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ltl-deep-blue focus:border-ltl-deep-blue transition-all duration-200 bg-gray-50 focus:bg-white"
                        >
                          <option value="">Select a subject</option>
                          {subjectOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message Field */}
                      <div className="relative">
                        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ltl-deep-blue focus:border-ltl-deep-blue transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                          placeholder="Tell us about your inquiry, partnership ideas, or how you'd like to get involved..."
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status.loading}
                        className="w-full bg-gradient-to-r from-ltl-deep-blue to-ltl-deep-blue/90 hover:from-ltl-deep-blue/90 hover:to-ltl-deep-blue text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                      >
                        {status.loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                          </>
                        )}
                      </button>

                      {/* Error Message */}
                      {status.error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-red-600 text-sm font-medium">{status.error}</p>
                        </div>
                      )}

                      {/* Privacy Notice */}
                      <p className="text-xs text-charcoal/60 text-center">
                        By submitting this form, you agree to our privacy policy. We&apos;ll never share your information with third parties.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-ltl-deep-blue/5 to-hopeful-yellow/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-ltl-deep-blue mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Join our community of educators, volunteers, and partners working together to unlock every child&apos;s potential through literacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-involved"
              className="bg-ltl-deep-blue hover:bg-ltl-deep-blue/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Explore Opportunities
            </a>
            <a
              href="/programs"
              className="bg-white hover:bg-gray-50 text-ltl-deep-blue px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl border-2 border-ltl-deep-blue/20"
            >
              View Our Programs
            </a>
          </div>
        </div>
      </section>

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