import { ProductCategoryResponse } from '@/types/product-category'

const getProductCategories = async (init?: RequestInit): Promise<ProductCategoryResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/customer/product-categories`,
    init
  )
  const data = await response.json()
  return data
}

export default getProductCategories
