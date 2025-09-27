/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avdb.stream27.com',
        port: '',
        pathname: '/v/**',
      },
    ],
  },
};

export default nextConfig;
