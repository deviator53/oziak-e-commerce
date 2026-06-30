'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import CartDropdown from './CartDropdown'
import SearchOverlay from './SearchOverlay'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/custom', label: 'Custom' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <header
        className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-gray-200'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="text-black no-underline">
              <div className="flex flex-col items-start">
                <span className="font-display text-3xl font-bold tracking-wider leading-none">
                  OZIAK
                </span>
                <span className="text-xs font-light tracking-wide mt-0.5 text-gray-600">
                  ELEGANCE REDEFINED
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium uppercase tracking-wide py-2 text-black hover:text-gray-500 transition-colors relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              <Link
                href="/account"
                className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Account"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

              <CartDropdown />

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-black transition-all duration-300 origin-center ${
                      isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-black transition-all duration-200 ${
                      isMenuOpen ? 'opacity-0 scale-x-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-black transition-all duration-300 origin-center ${
                      isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation — animated slide */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="border-t border-gray-100 py-4 space-y-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block px-2 py-3 text-sm font-medium uppercase tracking-wide text-black hover:text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
