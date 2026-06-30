import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Categories from '@/components/Categories'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'
import Newsletter from '@/components/Newsletter'
import ProductHighlight from '@/components/ProductHighlight'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch featured products
  const { docs: featuredProducts } = await payload.find({
    collection: 'products',
    where: {
      isFeatured: {
        equals: true,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 8,
  })

  // Fetch categories
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 6,
  })

  // Fetch featured reviews (graceful fallback if table doesn't exist yet)
  let reviews: any[] = []
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { docs } = await (payload.find as any)({
      collection: 'reviews',
      where: { featured: { equals: true } },
      limit: 10,
    })
    reviews = docs
  } catch {
    // reviews table may not exist yet — fallback to hardcoded in Testimonials
  }

  // Fetch spotlight product (single featured, most recently created)
  let highlightProduct = null
  try {
    const { docs: spotlightDocs } = await payload.find({
      collection: 'products',
      where: {
        and: [{ isFeatured: { equals: true } }, { status: { equals: 'published' } }],
      },
      limit: 1,
      sort: '-createdAt',
    })
    highlightProduct = spotlightDocs[0] || null
  } catch {
    // fallback
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div id="categories">
          <Categories categories={categories} />
        </div>
        <FeaturedProducts products={featuredProducts} />
        {highlightProduct && <ProductHighlight product={highlightProduct} />}
        <About />
        <Testimonials reviews={reviews as unknown[]} />
        <ContactSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
