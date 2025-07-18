import { Container, Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { Home } from '@mui/icons-material'

export default function ProductNotFound() {
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        textAlign="center"
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'text.secondary', mb: 2 }}
        >
          404
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          商品不存在
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          抱歉，您访问的商品可能已下架或不存在。请检查链接是否正确，或浏览其他商品。
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="contained" size="large" startIcon={<Home />} component={Link} href="/">
            返回首页
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
