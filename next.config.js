/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['americodersbucket.s3.us-west-2.amazonaws.com'],
  },
}