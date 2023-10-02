const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const {
  DefinePlugin,
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
} = require('webpack')
const baseConfig = require('./base.config')
const { root } = require('../helpers')
const {
  port, dependencies, MFE_MODULE_NAME, MFE_JS_FILE_NAME, exposes, remotes,
} = require('../constants/const.config')

const development = 'development'

module.exports = () => {
  const config = merge(baseConfig, {
    mode: development,
    devtool: 'inline-source-map',
    entry: [
      // 'core-js',
      baseConfig.entry.app,
    ],
    output: {
      ...baseConfig.output,
      publicPath: 'auto',
    },
    devServer: {
      static: root('build'),
      hot: false,
      open: true,
      port,
      historyApiFallback: true,
      host: 'localhost',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      compress: true,
      allowedHosts: 'auto',
      client: { overlay: true, progress: true },
    },
    plugins: [
      ...baseConfig.plugins,
      new EnvironmentPlugin({
        NODE_ENV: development,
      }),
      /** * Set environment variable to development */
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(development),
      }),
      new HotModuleReplacementPlugin(),
      new ModuleFederationPlugin({
        name: MFE_MODULE_NAME,
        remotes,
        filename: MFE_JS_FILE_NAME,
        exposes,
        shared: {
          ...dependencies,
        },
      }),
    ],
  })

  return config
}
