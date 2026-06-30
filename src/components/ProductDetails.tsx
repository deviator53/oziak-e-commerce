'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import type { Product } from '@/payload-types'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [customizations, setCustomizations] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const addBtnRef = useRef<HTMLButtonElement>(null)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price)

  // Show sticky bar when main add-to-cart button scrolls out of view
  useEffect(() => {
    const btn = addBtnRef.current
    if (!btn) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(btn)
    return () => observer.disconnect()
  }, [])

  const handleAddToCart = async () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      showToast('Please select a size', 'error')
      return
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      showToast('Please select a color', 'error')
      return
    }

    setIsAddingToCart(true)
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
      showToast(`${product.name} added to bag`)
    } catch {
      showToast('Failed to add item to cart', 'error')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const availableStock =
    selectedSize && product.sizes
      ? product.sizes.find((s) => s.size === selectedSize)?.stock || 0
      : 999

  const categoryName = typeof product.category === 'object' ? product.category?.name : undefined
  const categorySlug = typeof product.category === 'object' ? product.category?.slug : undefined

  return (
    <>
      {/* Sticky add-to-cart bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-xl transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{product.name}</p>
            <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || availableStock === 0}
            className="btn btn-primary py-3 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {availableStock === 0 ? 'Out of Stock' : 'Add to Bag'}
          </button>
        </div>
      </div>

      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          {categoryName && categorySlug && (
            <>
              <span>/</span>
              <Link
                href={`/shop?category=${categorySlug}`}
                className="hover:text-black transition-colors"
              >
                {categoryName}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
              {product.images?.[selectedImageIndex] &&
              typeof product.images[selectedImageIndex].image === 'object' &&
              'url' in product.images[selectedImageIndex].image &&
              product.images[selectedImageIndex].image.url ? (
                <Image
                  src={product.images[selectedImageIndex].image.url}
                  alt={product.images[selectedImageIndex].alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((imageItem, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-black scale-105'
                        : 'border-transparent hover:border-gray-300'
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
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {categoryName && (
              <div className="text-sm uppercase tracking-wider text-gray-400 font-medium">
                {categoryName}
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-4xl font-semibold text-black leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-black">{formatPrice(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    {Math.round((1 - product.price / product.compareAtPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            {product.shortDescription && (
              <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-black">Size</label>
                  <Link
                    href="/size-guide"
                    className="text-sm text-gray-500 underline hover:text-black transition-colors"
                  >
                    Size guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      disabled={sizeOption.stock === 0}
                      className={`px-4 py-2.5 border-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                        selectedSize === sizeOption.size
                          ? 'border-black bg-black text-white scale-105'
                          : sizeOption.stock === 0
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                            : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      {sizeOption.size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="font-medium text-black">
                  Color
                  {selectedColor && (
                    <span className="font-normal text-gray-500 ml-2">— {selectedColor}</span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((colorOption) => (
                    <button
                      key={colorOption.name}
                      onClick={() => setSelectedColor(colorOption.name)}
                      className={`px-4 py-2.5 border-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                        selectedColor === colorOption.name
                          ? 'border-black bg-black text-white scale-105'
                          : 'border-gray-200 hover:border-black'
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
                  Custom Tailoring Notes{' '}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={customizations}
                  onChange={(e) => setCustomizations(e.target.value)}
                  placeholder="Measurements, alterations, style preferences..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors resize-none text-sm"
                  rows={3}
                />
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block font-medium text-black">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 hover:bg-gray-100 transition-colors text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="px-5 py-2.5 font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                    disabled={quantity >= availableStock}
                    className="px-4 py-2.5 hover:bg-gray-100 transition-colors text-lg font-medium disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                {availableStock < 10 && availableStock > 0 && (
                  <span className="text-sm text-amber-600 font-medium">
                    Only {availableStock} left!
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              ref={addBtnRef}
              onClick={handleAddToCart}
              disabled={isAddingToCart || availableStock === 0}
              className={`w-full py-4 px-6 font-semibold text-base rounded-xl transition-all duration-200 uppercase tracking-wider ${
                availableStock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]'
              } disabled:cursor-not-allowed`}
            >
              {isAddingToCart ? 'Adding...' : availableStock === 0 ? 'Out of Stock' : 'Add to Bag'}
            </button>

            {/* Product Details accordion-style */}
            <div className="border-t border-gray-100 pt-6 space-y-5">
              {product.material && (
                <div className="flex gap-3">
                  <div className="w-5 shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">
                      Material
                    </p>
                    <p className="text-sm text-gray-700">{product.material}</p>
                  </div>
                </div>
              )}
              {product.careInstructions && (
                <div className="flex gap-3">
                  <div className="w-5 shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Care</p>
                    <p className="text-sm text-gray-700">{product.careInstructions}</p>
                  </div>
                </div>
              )}
              {product.isCustomizable && (
                <div className="bg-gray-50 rounded-xl p-4 flex gap-3 items-start">
                  <svg
                    className="w-5 h-5 text-gray-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-black">Custom Tailoring Available</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Tailored to your exact measurements and style preferences.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
