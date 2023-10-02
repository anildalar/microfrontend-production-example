/* istanbul ignore file */
import { fireEvent, act } from '@testing-library/react'
import { setupRTRWithProvider, setupRTLWithProvider } from '../../../../../../../devtool-config/jest/utils/test'
import BankAccountActionForm, { validate } from '.'

describe('- BankAccountActionForm Component', () => {
  let component
  const updateState = {}
  let props = { 
        initialValues: { 
        REGEX: {
            NICKNAME: '/\D/g',
            ACCOUNT_NUMBER: '^[0-9]{10,17}$',
            ROUTING_NUMBER: '^[0-9]{9}$',
            NON_NUMERIC_ONLY: '/\D/g',
            } 
        } 
    }

  describe('- Renders Component', () => {
    test('- snapshot test', () => {
      component = setupRTRWithProvider(BankAccountActionForm, props, updateState)
      expect(component).toMatchSnapshot()
    })
    test('- snapshot test for validation of BankAccount form', async () => {
    expect(validate({}, props)).toStrictEqual({
        bank_account: 'form_field_items.bank_account_required',
        bank_routing: "form_field_items.bank_routing_required",
        nickname: "form_field_items.nickname_required"
        })
    expect(validate({
        bank_account: '2345',
        nickname: '31sd',
        bank_routing: '2356'
    }, props)).toStrictEqual({
        bank_account: 'form_field_items.bank_account_invalid',
        bank_routing: "form_field_items.bank_routing_invalid",
        nickname: "form_field_items.nickname_invalid"
    })
    })

    test.skip('- snapshot test for numeric value in bankAccount and bankRouting field', () => {
         component = setupRTLWithProvider(
            BankAccountActionForm,
            props,
            updateState
        )
        expect(component).toBeDefined()
        const { getByTestId } = component
        const bankAccount = getByTestId("input-asset-bank-account")
        const bankRouting = getByTestId("input-asset-bank-routing")

        fireEvent.change(bankAccount, { target: { value: '36263876543' } })
        fireEvent.change(bankRouting, { target: { value: '263528976' } })

        expect(bankAccount).toHaveDisplayValue('36263876543')
        expect(bankAccount).toHaveDisplayValue('263528976')
      })
  })

})
