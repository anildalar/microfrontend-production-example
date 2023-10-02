const fs = require('fs')
const { version } = require('../../package.json')
const constants = require('../constants/const.config')

const { root } = require('./root')

const getFileNameSplitAndPop = (str) => str.split('\\').pop().split('/').pop()

const modify = (buffer, ver, isRelease, buildHashEpochDate, isEnvFile) => {
  // copy-webpack-plugin passes a buffer
  const appConfig = JSON.parse(buffer.toString())

  // make any modifications you like, such as
  if (!isRelease) {
    if (isEnvFile) {
      appConfig.CONTAINER_UI_URL = 'http://localhost:4000'
      appConfig.PROTECTION_UI_URL = 'http://localhost:4001'
      appConfig.PROTECTION_AUTH_UI_URL = 'http://localhost:4002'
      appConfig.COMMON_UI_URL = 'http://localhost:4003'
      appConfig.PROTECTION_IDENTITY_PROTECTION_UI_URL = 'http://localhost:4004'
      appConfig.PROTECTION_CREDIT_CENTER_UI_URL = 'http://localhost:4005'
    } else {
      appConfig.clientId = constants.clientName
      appConfig.env = constants.clientEnv
    }
  }
  if (!isEnvFile) {
    appConfig.version = ver
    appConfig.buildHash = buildHashEpochDate
  }

  // pretty print to JSON with two spaces
  const configJson = JSON.stringify(appConfig, null, 2)
  return configJson
}

const getAllCopyConfigPatterns = () => {
  const copyPluginPatterns = [
    {
      from: root('./src/build-templates/buildConfig.json'),
      to: './configs',
      force: true,
      transform: (content) => modify(content, version, constants.nodeEnv !== 'development', constants.buildHashEpochDate),
    },
    {
      from: root('./src/build-templates/adminPanel/index.json'),
      to: './configs',
      force: true,
    },
    {
      from: root('./src/build-templates/env.json'),
      to: './configs',
      force: true,
      transform: (content) => modify(content, version, constants.nodeEnv !== 'development', constants.buildHashEpochDate, true),
    },
    {
      from: root('../node_modules/pdfjs-dist/cmaps'),
      to: 'cmaps/',
    },
    {
      from: root('../node_modules/pdfjs-dist/standard_fonts'),
      to: 'standard_fonts/',
    },
  ]

  if (fs.existsSync(root(`./src/resources/${constants.clientName}`))) {
    copyPluginPatterns.push(
      {
        from: root(`./src/resources/${constants.clientName}`),
        to: ({ absoluteFilename }) => {
          let newFileName = './resources'
          if (absoluteFilename.indexOf('locales') > 0) {
            const fileName = getFileNameSplitAndPop(absoluteFilename)
            newFileName = `./resources/locales/${fileName.split('.')[0]}_${constants.buildHashEpochDate}.${fileName.split('.')[1]}`
          }
          return newFileName
        },
        force: true,
        filter: async (resourcePath) => !(resourcePath.indexOf('theme') > 0),
      },
    )
  }

  return copyPluginPatterns
}

module.exports = {
  getAllCopyConfigPatterns,
  modify,
}
