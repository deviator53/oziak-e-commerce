import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-900 font-serif">404</h1>
            <div className="h-1 w-24 bg-gray-900 mx-auto mt-4"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Page Not Found</h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We couldn&apos;t find the page you&apos;re looking for. It may have been moved or
            doesn&apos;t exist. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors inline-block"
            >
              Go Home
            </Link>
            <Link
              href="/shop"
              className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-900 hover:text-white transition-colors inline-block"
            >
              Browse Collection
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Need assistance?</p>
            <Link href="/contact" className="text-gray-900 font-semibold hover:underline">
              Contact our team
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
