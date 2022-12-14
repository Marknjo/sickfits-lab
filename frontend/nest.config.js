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
};

module.exports = nextConfig;
