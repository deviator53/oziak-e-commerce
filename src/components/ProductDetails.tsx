'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/payload-types'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [customizations, setCustomizations] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    // Validate required selections
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size')
      setIsAddingToCart(false)
      return
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select a color')
      setIsAddingToCart(false)
      return
    }

    try {
      addItem({
        productId: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
        image:
          product.images?.[0] &&
          typeof product.images[0].image === 'object' &&
          'url' in product.images[0].image
            ? product.images[0].image.url || undefined
            : undefined,
        customizations: customizations || undefined,
      })

      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add item to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const availableStock =
    selectedSize && product.sizes
      ? product.sizes.find((s) => s.size === selectedSize)?.stock || 0
      : 999

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.images?.[selectedImageIndex] &&
            typeof product.images[selectedImageIndex].image === 'object' &&
            'url' in product.images[selectedImageIndex].image &&
            product.images[selectedImageIndex].image.url ? (
              <Image
                src={product.images[selectedImageIndex].image.url}
                alt={product.images[selectedImageIndex].alt}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((imageItem, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  {typeof imageItem.image === 'object' &&
                  'url' in imageItem.image &&
                  imageItem.image.url ? (
                    <Image
                      src={imageItem.image.url}
                      alt={imageItem.alt}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          {typeof product.category === 'object' && (
            <div className="text-sm uppercase tracking-wide text-gray-500">
              {product.category.name}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-4xl font-semibold text-black">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-black">{formatPrice(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          {product.shortDescription && (
            <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <label className="block font-medium text-black">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    disabled={sizeOption.stock === 0}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                      selectedSize === sizeOption.size
                        ? 'border-black bg-black text-white'
                        : sizeOption.stock === 0
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {sizeOption.size.toUpperCase()}
                    {sizeOption.stock === 0 && ' (Out of Stock)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <label className="block font-medium text-black">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => setSelectedColor(colorOption.name)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                      selectedColor === colorOption.name
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {colorOption.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customizations */}
          {product.isCustomizable && (
            <div className="space-y-3">
              <label className="block font-medium text-black">
                Custom Tailoring Notes (Optional)
              </label>
              <textarea
                value={customizations}
                onChange={(e) => setCustomizations(e.target.value)}
                placeholder="Any specific measurements, alterations, or customization requests..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                rows={4}
              />
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <label className="block font-medium text-black">Quantity</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                  disabled={quantity >= availableStock}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              {availableStock < 999 && (
                <span className="text-sm text-gray-500">{availableStock} in stock</span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || availableStock === 0}
            className={`w-full py-4 px-6 font-semibold text-lg rounded-lg transition-all duration-200 ${
              addedToCart
                ? 'bg-green-600 text-white'
                : availableStock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isAddingToCart
              ? 'Adding to Cart...'
              : addedToCart
                ? 'Added to Cart!'
                : availableStock === 0
                  ? 'Out of Stock'
                  : 'Add to Cart'}
          </button>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            {product.material && (
              <div>
                <h3 className="font-medium text-black mb-2">Material</h3>
                <p className="text-gray-600">{product.material}</p>
              </div>
            )}

            {product.careInstructions && (
              <div>
                <h3 className="font-medium text-black mb-2">Care Instructions</h3>
                <p className="text-gray-600">{product.careInstructions}</p>
              </div>
            )}

            {product.isCustomizable && (
              <div>
                <h3 className="font-medium text-black mb-2">Custom Tailoring Available</h3>
                <p className="text-gray-600">
                  This item can be customized to your exact measurements and preferences. Add your
                  requirements in the customization notes above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
