import '../../../../../../mocks/react-i18next'
import '../../../../../../mocks/react-i18next-init'
import '../../../../../../mocks/react-mfe-app'
import { setupRTRWithProvider, setupRTRWithProviderAndRouter } from '../../../../../../../devtool-config/jest/utils/test'
import AddressActionReduxForm, { validate } from '.'

describe('- AddressActionReduxForm Component', () => {
  let component
  let updateState = {}
  const props = {
    initialValues: {
      REGEX: {
        NICKNAME: '^[A-z][A-z ]{0,15}$',
        ADDRESS_LINE1: '^[1-9]{1,}(.*){0,34}$',
        ADDRESS_LINE2: '^[A-z1-9]{1,}(.*){0,34}$',
        ZIP_CODE: '^[A-z0-9\\s]{5,10}$',
      },
    },
  }
  describe('- Renders Component', () => {
    test('- snapshot test', () => {
      component = setupRTRWithProvider(AddressActionReduxForm, props, updateState)
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test for validation of Address form', async () => {
      expect(validate({}, props)).toStrictEqual({
        nickname: 'form_field_items.nickname_required',
        addressLine1: 'form_field_items.addressLine1_required',
        zipCode: 'form_field_items.zipCode_required',
        city: 'form_field_items.city_required',
        state: 'form_field_items.state_required',
      })
      expect(validate({
        addressLine1: 'Address',
        addressLine2: '*12Address',
        nickname: '31Name',
        zipCode: '1234',
        city: '1City',
        state: '2State',
      }, props)).toStrictEqual({
        nickname: 'form_field_items.nickname_invalid',
        addressLine1: 'form_field_items.addressLine1_invalid',
        addressLine2: 'form_field_items.addressLine2_invalid',
        zipCode: 'form_field_items.zipCode_invalid',
      })
    })
    test('should not call reset() when postAssetData', () => {
      updateState = {
        postAsset: {
          data: {
            pastAssetData: 'TEST',
          },
          error: null,
        },
      }
      component = setupRTRWithProviderAndRouter(AddressActionReduxForm, props, updateState)
      component.update()
      expect(component).toBeDefined()
    })
  })
})
