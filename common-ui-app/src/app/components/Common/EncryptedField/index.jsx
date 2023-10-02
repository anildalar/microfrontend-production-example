import { IconButton, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { global } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'
import DynamicSVG from '../DynamicSVG'

const EncryptedField = (props) => {
  const {
    label,
    placeholder,
    input,
    meta: {
      touched, invalid, error,
    },
    maxLength,
    showToggleSwitch,
    onClick,
    maskingCharacter,
    ...custom
  } = props

  const maskValue = (inputValue) => inputValue?.replace(/[0-9]/g, maskingCharacter)
  const { t } = useTranslation()
  const { artifacts } = useTheme()
  const [inputType, setInputType] = useState('encrypted')
  const value = inputType === 'encrypted' ? maskValue(input?.value) : input?.value

  const onBlur = (e) => {
    if (e?.target?.value) {
      e.preventDefault()
    } else {
      input?.onBlur()
    }
    if (inputType !== 'encrypted') {
      setInputType(inputType === 'encrypted' ? 'text' : 'encrypted')
    }
  }

  const onFocus = (e) => {
    if (e?.target?.value) {
      e.preventDefault()
    } else {
      input?.onFocus()
    }
    if (inputType === 'encrypted') {
      setInputType(inputType === 'encrypted' ? 'text' : 'encrypted')
    }
  }

  return (
    <TextField
      variant="outlined"
      label={t(label)}
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
            data-testid="encrypted-toggle-switch"
            aria-label="show hide encrypted"
            onClick={() => setInputType(inputType === 'encrypted' ? 'text' : 'encrypted')}
          >
            {inputType !== 'encrypted'
              ? <DynamicSVG path={artifacts?.appIcons?.closed_eye_icon?.url} data-testid="encrypted-eye-close-icon" />
              : <DynamicSVG path={artifacts?.appIcons?.eye_icon?.url} data-testid="encrypted-eye-open-icon" />}
          </IconButton>
        )
          : null,
      }}
      {...{ ...input, value }}
      {...custom}
      onFocus={onFocus}
      onBlur={onBlur}
      onPaste={(e) => e.preventDefault()}
    />
  )
}

EncryptedField.propTypes = propTypes
EncryptedField.defaultProps = defaultProps

export default EncryptedField
