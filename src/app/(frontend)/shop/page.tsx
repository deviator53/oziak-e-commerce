import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'

export default async function ShopPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all published products
  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 50,
    sort: '-createdAt',
  })

  // Fetch categories for filtering
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 20,
  })

  return (
    <>
      <Header />
      <main className="min-h-screen py-8">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl lg:text-6xl font-semibold mb-4 text-black">
              Shop
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of premium menswear
            </p>
          </div>

          <ProductGrid products={products} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  )
}
