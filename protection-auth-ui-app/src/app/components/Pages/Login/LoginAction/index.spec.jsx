import { fireEvent } from '@testing-library/react'
import { testingUtilsObj } from '../../../../../../devtool-config/jest/utils/test'
import LoginAction from '.'

describe('- Renders Component', () => {
  let component
  const defaultState = {}
  let updateState = { ...defaultState }
  const createTestProps = (props) => ({
    ...props,
  })
  const props = createTestProps()

  test('- Component to be defined test', () => {
    component = testingUtilsObj?.setUpRTRWithProviderAndRouter(LoginAction, props, updateState)
    expect(component).toMatchSnapshot()
  })

  test('- Login Success Data', () => {
    updateState = {
      userLogin: {
        data: {
          memberId: 'test',
          access_token: 'test',
        },
      },
    }
    component = testingUtilsObj?.setUpRTRWithProviderAndRouter(LoginAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })

  test('- Having Any other error code from response', () => {
    updateState = {
      userLogin: {
        error: 'LOGIN_ERROR',
        data: null,
      },
    }
    component = testingUtilsObj?.setUpRTRWithProviderAndRouter(LoginAction, props, updateState)
    component.update()
    expect(component).toBeDefined()
  })
  test('- simulate onSubmit', async () => {
    component = testingUtilsObj?.setUpRTLWithProviderAndRouter(
      LoginAction,
      { ...props },
      updateState,
    )
    const element = component.getByTestId('LoginActionForm')
    fireEvent.submit(element)
    expect(component).toBeDefined()
  })
})
