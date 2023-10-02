import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import GroupCodeRegistrationAction from '.'

describe('- Renders Component', () => {
  let component
  const defaultState = {}
  let updateState = { ...defaultState }
  const createTestProps = (props) => ({
    ...props,
  })
  const props = createTestProps()

  test('- Component to be defined test', () => {
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(GroupCodeRegistrationAction, props, updateState)
    expect(component).toMatchSnapshot()
  })

  test('- Having Generic Error Code From SelfRegistration Action', () => {
    updateState = {
      userEnrollment: {
        error: 'PROTECTION_ERR_GENERIC',
      },
    }
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(GroupCodeRegistrationAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })

  test('- Having Any other error code from response', () => {
    updateState = {
      userEnrollment: {
        error: null,
        data: {
          error: {
            code: 'TEST',
          },
        },
      },
    }
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(GroupCodeRegistrationAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })

  test('- Having 401 error code From Self Registration Action', () => {
    updateState = {
      userEnrollment: {
        error: 'PROTECTION_ENROLL_ERR_EOEX401',
      },
    }
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(GroupCodeRegistrationAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })
})
