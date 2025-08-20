import Link from 'next/link'

// Placeholder for social media icons
const SocialIcon = ({ platform }: { platform: string }) => (
  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600">
    {platform.charAt(0)}
  </div>
)

// Stroopwafel Icon for the developer credit
const StroopwafelIcon = () => (
  <svg
    className="w-5 h-5 inline-block text-gray-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z" />
    <path d="M5.64,18.36 L18.36,5.64" />
    <path d="M18.36,18.36 L5.64,5.64" />
    <path d="M12,5 L12,19" />
    <path d="M5,12 L19,12" />
  </svg>
)

// Main Footer Component based on Sprint 3 Wireframe
export default function Footer() {
  return (
    <footer className="bg-light-slate text-charcoal border-t border-gray-200 relative overflow-hidden">
      {/* Background pattern from the original template */}
      <div className="absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-10 bg-position-[0_1] z-0" />

      {/* Main Footer Area - z-10 ensures it sits above the background pattern */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* LTL Info Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold font-heading text-ltl-deep-blue mb-2">LTL Logo</h3>
            <p className="text-base max-w-md">
              Living Through Learning is dedicated to unlocking a child&apos;s future, one word at a time.
            </p>
            <div className="mt-4 flex space-x-4">
              <SocialIcon platform="FB" />
              <SocialIcon platform="TW" />
              <SocialIcon platform="IG" />
              <SocialIcon platform="LI" />
            </div>
          </div>

          {/* Secondary Navigation */}
          <div>
            <h4 className="font-bold font-heading mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/financials" className="hover:underline">Financials</Link></li>
              <li><Link href="/careers" className="hover:underline">Careers</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup Placeholder */}
          <div>
            <h4 className="font-bold font-heading mb-3">Stay Updated</h4>
            <p className="mb-2 text-sm">Join our newsletter to get the latest news.</p>
            <form>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
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

      {/* Sub-Footer Bar - z-10 ensures it sits above the background pattern */}
      <div className="relative z-10 bg-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Living Through Learning. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-2">
            Powered by octothorp
            <StroopwafelIcon />
          </p>
        </div>
      </div>
    </footer>
  )
}
