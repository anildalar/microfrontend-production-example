const {
  defaultClient, defaultLang, defaultENV,
  envDelimeter, prodENV, stageENV, qaENV, defaultRegion,
} = require('../../../devtool-config/appScripts/vars')

const clientEnv = process.env.CLIENT_ENV || defaultENV
const clientLang = process.env.CLIENT_LANG || defaultLang
const clientName = process.env.CLIENT_NAME || defaultClient
const clientRegion = process.env.CLIENT_REGION || defaultRegion
const getTitles = (tenant) => {
  const titles = require('./titles.json')
  return tenant ? titles[clientName] : titles
}

const getDefaultRegionUrl = (env, urlPattern, region = clientRegion) => urlPattern.replace('#region#', region).replace('#env#', `${env}`)

const getDependencies = () => {
  const deps = require('../../package.json').dependencies
  const obj = {}
  Object.keys(deps).forEach((item) => {
    obj[item] = { singleton: true, requiredVersion: deps[item] }
  })
  return obj
}

const remotes = {
  PROTECTION_UI: 'PROTECTION_UI@[window.PROTECTION_UI_URL]/protection_ui_app.js',
  PROTECTION_AUTH_UI: 'PROTECTION_AUTH_UI@[window.PROTECTION_AUTH_UI_URL]/protection_auth_ui_app.js',
  COMMON_UI: 'COMMON_UI@[window.COMMON_UI_URL]/common_ui_app.js',
  PROTECTION_CREDIT_CENTER_UI: 'PROTECTION_CREDIT_CENTER_UI@[window.PROTECTION_CREDIT_CENTER_UI_URL]/protection_credit_center_ui_app.js',
  PROTECTION_IDENTITY_PROTECTION_UI: 'PROTECTION_IDENTITY_PROTECTION_UI@[window.PROTECTION_IDENTITY_PROTECTION_UI_URL]/protection_identity_protection_ui_app.js',
}

const exposes = {
  './container-ui-app': './src/app/components/RootWrapper',
  './container-redux-action': './src/app/redux/actions.js',
}

const constants = {
  appTitle: `${getTitles(clientName || defaultClient)}`,
  buildHashEpochDate: Date.now(),
  clientEnv,
  clientLang,
  clientName,
  clientRegion,
  envDelimeter,
  getDefaultRegionUrl,
  getTitles,
  imagesPath: 'resources/images',
  localesMockPath: `resources/${defaultClient}/locales`,
  nodeEnv: process.env.NODE_ENV,
  pdfPath: 'resources/pdfs',
  port: 4000,
  prodENV,
  qaENV,
  stageENV,
  dependencies: getDependencies(),
  MFE_MODULE_NAME: 'CONTAINER_UI',
  MFE_JS_FILE_NAME: 'container_ui_app.js',
  exposes,
  remotes,
}

module.exports = constants
