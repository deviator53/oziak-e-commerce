import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@/payload-types'

interface CategoriesProps {
  categories: Category[]
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4 text-black">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections of premium menswear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/category/${category.slug}`}
              className="group block rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-96 overflow-hidden">
                {typeof category.image === 'object' &&
                category.image &&
                'url' in category.image &&
                category.image.url ? (
                  <Image
                    src={category.image.url}
                    alt={category.image.alt || category.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-600">
                    <span>{category.name}</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-2xl font-semibold mb-2">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm mb-4 opacity-90">{category.description}</p>
                    )}
                    <span className="text-sm font-medium uppercase tracking-wide border-b border-white pb-1 inline-block">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
