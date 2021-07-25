const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin') // included in webpack 5, no need to add to package.json
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const common = require('./webpack.common.js')

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
      }
    ]
  },
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