'use client'

import { SeoMetasResponse } from '@/types/seo-metas'
import { Box } from '@mui/material'
import { use } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true,
      },
    },
  ],
}

export default function Banner({ seoMetas }: { seoMetas: Promise<SeoMetasResponse> }) {
  const {
    data: { images },
  } = use(seoMetas)

  if (!images) {
    return null
  }

  if (images.length === 1) {
    const item = images[0]
    return (
      <Box
        key={item.url}
        sx={{
          position: 'relative',
          height: { xs: '200px', sm: '300px', md: '400px', lg: '500px' },
          overflow: 'hidden',
        }}
      >
        <Image
          src={item.url}
          alt={item.href || `Banner image 1`}
          fill
          style={{
            objectFit: 'cover',
          }}
          priority={true}
        />
        {item.href && (
          <Box
            component="a"
            href={item.href}
            target="_blank"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              cursor: 'pointer',
            }}
          />
        )}
      </Box>
    )
  }

  return (
    <Box
      className="slider-container"
      sx={{
        '& .slick-dots': {
          bottom: '20px',
          '& li button:before': {
            fontSize: '12px',
            color: 'white',
            opacity: 0.7,
          },
          '& li.slick-active button:before': {
            opacity: 1,
            color: 'white',
          },
        },
        '& .slick-prev, & .slick-next': {
          zIndex: 1,
          '&:before': {
            fontSize: '20px',
            color: 'white',
          },
        },
        '& .slick-prev': {
          left: '20px',
        },
        '& .slick-next': {
          right: '20px',
        },
      }}
    >
      <Slider {...settings}>
        {images.map((item, index) => (
          <Box
            key={item.url}
            sx={{
              position: 'relative',
              height: { xs: '200px', sm: '300px', md: '400px', lg: '500px' },
              overflow: 'hidden',
            }}
          >
            <Image
              src={item.url}
              alt={item.href || `Banner image ${index + 1}`}
              fill
              style={{
                objectFit: 'cover',
              }}
              priority={index === 0} // 首张图片优先加载
            />
            {item.href && (
              <Box
                component="a"
                href={item.href}
                target="_blank"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  cursor: 'pointer',
                }}
              />
            )}
          </Box>
        ))}
      </Slider>
    </Box>
  )
}
