const fs = require('fs')
const constants = require('../constants/const.config')

const { root } = require('./root')

const getFileNameSplitAndPop = (str) => str.split('\\').pop().split('/').pop()

const modify = (buffer, isRelease, isEnvFile) => {
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
    }
  }

  // pretty print to JSON with two spaces
  const configJson = JSON.stringify(appConfig, null, 2)
  return configJson
}

const getAllCopyConfigPatterns = () => {
  const copyPluginPatterns = [
    {
      from: root('./src/build-templates/env.json'),
      to: './configs',
      force: true,
      transform: (content) => modify(content, constants.nodeEnv !== 'development', true),
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

  if (fs.existsSync(root('./src/resources'))) {
    copyPluginPatterns.push(
      {
        from: root('./src/resources'),
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
