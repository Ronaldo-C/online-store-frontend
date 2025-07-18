import { ApiSuccessResponse, ApiSuccessResponsePagination, ListRequest } from './common'
import { ProductCategoryData } from './product-category'
import Output from 'editorjs-react-renderer'

export interface ProductData {
  id: bigint
  name: string
  number: string
  shelfStatus: boolean
  thumbnail: string
  pictures: string[]
  description: typeof Output
  skus: ProductSku[]
  categories: ProductCategoryData[]
}

export interface ProductSku {
  id: bigint
  name: string
  number: string
  costPrice: number
  price: number
  stock: bigint
}

// list
export interface ListProductRequest extends ListRequest {
  categoryIds?: string
}

export type ListProductResponse = ApiSuccessResponsePagination<ProductData>

// detail
export type ProductDetailResponse = ApiSuccessResponse<ProductData>
