import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Journal - Oziak',
  description:
    'Discover the latest in bespoke tailoring, style guides, and craftsmanship insights from Oziak.',
}

export default async function BlogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch published blog posts
  const { docs: posts } = await payload.find({
    collection: 'blog',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 12,
  })

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">The Journal</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights into the world of bespoke tailoring, style guides, and the art of fine
              craftsmanship
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {posts.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-serif mb-8">Featured Article</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                    {posts[0].featuredImage && typeof posts[0].featuredImage === 'object' && (
                      <Image
                        src={posts[0].featuredImage.url || ''}
                        alt={posts[0].featuredImage.alt || posts[0].title}
                        fill
                        className="object-cover"
                      />
                    )}
                    {!posts[0].featuredImage && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                        <span className="text-white text-lg">Featured Article</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{posts[0].author}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {new Date(posts[0].publishedAt || posts[0].createdAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </span>
                    </div>
                    <h3 className="text-3xl font-serif mb-4">
                      <Link
                        href={`/blog/${posts[0].slug}`}
                        className="hover:text-gray-600 transition-colors"
                      >
                        {posts[0].title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{posts[0].excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {posts[0].tags?.map(
                        (tagItem: { tag?: string | null }, index: number) =>
                          tagItem.tag && (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {tagItem.tag}
                            </span>
                          ),
                      )}
                    </div>
                    <Link
                      href={`/blog/${posts[0].slug}`}
                      className="inline-flex items-center text-gray-900 font-semibold hover:text-gray-600 transition-colors"
                    >
                      Read Article
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif mb-12 text-center">Latest Articles</h2>

            {posts.length > 1 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 bg-gray-200">
                      {post.featuredImage && typeof post.featuredImage === 'object' && (
                        <Image
                          src={post.featuredImage.url || ''}
                          alt={post.featuredImage.alt || post.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      {!post.featuredImage && (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center">
                          <span className="text-white text-sm">Article Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            },
                          )}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif mb-3">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-gray-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.slice(0, 2).map(
                          (tagItem: { tag?: string | null }, index: number) =>
                            tagItem.tag && (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                              >
                                {tagItem.tag}
                              </span>
                            ),
                        )}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-gray-900 font-semibold text-sm hover:text-gray-600 transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-serif mb-4">Coming Soon</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We&apos;re preparing insightful articles about bespoke tailoring, style guides,
                  and craftsmanship. Check back soon for our latest content.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-gray-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 text-gray-300">
              Subscribe to receive our latest articles and style insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-gray-900"
              />
              <button className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
