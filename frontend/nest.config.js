/** @type {import('next').NextConfig} */
const nextConfig = {
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
