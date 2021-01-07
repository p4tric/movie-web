const CracoLessPlugin = require('craco-less');
const path = require('path');

const target = 'https://sometimes-maybe-flaky-api.gdshive.io';

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constant': path.resolve(__dirname, 'src/constant'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@service': path.resolve(__dirname, 'src/service'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
  devServer: {
    port: 3007,
    proxy: [
      {
        context: [
          '/',
        ],
        target,
        changeOrigin: true,
      }
    ],
  },
};
