import MCQ from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTRWithTheme, setUpRTLWithProvider } = testingUtilsObj

// require('../../../../mocks/react-i18next-init').default()

describe('- MCQ Component', () => {
  let component
  let props = {
    question: '',
    options: '',
    componentProps: '',
    input: '',
    fullWidth: '',
  }
  const updateState = {}

  props = { ...props }

  test('Component to be defined with  message', () => {
    props = {
      question: 'question', options: 'options', componentProps: 'abc', input: 'abc', fullWidth: '100',
    }
    component = setUpRTLWithProvider(MCQ, { ...props }, updateState)
    const mcqWrapper = component.getByTestId('abc-mui-radio-label')
    expect(mcqWrapper).toBeDefined()
  })
  test('Component with Theme', () => {
    component = setUpRTRWithTheme(MCQ, { ...props })
    component.debug()
    expect(component).toMatchSnapshot()
  })
})
