/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com'
        }
      ],
    },
  }
