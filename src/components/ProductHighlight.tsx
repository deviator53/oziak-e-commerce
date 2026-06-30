import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/payload-types'
import AnimatedSection from './AnimatedSection'

interface ProductHighlightProps {
  product: Product
}

export default function ProductHighlight({ product }: ProductHighlightProps) {
  if (!product) return null

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price)

  const imageUrl =
    product.images?.[0] &&
    typeof product.images[0].image === 'object' &&
    'url' in product.images[0].image
      ? product.images[0].image.url
      : null

  const secondImageUrl =
    product.images?.[1] &&
    typeof product.images[1].image === 'object' &&
    'url' in product.images[1].image
      ? product.images[1].image.url
      : null

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container">
        {/* Section label */}
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Spotlight</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-black">
            The Piece of the Moment
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
          {/* Left — Images */}
          <div className="relative min-h-[520px] bg-gray-200 overflow-hidden">
            {imageUrl ? (
              <Image src={imageUrl} alt={product.name} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                No image
              </div>
            )}

            {/* Floating second image */}
            {secondImageUrl && (
              <AnimatedSection
                animation="fade-right"
                delay={0.4}
                className="absolute bottom-6 right-6 w-36 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <Image
                  src={secondImageUrl}
                  alt={`${product.name} detail`}
                  fill
                  className="object-cover"
                />
              </AnimatedSection>
            )}

            {/* Price pill */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg">
              <span className="font-bold text-black text-sm">{formatPrice(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-gray-400 line-through text-xs ml-2">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Right — Details */}
          <div className="bg-white flex flex-col justify-center p-10 lg:p-16">
            {/* Category */}
            {typeof product.category === 'object' && product.category?.name && (
              <AnimatedSection animation="fade-left">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
                  {product.category.name}
                </p>
              </AnimatedSection>
            )}

            <AnimatedSection animation="fade-left" delay={0.1}>
              <h3 className="font-display text-3xl lg:text-4xl font-semibold text-black mb-6 leading-tight">
                {product.name}
              </h3>
            </AnimatedSection>

            {product.shortDescription && (
              <AnimatedSection animation="fade-left" delay={0.2}>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {product.shortDescription}
                </p>
              </AnimatedSection>
            )}

            {/* Feature pills */}
            <AnimatedSection animation="fade-left" delay={0.3}>
              <div className="flex flex-wrap gap-2 mb-10">
                {product.material && (
                  <span className="px-4 py-2 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                    {product.material}
                  </span>
                )}
                {product.isCustomizable && (
                  <span className="px-4 py-2 bg-black text-white text-xs font-medium rounded-full">
                    Custom Tailoring
                  </span>
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <span className="px-4 py-2 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                    Sizes {product.sizes.map((s) => s.size?.toUpperCase()).join(', ')}
                  </span>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/products/${product.slug}`}
                  className="btn btn-primary flex-1 text-center"
                >
                  Shop This Piece
                </Link>
                <Link href="/shop" className="btn btn-outline flex-1 text-center">
                  View Collection
                </Link>
              </div>
            </AnimatedSection>

            {/* Trust signals */}
            <AnimatedSection animation="fade-left" delay={0.5}>
              <div className="flex gap-6 mt-10 pt-8 border-t border-gray-100">
                {[
                  {
                    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                    label: 'Authentic craft',
                  },
                  {
                    icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7',
                    label: 'Made to order',
                  },
                  {
                    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                    label: 'Free fitting',
                  },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 text-center flex-1">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={icon}
                      />
                    </svg>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
