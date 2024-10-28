/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  // swcMinify: true,
  // trailingSlash: false,
  images: { unoptimized: true },
  // reactStrictMode: true,
};

module.exports = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    domains: ["unsplash.com"],
  },
  // productionBrowserSourceMaps: true,  
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
