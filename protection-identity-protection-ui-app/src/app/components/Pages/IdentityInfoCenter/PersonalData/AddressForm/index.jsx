/* eslint-disable import/no-unresolved */
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { NickNameField, InputField, Select } from 'COMMON_UI/common/Components'

import { Grid } from '@mui/material'
import { defaultProps, propTypes } from './types'
import AssetFormWrapper from '../../AssetFormWrapper'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['nickname', 'addressLine1', 'zipCode', 'city', 'state']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  if (REGEX) {
    const regExpNickname = new RegExp(REGEX.NICKNAME)
    if (values.nickname && !regExpNickname.test(values.nickname)) {
      errors.nickname = 'form_field_items.nickname_invalid'
    }
    const regExpAdd1 = new RegExp(REGEX.ADDRESS_LINE1)
    if (values.addressLine1 && !regExpAdd1.test(values.addressLine1)) {
      errors.addressLine1 = 'form_field_items.addressLine1_invalid'
    }

    const regExpAdd2 = new RegExp(REGEX.ADDRESS_LINE2)
    if (values.addressLine2 && !regExpAdd2.test(values.addressLine2)) {
      errors.addressLine2 = 'form_field_items.addressLine2_invalid'
    }
    const regExpZipCode = new RegExp(REGEX.ZIP_CODE)
    if (values.zipCode && !regExpZipCode.test(values.zipCode)) {
      errors.zipCode = 'form_field_items.zipCode_invalid'
    }
  }
  return errors
}

const AddressActionReduxForm = (props) => {
  const {
    handleSubmit, initialValues, reset, ...restProps
  } = props
  const postAsset = useSelector((state) => state?.postAsset)
  const { data: postAssetData } = postAsset

  useEffect(() => {
    if (postAssetData) {
      reset()
    }
  }, [postAssetData, reset])

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="address-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_address_label"
        dataTestId="address-asset-form"
        fields={(
          <>
            <Grid item xs={12} md={6} lg={6} xl={3}>
              <NickNameField
                dataTestId="input-asset-nickname"
                name="nickname"
                label="form_field_items.nickname_label"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={4.5}>
              <Field
                data-testid="input-asset-mailing-address1"
                name="addressLine1"
                label="form_field_items.addressLine1_label"
                component={InputField}
                maxLength={initialValues?.validation?.addressLine1?.maxLength}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={4.5}>
              <Field
                data-testid="input-asset-mailing-address2"
                name="addressLine2"
                label="form_field_items.addressLine2_label"
                component={InputField}
                maxLength={initialValues?.validation?.addressLine2?.maxLength}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={3} xl={3}>
              <Field
                data-testid="input-asset-zip-code"
                name="zipCode"
                label="form_field_items.zipCode_label"
                component={InputField}
                maxLength={initialValues?.validation?.zipcode?.maxLength}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Field
                data-testid="input-asset-city"
                name="city"
                label="form_field_items.city_label"
                component={Select}
                options={[
                  { label: 'Kenner', value: 'Kenner' },
                  // { label: 'Oakland', value: 'oakland' },
                  // { label: 'Stockton', value: 'stockton' },
                  // { label: 'Riverside', value: 'riverside' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={3} xl={3}>
              <Field
                data-testid="input-asset-state"
                name="state"
                label="form_field_items.state_label"
                component={Select}
                options={[
                  { label: 'Los Angeles', value: 'LA' },
                  // { label: 'California', value: 'CA' },
                ]}
              />
            </Grid>

          </>
       )}
        {...restProps}
      />
    </form>
  )
}
const AddressActionForm = reduxForm({
  form: 'AddressActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(AddressActionReduxForm)

AddressActionReduxForm.propTypes = propTypes
AddressActionReduxForm.defaultProps = defaultProps

export default AddressActionForm
