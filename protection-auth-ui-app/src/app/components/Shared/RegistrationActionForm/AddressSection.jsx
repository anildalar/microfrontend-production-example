/* eslint-disable import/no-unresolved */
import React from 'react'
import { Field } from 'redux-form'
import { Grid, useTheme } from '@mui/material'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

const AddressSection = React.memo(({ addressType }) => {
  const theme = useTheme()
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData

  return (
    <>
      <Field
        data-testid={`input-signup-address-${addressType}-addressLine1`}
        name={`${addressType}_addressLine1`}
        label={`form_field_items.${addressType}_addressLine1_label`}
        component={CommonComponents.InputField}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maxLength={validation?.addressLine1?.maxLength}
      />
      <Field
        data-testid={`input-signup-address-${addressType}-addressLine2`}
        name={`${addressType}_addressLine2`}
        label={`form_field_items.${addressType}_addressLine2_label`}
        component={CommonComponents.InputField}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maxLength={validation?.addressLine2?.maxLength}
      />
      <Grid container spacing="1.5rem" sx={{ ...theme?.customStyle?.registration?.inputPadding }}>
        <Grid item xs={12} md={4}>
          <Field
            data-testid={`input-signup-address-${addressType}-zipCode`}
            name={`${addressType}_zipCode`}
            label="form_field_items.zipCode_label"
            component={CommonComponents.InputField}
            maxLength={validation?.zipcode?.maxLength}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Field
            data-testid={`input-signup-address-${addressType}-city`}
            name={`${addressType}_city`}
            label="form_field_items.city_label"
            component={CommonComponents.Select}
            options={[
              { label: 'Kenner', value: 'Kenner' },
              // { label: 'Oakland', value: 'oakland' },
              // { label: 'Stockton', value: 'stockton' },
              // { label: 'Riverside', value: 'riverside' },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Field
            data-testid={`input-signup-address-${addressType}-state`}
            name={`${addressType}_state`}
            label="form_field_items.state_label"
            component={CommonComponents.Select}
            options={[
              { label: 'Los Angeles', value: 'LA' },
              // { label: 'California', value: 'CA' },
            ]}

          />
        </Grid>
      </Grid>
    </>
  )
})

AddressSection.propTypes = propTypes
AddressSection.defaultProps = defaultProps
AddressSection.displayName = 'AddressSection'

export default AddressSection
