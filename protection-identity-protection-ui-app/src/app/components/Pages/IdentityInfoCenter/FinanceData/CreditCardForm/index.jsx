/* eslint-disable import/no-unresolved */
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { global } from 'tenerity-ui-toolkit'
import { NickNameField, InputField } from 'COMMON_UI/common/Components'

import { defaultProps, propTypes } from './types'
import AssetFormWrapper from '../../AssetFormWrapper'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['nickname', 'credit_card']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  const creditCardData = values?.credit_card?.replace(/[^\d]/g, '')

  if (creditCardData && (creditCardData?.length < 13 || creditCardData?.length === 14
    || !global?.utils?.luhnCheck(creditCardData))) {
    errors.credit_card = 'form_field_items.credit_card_invalid'
  }

  if (REGEX) {
    const regCreditCard = new RegExp(REGEX.CREDIT_CARD)
    if (creditCardData && !regCreditCard.test(creditCardData)) {
      errors.credit_card = 'form_field_items.credit_card_invalid'
    }
    const regExpNickname = new RegExp(REGEX.NICKNAME)
    if (values.nickname && !regExpNickname.test(values.nickname)) {
      errors.nickname = 'form_field_items.nickname_invalid'
    }
  }

  return errors
}

const CreditCardActionReduxForm = (props) => {
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
    <form style={{ width: '100%' }} onSubmit={handleSubmit} data-testid="creditCard-asset-form">
      <AssetFormWrapper
        title="identityInfo.add_credit_card_label"
        dataTestId="creditCard"
        fields={(
          <>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <NickNameField
                dataTestId="input-asset-nickname"
                name="nickname"
                label="form_field_items.nickname_label"
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Field
                data-testid="input-asset-credit-card"
                name="credit_card"
                label="form_field_items.credit_card_label"
                normalize={global?.utils?.getNormalizeCreditCard}
                component={InputField}
                maxLength={initialValues?.validation?.creditCardNumber?.maxLength}
              />
            </Grid>
          </>
          )}
        {...restProps}
      />
    </form>
  )
}
const CreditCardActionForm = reduxForm({
  form: 'CreditCardActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(CreditCardActionReduxForm)

CreditCardActionReduxForm.propTypes = propTypes
CreditCardActionReduxForm.defaultProps = defaultProps

export default CreditCardActionForm
