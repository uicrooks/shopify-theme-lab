const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin') // included in webpack 5, no need to add to package.json
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const log = require('../plugins/log')

/**
 * initial console.log on build start
 */
log.box({
  msg: 'Starting building assets',
  color: 'green'
})

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [ '@babel/preset-env' ],
          plugins: [ '@babel/plugin-transform-runtime' ]
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
  },
  plugins: [
    /**
     * docs: https://webpack.js.org/plugins/mini-css-extract-plugin/
     */
    new MiniCssExtractPlugin({
      filename: './bundle.css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      /**
       * docs: https://webpack.js.org/plugins/terser-webpack-plugin
       */
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: /@license/i // preserve license comments
          }
        },
        extractComments: false
      }),
      /**
       * docs: https://webpack.js.org/plugins/css-minimizer-webpack-plugin
       */
      new CssMinimizerPlugin()
    ]
  }
})