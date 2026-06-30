import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() || ''
  if (q.length < 2) return NextResponse.json({ results: [] })

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'products',
    where: {
      and: [
        { status: { equals: 'published' } },
        {
          or: [{ name: { like: q } }, { shortDescription: { like: q } }],
        },
      ],
    },
    limit: 12,
    depth: 1,
  })

  const results = docs.map((product) => ({
    id: product.id.toString(),
    name: product.name,
    slug: product.slug,
    price: product.price,
    category: typeof product.category === 'object' ? product.category?.name : undefined,
    image:
      product.images?.[0] &&
      typeof product.images[0].image === 'object' &&
      'url' in product.images[0].image
        ? product.images[0].image.url
        : null,
  }))

  return NextResponse.json({ results })
}
