/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:3000/',
    CITY_URL: 'http://api.geonames.org/searchJSON?country=RU&lang=en&username=nikita_didenko',
    CONNECT: 'ws://localhost:3000/chat'
  },
  images: {
    domains: ['storage.yandexcloud.net'],
  },
}

module.exports = nextConfig