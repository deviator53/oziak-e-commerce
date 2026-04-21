'use client'

import { useRef, useEffect, useState, ReactNode, CSSProperties } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right'
  delay?: number
  style?: CSSProperties
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  style,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? undefined : 0,
        animation: inView ? `${animation} 0.6s ease-out ${delay}s both` : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
