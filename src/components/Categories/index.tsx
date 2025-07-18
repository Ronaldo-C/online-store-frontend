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
  const allCategory = [{ id: null, name: '全部' }, ...categories]

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleButtonClick = (categoryId: number | null) => {
    setCategory(prev => ({
      ...prev,
      category: categoryId,
    }))
    onClickCallback?.()
  }

  if (isMobile) {
    return (
      <Stack direction="column" spacing={1} sx={{ width: '100%', py: 1 }}>
        {allCategory.map(item => (
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
        {allCategory.map(item => (
          <Tab label={item.name} value={item.id} key={item.id} />
        ))}
      </Tabs>
    </Stack>
  )
}
