import { fireEvent } from '@testing-library/react'
import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'
import ForgotPasswordActionForm, { validate } from '.'

describe('ForgotPasswordActionForm', () => {
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
        EMAIL: "(^[a-zA-Z0-9]{1}[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,63}@[a-zA-Z0-9-]{1,253}\\.[a-zA-Z0-9-]{2,253}$)|(^[a-zA-Z0-9]{1}[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,63}@[a-zA-Z0-9-]{1,253}\\.[A-z]{2}\\.[A-z]{2}$)",
      },
    },
  })
  test('- snapshot test for required', async () => {
    expect(validate({}, props)).toStrictEqual({
      forgotPassword_email: 'form_field_items.forgotPassword_email_required',
    })
  })

  test('- snapshot test for invalid', async () => {
    expect(validate({
      forgotPassword_email: 'test',
    }, props)).toStrictEqual({
      forgotPassword_email: 'form_field_items.forgotPassword_email_invalid',
    })
  })

  it('submits the form when submit button is clicked', () => {
    component = testingUtilsObj
      ?.setUpRTLWithProviderAndRouter(ForgotPasswordActionForm, props, updateState)
    fireEvent.click(component.getByTestId('forgotPassword-submit-action'))
    expect(component).toBeDefined()
  })
  test('- simulate Back', async () => {
    component = testingUtilsObj?.setUpRTLWithProviderAndRouter(
      ForgotPasswordActionForm,
      props,
      updateState,
    )
    const element = component.getByTestId('forgotPassword-back-action')
    fireEvent.click(element)
    expect(component).toBeDefined()
  })
})
