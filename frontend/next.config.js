/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images'
      }
    ]
  },
  reactStrictMode: true,
  /* swcMinify: true,
  experimental: {
    appDir: false,
  }, */
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/products',
        }
      ]
    }
  }
};

module.exports = nextConfig;
