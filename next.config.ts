import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'online-store-test.oss-cn-wuhan-lr.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'online-store-test.oss-cn-wuhan-lr.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
