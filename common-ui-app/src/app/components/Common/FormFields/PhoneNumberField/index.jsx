import React from 'react'
import { Field } from 'redux-form'
import {
  Grid, Avatar, InputAdornment, useTheme,
} from '@mui/material'
import { hooks, global } from 'tenerity-ui-toolkit'

import { createTextMask } from '../../ReduxFormInputMask'
import CountryCodeDrop, { filterOptions } from '../../CountryCodeDrop'
import AutoCompleteField from '../../AutoCompleteField'
import InputField from '../../InputField'
import { defaultProps, propTypes } from './types'

const PhoneNumberField = React.memo(({
  name, label, selectedCountryCode, dataTestId, placeholder,
}) => {
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const theme = useTheme()
  const { artifacts: { appIcons }, customStyle } = theme
  const phoneData = configStoreData?.validation?.phone || {}
  const supportedCountryCodes = phoneData?.supportedCountryCodes || []
  const defaultCountryCode = global?.utils?.getCountryCode(phoneData?.defaultCountryCode, supportedCountryCodes, 'country')
  const countryCode = global?.utils?.getCountryCode(selectedCountryCode || defaultCountryCode?.code, supportedCountryCodes, 'code')
  const masking = createTextMask(countryCode?.inputMask)
  return (
    <Grid container>
      <Grid item>
        <Field
          data-testid="input-asset-countrycode"
          label=""
          name="countryCode"
          noOptionsText="form_field_items.countryCode_noOptions"
          options={supportedCountryCodes}
          defaultValue={defaultCountryCode}
          filterOptions={filterOptions}
          getOptionLabel={(option) => option.code}
          renderOption={(p, option) => (
            <CountryCodeDrop
              key={option.country}
              option={option}
              appIcons={appIcons}
              restProps={p}
            />
          )}
          component={AutoCompleteField}
          dataKey="code"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  variant="square"
                  alt={countryCode?.code}
                  src={appIcons?.[`country_icon_${countryCode?.country}`]
                    ?.url}
                  sx={{ ...theme?.customStyle?.autoCompletePhone }}
                />
              </InputAdornment>
            ),
          }}
          sx={{ ...customStyle?.phoneNumber?.noRightBorder }}
        />
      </Grid>
      <Grid item flex={1}>
        <Field
          data-testid={dataTestId}
          name={name}
          label={label}
          placeholder={placeholder}
          component={InputField}
          type="tel"
          sx={{ ...customStyle?.phoneNumber?.noLeftBorder }}
          {...masking}
        />
      </Grid>
    </Grid>
  )
})

PhoneNumberField.propTypes = propTypes
PhoneNumberField.defaultProps = defaultProps
PhoneNumberField.displayName = 'PhoneNumberField'

export default PhoneNumberField
