import TypographyWrapper from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProvider } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- TypographyWrapper Component', () => {
  let component
  let props = {
    children: '',
    loading: '',
    sxt: '',
  }
  const updateState = {}

  props = { ...props }

  test('Component to be defined with  message', () => {
    props = { children: 'abc', loading: 'true', sxt: 'theme' }
    component = setUpRTLWithProvider(TypographyWrapper, { ...props }, updateState)
    const alertWrapper = component.getByTestId('alert-message-item')
    expect(alertWrapper).toBeDefined()
  })
  test('Component with snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})
