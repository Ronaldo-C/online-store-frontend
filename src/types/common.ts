export interface ApiSuccessResponse<T = unknown> {
  id: number
  code: number
  data: T
}

export interface ApiErrorResponse {
  code: number
  msg: string
  id: number
  timestamp: string
}

export interface ApiSuccessResponsePagination<T = unknown> {
  id: number
  code: number
  data: {
    list: T[]
    total: number
    totalPage: number
    currentPage: number
    size: number
  }
}

export interface ListRequest {
  page: number
  size: number
  sort?: string
  search?: string
}
