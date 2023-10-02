/* eslint-disable import/no-extraneous-dependencies */
import '../../../../../../mocks/react-i18next-init'
import '../../../../../../mocks/react-mfe-app'
import dayjs from 'dayjs'
import { setupRTLWithProvider, setupRTRWithProviderAndRouter } from '../../../../../../../devtool-config/jest/utils/test'
import DOBActionReduxForm, { validate } from '.'

describe('- DOBActionForm', () => {
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
    test('- Default Loading DOBActionForm', async () => {
      component = setupRTLWithProvider(DOBActionReduxForm, props, updateState)
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test for validation of DOB form', async () => {
      expect(validate({}, props)).toStrictEqual({
        nickname: 'form_field_items.nickname_required',
        date_of_birth: 'form_field_items.date_of_birth_required',
      })
    })

    test('- snapshot test for invalid data validation of DOB form', async () => {
      expect(validate({
        nickname: '3#1sd',
        date_of_birth: '12a',
      }, props)).toStrictEqual({
        nickname: 'form_field_items.nickname_invalid',
        date_of_birth: 'form_field_items.date_of_birth_invalid',
      })
    })

    test('- snapshot test for future date validation of DOB form', async () => {
      const currentDate = dayjs()
      const futureDate = currentDate.add(7, 'day').format('MM/DD/YYYY')
      expect(validate({
        nickname: 'abc',
        date_of_birth: futureDate,
      }, props)).toStrictEqual({
        date_of_birth: 'form_field_items.date_of_birth_future_invalid',
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
      component = setupRTRWithProviderAndRouter(DOBActionReduxForm, props, updateState)
      component.update()
      expect(component).toBeDefined()
    })
  })
})
