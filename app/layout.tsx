import type { Metadata } from 'next'
import { Playfair_Display, Inter, Great_Vibes } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});
const greatVibes = Great_Vibes({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-script'
});

export const metadata: Metadata = {
  title: 'Honor Loan Team | Powered by Lifetime Home Loans',
  description: 'Your trusted local mortgage broker. We shop over 100 wholesale lenders with just one credit pull. FHA, VA, Conventional loans and more.',
  keywords: ['mortgage', 'home loans', 'FHA', 'VA', 'conventional', 'mortgage broker', 'home buying', 'refinance'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
