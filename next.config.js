/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config, options) {
    console.log(options.webpack.version); // Should be webpack v5 now
    config.experiments = { layers: true };
    return config;
  },
};

module.exports = nextConfig;
