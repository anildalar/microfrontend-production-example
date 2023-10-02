import { act } from 'react-dom/test-utils'

import OTPActionReduxForm, { validate } from '.'
import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'

const {
  setUpShallowRender,
  setUpMountRender,
  setUpMountRenderWithRouter,
} = testingUtilsObj

require('../../../../../../mocks/react-i18next-init').default()

describe('- OTPActionReduxForm Component', () => {
  let component
  const createTestProps = (props) => ({
    onSubmit: jest.fn(),
    ...props,
  })
  const props = createTestProps()

  describe('- Renders Component', () => {
    beforeEach(() => {
      component = setUpShallowRender({}, props, OTPActionReduxForm)
    })

    test('- snapshot test', () => {
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test for validation of email', async () => {
      expect(
        validate({
          email: 'test',
          password: 'test',
        }),
      ).toStrictEqual({ email: 'form_field_items.email.invalid' })
    })

    test('- simulate onSubmit for all stepLabels', async () => {
      await act(async () => {
        component = setUpMountRender({}, props, OTPActionReduxForm)
      })

      component.update()

      const formSubmitAction = component
        .find('[data-testid="OTPActionReduxForm"]')
        .last()
      expect(formSubmitAction).toBeDefined()
      formSubmitAction.simulate('submit')
    })
    test('- simulate onSubmit for with error', async () => {
      await act(async () => {
        component = await setUpMountRenderWithRouter(
          {},
          props,
          OTPActionReduxForm,
        )
      })
      const formSubmitAction = component
        .find('[data-testid="OTPActionReduxForm"]')
        .last()
      expect(formSubmitAction).toBeDefined()
      formSubmitAction.simulate('submit')
      component.update()
      expect(component).toBeDefined()
    })
  })
})
