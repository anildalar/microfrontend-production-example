import '../../../../mocks/react-i18next-init'
import '../../../../mocks/react-mfe-app'
import { setUpMountWithProvider } from '../../../../../devtool-config/jest/utils/test'
import Dashboard from '.'

describe('- Dashboard', () => {
  let component
  const updateState = {}
  let props = {}
  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading Dashboard', () => {
      props = { noThemeProvider: true }
      component = setUpMountWithProvider(Dashboard, props, updateState)
      expect(component).toMatchSnapshot()
    })
  })
})
