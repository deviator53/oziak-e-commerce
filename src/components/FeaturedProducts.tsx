import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/payload-types'
import AddToCartButton from './AddToCartButton'
import AnimatedSection from './AnimatedSection'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4 text-black">
            Featured Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked pieces that embody our commitment to excellence
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product, i) => (
            <AnimatedSection key={product.id} animation="fade-up" delay={i * 0.08}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
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
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
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
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Sale
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </Link>

                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold mb-1 text-black leading-snug">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-1">
                      {product.shortDescription}
                    </p>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
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
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-up" className="text-center">
          <Link href="/shop" className="btn btn-outline">
            View All Products
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
