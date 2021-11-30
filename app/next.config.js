const graphHost = 'api.thegraph.com';
const venusHost = 'venus.gigalixirapp.com';
const IPFS_HOST = 'ipfs.infura.io';

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  compress: true,
  future: {
    webpack5: true,
  },
  webpack(config, options) {
    const { dev, isServer } = options;

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: [graphHost, venusHost, IPFS_HOST],
  },
};
