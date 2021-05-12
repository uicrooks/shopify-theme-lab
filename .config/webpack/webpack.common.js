const path = require('path')
const ProgressPlugin = require('progress-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  stats: 'minimal',
  //entry: path.resolve(__dirname, '../../src/main.js'),
  entry: {
    main: path.resolve(__dirname, '../../src/main.js'),
    index: path.resolve(__dirname, '../../src/layout/index.js'),
    page: path.resolve(__dirname, '../../src/layout/page.js'),
    collection: path.resolve(__dirname, '../../src/layout/collection.js'),
    product: path.resolve(__dirname, '../../src/layout/product.js'),
    cart: path.resolve(__dirname, '../../src/layout/cart.js'),
    account: path.resolve(__dirname, '../../src/layout/account.js'),
  },
  output: {
    path: path.resolve(__dirname, '../../shopify/assets/'),
    filename: 'layout-[name].js'
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../../src/'),
      '@shopify': path.resolve(__dirname, '../../shopify/')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ProgressPlugin(),
    /**
     * don't clean files with the 'static' keyword in their filename
     * docs: https://github.com/johnagan/clean-webpack-plugin
     */
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!*static*']
    }),
    new VueLoaderPlugin()
  ]
}