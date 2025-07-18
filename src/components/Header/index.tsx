'use client'

import { Container, IconButton, Stack, Drawer, Box } from '@mui/material'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import HeaderSearch from './HeaderSearch'
import { use, useState } from 'react'
import { ProductCategoryResponse } from '@/types/product-category'
import Categories from '../Categories'
import { usePathname } from 'next/navigation'
import { CloseOutlined } from '@mui/icons-material'

export default function Header({ categories }: { categories: Promise<ProductCategoryResponse> }) {
  const { data } = use(categories)
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  return (
    <Stack
      borderBottom="1px solid #E5E7EB"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'white',
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
          <Image src="/icon.svg" alt="logo" width={46} height={46} />
          <Stack direction="row" alignItems="center" gap={2}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <HeaderSearch />
            </Box>
            <IconButton
              size="small"
              sx={{
                width: 40,
                height: 40,
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Box sx={{ display: { xs: 'block', md: 'none' } }} pb={2}>
          <HeaderSearch />
        </Box>
        {pathname === '/' && (
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Categories categories={data} />
          </Box>
        )}
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: '80%', maxWidth: '300px', padding: 2 },
        }}
      >
        <Stack spacing={2} p={2}>
          <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
            <IconButton onClick={toggleDrawer(false)}>
              <CloseOutlined />
            </IconButton>
          </Stack>
          <Stack>
            <Categories categories={data} onClickCallback={toggleDrawer(false)} />
          </Stack>
        </Stack>
      </Drawer>
    </Stack>
  )
}
