'use client'

import { ProductCategoryData } from '@/types/product-category'
import { Stack, Tab, Tabs, Button, useMediaQuery, useTheme } from '@mui/material'
import { useAtom } from 'jotai'
import { filterProductAtom } from '@/atoms/search'

export default function Categories({
  categories,
  onClickCallback,
}: {
  categories: ProductCategoryData[]
  onClickCallback?: () => void
}) {
  const [data, setCategory] = useAtom(filterProductAtom)
  const category = data.category
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleButtonClick = (categoryId: number) => {
    setCategory(prev => ({
      ...prev,
      category: categoryId,
    }))
    onClickCallback?.()
  }

  if (isMobile) {
    return (
      <Stack direction="column" spacing={1} sx={{ width: '100%', py: 1 }}>
        {categories.map(item => (
          <Button
            key={item.id}
            variant="text"
            color={category === item.id ? 'primary' : 'inherit'}
            fullWidth
            onClick={() => handleButtonClick(item.id)}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
            }}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    )
  }

  return (
    <Stack direction="row" alignItems="center">
      <Tabs
        value={category}
        onChange={(_, newValue) => handleButtonClick(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {categories.map(item => (
          <Tab label={item.name} value={item.id} key={item.id} />
        ))}
      </Tabs>
    </Stack>
  )
}
