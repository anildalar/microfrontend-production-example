const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { DefinePlugin, LoaderOptionsPlugin } = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./base.config')
const {
  dependencies, MFE_MODULE_NAME, MFE_JS_FILE_NAME, exposes, remotes,
} = require('../constants/const.config')

const production = 'production'

module.exports = () => {
  const config = merge(baseConfig, {
    mode: production,
    devtool: false,
    output: {
      ...baseConfig.output,
      publicPath: 'auto',
      pathinfo: false,
    },
    plugins: [
      ...baseConfig.plugins,
      /** * Set environment variable to production OR retain env value */
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(production),
      }),
      /** * Loader Options */
      new LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new ModuleFederationPlugin({
        name: MFE_MODULE_NAME,
        remotes,
        filename: MFE_JS_FILE_NAME,
        exposes,
        shared: {
          ...dependencies,
        },
      }),
      /** * Minfication * webpack v4+ will minify your code by default in production mode. */
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      })],
      splitChunks: false,
      runtimeChunk: false,
    },
  })
  return config
}
