/* eslint-disable import/no-unresolved */
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { reduxForm } from 'redux-form'
import { global } from 'tenerity-ui-toolkit'
import { NickNameField, PhoneNumberField } from 'COMMON_UI/common/Components'

import { defaultProps, propTypes } from './types'
import AssetFormWrapper from '../../AssetFormWrapper'

export const validate = (values, props) => {
  const { phoneData: { supportedCountryCodes = [] } } = props
  const errors = {}
  const requiredFields = ['nickname', 'phoneNumber']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })
  const REGEX = props?.initialValues?.REGEX
  const phoneRegex = supportedCountryCodes?.find((el) => el?.code === values?.countryCode)?.regex
  /* istanbul ignore else */
  if (REGEX) {
    const regExpNickname = new RegExp(REGEX.NICKNAME)
    if (values.nickname && !regExpNickname.test(values.nickname)) {
      errors.nickname = 'form_field_items.nickname_invalid'
    }
  }
  /* istanbul ignore else */
  if (values?.phoneNumber && phoneRegex && !new RegExp(phoneRegex).test(values?.phoneNumber)) {
    errors.phoneNumber = 'form_field_items.phoneNumber_invalid'
  }
  return errors
}

const PhoneNumberForm = (props) => {
  const {
    handleSubmit, reset, countryCode, ...restProps
  } = props
  const postAsset = useSelector((state) => state?.postAsset)
  const { data: postAssetData } = postAsset

  useEffect(() => {
    if (postAssetData) {
      reset()
    }
  }, [postAssetData, reset])

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="phoneNumber-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_phoneNumber_label"
        dataTestId="input-asset-form"
        fields={(
          <>
            <Grid item xs={12} md={6} lg={5}>
              <NickNameField
                dataTestId="input-asset-nickname"
                name="nickname"
                label="form_field_items.nickname_label"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              <PhoneNumberField
                name="phoneNumber"
                label="form_field_items.phoneNumber_label"
                dataTestId="input-asset-phoneNumber"
                selectedCountryCode={countryCode || null}
              />
            </Grid>
          </>
        )}
        {...restProps}
      />
    </form>
  )
}
const formName = 'PhoneNumberForm'
const PhoneNumberReduxForm = reduxForm({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(PhoneNumberForm)
const PhoneNumberReduxFormConnect = global?.utils?.connectReduxFormUtil(PhoneNumberReduxForm, formName, ['countryCode'])
PhoneNumberForm.propTypes = propTypes
PhoneNumberForm.defaultProps = defaultProps
export default PhoneNumberReduxFormConnect
