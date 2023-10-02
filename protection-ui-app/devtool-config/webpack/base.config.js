const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')

const { root, staticContent } = require('../helpers')
const { getAllCopyConfigPatterns } = require('../helpers/transform')
const constants = require('../constants/const.config')

module.exports = {
  entry: {
    app: './src/index.jsx',
  },
  // Tell Weback to output our bundle to ./build/js/bundle.js
  output: {
    path: root('build'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '',
    pathinfo: true,
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [root('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        include: [root('src'), root('devtool-config/constants'), root('devtool-config/helpers')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        include: [root('src')],
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          fix: true,
          failOnError: true,
          failOnWarning: false,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
            },
          },
        ],
        include: [root('src')],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        }],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        ...getAllCopyConfigPatterns(),
      ],
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      templateParameters: {
        title: constants.appTitle,
      },
      base: '/',
      // favicon: `./src/resources/${constants.clientName}/images/favicons/favicon.ico`,
      filename: 'index.html',
      inject: 'body',
      scripts: '',
      htmlBody: staticContent.htmlBody(),
      htmlStyles: staticContent.htmlStyles(),
    }),
    new DefinePlugin({
      'process.env.BUILD_HASH': constants.buildHashEpochDate,
      'process.env.CLIENT_ENV': JSON.stringify(constants.clientEnv),
      'process.env.CLIENT_LANG': JSON.stringify(constants.clientLang),
      'process.env.CLIENT_NAME': JSON.stringify(constants.clientName),
      'process.env.CLIENT_REGION': JSON.stringify(constants.clientRegion),
    }),
    new ExternalTemplateRemotesPlugin(),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: false,
  },
}
