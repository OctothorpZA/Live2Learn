'use client'

import { useState } from 'react'
import Link from 'next/link'

// Main Header Component based on Sprint 3 Wireframe
export default function Header() {
  // State to manage the mobile menu's visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Hardcoded navigation links as per the sprint requirements
  const navLinks = [
    { href: '/work', label: 'Our Work' },
    { href: '/about', label: 'About Us' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/news', label: 'News & Stories' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Using a text placeholder for now */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold font-heading text-ltl-deep-blue">
              LTL Logo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-charcoal hover:text-ltl-deep-blue transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Donate Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/donate"
              className="inline-block bg-hopeful-yellow text-charcoal font-bold py-2 px-6 rounded-md hover:bg-yellow-400 transition-colors duration-200"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-ltl-deep-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ltl-deep-blue"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                // Close Icon (X)
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:bg-light-slate hover:text-ltl-deep-blue"
              >
                {link.label}
              </Link>
            ))}
            {/* Donate Button (Mobile) */}
            <div className="pt-4 pb-2 px-3">
              <Link
                href="/donate"
                className="block w-full text-center bg-hopeful-yellow text-charcoal font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors duration-200"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
