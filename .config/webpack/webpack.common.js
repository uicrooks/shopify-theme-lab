const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  stats: 'minimal',
  entry: path.resolve(__dirname, '../../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../../shopify/assets/'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../../src/')
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    /**
     * dont clean files with 'static' keyword in them
     * docs: https://github.com/johnagan/clean-webpack-plugin
     */
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!+(*)static+(*)'],
    }),
    new VueLoaderPlugin()
  ]
}