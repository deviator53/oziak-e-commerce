'use client'

import { useState, FormEvent, useEffect } from 'react'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    date: '',
    time: '',
    notes: '',
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Fetch available slots when date changes
  useEffect(() => {
    if (!formData.date) {
      setAvailableSlots([])
      return
    }
    setLoadingSlots(true)
    setFormData((prev) => ({ ...prev, time: '' }))
    fetch(`/api/availability?date=${formData.date}`)
      .then((r) => r.json())
      .then((data) => setAvailableSlots(data.slots || []))
      .catch(() => setAvailableSlots([]))
      .finally(() => setLoadingSlots(false))
  }, [formData.date])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Consultation booked! We will confirm your appointment shortly.',
        })
        // Open WhatsApp notification if available
        if (data.whatsappUrl) {
          window.open(data.whatsappUrl, '_blank')
        }
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          serviceType: '',
          date: '',
          time: '',
          notes: '',
        })
        setTimeout(() => {
          onClose()
          setSubmitStatus({ type: null, message: '' })
        }, 2500)
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to submit. Please try again.',
        })
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatSlot = (slot: string) => {
    const [h, m] = slot.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hour = h % 12 || 12
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif">Book a Consultation</h2>
            <p className="text-sm text-gray-500 mt-0.5">Select a date to see available slots</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {submitStatus.type && (
            <div
              className={`p-4 rounded-md ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="">Select a service</option>
              <option value="bespoke-suit">Bespoke Suit</option>
              <option value="custom-shirt">Custom Shirt</option>
              <option value="native-wear">Native Wear</option>
              <option value="formal-wear">Formal Wear</option>
              <option value="alterations">Alterations</option>
              <option value="general">General Consultation</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Time *
              </label>
              {loadingSlots ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400 text-sm">
                  Loading slots...
                </div>
              ) : !formData.date ? (
                <div className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-400 text-sm bg-gray-50">
                  Select a date first
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="w-full px-3 py-2 border border-red-200 rounded-md text-red-500 text-sm bg-red-50">
                  No slots available on this date
                </div>
              ) : (
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select a time</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {formatSlot(slot)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Tell us about your requirements, style preferences, or any questions..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || (availableSlots.length === 0 && !!formData.date)}
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Booking...' : 'Book Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
