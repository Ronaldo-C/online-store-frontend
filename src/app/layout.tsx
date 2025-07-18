import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import getSeoMetas from '@/apis/seo-metas'
import Header from '@/components/Header'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import getProductCategories from '@/apis/product-category'
import Providers from '@/components/QueryProviders'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSeoMetas({
    cache: 'force-cache',
    next: {
      revalidate: 60 * 5,
    },
  })
  return {
    title: data.title,
    description: data.description,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = getProductCategories()

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Header categories={data} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
