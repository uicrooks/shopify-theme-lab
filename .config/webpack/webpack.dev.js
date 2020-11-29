const path = require('path')
const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const common = require('./webpack.common.js')
const log = require('../plugins/log')

/**
 * initial console.log on development start
 */
log.box({
  msg: 'Started development process',
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
      ... (() => {
        const rules = []

        const loaders = [
          { test: /\.css$/i },
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
    })
  ]
})