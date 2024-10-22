/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  swcMinify: true,
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["unsplash.com"],
  },
};

module.exports = nextConfig;
