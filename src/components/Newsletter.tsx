'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      // Here you would integrate with your email service
      // For now, we'll simulate a successful subscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage('Thank you for subscribing!')
      setEmail('')
    } catch (_error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4 text-white">
            Stay in Style
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Be the first to know about new collections, exclusive offers, and styling tips from our
            master tailors.
          </p>

          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 border-2 border-gray-600 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black border-2 border-white rounded-lg font-semibold hover:bg-transparent hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {message && (
              <p
                className={`text-sm mt-2 px-2 py-1 rounded ${
                  message.includes('Thank you')
                    ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                    : 'text-red-400 bg-red-400/10 border border-red-400/20'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
