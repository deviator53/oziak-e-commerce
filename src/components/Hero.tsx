import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-gray-50 to-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="z-10 text-center lg:text-left">
          <h1 className="font-display text-6xl lg:text-7xl font-bold leading-tight mb-6 text-black">
            Elegance
            <br />
            <span className="italic text-gray-600">Redefined</span>
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
            Discover the art of bespoke menswear. Each piece is meticulously crafted to embody
            sophistication, style, and timeless elegance that speaks to the modern gentleman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/shop" className="btn btn-primary">
              Explore Collection
            </Link>
            <Link href="/custom" className="btn btn-outline">
              Custom Tailoring
            </Link>
          </div>
        </div>

        <div className="relative h-96 lg:h-[600px] order-first lg:order-last">
          <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Placeholder for hero image */}
            <div className="text-2xl text-gray-600 font-medium">
              <span>Hero Image</span>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
