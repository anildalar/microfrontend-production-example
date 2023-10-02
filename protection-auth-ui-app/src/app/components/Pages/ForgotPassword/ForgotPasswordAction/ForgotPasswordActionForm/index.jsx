/* eslint-disable import/no-unresolved */
import {
  Button, Grid, Typography, useTheme,
} from '@mui/material'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { useNavigate } from 'react-router-dom'
import { hooks } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

export const validate = (values, props) => {
  const errors = {}
  const requiredFields = ['forgotPassword_email']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `form_field_items.${field}_required`
    }
  })

  const REGEX = props?.initialValues?.REGEX
  /* istanbul ignore else */
  if (REGEX) {
    const regExpEmail = new RegExp(REGEX.EMAIL)
    if (
      values.forgotPassword_email
      && !regExpEmail.test(values.forgotPassword_email)
    ) {
      errors.forgotPassword_email = 'form_field_items.forgotPassword_email_invalid'
    }
  }
  return errors
}

const ForgotPasswordActionReduxForm = (props) => {
  const { t } = useTranslation()
  const { customStyle, artifacts, palette } = useTheme()
  const navigate = useNavigate()
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { validation } = configStoreData

  const {
    pristine, invalid, handleSubmit, submitting, isSubmitting, reset,
  } = props

  const onSubmit = (values) => {
    handleSubmit(values)
    reset('ForgotPasswordActionForm')
  }

  return (
    <form onSubmit={onSubmit} data-testid="ForgotPasswordActionForm">
      <Field
        data-testid="input-forgotPassword-action-email"
        name="forgotPassword_email"
        label="form_field_items.forgotPassword_email_label"
        component={CommonComponents.InputField}
        sx={customStyle?.forgotPassword?.textInput}
        autoFocus
        maxLength={validation?.email?.maxLength}
      />
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        sx={{ ...customStyle }}
      >
        <Grid
          item
          xs={12}
          sx={{
            ...customStyle?.forgotPassword?.button,
            ...customStyle?.forgotPassword?.common,
          }}
        >
          <Button
            align="center"
            data-testid="forgotPassword-submit-action"
            aria-label={t('action_items.submit_label')}
            variant="contained"
            type="submit"
            disabled={invalid || submitting || isSubmitting || pristine}
          >
            <Typography variant="buttonL">
              {t('action_items.forgotPassword_submit_label')}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ p: 0 }}>
          <Button
            align="center"
            data-testid="forgotPassword-back-action"
            aria-label={t('action_items.back_label')}
            variant="outlined"
            type="button"
            sx={{ p: 0 }}
            onClick={() => navigate(-1)}
            startIcon={(
              <CommonComponents.DynamicSVG
                path={artifacts?.appIcons?.arrow_left_icon?.url}
                style={{ fill: palette?.action?.active }}
              />
            )}
          >
            {t('action_items.back_label')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const ForgotPasswordActionForm = reduxForm({
  form: 'ForgotPasswordActionForm',
  touchOnChange: true,
  touchOnBlur: true,
  validate,
})(ForgotPasswordActionReduxForm)

ForgotPasswordActionReduxForm.propTypes = propTypes
ForgotPasswordActionReduxForm.defaultProps = defaultProps

export default ForgotPasswordActionForm
