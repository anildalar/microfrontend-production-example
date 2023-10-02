import { fireEvent } from '@testing-library/react'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import ResetPasswordAction from '.'

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
      ?.setUpRTRWithProviderAndRouter(ResetPasswordAction, props, updateState)
    expect(component).toMatchSnapshot()
  })

  test('- Having Generic Error Code From ResetPassword', () => {
    updateState = {
      resetPassword: {
        error: 'PROTECTION_ERR_GENERIC',
      },
    }
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(ResetPasswordAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })

  test('- Having Generic Error Code From ResetPassword Approval', () => {
    updateState = {
      resetPasswordApproval: {
        error: 'PROTECTION_ERR_GENERIC',
      },
    }
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(ResetPasswordAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })

  test('- simulate onSubmit', async () => {
    component = testingUtilsObj?.setUpRTLWithProviderAndRouter(
      ResetPasswordAction,
      { ...props },
      updateState,
    )
    const element = component.getByTestId('reset-password-action-form')
    fireEvent.submit(element)
    expect(component).toBeDefined()
  })
})
