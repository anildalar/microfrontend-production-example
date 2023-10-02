/* istanbul ignore file */
import { testingUtilsObj } from '../../../../../../../devtool-config/jest/utils/test'
import DrivingLicenseActionForm, { validate } from '.'

const { setUpRTRWithProvider, setUpRTRWithProviderAndRouter } = testingUtilsObj

describe('- BankAccountActionForm Component', () => {
  let component
  let updateState = {}
  let props = { 
        initialValues: { 
        REGEX: {
            NICKNAME: '/\D/g',
            PASSPORT: '[A-Z0-9]{8,10}',
            NON_ALPHANUMERIC: '[^a-zA-Z0-9]',
            } 
        } 
    }
  describe('- Renders Component', () => {
    test('- snapshot test', () => {
      component = setUpRTRWithProvider(DrivingLicenseActionForm, props, updateState)
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test for no data validation of BankAccount form', async () => {
      expect(validate({}, props)).toStrictEqual({
        passport: "form_field_items.passport_required",
        nickname: "form_field_items.nickname_required"
      })
    })
    test('- snapshot test for invalid data validation of BankAccount form', async () => {
        expect(validate({
            passport: '2345',
            nickname: '31sd',
        }, props)).toStrictEqual({
            passport: 'form_field_items.passport_invalid',
            nickname: "form_field_items.nickname_invalid"
        })
      })
    test('- should not call reset() when postAssetData', () => {
        updateState = {
            postAsset: {
            data: {
                pastAssetData: 'TEST',
            },
            error: null,
            },
        }
        component = setUpRTRWithProviderAndRouter(DrivingLicenseActionForm, props, updateState)
        component.update()
        expect(component).toBeDefined()
    })
  })
})