import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { global } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

const AutoCompleteField = ({
  label,
  placeholder,
  input,
  options,
  renderOption,
  getOptionLabel,
  filterOptions,
  noOptionsText,
  maxLength,
  defaultValue,
  dataKey,
  meta: {
    touched, invalid, error,
  },
  ...custom
}) => {
  const { t } = useTranslation()
  const handleValueChange = (event, newValue) => {
    console.log('value', newValue)
    input.onChange(newValue?.[dataKey])
  }

  return (
    <Autocomplete
      disableClearable
      defaultValue={defaultValue}
      onChange={handleValueChange}
      noOptionsText={t(noOptionsText)}
      options={options}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      data-testid="auto-complete"
      renderInput={(params) => (
        <TextField
          variant="outlined"
          label={t(label)}
          color={global?.utils?.getFieldStateColor(touched, invalid)}
          error={touched && invalid}
          helperText={touched && t(error)}
          fullWidth
          focused={touched && !invalid}
          {...custom}
          {...params}
          InputProps={{
            ...params?.InputProps,
            ...custom?.InputProps,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            ...params?.inputProps,
            'data-testid': `${custom['data-testid']}-mui-input`,
            autoComplete: 'new-password',
          }}
        />
      )}
    />
  )
}

AutoCompleteField.propTypes = propTypes
AutoCompleteField.defaultProps = defaultProps

export default AutoCompleteField
