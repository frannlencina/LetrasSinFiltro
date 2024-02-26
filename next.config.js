/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

module.exports = {
  env: {
    JSONWKEY: process.env.JSONWKEY,
    BASE_URL: process.env.BASE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    GET_URL_EMOTIONS: process.env.GET_URL_EMOTIONS,
    POST_URL_LOGIN: process.env.POST_URL_LOGIN,
    POST_URL_REGISTER: process.env.POST_URL_REGISTER
  },
  ...nextConfig
}

