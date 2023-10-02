import '../../../../../../mocks/react-i18next-init'
import '../../../../../../mocks/react-mfe-app'
import { setupRTRWithProviderAndRouter } from '../../../../../../../devtool-config/jest/utils/test'
import PhoneNumber, { validate } from '.'

describe('- PhoneNumberForm', () => {
  let component
  let updateState = {}
  const handleSubmit = jest.fn()
  const resetForm = jest.fn()
  const props = {
    initialValues: {
      REGEX: {
        NICKNAME: '^[A-z][A-z ]{0,15}$',
      },
    },
    onSubmit: handleSubmit,
    resetForm,
  }

  describe('- RTL Component Snapshot', () => {
    test('- Default Loading PhoneNumberForm', async () => {
      component = setupRTRWithProviderAndRouter(PhoneNumber, props, updateState)
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test for validation of PhoneNumber form', async () => {
      expect(validate({}, props)).toStrictEqual({
        nickname: 'form_field_items.nickname_required',
        phoneNumber: 'form_field_items.phoneNumber_required',
      })
    })

    test('- snapshot test for invalid data validation of PhoneNumber form', async () => {
      expect(validate({
        nickname: '3#1sd',
        phoneNumber: '+1 9898989898',
      }, props)).toStrictEqual({
        nickname: 'form_field_items.nickname_invalid',
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
      component = setupRTRWithProviderAndRouter(PhoneNumber, props, updateState)
      expect(component).toBeDefined()
    })
  })
})
