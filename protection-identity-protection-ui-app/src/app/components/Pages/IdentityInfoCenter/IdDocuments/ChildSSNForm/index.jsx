/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import dayjs from 'dayjs'
import {
  NickNameField, InputField, DatePickerField, createTextMask, EncryptedField,
} from 'COMMON_UI/common/Components'

import { defaultProps, propTypes } from './types'
import AssetFormWrapper from '../../AssetFormWrapper'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['nickname', 'child_name', 'date_of_birth', 'confirmSsn']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  if (!values.child_ssn) {
    errors.child_ssn = `form_field_items.${'ssn'}_required`
  }

  const REGEX = props?.initialValues?.REGEX
  if (REGEX) {
    const regExpNickname = new RegExp(REGEX.NICKNAME)
    if (values.nickname && !regExpNickname.test(values.nickname)) {
      errors.nickname = 'form_field_items.nickname_invalid'
    }
    const regExpChildName = new RegExp(REGEX.CHILDNAME)
    if (values.child_name && !regExpChildName.test(values.child_name)) {
      errors.child_name = 'form_field_items.child_name_invalid'
    }
    const regExpSSN = new RegExp(REGEX.SSN)
    if (values.child_ssn && !regExpSSN.test(values.child_ssn)) {
      errors.child_ssn = 'form_field_items.ssn_invalid'
    }
  }

  if (values.confirmSsn && (values.confirmSsn !== values.child_ssn)) {
    errors.confirmSsn = 'form_field_items.confirmSsn_invalid'
  }
  if (values.date_of_birth && !dayjs(values?.date_of_birth).isValid()) {
    errors.date_of_birth = 'form_field_items.date_of_birth_invalid'
  }
  if (values.date_of_birth && dayjs(values?.date_of_birth).isValid() && dayjs().isBefore(values?.date_of_birth, 'day')) {
    errors.date_of_birth = 'form_field_items.date_of_birth_future_invalid'
  }
  return errors
}

const ChildSSNActionReduxForm = (props) => {
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
        title="identityInfo.add_child_ssn_label"
        dataTestId="child-ssn"
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
                data-testid="input-asset-child-name"
                name="child_name"
                label="form_field_items.child_name_label"
                normalize={(value, prevVal, allValues) => {
                  const regExpChildName = new RegExp(allValues.REGEX.CHILDNAME)
                  return value && !regExpChildName.test(value) ? prevVal : value
                }}
                maxLength={initialValues?.validation?.childName?.maxLength}
                component={InputField}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={4.5}>
              <Field
                data-testid="input-asset-date-of-birth"
                name="date_of_birth"
                label="form_field_items.child_date_of_birth_label"
                component={DatePickerField}
                maxDate={dayjs().subtract(0, 'year')}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Field
                data-testid="input-asset-child-ssn"
                name="child_ssn"
                id="child_ssn"
                label="form_field_items.asset_ssn_label"
                type="tel"
                component={EncryptedField}
                normalize={(value, previousValue) => (value.length > 9 ? previousValue : value)}
                maskingCharacter={initialValues?.validation?.ssn?.maskingCharacter}
                {...masking}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
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

const ChildSSNActionForm = reduxForm({
  form: 'ChildSSNActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(ChildSSNActionReduxForm)

ChildSSNActionReduxForm.propTypes = propTypes
ChildSSNActionReduxForm.defaultProps = defaultProps

export default ChildSSNActionForm
