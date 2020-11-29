const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const log = require('../plugins/log')

/**
 * initial console.log on development start
 */
log.box({
  msg: 'Starting development tasks',
  color: 'green'
})

module.exports = merge(common, {
  mode: 'development',
  entry: [
    path.resolve(__dirname, '../../src/main.js'),
    path.resolve(__dirname, '../plugins/reloadr/reloadr.client.js') // add reloadr to the bundle
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: [
            {
            loader: 'eslint-loader',
            options: {
              configFile: path.resolve(__dirname, '../.eslintrc.js')
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: require(path.resolve(__dirname, '../postcss.config.js'))
            }
          }
        ]
      }
    ]
  }
})