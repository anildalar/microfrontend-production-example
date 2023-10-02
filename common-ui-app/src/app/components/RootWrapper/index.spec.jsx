import RootWrapper from '.'
import { testingUtilsObj } from '../../../../devtool-config/jest/utils/test'

const { setUpRTR } = testingUtilsObj
describe('- RootWrapper', () => {
  let component
  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading RootWrapper', () => {
      expect(2 + 2).toBe(4)
    })
    test('- RootWrapper with Snapshot', () => {
      component = setUpRTR(RootWrapper, { })
      expect(component).toMatchSnapshot()
    })
  })
})
