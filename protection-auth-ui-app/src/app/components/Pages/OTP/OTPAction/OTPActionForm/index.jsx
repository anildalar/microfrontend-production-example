/* eslint-disable import/no-unresolved */
import {
  Button, Grid, Typography, useTheme, Link, TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { change, Field, reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { styles } from 'tenerity-ui-toolkit'

import * as CommonComponents from 'COMMON_UI/common/Components'
import { defaultProps, propTypes } from './types'

const { CustomAlignContainer } = styles

// eslint-disable-next-line no-unused-vars
export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['otp']
  requiredFields.forEach((field) => {
    if (!values?.[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  if (values?.otp && (values?.otp?.length !== props?.initialValues?.validation?.otp?.maxLength)) {
    errors.otp = 'form_field_items.tfa_otp_invalid'
  }
  return errors
}

const OTPActionForm = React.memo((props) => {
  const [otp, setOtp] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [restart, setRestart] = useState(false)
  const { i18n, t } = useTranslation()
  const theme = useTheme()
  const {
    pristine, invalid, handleSubmit, submitting,
    isSubmitting, initialValues, valueInSeconds, targetDate, dispatch,
  } = props

  const stop = false
  const onStart = () => {
    initialValues?.timedOutErrorCall('')
    setDisabled(true)
    setRestart(false)
  }
  const onComplete = () => {
    if (initialValues?.isTimedOutConnectedWithTimer) {
      initialValues?.timedOutErrorCall('PROTECTION_OTP_ERR_TIMED_OUT')
    }
    setDisabled(false)
    setRestart(false)
  }

  const onSubmit = (values) => {
    handleSubmit(values)
  }

  return (
    <form onSubmit={onSubmit} data-testid="otpActionForm">
      <Field
        data-testid="input-tfa-action-otp"
        name="otp"
        component={CommonComponents.InputField}
        sx={{ pb: '2rem', display: 'none' }}
        autoFocus
        maxLength={initialValues?.validation?.otp?.maxLength}
        disabled={submitting || isSubmitting || initialValues?.isSwitchLoading}
        type="hidden"
      />
      <CommonComponents.MultiInputField
        name="mui-otp"
        containerStyle={{ justifyContent: 'center', gap: '0.5rem', paddingBottom: '2rem' }}
        inputStyle=""
        numInputs={initialValues?.validation?.otp?.maxLength}
        onChange={(v) => setOtp((prevValue) => {
          if (prevValue !== v) {
            dispatch(change('OTPActionForm', 'otp', v))
            return v
          }
          return prevValue
        })}
        renderSeparator={<span />}
        value={otp}
        placeholder=""
        inputType="tel"
        renderInput={(prop) => <TextField sx={{ input: { textAlign: 'center' } }} {...prop} />}
        shouldAutoFocus
        disablePaste={false}
      />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ ...theme?.customStyle, mb: '2rem' }}
      >
        <Grid item xs={4}>
          <CustomAlignContainer textAlign="right">
            <CommonComponents.TimmerChip
              targetDate={targetDate}
              valueInSeconds={valueInSeconds}
              restart={restart}
              stop={stop}
              onStart={onStart}
              onComplete={onComplete}
            />
          </CustomAlignContainer>
        </Grid>
        <Grid item xs={8}>
          <CustomAlignContainer textAlign="left">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              disabled={disabled || submitting || isSubmitting || initialValues?.isSwitchLoading}
              component="button"
              type="button"
              data-testid="send_new_passcode-link"
              onClick={() => { initialValues?.generateOtpCall(false, () => setRestart(true)) }}
              variant="body2"
              name="send_new_passcode"
            >
              {i18n?.exists('action_items.send_new_passcode') && t('action_items.send_new_passcode')}
            </Link>
          </CustomAlignContainer>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        sx={{ ...theme?.customStyle }}
      >
        {
          initialValues?.showSwitchLink
          && (
            <Grid item xs={12}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                disabled={disabled || submitting || isSubmitting || initialValues?.isSwitchLoading}
                sx={{ mb: '2rem' }}
                component="button"
                type="button"
                data-testid={`passcode_via_${initialValues?.primary}-link`}
                onClick={() => { initialValues?.switchPrimary(() => setRestart(true)) }}
                variant="body2"
                name={`passcode_via_${initialValues?.primary}`}
              >
                {i18n?.exists(`action_items.passcode_via_${initialValues?.primary}`) && t(`action_items.passcode_via_${initialValues?.primary}`)}
              </Link>
            </Grid>
          )
        }
        <Grid item xs={12} sx={{ p: 0, pb: '2.375rem' }}>
          <Button
            align="center"
            data-testid="otp-submit-action"
            variant="contained"
            type="submit"
            disabled={invalid || !disabled || submitting || isSubmitting || pristine
              || initialValues?.isSwitchLoading}
          >
            <Typography variant="buttonL">
              {t('action_items.submit_label')}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
})

const formName = 'OTPActionForm'
const OTPActionReduxForm = reduxForm({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(OTPActionForm)

OTPActionForm.displayName = 'OTPActionForm'
OTPActionForm.propTypes = propTypes
OTPActionForm.defaultProps = defaultProps

export default OTPActionReduxForm
