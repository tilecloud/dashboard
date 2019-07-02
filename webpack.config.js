/**
 * Webpack Configuration
 * @type {file}
 */

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { NODE_ENV } = process.env
const IS_PROD = NODE_ENV === 'production'

const ENV = {
  NODE_ENV,
  PUBLIC_URL: '',
  REACT_APP_USER_KEYS_API_URL: process.env.REACT_APP_USER_KEYS_API_URL,
  REACT_APP_AWS_REGION: process.env.REACT_APP_AWS_REGION,
  REACT_APP_AWS_COGNITO_USER_POOL_ID:
    process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  REACT_APP_AWS_COGNITO_USER_POOL_CLIENT_ID:
    process.env.REACT_APP_AWS_COGNITO_USER_POOL_CLIENT_ID
}

module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  entry: {
    uikit: './node_modules/uikit/dist/js/uikit.min.js',
    'uikit-icons': './node_modules/uikit/dist/js/uikit-icons.min.js',
    main: ['@babel/polyfill', 'src/index.js']
  },

  output: {
    path: path.join(__dirname, '/build/'),
    publicPath: '/',
    filename: '[name]-[hash].bundle.js'
  },

  devtool: IS_PROD ? void 0 : 'source-map',

  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /.jsx?$/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: IS_PROD }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: IS_PROD }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: IS_PROD }
          }
        ]
      }
      // {
      //   test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      //   loader: 'file-loader?name=[name].[ext]'
      // }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'dashboard.html'),
      filename: 'dashoboard/index.html'
    }),

    new CopyWebpackPlugin([
      { from: './public/index.html', to: 'index.html' }, // top page
      { from: './public/images', to: 'images' },
      { from: './public/manifest.json', to: 'manifest.json' },
      { from: './public/icon.png', to: 'icon.png' },
      { from: './public/_redirects', to: '_redirects', toType: 'file' }
    ]),

    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(ENV)
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, '/build/'),
    compress: true,
    https: false,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true
  }
}
