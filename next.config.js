const withPreact = require("next-plugin-preact");

/** @type {import('next').NextConfig} */
const nextConfig = withPreact({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  basePath: "/card-maker",
  images: {
    loader: "custom",
  }
});

module.exports = nextConfig;