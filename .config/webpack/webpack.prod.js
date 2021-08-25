const path = require('path')
const glob = require('glob-all');
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin') // included in webpack 5, no need to add to package.json
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
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
      },
      ... (() => {
        const rules = []

        const loaders = [
          { test: /\.(css|postcss)$/i },
          { test: /\.s[ac]ss$/i, loader: 'sass-loader' },
          { test: /\.less$/i, loader: 'less-loader' },
          { test: /\.styl$/i, loader: 'stylus-loader' }
        ]

        loaders.forEach((element, index) => {
          rules.push({
            test: element.test,
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
          })

          if (element.loader) rules[index].use.push(element.loader)
        })

        return rules
      })()
    ]
  },
  plugins: [
    /**
     * docs: https://webpack.js.org/plugins/mini-css-extract-plugin
     */
    new MiniCssExtractPlugin({
      filename: './[name].css',
      chunkFilename: '[name].css'
    }),
    new PurgeCSSPlugin({
      paths: glob.sync([
        path.resolve(__dirname, '../../src/**/*.vue'),
      ]),
      safelist: { 
        greedy: [ /data-v-.*/ ]
      }
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