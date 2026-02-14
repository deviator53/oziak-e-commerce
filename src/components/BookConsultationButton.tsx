'use client'

import { useState } from 'react'
import ConsultationModal from './ConsultationModal'

interface BookConsultationButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function BookConsultationButton({
  className = 'btn btn-primary',
  children = 'Book Consultation',
}: BookConsultationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={className}>
        {children}
      </button>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
