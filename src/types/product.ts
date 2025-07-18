import { ApiSuccessResponse, ApiSuccessResponsePagination, ListRequest } from './common'
import { ProductCategoryData } from './product-category'
import { DataProp } from 'editorjs-blocks-react-renderer'

export interface ProductData {
  id: bigint
  name: string
  number: string
  shelfStatus: boolean
  thumbnail: string
  pictures: string[]
  description: DataProp
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
