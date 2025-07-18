import getSeoMetas from '@/apis/seo-metas'
import Banner from '@/components/Banner'
import Products from '@/components/Products'
import { Container, Stack } from '@mui/material'

export default function Home() {
  const data = getSeoMetas()

  return (
    <Stack>
      <Banner seoMetas={data} />
      <Container maxWidth="xl">
        <Products />
      </Container>
    </Stack>
  )
}
