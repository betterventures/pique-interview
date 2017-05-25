module.exports = {
  test: /\.js(\.erb)?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: ['env', 'react', 'es2016', 'es2015', 'stage-0', 'stage-2']
  }
}
