'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Chip,
  Stack,
  Divider,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Breadcrumbs,
  Link,
} from '@mui/material'
import {
  Add,
  Remove,
  ShoppingCart,
  Share,
  ArrowBack,
  Home,
  FavoriteOutlined,
  FavoriteBorder,
} from '@mui/icons-material'
import { ProductData, ProductSku } from '@/types/product'
import Blocks, { RenderFn } from 'editorjs-blocks-react-renderer'

interface ProductDetailClientProps {
  product: ProductData
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter()
  const [selectedSku, setSelectedSku] = useState<ProductSku | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (product && product.skus.length > 0 && !selectedSku) {
      setSelectedSku(product.skus[0])
    }
  }, [product, selectedSku])

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && selectedSku && newQuantity <= Number(selectedSku.stock)) {
      setQuantity(newQuantity)
    }
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const allImages = [product.thumbnail, ...product.pictures]

  const isDisabled = useMemo(() => {
    return !selectedSku || Number(selectedSku.stock) === 0 || quantity === 0 || !product.shelfStatus
  }, [selectedSku, quantity, product.shelfStatus])

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <IconButton onClick={handleGoBack} color="primary">
            <ArrowBack />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              onClick={e => {
                e.preventDefault()
                handleGoHome()
              }}
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              首页
            </Link>
            <Typography color="text.primary">商品详情</Typography>
          </Breadcrumbs>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Card sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                image={allImages[selectedImageIndex]}
                alt={product.name}
                sx={{
                  height: { xs: 300, md: 400 },
                  objectFit: 'cover',
                }}
              />
            </Card>

            {allImages.length > 1 && (
              <Stack direction="row" spacing={1} sx={{ overflowX: 'auto' }}>
                {allImages.map((image, index) => (
                  <Card
                    key={index}
                    sx={{
                      minWidth: 80,
                      height: 80,
                      cursor: 'pointer',
                      border: selectedImageIndex === index ? 2 : 0,
                      borderColor: 'primary.main',
                    }}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`${product.name} ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Card>
                ))}
              </Stack>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {product.categories.map(category => (
                <Chip key={category.id} label={category.name} size="small" variant="outlined" />
              ))}
            </Stack>

            {selectedSku && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" color="primary" component="span">
                  ¥{selectedSku.price.toFixed(2)}
                </Typography>
                {selectedSku.costPrice > selectedSku.price && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    component="span"
                    sx={{ ml: 2, textDecoration: 'line-through' }}
                  >
                    ¥{selectedSku.costPrice.toFixed(2)}
                  </Typography>
                )}
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            {product.skus.length > 1 && (
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>选择规格</InputLabel>
                  <Select
                    value={selectedSku?.id.toString() || ''}
                    label="选择规格"
                    onChange={e => {
                      const sku = product.skus.find(s => s.id.toString() === e.target.value)
                      if (sku) {
                        setSelectedSku(sku)
                        setQuantity(1) // 重置数量
                      }
                    }}
                  >
                    {product.skus.map(sku => (
                      <MenuItem key={sku.id.toString()} value={sku.id.toString()}>
                        {sku.name} - ¥{sku.price.toFixed(2)} (库存: {sku.stock.toString()})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {selectedSku && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" gutterBottom>
                  数量 (库存: {selectedSku.stock.toString()})
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    onChange={e => {
                      const value = parseInt(e.target.value)
                      if (!isNaN(value) && value >= 1 && value <= Number(selectedSku.stock)) {
                        setQuantity(value)
                      }
                    }}
                    size="small"
                    sx={{ width: 80 }}
                    inputProps={{ min: 1, max: Number(selectedSku.stock), type: 'number' }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= Number(selectedSku.stock)}
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </Stack>
              </Box>
            )}

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                disabled={isDisabled}
                sx={{ flex: 1 }}
              >
                {selectedSku && Number(selectedSku.stock) === 0 ? '缺货' : '加入购物车'}
              </Button>
              <IconButton color="primary">
                <FavoriteBorder />
              </IconButton>
              <IconButton color="primary">
                <Share />
              </IconButton>
            </Stack>

            <Box>
              <Chip
                label={product.shelfStatus ? '在售' : '下架'}
                color={product.shelfStatus ? 'success' : 'error'}
                variant="outlined"
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom>
            商品详情
          </Typography>
          <Box sx={{ mt: 2 }}>
            {product.description && (
              <Blocks
                data={product.description}
                renderers={{
                  raw: Raw,
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

const Raw: RenderFn<{ html: string }> = ({ data }) => {
  return <Stack dangerouslySetInnerHTML={{ __html: data.html }} />
}
