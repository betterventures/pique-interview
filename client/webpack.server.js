const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    'startup/serverRegistration',
  ],
  output: {
    path: path.resolve(__dirname, '../app/assets/webpack'),
    filename: 'server.js',
  },
  resolve: {
    alias: {
      api: path.join(process.cwd(), 'app', 'api'),
      containers: path.join(process.cwd(), 'app', 'containers'),
      components: path.join(process.cwd(), 'app', 'components'),
      images: path.join(process.cwd(), 'app', 'assets', 'images'),
    },
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
