import { Container, Box, Skeleton, Grid, Stack } from '@mui/material'

export default function ProductDetailLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={200} height={24} />
        </Stack>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Skeleton variant="rectangular" height={400} sx={{ mb: 2, borderRadius: 1 }} />

            <Stack direction="row" spacing={1}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={80}
                  height={80}
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Skeleton variant="text" height={48} width="80%" sx={{ mb: 1 }} />

            <Skeleton variant="text" height={24} width="40%" sx={{ mb: 2 }} />

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={80} height={24} />
            </Stack>

            <Skeleton variant="text" height={40} width="30%" sx={{ mb: 3 }} />

            <Skeleton variant="rectangular" height={1} width="100%" sx={{ my: 2 }} />

            <Skeleton
              variant="rectangular"
              height={56}
              width="100%"
              sx={{ mb: 3, borderRadius: 1 }}
            />

            <Box sx={{ mb: 3 }}>
              <Skeleton variant="text" height={24} width="40%" sx={{ mb: 1 }} />
              <Stack direction="row" alignItems="center" spacing={1}>
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="rectangular" width={80} height={40} sx={{ borderRadius: 1 }} />
                <Skeleton variant="circular" width={32} height={32} />
              </Stack>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Skeleton variant="rectangular" height={48} sx={{ flex: 1, borderRadius: 1 }} />
              <Skeleton variant="circular" width={48} height={48} />
              <Skeleton variant="circular" width={48} height={48} />
            </Stack>

            <Skeleton variant="rounded" width={60} height={24} />
          </Box>
        </Grid>

        <Grid size={12}>
          <Box sx={{ mt: 4 }}>
            <Skeleton variant="text" height={32} width="20%" sx={{ mb: 2 }} />
            <Stack spacing={1}>
              <Skeleton variant="text" height={20} width="100%" />
              <Skeleton variant="text" height={20} width="90%" />
              <Skeleton variant="text" height={20} width="95%" />
              <Skeleton variant="text" height={20} width="85%" />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
