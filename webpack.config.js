const path = require('path');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const miniHtmlWebpackPluginTemplate = require('@vxna/mini-html-webpack-template');
const postCssUse = require('postcss-use');
// const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');

const codePenPostCssUseModules = ['lost', 'postcss-apply', 'postcss-color-function', 'postcss-conditionals', 'postcss-custom-media', 'postcss-discard-comments', 'postcss-each', 'postcss-extend', 'postcss-flexbox', 'postcss-for', 'postcss-media-minmax', 'postcss-mixins', 'postcss-nested', 'postcss-nested-ancestors', 'postcss-preset-env', 'postcss-reverse-media', 'postcss-simple-vars', 'postcss-triangle'];

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
  },
  devServer: { 
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }]
            ]
          }
        }
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src'),
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          { loader: 'css-loader', options: { importLoaders: 1 } }, 
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postCssUse({ modules: codePenPostCssUseModules }),
                // autoprefixer()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpackDashboard(),
    new CleanWebpackPlugin(),
    new MiniHtmlWebpackPlugin({
      context: {
        lang: 'en',
        title: 'Tribute Page | fCC Responsive Web Design Projects',
        container: 'root',
        head: {
          links: [
            { rel: "stylesheet", href: "https://unpkg.com/normalize.css@8.0.1/normalize.css"},
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Diplomata+SC|Open+Sans&display=swap" }
          ],
          scripts: [
            // { defer: true, src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js' }
          ]
        },
        body: {
          scripts: [
            { src: 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js' }
          ]
        },
        trimWhitespace: true
      },
      template: miniHtmlWebpackPluginTemplate
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
