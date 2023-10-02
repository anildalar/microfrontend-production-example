/* eslint-disable import/no-unresolved */
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'

import {
  NickNameField, createTextMask, EncryptedField,
} from 'COMMON_UI/common/Components'

import { defaultProps, propTypes } from './types'
import AssetFormWrapper from '../../AssetFormWrapper'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['nickname', 'ssn', 'confirmSsn']
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
    const regExpSSN = new RegExp(REGEX.SSN)
    if (values.ssn && !regExpSSN.test(values.ssn)) {
      errors.ssn = 'form_field_items.ssn_invalid'
    }
  }

  if (values.confirmSsn && (values.confirmSsn !== values.ssn)) {
    errors.confirmSsn = 'form_field_items.confirmSsn_invalid'
  }
  return errors
}

const SSNActionReduxForm = (props) => {
  const {
    handleSubmit, reset, initialValues, ...restProps
  } = props

  const masking = createTextMask({
    ...initialValues?.validation?.ssn?.inputMask,
  })

  const postAsset = useSelector((state) => state?.postAsset)
  const { data: postAssetData } = postAsset

  useEffect(() => {
    if (postAssetData) {
      reset()
    }
  }, [postAssetData, reset])

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="ssn-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_ssn_label"
        dataTestId="ssn"
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
                data-testid="input-asset-ssn"
                name="ssn"
                id="ssn"
                label="form_field_items.asset_ssn_label"
                type="tel"
                component={EncryptedField}
                normalize={(value, previousValue) => (value.length > 9 ? previousValue : value)}
                maskingCharacter={initialValues?.validation?.ssn?.maskingCharacter}
                {...masking}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6} xl={4.5}>
              <Field
                data-testid="input-asset-re-confirm-ssn"
                name="confirmSsn"
                id="confirmSsn"
                label="form_field_items.reConfirmSsn_label"
                type="tel"
                component={EncryptedField}
                normalize={(value, previousValue) => (value.length > 9 ? previousValue : value)}
                maskingCharacter={initialValues?.validation?.ssn?.maskingCharacter}
                {...masking}
              />
            </Grid>
          </>
        )}
        {...restProps}
      />
    </form>
  )
}

const SSNActionForm = reduxForm({
  form: 'SSNActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(SSNActionReduxForm)

SSNActionReduxForm.propTypes = propTypes
SSNActionReduxForm.defaultProps = defaultProps

export default SSNActionForm
