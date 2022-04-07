module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",

  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    config.module.rules.push({
      type: "javascript/auto",
      test: /\.mjs$/,
      include: /node_modules/,
    })
    return config;
  }
}