import Alerts from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTRWithTheme, setUpRTLWithProvider } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- Alerts Component', () => {
  let component
  let props = {
    errorCode: '200',
    display: '',
    message: '',
    severity: '',
  }
  const updateState = {}

  props = { ...props }

  test('Component to be defined with snackbar message', () => {
    props = { message: 'snackbar message', display: true, severity: 'success' }
    component = setUpRTLWithProvider(Alerts, { ...props }, updateState)
    const alertWrapper = component.getByTestId('alert-message-item')
    expect(alertWrapper).toBeDefined()
  })
  test('Component with Theme', () => {
    component = setUpRTRWithTheme(Alerts, { ...props })
    component.update()
    expect(component).toMatchSnapshot()
  })
})
