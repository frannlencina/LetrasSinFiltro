/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  env: {
    JSONWKEY: process.env.JSONWKEY,
    BASE_URL: process.env.BASE_URL
  },
}

