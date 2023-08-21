/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'https://evently-backend.netlify.app/',
    CITY_URL: 'http://api.geonames.org/searchJSON?country=RU&lang=en&username=nikita_didenko',
    CONNECT: 'ws://evently-backend.netlify.app/chat'
  },
  images: {
    domains: ['storage.yandexcloud.net'],
  },
}

module.exports = nextConfig