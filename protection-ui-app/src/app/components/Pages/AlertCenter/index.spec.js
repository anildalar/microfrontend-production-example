import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import AlertCenter from '.'

describe('- AlertCenter', () => {
  let component
  const updateState = {}
  const props = {}
  describe('- Shallow Component Snapshot', () => {
    test('- snapshot test', () => {
      component = testingUtilsObj
        ?.setUpRTRWithProviderAndRouter(AlertCenter, props, updateState)
      expect(component).toMatchSnapshot()
    })
  })
})
