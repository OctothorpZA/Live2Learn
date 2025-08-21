// frontend/app/contact/page.tsx

'use client'

import { useState } from 'react'
import { sendContactEmail } from '@/app/actions'

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      setFormData({ name: '', email: '', subject: '', message: '' }) // Clear form
    } else {
      setStatus({ loading: false, success: false, error: result.error || 'An unknown error occurred.' })
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ltl-blue-900 sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            We&apos;d love to hear from you. Please fill out the form below, and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column: Contact Details */}
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-ltl-blue-900">
              Our Information
            </h2>
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>123 Learning Lane, Cape Town, 8001, South Africa</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+27 21 123 4567</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>
                  <a
                    href="mailto:info@livingthroughlearning.org"
                    className="text-ltl-orange-500 hover:underline"
                  >
                    info@livingthroughlearning.org
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="rounded-lg bg-white p-8 shadow-lg">
            {status.success ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-ltl-blue-900">
                  Message Sent!
                </h2>
                <p className="mt-4 text-gray-600">
                  Thank you for getting in touch. We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ltl-orange-500 focus:ring-ltl-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ltl-orange-500 focus:ring-ltl-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ltl-orange-500 focus:ring-ltl-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ltl-orange-500 focus:ring-ltl-orange-500 sm:text-sm"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="w-full rounded-md border border-transparent bg-ltl-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-ltl-orange-600 focus:outline-none focus:ring-2 focus:ring-ltl-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {status.loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {status.error && (
                  <p className="text-sm text-red-600">{status.error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
