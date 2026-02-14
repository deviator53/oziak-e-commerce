'use client'

import Link from 'next/link'
import { useState } from 'react'
import CartDropdown from './CartDropdown'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
            <Link
              href="/shop"
              className="text-sm font-medium uppercase tracking-wide py-2 text-black hover:text-gray-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/custom"
              className="text-sm font-medium uppercase tracking-wide py-2 text-black hover:text-gray-600 transition-colors"
            >
              Custom
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium uppercase tracking-wide py-2 text-black hover:text-gray-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium uppercase tracking-wide py-2 text-black hover:text-gray-600 transition-colors"
            >
              Journal
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium uppercase tracking-wide py-2 text-black hover:text-gray-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-black hover:opacity-70 transition-opacity"
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
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            <Link
              href="/account"
              className="p-2 text-black hover:opacity-70 transition-opacity"
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>

            <CartDropdown />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div
                className={`flex flex-col w-5 h-4 relative ${isMenuOpen ? 'space-y-0' : 'space-y-1'}`}
              >
                <span
                  className={`block h-0.5 w-full bg-black transition-all duration-200 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-black transition-all duration-200 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-black transition-all duration-200 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden border-t border-gray-200 py-4 space-y-4 ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <Link
            href="/shop"
            className="block text-sm font-medium uppercase tracking-wide text-black hover:text-gray-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/custom"
            className="block text-sm font-medium uppercase tracking-wide text-black hover:text-gray-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Custom
          </Link>
          <Link
            href="/about"
            className="block text-sm font-medium uppercase tracking-wide text-black hover:text-gray-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/blog"
            className="block text-sm font-medium uppercase tracking-wide text-black hover:text-gray-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Journal
          </Link>
          <Link
            href="/contact"
            className="block text-sm font-medium uppercase tracking-wide text-black hover:text-gray-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
