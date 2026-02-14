import Image from 'next/image'
import Link from 'next/link'
import BookConsultationButton from './BookConsultationButton'

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-6 text-black">
              The Art of Bespoke Tailoring
            </h2>
            <p className="text-xl font-medium text-gray-700 mb-6 leading-relaxed">
              At Oziak, we believe that true elegance lies in the details. Every stitch, every cut,
              every fabric choice is made with precision and passion.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our master craftsmen bring decades of experience to create garments that don&apos;t
              just fit your body, but express your personality. From the initial consultation to the
              final fitting, we ensure every piece tells your unique story.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold mb-2 text-black">
                    Premium Materials
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Only the finest fabrics from renowned mills worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold mb-2 text-black">
                    Expert Craftsmanship
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Hand-tailored by master artisans with generations of expertise
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold mb-2 text-black">
                    Perfect Fit
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Multiple fittings ensure every garment fits like a second skin
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="btn btn-primary">
                Our Story
              </Link>
              <BookConsultationButton className="btn btn-outline" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg">
            <div className="w-full h-96 lg:h-[500px] relative">
              <Image
                src="/images/about-hero.png"
                alt="Elegant bespoke menswear"
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
