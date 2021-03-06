const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { vendor } = require('./webpack.entrys')

module.exports = {
  entry: { vendor },
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/',
    filename: '[name].js',
    library: '[name]'
  },
  module: {
    rules: require('./webpack.rules')(false)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html'
    }),
    new webpack.DllPlugin({
      context: path.resolve(__dirname, '../src'),
      path: path.resolve(__dirname, '../lib/vendor.manifest.json'),
      name: '[name]'
    })
  ]
}
