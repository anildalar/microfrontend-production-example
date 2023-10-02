/* istanbul ignore file */
import '../../../mocks/react-mfe-app'
import { setUpMountWithProvider } from '../../../../devtool-config/jest/utils/test'
import AppRoutes from '.'

describe('- AppRoutes', () => {
  let component
  const updateState = {}
  let props = {}
  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading AppRoutes', () => {
      props = { noThemeProvider: true }
      component = setUpMountWithProvider(AppRoutes, props, updateState)
      expect(component).toMatchSnapshot()
    })
  })
})
