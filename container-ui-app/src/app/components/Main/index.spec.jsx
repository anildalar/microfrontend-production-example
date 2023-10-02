/* istanbul ignore file */
import '../../../mocks/react-mfe-app'
import { setUpMountWithProvider } from '../../../../devtool-config/jest/utils/test'
import Main from '.'

describe('- Main', () => {
  let component
  const updateState = {}
  let props = {}
  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading Main', () => {
      props = { noThemeProvider: true }
      component = setUpMountWithProvider(Main, props, updateState)
      expect(component).toMatchSnapshot()
    })
  })
})
