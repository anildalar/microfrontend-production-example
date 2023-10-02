/* eslint-disable no-unused-vars */
import { TextField, InputAdornment, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { global } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'
import DynamicSVG from '../DynamicSVG'

export const inputAdornment = (iconPath) => (
  <InputAdornment position="end">
    <DynamicSVG path={iconPath} />
  </InputAdornment>
)

const InputField = ({
  label,
  placeholder,
  input,
  showEndAdornment,
  meta: {
    touched, invalid, error,
  },
  maxLength,
  minLength,
  maskProps,
  textFieldFocused, // Added this prop for DatePicker component
  disablePaste,
  ...custom
}) => {
  const { t } = useTranslation()
  const { artifacts: { appIcons } } = useTheme()

  return (
    <TextField
      variant="outlined"
      label={t(label)}
      placeholder={t(placeholder)}
      color={global?.utils?.getFieldStateColor(touched, invalid)}
      {...custom}
      error={(touched || textFieldFocused) && invalid}
      helperText={(touched || textFieldFocused) && t(error)}
      fullWidth
      {...input}
      InputProps={{
        endAdornment: showEndAdornment && touched && !error && (
          inputAdornment(appIcons?.check_circle_icon?.url)
        ),
        ...custom?.InputProps,
        inputProps: {
          ...custom?.inputProps,
          ...input,
          'data-testid': `${custom['data-testid']}-mui-input`,
          maxLength,
          minLength,
          'aria-required': custom?.required,
          autoFocus: custom?.autoFocus || false,
          autoComplete: custom?.autoComplete || 'off',
        },
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        ...custom?.inputProps,
        ...input,
        'data-testid': `${custom['data-testid']}-mui-input`,
        maxLength,
        minLength,
        'aria-required': custom?.required,
      }}
      onChange={
        /* istanbul ignore next */
        (e) => {
          if (custom?.disabled) { e.preventDefault() } else { input?.onChange(e) }
        }
      }
      onPaste={
        /* istanbul ignore next */
        (e) => {
          if (disablePaste) { e.preventDefault() } else { input?.onChange(e) }
        }
      }
    />
  )
}

InputField.propTypes = propTypes
InputField.defaultProps = defaultProps

export default InputField
