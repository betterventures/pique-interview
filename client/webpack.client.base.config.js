// Common client-side webpack configuration used by
// webpack.client.rails.hot.config and webpack.client.rails.build.config.

const webpack = require('webpack');
const path = require('path');
const webpackCommon = require('./webpack.common');
const { assetLoaderRules } = webpackCommon;

const devBuild = process.env.NODE_ENV !== 'production';

module.exports = {

  // the project dir
  context: __dirname,
  entry: {
    // This will contain the app entry points defined by
    // webpack.client.rails.hot.config and webpack.client.rails.build.config
    app: [
      './app/startup/clientRegistration',
    ],
  },
  resolve: {
    alias: {
      api: path.join(process.cwd(), 'app', 'api'),
      containers: path.join(process.cwd(), 'app', 'containers'),
      components: path.join(process.cwd(), 'app', 'components'),
      images: path.join(process.cwd(), 'app', 'assets', 'images'),
      stores: path.join(process.cwd(), 'app', 'stores'),
    },
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.DefinePlugin({
      TRACE_TURBOLINKS: devBuild,
    }),

    // https://webpack.js.org/guides/code-splitting-libraries/#implicit-common-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
  ],

  module: {
    rules: [
      ...assetLoaderRules,

      {
        test: require.resolve('jquery'),
        use: {
          loader: 'expose-loader',
          options: {
            jQuery: true,
          },
        },
      },
    ],
  },
};
