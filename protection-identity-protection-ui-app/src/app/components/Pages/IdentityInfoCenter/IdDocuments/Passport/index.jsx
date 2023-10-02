/* eslint-disable import/no-unresolved */
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { reduxForm } from 'redux-form'
import { NickNameField } from 'COMMON_UI/common/Components'

import AssetFormWrapper from '../../AssetFormWrapper'
import PassportField from './PassportField'
import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['nickname', 'passport']
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
    const regExpDriversLicense = new RegExp(REGEX.PASSPORT)
    if (values.passport && !regExpDriversLicense.test(values.passport)) {
      errors.passport = 'form_field_items.passport_invalid'
    }
  }
  return errors
}
const PassportActionReduxForm = (props) => {
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
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="passport-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_passport_label"
        dataTestId="dpassport"
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
              <PassportField
                dataTestId="input-asset-passpor"
                name="passport"
                label="form_field_items.passport_label"
              />
            </Grid>
          </>
       )}
        {...restProps}
      />
    </form>
  )
}
const PassportActionForm = reduxForm({
  form: 'PassportActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(PassportActionReduxForm)
PassportActionReduxForm.propTypes = propTypes
PassportActionReduxForm.defaultProps = defaultProps
export default PassportActionForm
