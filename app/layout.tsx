import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rollins Wellness Devices | Luxury Medical Technology',
  description: 'Experience the pinnacle of wellness technology with Rollins International. Premium hyperbaric oxygen chambers, cryotherapy systems, and red light therapy devices.',
  keywords: 'wellness devices, hyperbaric oxygen therapy, cryotherapy, red light therapy, medical devices, luxury wellness',
  authors: [{ name: 'Rollins International' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: 'Rollins Wellness Devices | Luxury Medical Technology',
    description: 'Experience the pinnacle of wellness technology with Rollins International.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} font-luxury antialiased`}>
        <div className="min-h-screen bg-luxury-gradient text-white">
          {children}
        </div>
      </body>
    </html>
  )
} 