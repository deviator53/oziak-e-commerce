'use client'

import { useEffect } from 'react'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

// Replace with your actual Calendly URL
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username'

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
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

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className={`absolute inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-display text-2xl font-semibold text-black">Book a Consultation</h2>
            <p className="text-sm text-gray-500 mt-0.5">Choose a time that works for you</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
            aria-label="Close modal"
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

        {/* Calendly embed */}
        <div className="flex-1 overflow-hidden rounded-b-2xl">
          {isOpen && (
            <iframe
              src={`${CALENDLY_URL}?embed_domain=${typeof window !== 'undefined' ? window.location.host : ''}&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Book a Consultation"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}
