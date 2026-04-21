'use client'

import { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import ReviewForm from './ReviewForm'

interface Review {
  id: string | number
  name: string
  role?: string | null
  content: string
  rating: number
}

const fallbackTestimonials: Review[] = [
  {
    id: 1,
    name: 'Chukwudi Okonkwo',
    role: 'Business Executive',
    content:
      'Oziak transformed my wardrobe completely. The attention to detail and craftsmanship is unmatched. Every piece fits perfectly and makes me feel confident.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Adebayo Williams',
    role: 'Entrepreneur',
    content:
      'The bespoke tailoring service is exceptional. They took time to understand my style and delivered beyond expectations. Highly recommend for anyone seeking quality.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emeka Nnamdi',
    role: 'Creative Director',
    content:
      'From consultation to final fitting, the experience was seamless. The craftsmanship speaks for itself. Oziak is my go-to for all formal and traditional wear.',
    rating: 5,
  },
]

interface TestimonialsProps {
  reviews?: Review[]
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const items = reviews && reviews.length > 0 ? reviews : fallbackTestimonials

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4 text-black">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from gentlemen who trust Oziak for their wardrobe
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.2} className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-gray-50 rounded-lg p-8 md:p-12 relative">
            <div className="absolute top-8 left-8 text-6xl text-gray-300 font-serif">&ldquo;</div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                {[...Array(items[activeIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                {items[activeIndex].content}
              </p>

              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-400 rounded-full mr-4 flex items-center justify-center text-white text-xl font-semibold">
                  {items[activeIndex].name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-black">{items[activeIndex].name}</h4>
                  {items[activeIndex].role && (
                    <p className="text-gray-600">{items[activeIndex].role}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-black w-8' : 'bg-gray-300'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))}
              className="p-3 border-2 border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))}
              className="p-3 border-2 border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.3} className="max-w-2xl mx-auto mt-16">
          <ReviewForm />
        </AnimatedSection>
      </div>
    </section>
  )
}
