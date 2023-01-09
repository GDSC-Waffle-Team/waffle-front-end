/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/main',
        destination: `http://waffle2.duckdns.org/main`,
      },
      {
        source: '/api/member',
        destination: `http://waffle2.duckdns.org/member`,
      },
      {
        source: '/api/admin',
        destination: `http://waffle2.duckdns.org/admin`,
      },
    ];
  },
};

module.exports = nextConfig;
