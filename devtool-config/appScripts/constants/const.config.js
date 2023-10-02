const {
  defaultClient, defaultLang, defaultENV, defaultPort,
  envDelimeter, prodENV, stageENV, qaENV, defaultRegion,
} = require('../vars')

const clientEnv = process.env.CLIENT_ENV || defaultENV
const clientLang = process.env.CLIENT_LANG || defaultLang
const clientName = process.env.CLIENT_NAME || defaultClient
const clientRegion = process.env.CLIENT_REGION || defaultRegion

const getTitles = (tenant) => {
  const titles = require('./titles.json')
  return tenant ? titles[clientName] : titles
}

const getClients = (tenant) => {
  const clients = require('./url.json')
  return tenant ? clients[tenant] : clients
}

const getDefaultRegionUrl = (env, urlPattern, region = clientRegion) => urlPattern.replace('#region#', region).replace('#env#', `${env}`)

const constants = {
  appTitle: `${getTitles(clientName || defaultClient)}`,
  buildHashEpochDate: Date.now(),
  clientEnv,
  clientLang,
  clientName,
  clientRegion,
  envDelimeter,
  getClients,
  getDefaultRegionUrl,
  getTitles,
  imagesPath: 'resources/images',
  localesMockPath: `resources/${defaultClient}/locales`,
  localesPath: 'resources/locales',
  nodeEnv: process.env.NODE_ENV,
  pdfPath: 'resources/pdfs',
  port: defaultPort,
  prodENV,
  qaENV,
  stageENV,
}

module.exports = constants
