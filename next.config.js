/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config, options) {
    (config.experiments = { layers: true }),
      (config.resolve.fallback = {
        dns: false,
        net: false,
        tls: false,
      });
    return config;
  },
};

module.exports = nextConfig;
