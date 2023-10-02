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
  const requiredFields = ['nickname', 'bank_account', 'routing_number']
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
    const regExpBankAccount = new RegExp(REGEX.ACCOUNT_NUMBER)
    if (values.bank_account && !regExpBankAccount.test(values.bank_account)) {
      errors.bank_account = 'form_field_items.bank_account_invalid'
    }
    const regExpBankRouting = new RegExp(REGEX.ROUTING_NUMBER)
    if (values.routing_number && !regExpBankRouting.test(values.routing_number)) {
      errors.routing_number = 'form_field_items.bank_routing_invalid'
    }
  }
  return errors
}

const BankAccountActionReduxForm = (props) => {
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

  const normalizeNumber = (value, prevVal, allValues) => {
    const regExpNickName = new RegExp(allValues.REGEX.NON_NUMERIC_ONLY)
    return value && regExpNickName.test(value) ? prevVal : value
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="bank-account-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_bankAccount_label"
        dataTestId="bank-account"
        fields={(
          <>
            <Grid item xs={12} md={4} lg={4}>
              <NickNameField
                dataTestId="input-asset-nickname"
                name="nickname"
                label="form_field_items.nickname_label"
              />
            </Grid>
            <Grid item xs={12} md={8} lg={4.5}>
              <Field
                data-testid="input-asset-bank-account"
                name="bank_account"
                label="form_field_items.bank_account_label"
                component={InputField}
                maxLength={initialValues?.validation?.bankAccount?.maxLength}
                normalize={normalizeNumber}
                showEndAdornment
              />
            </Grid>
            <Grid item xs={12} md={8} lg={3.5}>
              <Field
                data-testid="input-asset-bank-routing"
                name="routing_number"
                label="form_field_items.bank_routing_label"
                component={InputField}
                maxLength={initialValues?.validation?.routingNumber?.maxLength}
                normalize={normalizeNumber}
                showEndAdornment
              />
            </Grid>
          </>
       )}
        {...restProps}
      />
    </form>
  )
}
const BankAccountActionForm = reduxForm({
  form: 'BankAccountActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(BankAccountActionReduxForm)

BankAccountActionReduxForm.propTypes = propTypes
BankAccountActionReduxForm.defaultProps = defaultProps

export default BankAccountActionForm
