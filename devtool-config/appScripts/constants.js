const { defaultClient } = require('./vars')

const srcToDest = [{
  src: `./src/resources/${process.env.EXISTING_CLIENT_NAME || defaultClient}`,
  dest: `./src/resources/${process.env.NEW_CLIENT_NAME || process.env.EXISTING_CLIENT_NAME}`,
},
{
  src: `./src/app/constants/${process.env.EXISTING_CLIENT_NAME || defaultClient}`,
  dest: `./src/app/constants/${process.env.NEW_CLIENT_NAME || process.env.EXISTING_CLIENT_NAME}`,
}]

const titlesJsonPath = './constants/titles.json'
const urlJsonPath = './constants/url.json'
const packageJsonPath = './package.json'
const buildConfigPath = './build/configs/buildConfig.json'

module.exports = {
  buildConfigPath,
  urlJsonPath,
  packageJsonPath,
  srcToDest,
  titlesJsonPath,
}
