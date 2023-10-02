/* eslint-disable import/no-unresolved */
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { reduxForm } from 'redux-form'
import { NickNameField } from 'COMMON_UI/common/Components'

import AssetFormWrapper from '../../AssetFormWrapper'
import DrivingLicenseField from './DrivingLicenseField'
import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['nickname', 'drivers_license']
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
    const regExpDriversLicense = new RegExp(REGEX.DRIVERS_LICENSE)
    if (values.drivers_license && !regExpDriversLicense.test(values.drivers_license)) {
      errors.drivers_license = 'form_field_items.drivers_license_invalid'
    }
  }
  return errors
}

const DrivingLicenseActionReduxForm = (props) => {
  const {
    handleSubmit, reset, ...restProps
  } = props

  const postAsset = useSelector((state) => state?.postAsset)
  const { data: postAssetData } = postAsset

  useEffect(() => {
    if (postAssetData) {
      reset()
    }
  }, [postAssetData, reset])

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="driving-license-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_driversLicense_label"
        dataTestId="driving-license"
        fields={(
          <>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <NickNameField
                dataTestId="input-asset-nickname"
                name="nickname"
                label="form_field_items.nickname_label"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <DrivingLicenseField
                dataTestId="input-asset-drivers-license"
                name="drivers_license"
                label="form_field_items.drivers_license_label"
              />
            </Grid>
          </>
       )}
        {...restProps}
      />
    </form>
  )
}
const DrivingLicenseActionForm = reduxForm({
  form: 'DrivingLicenseActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(DrivingLicenseActionReduxForm)

DrivingLicenseActionReduxForm.propTypes = propTypes
DrivingLicenseActionReduxForm.defaultProps = defaultProps

export default DrivingLicenseActionForm
