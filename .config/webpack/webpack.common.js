const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const entries = glob.sync(path.resolve(__dirname,'../../src/layout/*')).reduce((entries, entry) => {
  console.log(entry)
  const entryName = path.parse(entry).name
  entries[`layout-${entryName}`] = path.resolve(__dirname, entry);
  return entries
}, {});

module.exports = {
  stats: 'minimal',
  entry: entries,
  /*entry: {
    main: path.resolve(__dirname, '../../src/main.js')
  },*/
  output: {
    path: path.resolve(__dirname, '../../shopify/assets/'),
    filename: '[name].js',
    clean: {
      dry: true
    }
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../../src/'),
      '$': path.resolve(__dirname, '../../shopify/')
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/'
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
    new HtmlWebpackPlugin({
      excludeChunks: ['static'],
      template: path.resolve(__dirname, './script-tags.html'),
      filename: path.resolve(__dirname, '../../shopify/snippets/script-tags.liquid'),
      inject: false,
      minify: {
        removeComments: true,
        removeAttributeQuotes: false,
        //collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ['static'],
      template: path.resolve(__dirname, './style-tags.html'),
      filename: path.resolve(__dirname, '../../shopify/snippets/style-tags.liquid'),
      inject: false,
      minify: {
        removeComments: true,
        removeAttributeQuotes: false,
        //collapseWhitespace: true,
      },
    }),
    new VueLoaderPlugin()
  ]
}