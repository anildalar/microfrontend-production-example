/* eslint-disable import/no-unresolved */
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { NickNameField, InputField } from 'COMMON_UI/common/Components'

import { defaultProps, propTypes } from './types'
import AssetFormWrapper from '../../AssetFormWrapper'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['nickname', 'email']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  if (REGEX) {
    const regExpEmail = new RegExp(REGEX.EMAIL)
    if (values.email && !regExpEmail.test(values.email)) {
      errors.email = 'form_field_items.email_invalid'
    }
    const regExpNickname = new RegExp(REGEX.NICKNAME)
    if (values.nickname && !regExpNickname.test(values.nickname)) {
      errors.nickname = 'form_field_items.nickname_invalid'
    }
  }
  return errors
}

const EmailActionReduxForm = (props) => {
  const { handleSubmit, reset, ...restProps } = props

  const postAsset = useSelector((state) => state?.postAsset)
  const { data: postAssetData } = postAsset

  useEffect(() => {
    if (postAssetData) {
      reset()
    }
  }, [postAssetData, reset])

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="email-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_email_label"
        dataTestId="email"
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
              <Field
                data-testid="input-asset-email"
                name="email"
                label="form_field_items.email_label"
                component={InputField}
              />
            </Grid>
          </>
        )}
        {...restProps}
      />
    </form>
  )
}
const EmailActionForm = reduxForm({
  form: 'EmailActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(EmailActionReduxForm)

EmailActionReduxForm.propTypes = propTypes
EmailActionReduxForm.defaultProps = defaultProps

export default EmailActionForm
