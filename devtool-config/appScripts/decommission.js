const fs = require('fs')
const rimraf = require('rimraf')
const { root } = require('../devtool-config/helpers/root')
const {
  srcToDest, packageJsonPath, titlesJsonPath, urlJsonPath,
} = require('./constants')

const { EXISTING_CLIENT_NAME } = process.env

// Remove folders for decommission Client
srcToDest.forEach((obj) => {
  rimraf(root(obj.dest), () => {
    console.log(EXISTING_CLIENT_NAME, 'Client Decommission success')
  })
})

// Delete Dynamic Title in titles.json for decommission Client
const titlesObj = require(root(titlesJsonPath))
delete titlesObj[`${EXISTING_CLIENT_NAME}`]
fs.writeFile(root(titlesJsonPath), JSON.stringify(titlesObj), (err) => {
  if (err) console.log('Error writing file:', err)
})

// Add default Fonts in url.json for new On Board Client
const urlsObj = require(root(urlJsonPath))
delete urlsObj[`${EXISTING_CLIENT_NAME}`]
fs.writeFile(root(urlJsonPath), JSON.stringify(urlsObj), (err) => {
  if (err) console.log('Error writing file:', err)
})

// Delete Dynamic scripts in package.json for decommission Client
const packageObj = require(root(packageJsonPath))
delete packageObj.scripts[`build:${EXISTING_CLIENT_NAME}`]
fs.writeFile(root(packageJsonPath), JSON.stringify(packageObj), (err) => {
  if (err) console.log('Error writing file:', err)
})
