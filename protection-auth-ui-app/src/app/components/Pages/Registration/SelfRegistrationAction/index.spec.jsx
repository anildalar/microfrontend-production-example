import { fireEvent } from '@testing-library/react'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import SelfRegistrationAction from '.'

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
      ?.setUpRTRWithProviderAndRouter(SelfRegistrationAction, props, updateState)
    expect(component).toMatchSnapshot()
  })

  test('- Having Generic Error Code From SelfRegistration Action', () => {
    updateState = {
      userEnrollment: {
        error: 'PROTECTION_ERR_GENERIC',
      },
    }
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(SelfRegistrationAction, props, updateState)
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
      ?.setUpRTRWithProviderAndRouter(SelfRegistrationAction, props, updateState)
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
      ?.setUpRTRWithProviderAndRouter(SelfRegistrationAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })

  test('- simulate onSubmit', async () => {
    component = testingUtilsObj?.setUpRTLWithProviderAndRouter(
      SelfRegistrationAction,
      { ...props },
      updateState,
    )
    const element = component.getByTestId('SignUpActionForm')
    fireEvent.submit(element)
    expect(component).toBeDefined()
  })
})
