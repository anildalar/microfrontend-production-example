/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTheme } from '@mui/material'
import { Field } from 'redux-form'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = props?.errors || {}
  const requiredFields = ['ssn', 'confirmSsn']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  if (REGEX) {
    const regExpSsn = new RegExp(REGEX.SSN)
    if (values.ssn && !regExpSsn.test(values.ssn)) {
      errors.ssn = 'form_field_items.ssn_invalid'
    }
  }

  if (values.confirmSsn && (values.confirmSsn !== values.ssn)) {
    errors.confirmSsn = 'form_field_items.confirmSsn_invalid'
  }
  return errors
}

const SsnActionForm = React.memo(() => {
  const theme = useTheme()
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData

  return (
    <>
      <Field
        data-testid="input-signup-SSN"
        name="ssn"
        maxLength={validation?.ssn?.maxLength}
        label="form_field_items.ssn_label"
        component={CommonComponents.PasswordField}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
      />

      {/* <Field
        data-testid="input-signup-SSN"
        name="ssn"
        label="form_field_items.ssn_label"
        id="ssn"
        component={CommonComponents.EncryptedField}
        normalize={(value, previousValue) => (value.length > 9 ? previousValue : value)}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maskingCharacter="*"
        {...masking}
      /> */}

      <Field
        data-testid="input-signup-confirm-SSN"
        name="confirmSsn"
        label="form_field_items.confirmSsn_label"
        component={CommonComponents.PasswordField}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
      />

      {/* <Field
        data-testid="input-signup-confirm-SSN"
        name="confirmSsn"
        label="form_field_items.confirmSsn_label"
        id="confirmSsn"
        component={CommonComponents.EncryptedField}
        normalize={(value, previousValue) => (value.length > 9 ? previousValue : value)}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maskingCharacter="*"
        {...masking}
      /> */}
    </>
  )
})

SsnActionForm.propTypes = propTypes
SsnActionForm.defaultProps = defaultProps
SsnActionForm.displayName = 'SsnActionReduxForm'

export default SsnActionForm
