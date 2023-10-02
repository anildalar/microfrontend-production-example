const path = require('path')
const { clientName } = require('../constants/const.config')

module.exports = {

  resolveSnapshotPath: (testPath, snapshotExtension) => {
    // Get directory of test source file
    const testDirectory = path.dirname(testPath)

    // Get file name of test source file
    const testFilename = path.basename(testPath)

    // Construct file path for snapshot, saved next to original test source file
    return `${testDirectory}/__snapshots__${clientName}__/${testFilename}${snapshotExtension}`
  },
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    // Transform snapshot file path
    const testSourceFile = snapshotFilePath
    // Remove __snapshot__ directory
      .replace(`/__snapshots__${clientName}__`, '')
    // Convert .ts (TypeScript) to .js to reach built test file
      .replace('.ts', '.js')
    // Remove snapshot extension so we end up with .js
      .replace(snapshotExtension, '')

    // Return test file path in dist directory
    return `${testSourceFile}`
  },
  testPathForConsistencyCheck: 'some/__tests__/example.test.js',
}
