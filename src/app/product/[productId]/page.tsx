import { Container } from '@mui/material'
import { notFound } from 'next/navigation'
import { getProductDetail } from '@/apis/product'
import ProductDetailClient from '@/components/ProductDetail/ProductDetailClient'
import type { Metadata } from 'next'

interface ProductDetailPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  try {
    const productResponse = await getProductDetail(params.productId)
    const product = productResponse.data

    return {
      title: product.name,
      description: product.name,
      openGraph: {
        title: product.name,
        description: product.name,
        images: [
          {
            url: product.thumbnail,
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
      },
    }
  } catch (error: unknown) {
    return {
      title: '商品详情',
      description: '商品详情页面',
    }
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  try {
    const productResponse = await getProductDetail(params.productId)
    const product = productResponse.data

    if (!product) {
      notFound()
    }

    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ProductDetailClient product={product} />
      </Container>
    )
  } catch (error: unknown) {
    notFound()
  }
}
