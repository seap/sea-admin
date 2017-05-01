const path = require('path')
const webpack = require('webpack')
const devServer = require('./webpack.server')
const { assetDirectory, publicPath } = require('../config')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  context: path.resolve(__dirname, '../src'),
  devtool: isDev ? 'cheap-module-eval-source-map' : '',
  entry: {
    main: isDev ? ['react-hot-loader/patch', 'main.js'] : ['main.js'],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'redux-thunk',
      'react-router-redux',
      'isomorphic-fetch',
      'js-cookie',
      'antd'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: isDev ? '/' : publicPath,
    filename: `${assetDirectory}/[name].[hash:8].js`,
    chunkFilename: `${assetDirectory}/[name].[chunkhash:8].js`
  },
  module: {
    rules: require('./webpack.rules')(isDev)
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src')
    ],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'constants': path.resolve(__dirname, '../src/constants'),
      'common': path.resolve(__dirname, '../src/common'),
      'features': path.resolve(__dirname, '../src/features')
    }
  },
  plugins: require('./webpack.plugins')(isDev),
  devServer
}
