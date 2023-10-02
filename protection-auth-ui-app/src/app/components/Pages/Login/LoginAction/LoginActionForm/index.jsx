/* eslint-disable import/no-unresolved */
import { Box, Button, useTheme } from '@mui/material'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Loader, DynamicSVG, InputField, PasswordField,
} from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['email', 'password']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  /* istanbul ignore next */
  if (REGEX) {
    const regExpEmail = new RegExp(REGEX.EMAIL)
    if (values.email && !regExpEmail.test(values.email)) {
      errors.email = 'form_field_items.email_invalid'
    }
  }
  return errors
}

const LoginActionReduxForm = (props) => {
  const { t } = useTranslation()
  const {
    pristine, invalid, handleSubmit, submitting, isSubmitting,
  } = props
  const theme = useTheme()
  const userLogin = useSelector((state) => state?.userLogin)
  const { isLoading } = userLogin
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData

  return (
    <form onSubmit={handleSubmit} data-testid="LoginActionForm">
      <Field
        data-testid="input-login-action-email"
        name="email"
        label="form_field_items.email_label"
        component={InputField}
        sx={{ pb: '2rem' }}
        autoComplete="username"
        showEndAdornment
        autoFocus
        maxLength={validation?.email?.maxLength}
      />
      <Field
        data-testid="input-login-action-password"
        name="password"
        label="form_field_items.password_label"
        component={PasswordField}
        autoComplete="current-password"
        sx={{ pb: '2rem' }}
        maxLength={validation?.password?.maxLength}
      />
      <Button
        data-testid="login-action-submit"
        aria-label={t('action_items.login_label')}
        variant="contained"
        sx={{ mb: '2rem' }}
        type="submit"
        endIcon={(
          <DynamicSVG
            path={theme?.artifacts?.appIcons?.arrow_right_icon?.url}
            style={{ fill: 'currentColor' }}
          />
        )}
        disabled={invalid || submitting || isSubmitting || pristine}
      >
        {t('action_items.login_label')}
      </Button>
      {isLoading ? <Box sx={{ display: 'inline-block' }}><Loader /></Box> : null}
    </form>
  )
}

const LoginActionForm = reduxForm({
  form: 'LoginActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(LoginActionReduxForm)

LoginActionReduxForm.propTypes = propTypes
LoginActionReduxForm.defaultProps = defaultProps

export default LoginActionForm
