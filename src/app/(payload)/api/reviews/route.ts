import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, role, content, rating } = body

    if (!name || !content || !rating) {
      return NextResponse.json({ error: 'Name, review, and rating are required' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (payload.create as any)({
      collection: 'reviews',
      overrideAccess: true,
      data: {
        name,
        role: role || '',
        content,
        rating: Number(rating),
        featured: false,
      },
    })

    return NextResponse.json(
      { success: true, message: 'Thank you for your review! It will appear after approval.' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit review. Please try again.' },
      { status: 500 },
    )
  }
}
