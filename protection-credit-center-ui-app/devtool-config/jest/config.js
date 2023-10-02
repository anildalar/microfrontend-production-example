// eslint-disable-next-line no-unused-vars
const { clientName, clientLang } = require('../constants/const.config')
const titles = require('../constants/titles.json')

const jestConfigs = require('./config.json')

const clientConstantsToBeCovered = Object.keys(titles).map((client) => {
  const constantsPath = `src/app/constants/${client}/**`
  return (client === clientName ? `${constantsPath}` : `!${constantsPath}`)
})

const config = {
  ...jestConfigs,
  collectCoverageFrom: [...jestConfigs.collectCoverageFrom, ...clientConstantsToBeCovered],
  coverageDirectory: jestConfigs.coverageDirectory.replace('#client_id#', `${clientName}`),
  // snapshotResolver: '<rootDir>/devtool-config/jest/snapshotResolver.js',
  //   coverageDirectory: jestConfigs.coverageDirectory
  //     .replace('#client_id#', `${clientName}_${clientLang}`),
}

module.exports = config

// // Or async function
// module.exports = async () => ({...config})
