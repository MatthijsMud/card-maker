
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/card-maker",
  images: {
    loader: "custom",
  }
};

module.exports = nextConfig;