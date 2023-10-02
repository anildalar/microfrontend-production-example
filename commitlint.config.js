const commitlintCustomize = require('./devtool-config/commitlint/index')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  ...commitlintCustomize,
}
