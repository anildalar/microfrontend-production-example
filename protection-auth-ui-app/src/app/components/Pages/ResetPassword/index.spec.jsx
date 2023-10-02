import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'
import ResetPassword from '.'

describe('- ResetPassword Component', () => {
  let component
  const defaultState = {}
  let updateState = { ...defaultState }
  const createTestProps = (props) => ({
    ...props,
  })
  const props = createTestProps()

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(ResetPassword, props, updateState)
    })
    test('- Component to be defined test', () => {
      expect(component).toMatchSnapshot()
    })

    test('- Having Success Reset Password', () => {
      updateState = {
        resetPassword: {
          data: {
            status: true,
          },
          error: null,
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(ResetPassword, props, updateState)
      expect(component).toBeDefined()
    })

    test('- Reset Password Failed', () => {
      updateState = {
        resetPassword: {
          data: {
            status: false,
          },
          error: null,
        },
      }
      component = testingUtilsObj?.setUpRTRWithProviderAndRouter(ResetPassword, props, updateState)
      expect(component).toBeDefined()
    })
  })
})
