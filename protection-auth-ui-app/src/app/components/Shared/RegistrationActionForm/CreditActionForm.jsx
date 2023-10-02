/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box, Grid, IconButton, Typography, useTheme,
} from '@mui/material'
import { Field } from 'redux-form'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { global, hooks } from 'tenerity-ui-toolkit'

import { getNormalizeExpirationDate, stripeCardExpireValidation } from './normlized'
import AddressSection from './AddressSection'
import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['cardHolderName', 'cardNumber', 'expirationDate', 'secureCode', 'billing_addressLine1', 'billing_zipCode', 'billing_state', 'billing_city']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const creditCardData = values?.cardNumber?.replace(/[^\d]/g, '')

  if (creditCardData && (creditCardData?.length <= 14
    || !global?.utils?.luhnCheck(creditCardData))) {
    errors.cardNumber = 'form_field_items.credit_card_invalid'
  }

  const REGEX = props?.initialValues?.REGEX
  const regCreditCard = new RegExp(REGEX?.CREDIT_CARD)

  if (REGEX) {
    const regExpAdd1 = new RegExp(REGEX.ADDRESS_LINE1)
    if (values?.billing_addressLine1 && !regExpAdd1.test(values.billing_addressLine1)) {
      errors.billing_addressLine1 = 'form_field_items.billing_addressLine1_invalid'
    }

    const regExpAdd2 = new RegExp(REGEX.ADDRESS_LINE2)
    if (values?.billing_addressLine2 && !regExpAdd2.test(values.billing_addressLine2)) {
      errors.billing_addressLine2 = 'form_field_items.billing_addressLine2_invalid'
    }

    const regExpZipCode = new RegExp(REGEX.ZIP_CODE)
    if (values?.billing_zipCode && !regExpZipCode.test(values.billing_zipCode)) {
      errors.billing_zipCode = 'form_field_items.billing_zipCode_invalid'
    }

    const regExpSecureCard = new RegExp(REGEX?.CVV)
    if (values?.secureCode && !regExpSecureCard.test(values.secureCode)) {
      errors.secureCode = 'form_field_items.secureCode_invalid'
    }
  }

  if (values.expirationDate
    && !stripeCardExpireValidation(values.expirationDate, REGEX?.CARD_EXPIRE)) {
    errors.expirationDate = 'form_field_items.expiry_date_invalid'
  }
  if (creditCardData && !regCreditCard.test(creditCardData)) {
    errors.cardNumber = 'form_field_items.cardNumber_invalid'
  }

  return errors
}

const CreditActionReduxForm = React.memo(({ isBilling }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData

  return (
    <>
      <Grid container sx={{ ...theme?.customStyle?.registration?.inputPadding }} alignItems="center" justifyContent="space-between">
        <Grid item xs textAlign="left">
          <Typography align="left" color="text.primary" data-testid="signup-action-subHeading2" variant="h5">
            {t('registration.card_heading')}
          </Typography>
        </Grid>
        <Grid item xs>
          <CommonComponents.CardsGrid
            cardsArray={[
              theme?.artifacts?.appIcons?.visacard_icon?.url,
              theme?.artifacts?.appIcons?.mastercard_icon?.url,
              theme?.artifacts?.appIcons?.amexcard_icon?.url,
              theme?.artifacts?.appIcons?.discovercard_icon?.url,
            ]}
          />
        </Grid>
      </Grid>
      <Field
        data-testid="input-signup-cardName"
        name="cardHolderName"
        label="form_field_items.cardHolderName_label"
        component={CommonComponents.InputField}
        normalize={(value, prevVal, allValues) => {
          const regExpCardName = new RegExp(allValues?.REGEX?.CARD_NAME)
          return value && !regExpCardName.test(value) ? prevVal : value
        }}
        sx={{ ...theme?.customStyle?.registration?.inputPadding }}
        maxLength={validation?.cardHolderName?.maxLength}
      />
      <Grid container sx={{ ...theme?.customStyle?.registration?.inputPadding }} spacing={3}>
        <Grid item xs={12} md={6}>
          <Field
            data-testid="input-signup-cardNumber"
            name="cardNumber"
            label="form_field_items.cardNumber_label"
            component={CommonComponents.InputField}
            normalize={global?.utils?.getNormalizeCreditCard}
            maxLength={validation?.creditCardNumber?.maxLength}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Field
            data-testid="input-signup-expiration_date"
            name="expirationDate"
            label="form_field_items.expirationDate_label"
            component={CommonComponents.InputField}
            normalize={getNormalizeExpirationDate}
            InputLabelProps={{ shrink: true }}
            placeholder="MM/YY"
          />
        </Grid>
        <Grid item container xs={6} md={3} flexWrap="nowrap">
          <Grid item>
            <Field
              data-testid="input-signup-secureCode"
              name="secureCode"
              label="form_field_items.secureCode_label"
              component={CommonComponents.PasswordField}
              showToggleSwitch={false}
              normalize={(value, prevVal, allValues) => {
                const regExpCVV = new RegExp(allValues?.REGEX?.NON_NUMERIC_ONLY)
                return value && regExpCVV.test(value) ? prevVal : value
              }}
              maxLength={validation?.secureCode?.maxLength}
            />
          </Grid>
          <Grid item>
            <CommonComponents.Tooltip
              message={t('registration.cardInfo')}
              Component={IconButton}
            >
              <CommonComponents.DynamicSVG
                path={theme?.artifacts?.appIcons?.information_icon?.url}
              />
            </CommonComponents.Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{
        ...theme?.customStyle?.registration?.inputPadding,
        ...theme?.customStyle?.checkBoxStyle,
        display: 'flex',
      }}
      >
        <Field
          data-testid="input-signup-billing-address"
          name="isBilling"
          label={<Typography variant="body2">{t('form_field_items.billing_check_box_label')}</Typography>}
          component={CommonComponents.Checkbox}
        />
      </Box>
      {!isBilling && <AddressSection addressType="billing" />}
    </>
  )
})

const formName = 'RegistrationActionForm'
const CreditActionForm = global?.utils?.connectReduxFormUtil(CreditActionReduxForm, formName, ['isBilling'])

CreditActionReduxForm.propTypes = propTypes
CreditActionReduxForm.defaultProps = defaultProps
CreditActionReduxForm.displayName = 'CreditActionReduxForm'

export default CreditActionForm
