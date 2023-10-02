/* istanbul ignore file */
import '../../../mocks/react-mfe-app'
import { setupRTRWithProvider } from '../../../../devtool-config/jest/utils/test'
import Main from '.'

describe('- Main', () => {
  let component
  const updateState = {}
  let props = {}
  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading Main', () => {
      props = { noThemeProvider: true }
      component = setupRTRWithProvider(Main, props, updateState)
      expect(component).toMatchSnapshot()
    })
  })
})
