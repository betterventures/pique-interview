// Common webpack configuration for server bundle
/* eslint-disable comma-dangle */

const webpack = require('webpack');
const path = require('path');
const { imageLoaderRules } = require('./webpack.common');
const webpackCommon = require('./webpack.common');
const { assetLoaderRules } = webpackCommon;

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {

  // the project dir
  context: __dirname,
  entry: [
    './app/startup/serverRegistration',
  ],
  output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, '../app/assets/webpack'),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  module: {
    rules: [
      ...assetLoaderRules,
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader/locals',
          options: {
            modules: true,
            importLoaders: 0,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './app/assets/styles/app-variables.scss'
            },
          }
        ],
      },
    ],
  },
};
