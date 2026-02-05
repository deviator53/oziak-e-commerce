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
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
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
      {isAdding ? 'Adding...' : added ? 'Added!' : 'Quick Add'}
    </button>
  )
}
