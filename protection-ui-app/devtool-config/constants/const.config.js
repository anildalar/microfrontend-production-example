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
  CONTAINER_UI: 'CONTAINER_UI@[window.CONTAINER_UI_URL]/container_ui_app.js',
  COMMON_UI: 'COMMON_UI@[window.COMMON_UI_URL]/common_ui_app.js',
  PROTECTION_CREDIT_CENTER_UI: 'PROTECTION_CREDIT_CENTER_UI@[window.PROTECTION_CREDIT_CENTER_UI_URL]/protection_credit_center_ui_app.js',
}

const exposes = {
  './protection-ui-reducers': './src/app/redux/reducers',
  './protection-ui-sagas': './src/app/redux/saga',
  './protection-ui-routes': './src/app/components/AppRoutes/routes',
}

const constants = {
  appTitle: `${getTitles(clientName || defaultClient)}`,
  buildHash: process.env.BUILD_HASH,
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
  localesPath: 'resources/locales',
  nodeEnv: process.env.NODE_ENV,
  pdfPath: 'resources/pdfs',
  port: 4001,
  prodENV,
  qaENV,
  stageENV,
  dependencies: getDependencies(),
  MFE_MODULE_NAME: 'PROTECTION_UI',
  MFE_JS_FILE_NAME: 'protection_ui_app.js',
  exposes,
  remotes,
}

module.exports = constants
