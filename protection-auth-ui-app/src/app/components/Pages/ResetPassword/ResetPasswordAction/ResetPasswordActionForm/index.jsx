/* eslint-disable import/no-unresolved */
import { Button, Grid, useTheme } from '@mui/material'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Trans, useTranslation } from 'react-i18next'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['password', 'confirmPassword']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  /* istanbul ignore else */
  if (REGEX) {
    const regExpPassword = new RegExp(REGEX.STRONG_PASSWORD)
    if (values.password && !regExpPassword.test(values.password)) {
      errors.password = 'form_field_items.createPassword_invalid'
    }
  }

  if (values.confirmPassword && (values.password !== values.confirmPassword)) {
    errors.confirmPassword = 'form_field_items.confirmResetPassword_invalid'
  }
  return errors
}

const ResetPasswordActionReduxForm = (props) => {
  const { customStyle } = useTheme()
  const { t } = useTranslation()
  const {
    pristine, invalid, handleSubmit, submitting, isSubmitting,
  } = props
  const theme = useTheme()
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData

  return (
    <form onSubmit={handleSubmit} data-testid="reset-password-action-form">
      <Field
        data-testid="input-reset-password-action-password"
        name="password"
        label="form_field_items.resetPassword_label"
        component={CommonComponents.PasswordField}
        sx={customStyle?.resetPassword?.textInput}
        autoFocus
        maxLength={validation?.password?.maxLength}
      />
      <Field
        data-testid="input-reset-password-action-confirm-password"
        name="confirmPassword"
        label="form_field_items.confirmResetPassword_label"
        component={CommonComponents.PasswordField}
        sx={customStyle?.resetPassword?.textInput}
      />

      <Grid>
        <Grid item xs={12}>
          <Trans
            i18nKey={t('form_field_items.resetPassword_note')}
            components={{
              ul: <ul style={{
                ...theme?.customStyle?.resetPasswordNote,
              }}
              />,
              li: <li />,
            }}
          >
            {null}
          </Trans>
        </Grid>
      </Grid>

      <Button
        data-testid="resetpassword-action-submit"
        aria-label={t('action_items.resetpassword_label')}
        variant="contained"
        sx={customStyle?.resetPassword?.button}
        type="submit"
        disabled={invalid || submitting || isSubmitting || pristine}
      >
        {t('action_items.submit_label')}
      </Button>
    </form>
  )
}

const ResetPasswordActionForm = reduxForm({
  form: 'ResetPasswordActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(ResetPasswordActionReduxForm)

ResetPasswordActionReduxForm.propTypes = propTypes
ResetPasswordActionReduxForm.defaultProps = defaultProps

export default ResetPasswordActionForm
