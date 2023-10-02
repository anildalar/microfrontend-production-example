/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { NickNameField, DatePickerField } from 'COMMON_UI/common/Components'
import dayjs from 'dayjs'

import { defaultProps, propTypes } from './types'
import AssetFormWrapper from '../../AssetFormWrapper'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['nickname', 'date_of_birth']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  if (REGEX) {
    const regExpNickname = new RegExp(REGEX.NICKNAME)
    if (values?.nickname && !regExpNickname.test(values.nickname)) {
      errors.nickname = 'form_field_items.nickname_invalid'
    }
  }
  if (values?.date_of_birth && !dayjs(values?.date_of_birth).isValid()) {
    errors.date_of_birth = 'form_field_items.date_of_birth_invalid'
  }
  if (values?.date_of_birth && dayjs(values?.date_of_birth).isValid() && dayjs().isBefore(values?.date_of_birth, 'day')) {
    errors.date_of_birth = 'form_field_items.date_of_birth_future_invalid'
  }
  return errors
}

const DOBActionReduxForm = (props) => {
  const {
    handleSubmit, reset, validation, ...restProps
  } = props
  const postAsset = useSelector((state) => state?.postAsset)
  const { data: postAssetData } = postAsset

  useEffect(() => {
    if (postAssetData) {
      reset()
    }
  }, [postAssetData, reset])

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="dob-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_dob_label"
        dataTestId="dob"
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
              <Field
                data-testid="input-dobform-dob"
                name="date_of_birth"
                label="form_field_items.date_of_birth_label"
                component={DatePickerField}
                maxDate={dayjs().subtract(validation?.date?.minAge, 'year')}
                dateFormat={validation?.date?.format}
              />
            </Grid>
          </>
        )}
        {...restProps}
      />
    </form>
  )
}
const DOBActionForm = reduxForm({
  form: 'DOBActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(DOBActionReduxForm)

DOBActionReduxForm.propTypes = propTypes
DOBActionReduxForm.defaultProps = defaultProps

export default DOBActionForm
