'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/payload-types'

interface ProductQuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size')
      return
    }

    const imageUrl =
      product.images?.[0] &&
      typeof product.images[0].image === 'object' &&
      'url' in product.images[0].image
        ? product.images[0].image.url || undefined
        : undefined

    addItem({
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: imageUrl,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
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

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              {product.images && product.images.length > 0 ? (
                <>
                  {typeof product.images[selectedImageIndex]?.image === 'object' &&
                  'url' in product.images[selectedImageIndex].image ? (
                    <Image
                      src={product.images[selectedImageIndex].image.url || ''}
                      alt={product.images[selectedImageIndex].image.alt || product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    {typeof img.image === 'object' && 'url' in img.image && (
                      <Image
                        src={img.image.url || ''}
                        alt={img.image.alt || product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-3xl font-serif mb-4">{product.name}</h2>
            <p className="text-2xl font-bold mb-6">₦{product.price.toFixed(2)}</p>

            {product.shortDescription && (
              <p className="text-gray-600 mb-6">{product.shortDescription}</p>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Select Size {selectedSize && `- ${selectedSize}`}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size || '')}
                      disabled={sizeOption.stock === 0}
                      className={`py-3 px-4 border-2 rounded-md font-medium transition-colors ${
                        selectedSize === sizeOption.size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : sizeOption.stock > 0
                            ? 'border-gray-300 hover:border-gray-900'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {sizeOption.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Select Color {selectedColor && `- ${selectedColor}`}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((colorOption) => (
                    <button
                      key={colorOption.name}
                      onClick={() => setSelectedColor(colorOption.name || '')}
                      className={`py-2 px-4 border-2 rounded-md font-medium transition-colors ${
                        selectedColor === colorOption.name
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      {colorOption.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Quantity</label>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="flex-1 text-center py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors mb-4"
            >
              Add to Bag
            </button>

            {/* View Full Details */}
            <a
              href={`/products/${product.slug}`}
              className="block w-full text-center py-3 border border-gray-300 rounded-md font-semibold hover:bg-gray-50 transition-colors"
            >
              View Full Details
            </a>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <p className="text-sm text-gray-600">
                View full product details including materials, care instructions, and sizing guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
