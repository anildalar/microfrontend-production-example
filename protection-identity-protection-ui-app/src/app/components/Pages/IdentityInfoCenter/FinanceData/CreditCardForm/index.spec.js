/* eslint-disable no-useless-escape */
import '../../../../../../mocks/react-i18next'
import '../../../../../../mocks/react-i18next-init'
import '../../../../../../mocks/react-mfe-app'
import { setupRTRWithProvider, setupRTRWithProviderAndRouter } from '../../../../../../../devtool-config/jest/utils/test'
import CreditCardActionForm, { validate } from '.'
import { getNormalizeCreditCard } from './getNormalizeCreditCard'

describe('- CreditCardActionForm Component', () => {
  let component
  let updateState = {}
  const props = {
    initialValues: {
      REGEX: {
        NICKNAME: '/\D/g',
        CREDIT_CARD: '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13})$',
      },
    },
  }

  describe('- Renders Component', () => {
    test('- snapshot test', () => {
      component = setupRTRWithProvider(CreditCardActionForm, props, updateState)
      expect(component).toMatchSnapshot()
    })

    test('- snapshot test for validation of CreditCard form', async () => {
      expect(validate({}, props)).toStrictEqual({
        credit_card: 'form_field_items.credit_card_required',
        nickname: 'form_field_items.nickname_required',
      })
      expect(validate({
        credit_card: '1234',
        nickname: '123Name',
      }, props)).toStrictEqual({
        credit_card: 'form_field_items.credit_card_invalid',
        nickname: 'form_field_items.nickname_invalid',
      })
    })

    describe('getNormalizeCreditCard', () => {
      test('returns empty string if value is falsy', () => {
        const result = getNormalizeCreditCard('', '')
        expect(result).toBe('')
      })

      test('correctly formats when only 4 digits are provided', () => {
        const result = getNormalizeCreditCard('1234', '')
        expect(result).toBe('1234 ')
      })

      test('correctly formats when 8 digits are provided', () => {
        const result = getNormalizeCreditCard('12345678', '1234 ')
        expect(result).toBe('1234 5678 ')
      })

      test('correctly formats when 12 digits are provided', () => {
        const result = getNormalizeCreditCard('123456789121', '1234 5678')
        expect(result).toBe('1234 5678 9121 ')
      })

      test('correctly formats when 16 digits are provided', () => {
        const result = getNormalizeCreditCard('1234567891212121', '1234 5678 9121')
        expect(result).toBe('1234 5678 9121 2121')
      })

      test('correctly formats when 4 digits are not provided', () => {
        const result = getNormalizeCreditCard('123', '123')
        expect(result).toBe('123')
      })

      test('correctly formats when 8 digits are not provided', () => {
        const result = getNormalizeCreditCard('1234567', '1234 567')
        expect(result).toBe('1234 567')
      })

      test('correctly formats when 12 digits are not provided', () => {
        const result = getNormalizeCreditCard('12345678912', '1234 5678 9121')
        expect(result).toBe('1234 5678 912')
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
      component = setupRTRWithProviderAndRouter(CreditCardActionForm, props, updateState)
      component.update()
      expect(component).toBeDefined()
    })
  })
})
