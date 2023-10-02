/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, useTheme } from '@mui/material'
import { Field } from 'redux-form'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['emailAddress', 'createPassword', 'confirmEmail', 'confirmPassword']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  if (REGEX) {
    const regExpEmail = new RegExp(REGEX.EMAIL)
    if (values.emailAddress && !regExpEmail.test(values.emailAddress)) {
      errors.emailAddress = 'form_field_items.emailAddress_invalid'
    }

    const regExpPassword = new RegExp(REGEX.STRONG_PASSWORD)
    if (values.createPassword && !regExpPassword.test(values.createPassword)) {
      errors.createPassword = 'form_field_items.createPassword_invalid'
    }
  }

  if (values.confirmEmail && (values.confirmEmail !== values.emailAddress)) {
    errors.confirmEmail = 'form_field_items.confirmEmail_invalid'
  }

  if (values.confirmPassword && (values.confirmPassword !== values.createPassword)) {
    errors.confirmPassword = 'form_field_items.confirmPassword_invalid'
  }

  return errors
}

const AccountDetailsActionForm = React.memo(() => {
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
        sx={{ ...theme?.customStyle?.registration?.sectionHeading }}
      >
        {t('registration.accountDetails')}
      </Typography>
      <Field
        data-testid="input-signup-emailAddress"
        name="emailAddress"
        label="form_field_items.emailAddress_label"
        component={CommonComponents.InputField}
        showEndAdornment
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maxLength={validation?.email?.maxLength}
      />
      <Field
        data-testid="input-signup-confirm-email"
        name="confirmEmail"
        label="form_field_items.confirmEmail_label"
        component={CommonComponents.InputField}
        showEndAdornment
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        disablePaste
      />
      <Field
        data-testid="input-signup-password"
        name="createPassword"
        label="form_field_items.createPassword_label"
        component={CommonComponents.PasswordField}
        autoComplete="current-password"
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maxLength={validation?.password?.maxLength}
      />
      <Field
        data-testid="input-signup-confirm-password"
        name="confirmPassword"
        label="form_field_items.confirmPassword_label"
        component={CommonComponents.PasswordField}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
      />
      <Typography
        component="p"
        align="left"
        color="text.primary"
        data-testid="signup-action-subHeading2"
        variant="caption"
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
      >
        {t('registration.passwordNote')}
      </Typography>
    </>
  )
})

AccountDetailsActionForm.propTypes = propTypes
AccountDetailsActionForm.defaultProps = defaultProps
AccountDetailsActionForm.displayName = 'AccountDetailsActionForm'

export default AccountDetailsActionForm
