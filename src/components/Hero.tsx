'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'

const sliderImages = [
  '/images/slider/oziak-1.jpeg',
  '/images/slider/oziak-2.jpeg',
  '/images/slider/oziak-3.jpeg',
  '/images/slider/oziak-4.jpeg',
  '/images/slider/oziak-5.jpeg',
  '/images/slider/oziak-6.jpeg',
  '/images/slider/oziak-7.jpeg',
  '/images/slider/oziak-8.jpeg',
  '/images/slider/oziak-9.jpeg',
  '/images/slider/oziak-10.jpeg',
  '/images/slider/oziak-11.jpeg',
  '/images/slider/oziak-12.jpeg',
  '/images/slider/oziak-13.jpeg',
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return
      setPrev(current)
      setTransitioning(true)
      setCurrent(index)
      setTimeout(() => {
        setPrev(null)
        setTransitioning(false)
      }, 700)
    },
    [current, transitioning],
  )

  const next = useCallback(() => goTo((current + 1) % sliderImages.length), [current, goTo])
  const back = useCallback(
    () => goTo((current - 1 + sliderImages.length) % sliderImages.length),
    [current, goTo],
  )

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4500)
    return () => clearInterval(timer)
  }, [next, paused])

  const scrollDown = () => {
    const section = document.getElementById('categories')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gray-900">
      {/* Slider images */}
      {sliderImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current
              ? 'opacity-100 z-10'
              : prev === index
                ? 'opacity-0 z-10'
                : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={src}
            alt={`Oziak collection ${index + 1}`}
            fill
            className={`object-cover ${index === current ? 'scale-105 transition-transform duration-[8000ms] ease-out' : 'scale-100'}`}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-xl">
          <p
            className="text-xs uppercase tracking-[0.35em] text-white/70 mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            Bespoke Menswear · Lagos
          </p>
          <h1
            className="font-display text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6 text-white animate-fade-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            Elegance
            <br />
            <span className="italic font-light">Redefined</span>
          </h1>
          <p
            className="text-lg text-white/80 leading-relaxed mb-10 max-w-md animate-fade-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
          >
            Discover the art of bespoke menswear. Each piece meticulously crafted to embody
            sophistication and timeless elegance.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
            >
              Explore Collection
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/custom"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white/60 px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Custom Tailoring
            </Link>
          </div>
        </div>
      </div>

      {/* Slide nav arrows */}
      <div className="absolute z-30 top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <button
          onClick={back}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="pointer-events-auto w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={next}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="pointer-events-auto w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current ? 'bg-white w-6 h-2' : 'bg-white/40 hover:bg-white/70 w-2 h-2'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5 group-hover:border-white/60 transition-colors">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll-dot" />
        </div>
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-6 z-30 text-white/50 text-xs font-mono">
        {String(current + 1).padStart(2, '0')} / {String(sliderImages.length).padStart(2, '0')}
      </div>
    </section>
  )
}
