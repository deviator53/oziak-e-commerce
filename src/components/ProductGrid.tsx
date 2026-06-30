'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product, Category } from '@/payload-types'
import AddToCartButton from './AddToCartButton'
import ProductQuickView from './ProductQuickView'

interface ProductGridProps {
  products: Product[]
  categories: Category[]
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [maxPrice, setMaxPrice] = useState<number>(0) // 0 = no filter
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price)

  const highestPrice = useMemo(() => Math.max(...products.map((p) => p.price), 0), [products])

  const filtered = useMemo(() => {
    let list =
      selectedCategory === 'all'
        ? products
        : products.filter(
            (p) => typeof p.category === 'object' && p.category?.slug === selectedCategory,
          )

    if (maxPrice > 0) {
      list = list.filter((p) => p.price <= maxPrice)
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [products, selectedCategory, sortBy, maxPrice])

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + (maxPrice > 0 ? 1 : 0)

  const clearAll = () => {
    setSelectedCategory('all')
    setMaxPrice(0)
    setSortBy('newest')
  }

  return (
    <>
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Filter bar */}
      <div className="mb-8 space-y-4">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs uppercase tracking-wider text-gray-400 mr-2 shrink-0">
            Category
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-black text-white border-black'
                : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                selectedCategory === cat.slug
                  ? 'bg-black text-white border-black'
                  : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Price range + sort row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Price range */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xs uppercase tracking-wider text-gray-400 shrink-0">
              Max price
            </span>
            <input
              type="range"
              min={0}
              max={highestPrice}
              step={1000}
              value={maxPrice || highestPrice}
              onChange={(e) => {
                const v = Number(e.target.value)
                setMaxPrice(v >= highestPrice ? 0 : v)
              }}
              className="flex-1 accent-black"
            />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap min-w-[90px] text-right">
              {maxPrice > 0 ? formatPrice(maxPrice) : 'Any'}
            </span>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs uppercase tracking-wider text-gray-400">Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-black transition-colors cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="name">Name A–Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active filters summary */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-3 text-sm animate-fade-in">
            <span className="text-gray-500">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-black underline hover:no-underline"
            >
              Clear filters
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-4 opacity-30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-medium">No products found.</p>
            <button onClick={clearAll} className="mt-3 text-sm text-black underline">
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <Link
                href={`/products/${product.slug}`}
                className="block relative h-72 overflow-hidden bg-gray-100"
              >
                {product.images?.[0] &&
                typeof product.images[0].image === 'object' &&
                'url' in product.images[0].image &&
                product.images[0].image.url ? (
                  <Image
                    src={product.images[0].image.url}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}

                {/* Sale badge */}
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Sale
                  </span>
                )}

                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setQuickViewProduct(product)
                    }}
                    className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-black hover:text-white"
                  >
                    Quick View
                  </button>
                </div>
              </Link>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                  {typeof product.category === 'object' ? product.category?.name : ''}
                </p>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-display text-base font-semibold text-black mb-2 group-hover:text-gray-600 transition-colors leading-snug">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-black text-sm">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <AddToCartButton product={product} size="sm" variant="outline" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
