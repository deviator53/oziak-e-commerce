'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface SearchResult {
  id: string
  name: string
  slug: string
  price: number
  image?: string
  category?: string
}

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price)

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data.results || [])
      }
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(query), 320)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, search])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
    } else {
      setQuery('')
      setResults([])
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white w-full shadow-2xl animate-slide-down">
        <div className="container py-6">
          {/* Input row */}
          <div className="flex items-center gap-4">
            <svg
              className="w-5 h-5 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for garments, styles, categories..."
              className="flex-1 text-lg outline-none placeholder-gray-400 bg-transparent"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Results */}
          {query.length >= 2 && (
            <div className="mt-6 pb-2 max-h-[60vh] overflow-y-auto">
              {loading && (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                </div>
              )}

              {!loading && results.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}

              {!loading && results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/products/${result.slug}`}
                      onClick={onClose}
                      className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        {result.image ? (
                          <Image
                            src={result.image}
                            alt={result.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        {result.category && (
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                            {result.category}
                          </p>
                        )}
                        <p className="font-medium text-sm text-black group-hover:text-gray-700 truncate">
                          {result.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">{formatPrice(result.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {query.length < 2 && (
            <div className="mt-6 pb-2">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Quick Links</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Kaftan',
                  'Suits',
                  'Shirts',
                  'Accessories',
                  'New Arrivals',
                  'Custom Tailoring',
                ].map((tag) => (
                  <Link
                    key={tag}
                    href={`/shop?q=${encodeURIComponent(tag)}`}
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
