import {
  TextField, InputAdornment, Stack, useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { defaultProps, propTypes } from './types'
import DynamicSVG from '../DynamicSVG'

export const NumberInputField = ({
  label,
  value: propValue = 0,
  placeholder,
  ...custom
}) => {
  const { t } = useTranslation()
  const { artifacts: { appIcons }, customStyle } = useTheme()
  const [value, setValue] = useState(propValue)

  const handleIncrement = () => {
    const integerValue = Math.floor(value)
    const decimalValue = value - integerValue
    const incrementedInteger = integerValue + 1
    setValue(parseFloat((incrementedInteger + decimalValue).toFixed(1)))
  }

  const handleDecrement = () => {
    const integerValue = Math.floor(value)
    const decimalValue = value - integerValue
    const decrementedInteger = integerValue - 1
    if (decrementedInteger >= 0) {
      setValue(parseFloat((decrementedInteger + decimalValue).toFixed(1)))
    }
  }

  const handleChange = (event) => {
    const newValue = event.target.value
    if (newValue === '' || !Number.isNaN(newValue)) { setValue(newValue) }
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 38) {
      // Up arrow key (keyCode 38)
      event.preventDefault()
      handleIncrement()
    } else if (event.keyCode === 40) {
      // Down arrow key (keyCode 40)
      event.preventDefault()
      handleDecrement()
    }
  }

  return (
    <TextField
      variant="outlined"
      type="number"
      label={t(label)}
      onChange={handleChange}
      value={value}
      fullWidth
      {...custom}
      InputProps={{
        inputProps: {
          'data-testid': `${custom['data-testid']}-mui-number-input`,
          onKeyDown: handleKeyDown,
          ...custom?.inputProps,
          'aria-required': custom?.required,
        },
        ...custom?.InputProps,
        sx: { ...customStyle?.numberInput?.default },
        endAdornment: (
          <InputAdornment position="end" style={customStyle?.numberInput?.endAdornment}>
            <Stack direction="column" alignItems="center" spacing={-0.6}>
              <DynamicSVG
                path={appIcons?.up_arrow?.url}
                onClick={handleIncrement}
                style={customStyle?.numberInput?.icon}
                data-testid="number-increment-icon"
              />
              <DynamicSVG
                path={appIcons?.down_arrow?.url}
                onClick={handleDecrement}
                style={customStyle?.numberInput?.icon}
                data-testid="number-decrement-icon"
              />
            </Stack>
          </InputAdornment>
        ),
      }}
    />
  )
}

NumberInputField.propTypes = propTypes
NumberInputField.defaultProps = defaultProps
