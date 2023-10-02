import FullPageError from '.'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'

const { setUpRTRWithTheme, setUpRTLWithProviderAndRouter } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- FullPageError Component', () => {
  let component
  let props = {
    errorCode: '',
    status: '',
    isAction: '',
  }
  const updateState = {}

  props = { ...props }

  test('Component to be defined with message', () => {
    props = { errorCode: 'errorMessage', status: 'abc', isAction: true }
    component = setUpRTLWithProviderAndRouter(FullPageError, { ...props }, updateState)
    const PageError = component.getByTestId('full-page-error-small-section-container')
    expect(PageError).toBeDefined()
  })
  test('Component with Theme', () => {
    component = setUpRTRWithTheme(FullPageError, { ...props })
    expect(component).toMatchSnapshot()
  })
})
