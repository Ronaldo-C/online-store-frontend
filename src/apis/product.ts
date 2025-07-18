import { ListProductResponse, ListProductRequest } from '@/types/product'

const getProducts = async ({
  params,
}: {
  params: ListProductRequest
}): Promise<ListProductResponse> => {
  const searchParams = new URLSearchParams()

  searchParams.append('page', params.page.toString())
  searchParams.append('size', params.size.toString())

  if (params.search) {
    searchParams.append('search', params.search)
  }

  if (params.categoryIds) {
    searchParams.append('categoryIds', params.categoryIds)
  }

  if (params.sort) {
    searchParams.append('sort', params.sort)
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/customer/products?${searchParams.toString()}`
  )

  const data = await response.json()
  return data
}

export default getProducts
