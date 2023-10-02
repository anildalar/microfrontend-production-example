import SuccessComponent from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTRWithTheme, setUpRTLWithProvider } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- SuccesComponent Component', () => {
  let component
  let props = {
    pageId: '',
    dataTestid: '',
    to: '',
    isAction: '',
  }
  const updateState = {}

  props = { ...props }

  test('Component to be defined with success message', () => {
    props = {
      pageId: 'pageId', dataTestid: 'pageDataId', to: 'location', isAction: true,
    }
    component = setUpRTLWithProvider(SuccessComponent, { ...props }, updateState)
    const success = component.getByTestId('success-small-section-container')
    expect(success).toBeDefined()
  })
  test('Component with Theme', () => {
    component = setUpRTRWithTheme(SuccessComponent, { ...props })
    expect(component).toMatchSnapshot()
  })
})
