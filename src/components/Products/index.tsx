'use client'

import React, { useEffect, useMemo } from 'react'
import { useAtom } from 'jotai'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { filterProductAtom } from '@/atoms/search'
import getProducts from '@/apis/product'
import { ProductData } from '@/types/product'

const Products = () => {
  const [filter] = useAtom(filterProductAtom)

  let pageSize = 24
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('sm'))
  const lg = useMediaQuery(theme.breakpoints.down('lg'))

  if (xs) {
    pageSize = 8
  }

  if (lg) {
    pageSize = 16
  }

  const queryParams = useMemo(
    () => ({
      search: filter.search,
      categoryIds: filter.category ? filter.category.toString() : undefined,
      size: pageSize,
    }),
    [filter.search, filter.category, pageSize]
  )

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery({
      queryKey: ['products', queryParams],
      queryFn: ({ pageParam = 1 }) =>
        getProducts({
          params: {
            page: pageParam,
            ...queryParams,
          },
        }),
      getNextPageParam: lastPage => {
        const { currentPage, totalPage } = lastPage.data
        return currentPage < totalPage ? currentPage + 1 : undefined
      },
      initialPageParam: 1,
    })

  useEffect(() => {
    refetch()
  }, [filter])

  const allProducts = useMemo(() => {
    return data?.pages.flatMap(page => page.data.list) || []
  }, [data])

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const renderProductSkeleton = (index: number) => (
    <Grid size={{ lg: 2, xs: 6, sm: 3 }} key={`skeleton-${index}`}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Skeleton
          variant="rectangular"
          height={200}
          animation="wave"
          sx={{ borderRadius: '4px 4px 0 0' }}
        />

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant="text" height={28} width="90%" animation="wave" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={28} width="60%" animation="wave" sx={{ mb: 2 }} />

          <Box sx={{ mt: 'auto' }}>
            <Skeleton variant="text" height={32} width="40%" animation="wave" sx={{ mb: 0.5 }} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )

  const renderProductCard = (product: ProductData) => (
    <Grid size={{ lg: 2, xs: 6, sm: 3 }} key={product.id.toString()}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3,
          },
        }}
      >
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.name}
          sx={{ objectFit: 'cover', height: '200px' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>

          {product.skus && product.skus.length > 0 && (
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                ¥{product.skus[0].price.toFixed(2)}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  )

  const renderLoadMoreSkeletons = () => (
    <>{Array.from({ length: pageSize }).map((_, index) => renderProductSkeleton(index))}</>
  )

  if (isLoading || isError) {
    return (
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {Array.from({ length: pageSize }).map((_, index) => renderProductSkeleton(index))}
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 4 }}>
      {allProducts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {allProducts.map(renderProductCard)}
            {isFetchingNextPage && renderLoadMoreSkeletons()}
          </Grid>

          {hasNextPage && !isFetchingNextPage && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={handleLoadMore}
                sx={{ minWidth: 200 }}
              >
                加载更多
              </Button>
            </Box>
          )}

          {!hasNextPage && allProducts.length > 0 && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                已显示全部 {allProducts.length} 个产品
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无产品
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filter.search || filter.category
              ? '没有找到符合条件的产品，请尝试其他搜索条件'
              : '当前没有可显示的产品'}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Products
