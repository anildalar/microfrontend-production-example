import React from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MuiSelect from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'

import { defaultProps, propTypes } from './types'

const Select = React.memo(({
  label,
  options,
  input,
  meta,
  ...custom
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { touched, invalid, error } = meta

  return (
    <FormControl fullWidth {...custom} error={touched && invalid}>
      <InputLabel
        data-testid={`${custom['data-testid']}-mui-select-label`}
        variant="outlined"
        htmlFor={`${custom['data-testid']}-mui-select`}
      >
        {t(label)}
      </InputLabel>
      <MuiSelect
        sx={{ ...theme?.customStyle?.selectStyle }}
        autoWidth={false}
        variant="outlined"
        label={t(label)}
        name={input?.name}
        {...input}
        inputProps={{
          'data-testid': `${custom['data-testid']}-mui-select`,
          id: `${custom['data-testid']}-mui-select`,
          name: input?.name,
        }}
      >
        {
          options?.map((o, i) => (
            <MenuItem
              sx={{ ...theme?.customStyle?.selectStyle }}
              key={o.value}
              data-testid={`${custom['data-testid']}-mui-select-option-${i}`}
              value={o.value}
              disabled={!!o?.disabled}
            >
              {o.label}
            </MenuItem>
          ))
        }
      </MuiSelect>
      <FormHelperText>{touched && t(error)}</FormHelperText>
    </FormControl>
  )
})

Select.displayName = 'Select'
Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
