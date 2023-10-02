/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTheme } from '@mui/material'
import { Field } from 'redux-form'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'
import { defaultProps, propTypes } from './types'
import { ONE_TIME_CODE_REGISTRATION } from '../../../constants/js/globalConstants'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['activationNumber', 'accessCode']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX

  if (REGEX) {
    const regExpActivationNumber = new RegExp(REGEX?.ACTIVATION_NUMBER)
    if (values.activationNumber && !regExpActivationNumber.test(values.activationNumber)) {
      errors.activationNumber = 'form_field_items.activationNumber_invalid'
    }
    const regExpAccessCode = new RegExp(REGEX?.ACCESS_CODE)
    if (values.accessCode && !regExpAccessCode.test(values.accessCode)) {
      errors.accessCode = 'form_field_items.accessCode_invalid'
    }
  }

  return errors
}

export const asyncValidate = async (values, dispatch, props) => {
  try {
    dispatch(props?.asyncValidateCode(values))
  } catch (_error) {
    // log error
  }
}

const AccessAndActivationNumberActionForm = React.memo(({ initialValues }) => {
  const theme = useTheme()
  const { type } = initialValues
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData

  return (
    <>
      {
      type === ONE_TIME_CODE_REGISTRATION
        ? (
          <Field
            data-testid="input-signup-activationNumber"
            name="activationNumber"
            label="form_field_items.activationNumber_label"
            component={CommonComponents.InputField}
            sx={{ ...theme?.customStyle?.registration?.inputPadding }}
            maxLength={validation?.activationNumber?.maxLength}
            autoFocus
          />
        )
        : (
          <Field
            data-testid="input-signup-accessCode"
            name="accessCode"
            label="form_field_items.accessCode_label"
            component={CommonComponents.InputField}
            sx={{ ...theme?.customStyle?.registration?.inputPadding }}
            maxLength={validation?.accessCode?.maxLength}
          />
        )
    }

    </>
  )
})

AccessAndActivationNumberActionForm.propTypes = propTypes
AccessAndActivationNumberActionForm.defaultProps = defaultProps
AccessAndActivationNumberActionForm.displayName = 'AccessAndActivationNumberActionForm'

export default AccessAndActivationNumberActionForm
