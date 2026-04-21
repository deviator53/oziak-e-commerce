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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {products.map((product, i) => (
            <AnimatedSection key={product.id} animation="fade-up" delay={i * 0.1}>
              <Link
                href={`/products/${product.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 block"
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
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
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
                    <div>
                      <AddToCartButton product={product} size="sm" variant="outline" />
                    </div>
                  </div>
                </div>
              </Link>
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
