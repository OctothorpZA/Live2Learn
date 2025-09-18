import Link from 'next/link'
// Sanity imports are no longer needed for this test
// import { sanityFetch } from '@/sanity/lib/live'
// import { settingsQuery } from '@/sanity/lib/queries'
// import { SettingsQueryResult } from '@/sanity.types'

// Import Font Awesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

// Stroopwafel Icon for the developer credit
const StroopwafelIcon = () => (
  <svg
    className="w-5 h-5 inline-block text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M188.12 210.74L142.86 256l45.25 45.25L233.37 256l-45.25-45.26zm113.13-22.62L256 142.86l-45.25 45.25L256 233.37l45.25-45.25zm-90.5 135.76L256 369.14l45.26-45.26L256 278.63l-45.25 45.25zM256 0C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm186.68 295.6l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0l-28.29-28.29-45.25 45.25 33.94 33.94 16.97-16.97c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31l-16.97 16.97 16.97 16.97c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0l-16.97-16.97-16.97 16.97c-3.12 3.12-8.19 3.12-11.31 0l-11.31-11.31c-3.12-3.12-3.12-8.19 0-11.31l16.97-16.97-33.94-33.94-45.26 45.26 28.29 28.29c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0L256 414.39l-28.29 28.29c-3.12 3.12-8.19 3.12-11.31 0l-11.31-11.31c-3.12-3.12-3.12-8.19 0-11.31l28.29-28.29-45.25-45.26-33.94 33.94 16.97 16.97c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12 3.12-8.19 3.12-11.31 0l-16.97-16.97-16.97 16.97c-3.12 3.12-8.19 3.12-11.31 0l-11.31-11.31c-3.12-3.12-3.12-8.19 0-11.31l16.97-16.97-16.97-16.97c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12 3.12 8.19-3.12 11.31 0l16.97 16.97 33.94-33.94-45.25-45.25-28.29 28.29c-3.12 3.12-8.19 3.12-11.31 0L69.32 295.6c-3.12-3.12-3.12-8.19 0-11.31L97.61 256l-28.29-28.29c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0l28.29 28.29 45.25-45.26-33.94-33.94-16.97 16.97c-3.12 3.12-8.19 3.12-11.31 0l-11.31-11.31c-3.12-3.12-3.12-8.19 0-11.31l16.97-16.97-16.97-16.97c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0l16.97 16.97 16.97-16.97c3.12 3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31l-16.97 16.97 33.94 33.94 45.26-45.25-28.29-28.29c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0L256 97.61l28.29-28.29c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31l-28.29 28.29 45.26 45.25 33.94-33.94-16.97-16.97c-3.12-3.12-3.12-8.19 0-11.31l11.31-11.31c3.12-3.12 8.19-3.12 11.31 0l16.97 16.97 16.97-16.97c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31l-16.97 16.97 16.97 16.97c3.12 3.12 3.12 8.19 0 11.31l-11.31 11.31c-3.12-3.12-8.19-3.12-11.31 0l-16.97-16.97-33.94 33.94 45.25 45.26 28.29-28.29c3.12-3.12 8.19-3.12 11.31 0l11.31 11.31c3.12 3.12 3.12 8.19 0 11.31L414.39 256l28.29 28.28a8.015 8.015 0 0 1 0 11.32zM278.63 256l45.26 45.25L369.14 256l-45.25-45.26L278.63 256z"
    ></path>
  </svg>
)

// The component is no longer async as it doesn't fetch data
export default function Footer() {
  // --- ISOLATION TEST: Using hardcoded data to bypass Sanity ---
  const socialLinks = [
    {
      _key: '1',
      platform: 'facebook',
      url: 'https://www.facebook.com/livingthroughlearning',
    },
    {
      _key: '2',
      platform: 'linkedin',
      url: 'https://www.linkedin.com/company/living-through-learning/',
    },
    {
      _key: '3',
      platform: 'instagram',
      url: 'https://www.instagram.com/livingthroughlearning/',
    },
  ]

  const iconMap: { [key: string]: IconDefinition } = {
    facebook: faFacebook,
    linkedin: faLinkedin,
    instagram: faInstagram,
  }

  return (
    <footer className="bg-light-slate text-charcoal border-t border-gray-200 relative overflow-hidden">
      {/* Background pattern from your design */}
      <div className="absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-10 bg-position-[0_1] z-0" />

      {/* Main Footer Area */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold font-heading text-ltl-deep-blue mb-4">
              LTL Logo
            </h3>
            <p className="mb-4 text-sm">
              Empowering learners and educators for a brighter future.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const platformKey = link.platform || ''
                const icon = iconMap[platformKey]

                if (!icon || !link.url) {
                  return null
                }

                return (
                  <a
                    key={link._key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-ltl-deep-blue transition-colors"
                    aria-label={`Follow us on ${link.platform}`}
                  >
                    <FontAwesomeIcon icon={icon} size="2x" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold font-heading mb-3 text-charcoal">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/programs" className="hover:underline">Our Work</Link></li>
              <li><Link href="/news" className="hover:underline">News & Stories</Link></li>
              <li><Link href="/impact" className="hover:underline">Impact Hub</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/financials" className="hover:underline">Financials</Link></li>
              <li><Link href="/careers" className="hover:underline">Careers</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Get Involved Links */}
          <div>
            <h4 className="font-bold font-heading mb-3 text-charcoal">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/get-involved" className="hover:underline">Ways to Give</Link></li>
              <li><Link href="/shop" className="hover:underline">Shop to Support</Link></li>
              <li><Link href="/donate" className="hover:underline font-bold text-ltl-deep-blue">Donate Now</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup Placeholder */}
          <div>
            <h4 className="font-bold font-heading mb-3 text-charcoal">Stay Updated</h4>
            <p className="mb-2 text-sm">Join our newsletter to get the latest news.</p>
            <form>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 bg-white"
                disabled
              />
              <button
                type="submit"
                className="w-full bg-ltl-deep-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                disabled
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bar */}
      <div className="relative z-10 bg-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; 2013-{new Date().getFullYear()} Living Through Learning. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-2">
            Powered by #ITWS
            <StroopwafelIcon />
          </p>
        </div>
      </div>
    </footer>
  )
}

