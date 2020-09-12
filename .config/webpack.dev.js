const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  entry: [
    path.resolve(__dirname, '../src/main.js'),
    path.resolve(__dirname, './reloadr/reloadr.client.js') // add reloadr to the dist bundle
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: require('./postcss.config.js')
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
})