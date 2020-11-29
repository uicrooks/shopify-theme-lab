const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const chalk = require('chalk')
const boxen = require('boxen')

// initial console log
console.log(boxen(
  chalk.green('Starting development tasks'),
  {
    padding: 1,
    margin: { top: 1, right: 0, bottom: 2, left: 0 },
    borderColor: 'green'
  }
))

module.exports = merge(common, {
  mode: 'development',
  entry: [
    path.resolve(__dirname, '../../src/main.js'),
    path.resolve(__dirname, '../reloadr/reloadr.client.js') // add reloadr to the bundle
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