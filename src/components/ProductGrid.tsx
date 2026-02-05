'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product, Category } from '@/payload-types'
import AddToCartButton from './AddToCartButton'

interface ProductGridProps {
  products: Product[]
  categories: Category[]
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  // Filter products by category
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(
          (product) =>
            typeof product.category === 'object' && product.category?.slug === selectedCategory,
        )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'newest':
      default:
        return 0 // Keep original order (newest first from query)
    }
  })

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white text-sm cursor-pointer focus:outline-none focus:border-black transition-colors"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white text-sm cursor-pointer focus:outline-none focus:border-black transition-colors"
          >
            <option value="newest">Newest</option>
            <option value="name">Name A-Z</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedProducts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-600">
            <p>No products found in this category.</p>
          </div>
        ) : (
          sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-80 overflow-hidden">
                {product.images?.[0] &&
                typeof product.images[0].image === 'object' &&
                'url' in product.images[0].image &&
                product.images[0].image.url ? (
                  <Image
                    src={product.images[0].image.url}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <span>No Image</span>
                  </div>
                )}
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    Sale
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  {typeof product.category === 'object' ? product.category?.name : ''}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-black">
                  {product.name}
                </h3>
                {product.shortDescription && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-semibold text-black">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="text-base text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <AddToCartButton product={product} size="sm" variant="outline" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
