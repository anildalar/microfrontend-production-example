import { fireEvent } from '@testing-library/react'
import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'
import LoginActionForm, { validate } from '.'

describe('LoginActionForm', () => {
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
      email: 'form_field_items.email_required',
      password: 'form_field_items.password_required',
    })
  })

  test('- snapshot test for invalid', async () => {
    expect(validate({
      email: 'test',
    }, props)).toStrictEqual({
      email: 'form_field_items.email_invalid',
      password: 'form_field_items.password_required',
    })
  })

  it('submits the form when submit button is clicked', () => {
    component = testingUtilsObj?.setUpRTLWithProviderAndRouter(LoginActionForm, props, updateState)
    fireEvent.click(component.getByTestId('login-action-submit'))

    expect(component).toBeDefined()
  })
})
