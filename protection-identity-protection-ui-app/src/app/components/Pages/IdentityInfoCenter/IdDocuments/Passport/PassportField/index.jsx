/* eslint-disable import/no-unresolved */
import React from 'react'
import { Field } from 'redux-form'
import { InputField } from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

export const normalizePassport = (value, prevVal, allValues) => {
  const { REGEX } = allValues
  const regExpDriversLicense = new RegExp(REGEX.NON_ALPHANUMERIC)
  return value && regExpDriversLicense.test(value) ? prevVal : value
}

const PassportField = ({ name, label, dataTestId }) => {
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData
  return (
    <Field
      name={name}
      normalize={normalizePassport}
      label={label}
      component={InputField}
      maxLength={validation?.passport?.maxLength}
      data-testid={dataTestId}
      showEndAdornment
    />
  )
}
PassportField.propTypes = propTypes
PassportField.defaultProps = defaultProps
export default PassportField
