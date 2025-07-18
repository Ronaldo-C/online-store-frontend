import { ApiSuccessResponse } from './common'

export interface ProductCategoryData {
  id: number
  name: string
}

export type ProductCategoryResponse = ApiSuccessResponse<ProductCategoryData[]>
