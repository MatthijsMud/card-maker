
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/card-maker",
  webpack (config) {
    config.module.rules.push({
      type: "javascript/auto",
      test: /\.mjs$/,
      include: /node_modules/
    });
    config.resolve.extensions.push(".mjs");
    return config;
  }
};

module.exports = nextConfig;