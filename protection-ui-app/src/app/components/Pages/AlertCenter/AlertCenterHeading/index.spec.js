import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import AlertCenterHeading from '.'

describe('- AlertCenterHeading', () => {
  let component
  const updateState = {}
  const props = {}
  describe('- Shallow Component Snapshot', () => {
    test('- snapshot test', () => {
      component = testingUtilsObj
        ?.setUpRTRWithProviderAndRouter(AlertCenterHeading, props, updateState)
      expect(component).toMatchSnapshot()
    })
  })
})
