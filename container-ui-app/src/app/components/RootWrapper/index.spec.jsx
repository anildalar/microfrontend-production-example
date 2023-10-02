import '../../../mocks/react-mfe-app'
import { setUpShallowWithProvider } from '../../../../devtool-config/jest/utils/test'
import RootWrapper from '.'

describe('- RootWrapper', () => {
  let component
  const updateState = {}
  let props = {}
  describe('- Shallow Component Snapshot', () => {
    test('- Default Loading RootWrapper', () => {
      props = { noThemeProvider: true }
      component = setUpShallowWithProvider(RootWrapper, props, updateState)
      expect(component).toMatchSnapshot()
    })
  })
})
