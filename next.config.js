const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching: runtimeCaching,
});

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
