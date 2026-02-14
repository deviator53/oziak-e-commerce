'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/payload-types'

interface AddToCartButtonProps {
  product: Product
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline'
}

export default function AddToCartButton({
  product,
  className = '',
  size = 'md',
  variant = 'primary',
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if used inside a Link
    e.stopPropagation()

    setIsAdding(true)

    try {
      // For quick add, use default selections
      const defaultSize = product.sizes?.[0]?.size || ''
      const defaultColor = product.colors?.[0]?.name || ''

      addItem({
        productId: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        size: defaultSize,
        color: defaultColor,
        image:
          product.images?.[0] &&
          typeof product.images[0].image === 'object' &&
          'url' in product.images[0].image
            ? product.images[0].image.url || undefined
            : undefined,
      })

      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-2.5 text-sm',
    lg: 'p-3 text-base',
  }

  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
  }

  return (
    <button
      onClick={handleQuickAdd}
      disabled={isAdding}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-medium rounded-lg transition-all duration-200 uppercase tracking-wide
        disabled:opacity-50 disabled:cursor-not-allowed
        ${added ? 'bg-green-600 hover:bg-green-600' : ''}
        ${className}
      `}
    >
      {isAdding ? (
        <svg
          className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} animate-spin`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : added ? (
        <svg
          className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
        </svg>
      ) : (
        <svg
          className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      )}
    </button>
  )
}
