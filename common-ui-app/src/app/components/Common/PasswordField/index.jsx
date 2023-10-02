import { IconButton, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { global } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'
import DynamicSVG from '../DynamicSVG'

const PasswordField = ({
  label,
  placeholder,
  input,
  meta: {
    touched, invalid, error,
  },
  maxLength,
  showToggleSwitch,
  ...custom
}) => {
  const { t } = useTranslation()
  const { artifacts } = useTheme()
  const [inputType, setInputType] = useState('password')
  return (
    <TextField
      variant="outlined"
      label={t(label)}
      type={inputType}
      color={global?.utils?.getFieldStateColor(touched, invalid)}
      error={touched && invalid}
      helperText={touched && t(error)}
      fullWidth
      InputProps={{
        inputProps: {
          'data-testid': `${custom['data-testid']}-mui-input`,
          maxLength,
          'aria-required': custom?.required,
        },
        endAdornment: showToggleSwitch ? (
          <IconButton
            data-testid="password-toggle-switch"
            aria-label="show hide password"
            onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
          >
            {inputType !== 'password'
              ? <DynamicSVG path={artifacts?.appIcons?.closed_eye_icon?.url} data-testid="password-eye-close-icon" />
              : <DynamicSVG path={artifacts?.appIcons?.eye_icon?.url} data-testid="password-eye-open-icon" />}
          </IconButton>
        )
          : null,
      }}
      {...input}
      {...custom}
      onPaste={(e) => {
        e.preventDefault()
      }}
    />
  )
}

PasswordField.propTypes = propTypes
PasswordField.defaultProps = defaultProps

export default PasswordField
