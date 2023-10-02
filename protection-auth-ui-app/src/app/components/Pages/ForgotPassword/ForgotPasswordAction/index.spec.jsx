import { fireEvent } from '@testing-library/react'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import ForgotPassowrdAction from '.'

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
      ?.setUpRTRWithProviderAndRouter(ForgotPassowrdAction, props, updateState)
    expect(component).toMatchSnapshot()
  })

  test('- Login Success Data', () => {
    updateState = {
      forgotPassword: {
        data: 'TEST VALUE',
      },
    }
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(ForgotPassowrdAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })

  test('- Having Any other error code from response', () => {
    updateState = {
      forgotPassword: {
        error: 'FORGOT_PWD_ERR',
        data: null,
      },
    }
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(ForgotPassowrdAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })
  test('- simulate onSubmit', async () => {
    component = testingUtilsObj
      ?.setUpRTLWithProviderAndRouter(
        ForgotPassowrdAction,
        { ...props },
        updateState,
      )
    const element = component.getByTestId('ForgotPasswordActionForm')
    fireEvent.submit(element)
    expect(component).toBeDefined()
  })
})
