import {
  Avatar, Box, Typography, useTheme,
} from '@mui/material'
import React from 'react'
import { createFilterOptions } from '@mui/material/Autocomplete'

import { defaultProps, propTypes } from './types'

export const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option) => `${option.code}`,
})

const CountryCodeDrop = ({ option: { country, code }, appIcons, restProps }) => {
  const theme = useTheme()
  return (
    <Box data-testid={`input-phone-number-countrycode-option-${country}`} sx={{ whiteSpace: 'nowrap' }} component="li" {...restProps}>
      <Avatar
        variant="square"
        alt={code}
        src={appIcons?.[`country_icon_${country?.toLowerCase()}`]?.url}
        sx={{ ...theme?.customStyle?.autoCompletePhone }}
      />
      <Typography variant="body1">
        {code}
      </Typography>
    </Box>
  )
}

CountryCodeDrop.propTypes = propTypes
CountryCodeDrop.defaultProps = defaultProps

export default CountryCodeDrop
