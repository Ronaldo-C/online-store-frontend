import { SeoMetasResponse } from '@/types/seo-metas'

const getSeoMetas = async (init?: RequestInit): Promise<SeoMetasResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/customer/seo-metas`, init)
  const data = await response.json()
  return data
}

export default getSeoMetas
