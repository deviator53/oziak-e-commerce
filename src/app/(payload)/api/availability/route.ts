import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// GET /api/availability?date=YYYY-MM-DD
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'date param required' }, { status: 400 })
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get availability settings (use first record)
    const availabilityRes = await payload.find({ collection: 'availability', limit: 1 })
    if (!availabilityRes.docs.length) {
      return NextResponse.json({ slots: [] })
    }

    const settings = availabilityRes.docs[0]
    const dayOfWeek = new Date(date + 'T12:00:00').getDay().toString()

    const dayConfig = (
      settings.availableDays as { day: string; startTime: string; endTime: string }[]
    )?.find((d) => d.day === dayOfWeek)

    if (!dayConfig) {
      return NextResponse.json({ slots: [] })
    }

    // Generate all slots for the day
    const slots: string[] = []
    const [startH, startM] = dayConfig.startTime.split(':').map(Number)
    const [endH, endM] = dayConfig.endTime.split(':').map(Number)
    const duration = (settings.slotDurationMinutes as number) || 60

    let current = startH * 60 + startM
    const end = endH * 60 + endM

    while (current + duration <= end) {
      const h = Math.floor(current / 60)
        .toString()
        .padStart(2, '0')
      const m = (current % 60).toString().padStart(2, '0')
      slots.push(`${h}:${m}`)
      current += duration
    }

    // Get already booked slots for this date
    const booked = await payload.find({
      collection: 'appointments',
      where: { date: { equals: date }, status: { not_equals: 'cancelled' } },
      limit: 100,
    })

    const bookedTimes = new Set(booked.docs.map((a) => a.time as string))
    const available = slots.filter((s) => !bookedTimes.has(s))

    return NextResponse.json({ slots: available })
  } catch (error) {
    console.error('Availability error:', error)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}
