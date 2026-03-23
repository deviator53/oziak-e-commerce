'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-gray-50 to-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="z-10 text-center lg:text-left">
          <h1 className="font-display text-6xl lg:text-7xl font-bold leading-tight mb-6 text-black">
            Elegance
            <br />
            <span className="italic text-gray-600">Redefined</span>
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
            Discover the art of bespoke menswear. Each piece is meticulously crafted to embody
            sophistication, style, and timeless elegance that speaks to the modern gentleman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/shop" className="btn btn-primary">
              Explore Collection
            </Link>
            <Link href="/custom" className="btn btn-outline">
              Custom Tailoring
            </Link>
          </div>
        </div>

        <div className="relative h-96 lg:h-[600px] order-first lg:order-last rounded-lg overflow-hidden">
          {sliderImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Oziak bespoke menswear ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'}`}
              priority={index === 0}
            />
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current ? 'bg-white w-4' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
