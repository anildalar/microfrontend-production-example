/* eslint-disable import/no-unresolved */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Box, Button, Divider, Grid, Typography, useTheme,
} from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as CommonComponents from 'COMMON_UI/common/Components'

import { useSelector } from 'react-redux'
import AccountDetailsActionForm, { validate as accountDetailsValidate } from './AccountDetailsActionForm'
import PersonalInformationActionFormConnect, { validate as personalDetailsValidate } from './PersonalInformationActionForm'
import { defaultProps, propTypes } from './types'
import SsnActionForm, { validate as ssnValidate } from './SsnActionForm'
import CreditActionForm, { validate as creditValidate } from './CreditActionForm'
import AccessAndActivationNumberActionForm, {
  validate as activationNumberValidate,
  asyncValidate as activationNumberAsyncValidate,
} from './AccessAndActivationNumberActionForm'
import { ONE_TIME_CODE_REGISTRATION, GROUP_CODE_REGISTRATION, SELF_REGISTRATION } from '../../../constants/js/globalConstants'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['consentAgreement']

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  return {
    ...errors,
    ...accountDetailsValidate(values, props),
    ...personalDetailsValidate(values, props),
    ...ssnValidate(values, props),
    ...creditValidate(values, props),
    ...(() => values.type !== SELF_REGISTRATION && activationNumberValidate(values, props))(),
  }
}

const asyncValidate = async (values, disptach, props) => Promise.all([
  activationNumberAsyncValidate,
].map((callback) => callback(values, disptach, props)))

const RegistrationActionReduxForm = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()
  const {
    phoneData, pristine, invalid, handleSubmit, submitting, isSubmitting, initialValues,
  } = props
  const { type } = initialValues
  const creditType = 'credit'
  const solicitationDetails = useSelector((state) => state?.solicitation)
  const { benefits } = solicitationDetails?.data || {}
  const isCreditBenefitExist = benefits?.find((item) => item.type.toLowerCase() === creditType)

  return (
    <form onSubmit={handleSubmit} data-testid="SignUpActionForm">
      {(type === ONE_TIME_CODE_REGISTRATION || type === GROUP_CODE_REGISTRATION)
        && <AccessAndActivationNumberActionForm {...props} />}
      <AccountDetailsActionForm {...props} />
      <Divider sx={{ ...theme?.customStyle?.registration?.dividerStyle }} />
      <PersonalInformationActionFormConnect phoneData={phoneData} {...props} />
      <Divider sx={{ ...theme?.customStyle?.registration?.dividerStyle }} />
      <SsnActionForm {...props} />
      <Divider sx={{ ...theme?.customStyle?.registration?.dividerStyle }} />
      {type === SELF_REGISTRATION && <CreditActionForm {...props} />}

      {type === SELF_REGISTRATION
        && <Divider sx={{ ...theme?.customStyle?.registration?.dividerStyle }} />}

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        ...theme?.customStyle?.registration?.inputPadding,
      }}
      >
        <Field
          data-testid="input-signup-consent-consentEngagementComm"
          name="consentEngagementComm"
          label={<Typography variant="body2">{t('form_field_items.consentEngagementComm_label')}</Typography>}
          component={CommonComponents.Checkbox}
          sx={{
            ...theme?.customStyle?.checkBoxStyle,
          }}
        />
        <Field
          data-testid="input-signup-consent-consentAgreement"
          name="consentAgreement"
          label={(
            <Typography variant="body2">
              {isCreditBenefitExist
                ? (
                  <Trans
                    i18nKey="form_field_items.coonsentAgreement_label"
                    components={{
                      terms: <CommonComponents.Link data-testid="terms-link" variant="body2" to={t('registration.links.link_0.href')} name="terms" noRenderBox />,
                      privacy: <CommonComponents.Link data-testid="privacy-link" variant="body2" to={t('registration.links.link_1.href')} name="privacy" noRenderBox />,
                      consumerinfo: <CommonComponents.Link data-testid="consumer-link" variant="body2" to={t('registration.links.link_2.href')} name="consumerinfo" noRenderBox />,
                    }}
                  >
                    {null}
                  </Trans>
                )
                : (
                  <Trans
                    i18nKey="registration.consent_Benefit_Agreement_label"
                    components={{
                      terms: <CommonComponents.Link data-testid="terms-link" variant="body2" to={t('registration.links.link_0.href')} name="terms" noRenderBox />,
                      privacy: <CommonComponents.Link data-testid="privacy-link" variant="body2" to={t('registration.links.link_1.href')} name="privacy" noRenderBox />,
                    }}
                  >
                    {null}
                  </Trans>
                )}

            </Typography>
          )}
          component={CommonComponents.Checkbox}
          sx={{
            ...theme?.customStyle?.checkBoxStyle,
          }}
        />
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ ...theme?.customStyle?.registration?.buttonSectionStyle }}
      >
        <Grid item>
          <Button
            align="left"
            data-testid="signup-back-action"
            startIcon={(
              <CommonComponents.DynamicSVG
                path={theme?.artifacts?.appIcons?.arrow_left_icon?.url}
                style={{ fill: theme?.palette?.action?.active }}
              />
            )}
            variant="outlined"
            type="button"
            onClick={() => navigate(-1)}
          >
            {t('action_items.back_label')}
          </Button>
        </Grid>

        <Grid item>
          <Button
            align="left"
            data-testid="signup-submit-action"
            aria-label={t('action_items.submit_label')}
            variant="contained"
            type="submit"
            disabled={invalid || submitting || isSubmitting || pristine}
          >
            {t('action_items.submit_label')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const formName = 'RegistrationActionForm'
const RegistrationActionForm = reduxForm({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  validate,
  asyncValidate,
  asyncBlurFields: ['activationNumber', 'accessCode'],
})(RegistrationActionReduxForm)

RegistrationActionReduxForm.propTypes = propTypes
RegistrationActionReduxForm.defaultProps = defaultProps

export default RegistrationActionForm
