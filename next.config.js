/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.balticcaspian.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.balticcaspian.com',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig 