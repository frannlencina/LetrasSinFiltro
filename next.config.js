/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  env: {
    JSONWKEY: process.env.JSONWKEY,
    BASE_URL: process.env.BASE_URL,
    GET_URL_EMOTIONS: process.env.GET_URL_EMOTIONS,
    POST_URL_LOGIN: process.env.POST_URL_LOGIN,
    POST_URL_REGISTER: process.env.POST_URL_REGISTER
  },
}

