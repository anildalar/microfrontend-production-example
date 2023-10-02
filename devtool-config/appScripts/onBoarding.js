const fs = require('fs')
const fse = require('fs-extra')
const { root } = require('./helpers/root')
const {
  srcToDest, packageJsonPath, titlesJsonPath, urlJsonPath,
} = require('./constants')

const { EXISTING_CLIENT_NAME, NEW_CLIENT_NAME } = process.env

// Add folders for new On Board Client
srcToDest.forEach((obj) => {
  fse.copySync(root(obj.src), root(obj.dest), {
    overwrite: true,
  }, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(NEW_CLIENT_NAME, 'Client onBoard success')
    }
  })
})

// Add Dynamic Title in titles.json for new On Board Client
const titlesObj = require(root(titlesJsonPath))
titlesObj[`${NEW_CLIENT_NAME}`] = NEW_CLIENT_NAME.toUpperCase()
fs.writeFile(root(titlesJsonPath), JSON.stringify(titlesObj), (err) => {
  if (err) console.log('Error writing file:', err)
})

// Add default Fonts in url.json for new On Board Client
const urlsObj = require(root(urlJsonPath))
urlsObj[`${NEW_CLIENT_NAME}`] = urlsObj[EXISTING_CLIENT_NAME]
fs.writeFile(root(urlJsonPath), JSON.stringify(urlsObj), (err) => {
  if (err) console.log('Error writing file:', err)
})

// Add Dynamic scripts in package.json for new On Board Client
const packageObj = require(root(packageJsonPath))
packageObj.scripts[`build:${NEW_CLIENT_NAME}`] = `cross-env CLIENT_NAME=${NEW_CLIENT_NAME} npm-run-all clean:build prod`
fs.writeFile(root(packageJsonPath), JSON.stringify(packageObj), (err) => {
  if (err) console.log('Error writing file:', err)
})
