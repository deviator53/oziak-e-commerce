'use client'

import { useState, FormEvent } from 'react'

export default function ReviewForm() {
  const [formData, setFormData] = useState({ name: '', role: '', content: '', rating: 5 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  })
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: '' })

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', message: data.message })
        setFormData({ name: '', role: '', content: '', rating: 5 })
      } else {
        setStatus({ type: 'error', message: data.error })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-8">
      <h3 className="font-display text-2xl font-semibold mb-6 text-black">Share Your Experience</h3>

      {status.type && (
        <div
          className={`mb-6 p-4 rounded-md text-sm ${
            status.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, rating: star }))}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <span
                  className={
                    star <= (hoveredStar || formData.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="review-name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              id="review-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="review-role" className="block text-sm font-medium text-gray-700 mb-2">
              Title / Occupation
            </label>
            <input
              id="review-role"
              type="text"
              value={formData.role}
              onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
              placeholder="e.g. Entrepreneur"
            />
          </div>
        </div>

        <div>
          <label htmlFor="review-content" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="review-content"
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors resize-none"
            placeholder="Tell us about your experience with Oziak..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Reviews are moderated and will appear after approval.
        </p>
      </form>
    </div>
  )
}
