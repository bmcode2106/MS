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
      // TAMBAHKAN DOMAIN BARU DI SINI
      {
        protocol: 'https',
        hostname: 'blog.pinwheel.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

export default nextConfig;
