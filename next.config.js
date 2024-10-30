/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  swcMinify: true,
  // trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: false,
};

module.exports = ({
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    domains: ["unsplash.com"],
  },
  // productionBrowserSourceMaps: true,  
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
});

module.exports = nextConfig;
