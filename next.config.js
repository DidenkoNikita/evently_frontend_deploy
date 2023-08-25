/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://158.160.75.150:3000/',
    CITY_URL: 'http://api.geonames.org/searchJSON?country=RU&lang=en&username=nikita_didenko',
    CONNECT: 'ws://http://158.160.75.150:3000/chat'
  },
  images: {
    domains: ['storage.yandexcloud.net'],
  },
}

module.exports = nextConfig