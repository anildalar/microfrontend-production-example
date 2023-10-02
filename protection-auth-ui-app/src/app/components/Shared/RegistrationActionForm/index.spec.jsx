/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent } from '@testing-library/react'
import dayjs from 'dayjs'
import { testingUtilsObj } from '../../../../../devtool-config/jest/utils/test'

import RegistrationActionForm, { validate } from '.'

describe('- Renders Component', () => {
  let component
  const defaultState = {}
  const updateState = { ...defaultState }
  const createTestProps = (props) => ({
    onSubmit: jest.fn(),
    phoneData: {
      defaultCountryCode: 'us',
      guide: true,
      supportedCountryCodes: [
        {
          code: '+1',
          country: 'us',
          maxLength: 10,
          minLength: 10,
          name: 'US',
          pattern: '(,[1-9],\\d,\\d,), ,\\d,\\d,\\d,-,\\d,\\d,\\d,\\d',
          regex: '/^[0-9]{10}$/',
        },
        {
          code: '+44',
          country: 'uk',
          maxLength: 10,
          minLength: 10,
          name: 'UK',
          pattern: '[1-9],\\d,\\d,\\d, ,\\d,\\d,\\d,\\d,\\d,\\d',
          regex: '/^[0-9]{10}$/',
        },
      ],
    },
    countryCode: '+1',
    ...props,
  })
  const props = createTestProps({
    initialValues: {
      REGEX: {
        NAME: "^[A-z][A-z0-9\\s'-.]{0,9}$",
        EMAIL: "(^[a-zA-Z0-9]{1}[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,63}@[a-zA-Z0-9-]{1,253}\\.[a-zA-Z0-9-]{2,253}$)|(^[a-zA-Z0-9]{1}[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,63}@[a-zA-Z0-9-]{1,253}\\.[A-z]{2}\\.[A-z]{2}$)",
        STRONG_PASSWORD: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})(^\\S*$)',
        ADDRESS_LINE1: '^[1-9]{1,}(.*){0,34}$',
        ADDRESS_LINE2: '^[A-z1-9]{1,}(.*){0,34}$',
        ZIP_CODE: '^[A-z0-9\\s]{5,10}$',
        SSN: '^(?!000|900)(?!00)(?!0000)\\d{3}(?!00)\\d{2}(?!0000)\\d{4}$',
        NICKNAME: '^[A-z][A-z ]{0,15}$',
        ACTIVATION_NUMBER: '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){9,16}$',
        ACCESS_CODE: '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){4,6}$',
        CREDIT_CARD: '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13})$',
        CARD_EXPIRE: '^(0[1-9]|1[0-2])/[0-9]{2}$',
        CARD_NAME: "^(?![ .'-]*$)[A-Za-z][A-Za-z' .-]{0,34}$",
        CVV: '^\\d{3,4}$',
      },
    },
  })

  test('- Component to be defined test', () => {
    component = testingUtilsObj
      ?.setUpRTRWithProviderAndRouter(RegistrationActionForm, props, updateState)
    expect(component).toMatchSnapshot()
  })

  test('- snapshot test for required', async () => {
    expect(validate({
      accessCode: '',
      activationNumber: '',
      expirationDate: '',
      emailAddress: '',
      confirmEmail: '',
      createPassword: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      secureCode: '',
      mobileNumber: '',
      date_of_birth: '',
      ssn: '',
      confirmSsn: '',
      consentAgreement: '',
      mailing_addressLine1: '',
      billing_addressLine1: '',
      billing_zipCode: '',
      cardHolderName: '',
      cardNumber: '',
      mailing_zipCode: '',
      mailing_city: '',
      billing_city: '',
      mailing_state: '',
      billing_state: '',
    }, props)).toStrictEqual({
      accessCode: 'form_field_items.accessCode_required',
      activationNumber: 'form_field_items.activationNumber_required',
      emailAddress: 'form_field_items.emailAddress_required',
      confirmEmail: 'form_field_items.confirmEmail_required',
      createPassword: 'form_field_items.createPassword_required',
      confirmPassword: 'form_field_items.confirmPassword_required',
      firstName: 'form_field_items.firstName_required',
      lastName: 'form_field_items.lastName_required',
      mobileNumber: 'form_field_items.mobileNumber_required',
      date_of_birth: 'form_field_items.dob_required',
      ssn: 'form_field_items.ssn_required',
      confirmSsn: 'form_field_items.confirmSsn_required',
      consentAgreement: 'form_field_items.consentAgreement_required',
      mailing_addressLine1: 'form_field_items.mailing_addressLine1_required',
      billing_addressLine1: 'form_field_items.billing_addressLine1_required',
      billing_zipCode: 'form_field_items.billing_zipCode_required',
      cardHolderName: 'form_field_items.cardHolderName_required',
      cardNumber: 'form_field_items.cardNumber_required',
      mailing_zipCode: 'form_field_items.mailing_zipCode_required',
      mailing_city: 'form_field_items.mailing_city_required',
      billing_city: 'form_field_items.billing_city_required',
      mailing_state: 'form_field_items.mailing_state_required',
      billing_state: 'form_field_items.billing_state_required',
      expirationDate: 'form_field_items.expirationDate_required',
      secureCode: 'form_field_items.secureCode_required',
    })
  })

  test('- snapshot test for invalid', async () => {
    expect(validate({
      accessCode: 'test',
      activationNumber: 'test',
      emailAddress: 'test',
      confirmEmail: 'test12',
      createPassword: 'test',
      confirmPassword: 'test12',
      firstName: '###',
      lastName: '###',
      middleName: '###',
      mailing_addressLine1: 'TEST',
      billing_addressLine1: 'TEST',
      mailing_addressLine2: '###',
      billing_addressLine2: '###',
      mailing_zipCode: '###',
      billing_zipCode: '###',
      ssn: '1234',
      confirmSsn: '1234567',
      date_of_birth: '11//111/11',
      secureCode: '12',
      expirationDate: '01/22',
      cardNumber: '1231 2312',
      billing_city: '123',
      billing_state: '123',
      cardHolderName: '231',
      consentAgreement: '123',
      mailing_city: '123',
      mailing_state: '123',
      phoneNumber: '123',
    }, props)).toStrictEqual({
      accessCode: 'form_field_items.accessCode_invalid',
      activationNumber: 'form_field_items.activationNumber_invalid',
      emailAddress: 'form_field_items.emailAddress_invalid',
      confirmEmail: 'form_field_items.confirmEmail_invalid',
      createPassword: 'form_field_items.createPassword_invalid',
      confirmPassword: 'form_field_items.confirmPassword_invalid',
      firstName: 'form_field_items.firstName_invalid',
      lastName: 'form_field_items.lastName_invalid',
      middleName: 'form_field_items.middleName_invalid',
      mobileNumber: 'form_field_items.mobileNumber_required',
      date_of_birth: 'form_field_items.dob_invalid',
      ssn: 'form_field_items.ssn_invalid',
      confirmSsn: 'form_field_items.confirmSsn_invalid',
      mailing_addressLine1: 'form_field_items.mailing_addressLine1_invalid',
      billing_addressLine1: 'form_field_items.billing_addressLine1_invalid',
      mailing_addressLine2: 'form_field_items.mailing_addressLine2_invalid',
      billing_addressLine2: 'form_field_items.billing_addressLine2_invalid',
      billing_zipCode: 'form_field_items.billing_zipCode_invalid',
      cardNumber: 'form_field_items.cardNumber_invalid',
      mailing_zipCode: 'form_field_items.mailing_zipCode_invalid',
      expirationDate: 'form_field_items.expiry_date_invalid',
      secureCode: 'form_field_items.secureCode_invalid',
      billing_city: 'form_field_items.billing_city_invalid',
      billing_state: 'form_field_items.billing_state_invalid',
      cardHolderName: 'form_field_items.cardHolderName_invalid',
      consentAgreement: 'form_field_items.consentAgreement_invalid',
      mailing_city: 'form_field_items.mailing_city_invalid',
      mailing_state: 'form_field_items.mailing_state_invalid',
      phoneNumber: 'form_field_items.phoneNumber_invalid',
    })
  })

  test('- snapshot test for future date', async () => {
    const currentDate = dayjs()
    const futureDate = currentDate.add(7, 'day').format('MM/DD/YYYY')
    expect(validate({
      date_of_birth: futureDate,
    }, props)).toStrictEqual({
      accessCode: 'form_field_items.accessCode_required',
      activationNumber: 'form_field_items.activationNumber_required',
      emailAddress: 'form_field_items.emailAddress_required',
      confirmEmail: 'form_field_items.confirmEmail_required',
      createPassword: 'form_field_items.createPassword_required',
      confirmPassword: 'form_field_items.confirmPassword_required',
      firstName: 'form_field_items.firstName_required',
      lastName: 'form_field_items.lastName_required',
      phoneNumber: 'form_field_items.phoneNumber_required',
      dob: 'form_field_items.dob_future_required"',
      mobileNumber: 'form_field_items.mobileNumber_required',
      date_of_birth: 'form_field_items.dob_future_invalid',
      ssn: 'form_field_items.ssn_required',
      confirmSsn: 'form_field_items.confirmSsn_required',
      consentAgreement: 'form_field_items.consentAgreement_required',
      mailing_addressLine1: 'form_field_items.mailing_addressLine1_required',
      billing_addressLine1: 'form_field_items.billing_addressLine1_required',
      billing_zipCode: 'form_field_items.billing_zipCode_required',
      cardHolderName: 'form_field_items.cardHolderName_required',
      cardNumber: 'form_field_items.cardNumber_required',
      mailing_zipCode: 'form_field_items.mailing_zipCode_required',
      mailing_city: 'form_field_items.mailing_city_required',
      billing_city: 'form_field_items.billing_city_required',
      mailing_state: 'form_field_items.mailing_state_required',
      billing_state: 'form_field_items.billing_state_required',
      expirationDate: 'form_field_items.expirationDate_required',
      secureCode: 'form_field_items.secureCode_required',
    })
  })
  test('- test with empty props', async () => {
    component = testingUtilsObj
      ?.setUpRTLWithProviderAndRouter(
        RegistrationActionForm,
        {},
        updateState,
      )
    expect(component).toBeDefined()
  })

  test('- simulate onSubmit', async () => {
    const onSubmit = jest.fn()
    component = testingUtilsObj
      ?.setUpRTLWithProviderAndRouter(
        RegistrationActionForm,
        { ...props, onSubmit },
        updateState,
      )
    const element = component.getByTestId('SignUpActionForm')
    fireEvent.submit(element)
    expect(onSubmit).toHaveBeenCalled()
    expect(component).toBeDefined()
  })

  test('- simulate Back', async () => {
    component = testingUtilsObj
      ?.setUpRTLWithProviderAndRouter(
        RegistrationActionForm,
        props,
        updateState,
      )
    const element = component.getByTestId('signup-back-action')
    fireEvent.click(element)
    expect(component).toBeDefined()
  })

  test('- simulate TooTip', async () => {
    component = testingUtilsObj
      ?.setUpRTLWithProviderAndRouter(
        RegistrationActionForm,
        props,
        updateState,
      )
    // eslint-disable-next-line prefer-const
    let tooltipText = component.queryByText('registration.cardInfo')
    expect(tooltipText).toBeNull() // Tooltip should not be visible initially

    // const tooltip = component.getByTestId('cvv-info-tooltip')
    // fireEvent.click(tooltip)
    // tooltipText = component.queryByText('registration.cardInfo')

    // Click outside the tooltip to close it
    // fireEvent.click(document)
  })
})
