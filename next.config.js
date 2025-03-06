/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.balticcaspian.com', 'balticcaspian.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.balticcaspian.com',
                port: '',
            },
        ],
    },
}

module.exports = nextConfig 