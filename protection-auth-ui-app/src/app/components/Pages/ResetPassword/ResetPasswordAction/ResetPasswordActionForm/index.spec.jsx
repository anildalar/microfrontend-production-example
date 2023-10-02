/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent } from '@testing-library/react'

import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'
import RegistrationActionForm, { validate } from '.'

describe('- Renders Component', () => {
  let component
  const defaultState = {}
  const updateState = { ...defaultState }
  const createTestProps = (props) => ({
    onSubmit: jest.fn(),
    ...props,
  })
  const props = createTestProps({
    initialValues: {
      REGEX: {
        STRONG_PASSWORD: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})(^\\S*$)',
      },
    },
  })

  test('- Component to be defined test', () => {
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(RegistrationActionForm, props, updateState)
    expect(component).toMatchSnapshot()
  })

  test('- snapshot test for required', async () => {
    expect(validate({}, props)).toStrictEqual({
      password: 'form_field_items.password_required',
      confirmPassword: 'form_field_items.confirmPassword_required',
    })
  })

  test('- snapshot test for invalid', async () => {
    expect(validate({
      password: 'test',
      confirmPassword: 'test12',
    }, props)).toStrictEqual({
      password: 'form_field_items.createPassword_invalid',
      confirmPassword: 'form_field_items.confirmResetPassword_invalid',
    })
  })

  test('- test with empty props', async () => {
    component = testingUtilsObj?.setUpRTLWithProviderAndRouter(
      RegistrationActionForm,
      {},
      updateState,
    )
    expect(component).toBeDefined()
  })

  test('- simulate onSubmit', async () => {
    const onSubmit = jest.fn()
    component = testingUtilsObj?.setUpRTLWithProviderAndRouter(
      RegistrationActionForm,
      { ...props, onSubmit },
      updateState,
    )
    const element = component.getByTestId('reset-password-action-form')
    fireEvent.submit(element)
    expect(onSubmit).toHaveBeenCalled()
    expect(component).toBeDefined()
  })
})
