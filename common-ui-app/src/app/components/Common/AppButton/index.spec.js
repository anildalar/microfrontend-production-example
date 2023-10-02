import AppButton from '.'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

const { setUpRTLWithProvider } = testingUtilsObj

describe('AppButton Component', () => {
  let component
  let props = {
    imgPath: '',
    text1: '',
    text2: '',
    height: '',
    width: '',
  }
  const updateState = {}
  props = { ...props }
  test('Component to be defined with  message', () => {
    props = {
      imgPath: 'imgPath', text1: 'text', text2: 'text', height: '10', width: '20',
    }
    component = setUpRTLWithProvider(AppButton, { ...props }, updateState)
    expect(component).toBeDefined()
  })

  test('- Component to be defined test', () => {
    expect(component).toMatchSnapshot()
  })
})
