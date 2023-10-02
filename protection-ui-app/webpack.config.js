const constants = require('./devtool-config/constants/const.config')

/**
 * Webpack4 allows for a function to be exported. This function will
 * be a representation of the command line's --env objects. This allows
 * us to write customisations logically using the env object.
 */
module.exports = () => {
  switch (constants.nodeEnv) {
    case 'production':
      return require('./devtool-config/webpack/prod.config')()
    case 'development':
      return require('./devtool-config/webpack/dev.config')()
    default:
      return require('./devtool-config/webpack/prod.config')()
  }
}
