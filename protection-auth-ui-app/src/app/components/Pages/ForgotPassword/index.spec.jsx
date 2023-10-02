import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

import ForgotPassword from '.'

describe('- Login Component', () => {
  let component
  const defaultState = {}
  const updateState = { ...defaultState }
  const createTestProps = (props) => ({
    ...props,
  })
  const props = createTestProps()

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(ForgotPassword, props, updateState)
    })
    test('- Component to be defined test', () => {
      expect(component).toMatchSnapshot()
    })

    test('- Component to be defined', () => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(ForgotPassword, props, updateState)
      expect(component).toBeDefined()
    })
  })
})
