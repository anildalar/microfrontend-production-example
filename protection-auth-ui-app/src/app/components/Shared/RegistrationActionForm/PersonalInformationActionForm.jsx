/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography, useTheme } from '@mui/material'
import { Field } from 'redux-form'
import dayjs from 'dayjs'
import {
  Select, InputField, DatePickerField, PhoneNumberField,
} from 'COMMON_UI/common/Components'
import { global, hooks } from 'tenerity-ui-toolkit'

import AddressSection from './AddressSection'
import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const { phoneData: { supportedCountryCodes = [] } } = props
  const errors = props?.errors || {}
  const requiredFields = ['firstName', 'lastName', 'mailing_addressLine1', 'mailing_zipCode', 'mailing_state', 'mailing_city', 'mobileNumber', 'date_of_birth']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  if (REGEX) {
    const regExpFname = new RegExp(REGEX.NAME)
    if (values.firstName && !regExpFname.test(values.firstName)) {
      errors.firstName = 'form_field_items.firstName_invalid'
    }

    const regExpLname = new RegExp(REGEX.NAME)
    if (values.lastName && !regExpLname.test(values.lastName)) {
      errors.lastName = 'form_field_items.lastName_invalid'
    }

    const regExpMname = new RegExp(REGEX.NAME)
    if (values.middleName && !regExpMname.test(values.middleName)) {
      errors.middleName = 'form_field_items.middleName_invalid'
    }

    const regExpAdd1 = new RegExp(REGEX.ADDRESS_LINE1)
    if (values?.mailing_addressLine1 && !regExpAdd1.test(values.mailing_addressLine1)) {
      errors.mailing_addressLine1 = 'form_field_items.mailing_addressLine1_invalid'
    }

    const regExpAdd2 = new RegExp(REGEX.ADDRESS_LINE2)
    if (values?.mailing_addressLine2 && !regExpAdd2.test(values.mailing_addressLine2)) {
      errors.mailing_addressLine2 = 'form_field_items.mailing_addressLine2_invalid'
    }

    const regExpZipCode = new RegExp(REGEX.ZIP_CODE)
    if (values?.mailing_zipCode && !regExpZipCode.test(values.mailing_zipCode)) {
      errors.mailing_zipCode = 'form_field_items.mailing_zipCode_invalid'
    }
  }

  if (values?.date_of_birth && !dayjs(values?.date_of_birth).isValid()) {
    errors.date_of_birth = 'form_field_items.date_of_birth_invalid'
  }
  if (values?.date_of_birth && dayjs(values?.date_of_birth).isValid() && dayjs().isBefore(values?.date_of_birth, 'day')) {
    errors.date_of_birth = 'form_field_items.date_of_birth_future_invalid'
  }
  const mobileRegex = supportedCountryCodes?.find((el) => el?.code === values?.countryCode)?.regex
  if (values?.mobileNumber && mobileRegex && !new RegExp(mobileRegex).test(values?.mobileNumber)) {
    errors.mobileNumber = 'form_field_items.mobileNumber_invalid'
  }
  return errors
}

const PersonalInformationActionReduxForm = React.memo(({ countryCode }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData

  return (
    <>
      <Typography
        align="left"
        color="text.primary"
        data-testid="signup-action-subHeading2"
        variant="h5"
        sx={{ ...theme?.customStyle?.registration?.sectionHeading, fontWeight: 500 }}
      >
        {t('registration.personalInformation')}
      </Typography>

      <Field
        data-testid="input-signup-suffix"
        name="suffix"
        label="form_field_items.suffix"
        component={Select}
        options={[{ label: 'Mr', value: 'Mr' }, { label: 'Mrs', value: 'Mrs' }]}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
      />

      <Field
        data-testid="input-signup-firstName"
        name="firstName"
        label="form_field_items.firstName_label"
        component={InputField}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maxLength={validation?.firstName?.maxLength}
      />
      <Field
        data-testid="input-signup-middleName"
        name="middleName"
        label="form_field_items.middleName_label"
        component={InputField}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maxLength={validation?.middleName?.maxLength}
      />
      <Field
        data-testid="input-signup-lastName"
        name="lastName"
        label="form_field_items.lastName_label"
        component={InputField}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maxLength={validation?.lastName?.maxLength}
      />
      <AddressSection addressType="mailing" />
      <Grid container justifyContent="space-between" spacing={3} sx={{ ...theme?.customStyle?.registration?.inputPadding }}>
        <Grid item container xs={12} md={6}>
          <PhoneNumberField
            name="mobileNumber"
            label="form_field_items.mobileNumber_label"
            dataTestId="input-signup-mobileNumber"
            selectedCountryCode={countryCode || null}
          />
        </Grid>
        <Grid item container xs={12} md={6}>
          <Field
            data-testid="input-signup-dob"
            name="date_of_birth"
            label="form_field_items.date_of_birth_label"
            component={DatePickerField}
            maxDate={dayjs().subtract(validation?.date?.minAge, 'year')}
            dateFormat={validation?.date?.format}
          />
        </Grid>
      </Grid>
    </>
  )
})

const formName = 'RegistrationActionForm'
const PersonalInformationActionForm = global?.utils?.connectReduxFormUtil(PersonalInformationActionReduxForm, formName, ['countryCode'])

PersonalInformationActionReduxForm.propTypes = propTypes
PersonalInformationActionReduxForm.defaultProps = defaultProps
PersonalInformationActionReduxForm.displayName = 'PersonalInformationActionReduxForm'

export default PersonalInformationActionForm
