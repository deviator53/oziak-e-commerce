import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'About Us - Oziak',
  description:
    'Discover the story behind Oziak, where traditional craftsmanship meets contemporary design in bespoke menswear.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-gray-900 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl font-light">
              Where tradition meets innovation in the art of bespoke tailoring
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-serif mb-6">The Oziak Legacy</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Founded with a passion for exceptional craftsmanship, Oziak represents the
                  pinnacle of bespoke menswear. Our journey began with a simple belief: every
                  gentleman deserves clothing that reflects his unique character and impeccable
                  taste.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We combine time-honored tailoring techniques with contemporary design
                  sensibilities, creating garments that are both timeless and distinctly modern.
                  Each piece is meticulously crafted by master artisans who understand that true
                  luxury lies in the details.
                </p>
              </div>
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/images/oziak-about.jpeg"
                  alt="Oziak craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Values Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-serif text-center mb-12">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">✂</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Craftsmanship</h3>
                  <p className="text-gray-600">
                    Every stitch, every seam, every detail is executed with precision and care by
                    our skilled artisans.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">◆</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Quality</h3>
                  <p className="text-gray-600">
                    We source only the finest materials from renowned mills around the world to
                    ensure lasting excellence.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">★</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Individuality</h3>
                  <p className="text-gray-600">
                    Each garment is tailored to reflect your personal style and perfect fit, making
                    it uniquely yours.
                  </p>
                </div>
              </div>
            </div>

            {/* Process Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-serif text-center mb-12">Our Process</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src="/images/tailor-process.png"
                    alt="Tailoring process"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mr-4 mt-1 text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Consultation</h3>
                        <p className="text-gray-600">
                          Personal consultation to understand your style preferences and
                          requirements.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mr-4 mt-1 text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Measurement</h3>
                        <p className="text-gray-600">
                          Precise measurements taken to ensure the perfect fit for your body type.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mr-4 mt-1 text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Creation</h3>
                        <p className="text-gray-600">
                          Master craftsmen bring your vision to life with meticulous attention to
                          detail.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mr-4 mt-1 text-sm font-semibold">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Fitting</h3>
                        <p className="text-gray-600">
                          Final fittings ensure your garment fits perfectly and meets your
                          expectations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-serif mb-6">Experience Oziak</h2>
            <p className="text-xl mb-8 text-gray-300">
              Ready to create your perfect garment? Schedule a consultation with our master tailors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Consultation
              </a>
              <a
                href="/shop"
                className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                View Collection
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
