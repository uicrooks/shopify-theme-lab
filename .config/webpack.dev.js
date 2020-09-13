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
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: [
            {
            loader: 'eslint-loader',
            options: {
              configFile: path.resolve(__dirname, '.eslintrc.js')
            }
          }
        ]
      },
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