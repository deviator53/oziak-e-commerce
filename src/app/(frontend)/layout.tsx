import React from 'react'
import { CartProvider } from '@/context/CartContext'
import './styles.css'

export const metadata = {
  title: 'Oziak - Elegance Redefined',
  description:
    "Discover bespoke men's clothing at Oziak. Custom tailoring and ready-to-wear pieces that redefine elegance.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png', // optional, for iOS home screen
  },
  openGraph: {
    title: 'Oziak - Elegance Redefined',
    description:
      "Discover bespoke men's clothing at Oziak. Custom tailoring and ready-to-wear pieces that redefine elegance.",
    url: 'https://oziak.com',
    siteName: 'Oziak',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Oziak - Elegance Redefined',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oziak - Elegance Redefined',
    description: "Discover bespoke men's clothing at Oziak.",
    images: ['/og-image.jpg'],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
