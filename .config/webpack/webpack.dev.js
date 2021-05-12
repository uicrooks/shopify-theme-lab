const path = require('path')
const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  entry: [
    path.resolve(__dirname, '../../src/main.js'),
    path.resolve(__dirname, '../../src/layout/index.js'),
    path.resolve(__dirname, '../../src/layout/page.js'),
    path.resolve(__dirname, '../../src/layout/collection.js'),
    path.resolve(__dirname, '../../src/layout/product.js'),
    path.resolve(__dirname, '../../src/layout/cart.js'),
    path.resolve(__dirname, '../../src/layout/account.js'),
    path.resolve(__dirname, '../../node_modules/shopify-theme-lab-reloader/client.autoload') // add reloader to the bundle
  ],
  module: {
    rules: [
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
              'style-loader',
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
     * docs: https://www.npmjs.com/package/eslint-webpack-plugin
     */
    new ESLintPlugin({
      files: 'src/**/*.{js,vue}',
      overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js')
    }),
    /**
     * docs: https://www.npmjs.com/package/stylelint-webpack-plugin
     */
    new StylelintPlugin({
      files: 'src/**/*.{vue,css,sass,scss}',
      configFile: path.resolve(__dirname, '../.stylelintrc.js')
    })
  ]
})