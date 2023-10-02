const fs = require('fs')
const { root } = require('../devtool-config/helpers/root')
const {
  envDelimeter, prodENV, stageENV,
} = require('./vars')
const {
  buildConfigPath,
} = require('./constants')

const buildConfigJson = require(root(buildConfigPath))

buildConfigJson.clientId = process.env.E2E_CLIENT_NAME
buildConfigJson.configStoreUrl = buildConfigJson.configStoreUrl.replace('#client_id#', process.env.E2E_CLIENT_NAME)
  .replace('#client_env#.', process.env.E2E_CLIENT_ENV !== prodENV ? `${process.env.E2E_CLIENT_ENV}${process.env.E2E_CLIENT_ENV === stageENV ? '-' : envDelimeter}` : '')
  .replace('#client_env#', process.env.E2E_CLIENT_ENV)
buildConfigJson.env = process.env.E2E_CLIENT_ENV

fs.writeFile(root(buildConfigPath), JSON.stringify(buildConfigJson), (err) => {
  if (err) console.log('Error writing file:', err)
})
