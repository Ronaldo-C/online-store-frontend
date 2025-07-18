import { ApiSuccessResponse } from './common'

export interface SeoMetasData {
  title: string
  description: string
  images: {
    url: string
    href?: string
  }[]
}

export type SeoMetasResponse = ApiSuccessResponse<SeoMetasData>
