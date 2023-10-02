/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks, styles } from 'tenerity-ui-toolkit'

import { useTheme } from '@emotion/react'
import ForgotPasswordActionForm from './ForgotPasswordActionForm'
import sagaActions from '../../../../redux/actions'
import * as forgotPasswordReducer from '../../../../redux/reducers/forgotPassword'
import { defaultProps, propTypes } from './types'

const { SmallSectionContainer } = styles

const ForgotPasswordAction = () => {
  const { customStyle } = useTheme()
  const { t } = useTranslation()
  const [throwError] = hooks?.useErrorBoundary()
  const dispatch = useDispatch()
  const { getConfigStoreData, getApiSchema } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const apiEndpoint = getApiSchema('forgotPassword')
  const forgotPassword = useSelector((state) => state?.forgotPassword)
  const { data, error, isLoading } = forgotPassword
  const { setUnMountAction } = hooks?.useUnmount()

  useEffect(() => {
    if (error) {
      throwError(error)
    }
  }, [throwError, error])

  useEffect(() => {
    setUnMountAction([
      forgotPasswordReducer.setReset.type,
    ])
  }, [setUnMountAction])

  const handleSubmit = (values) => {
    dispatch({
      type: sagaActions.POST_FORGOT_PASSWORD,
      payload: {
        data: {
          formValues: values,
          configStoreData,
          apiEndpoint,
        },
      },
    })
  }

  const render = () => (
    <SmallSectionContainer data-testid="forgot-password-small-section-container">
      <Typography
        data-testid="forgotPassword-action-heading"
        variant="h1"
        sx={{
          ...customStyle?.forgotPassword?.heading,
          ...(data && { pb: '2rem' }),
          ...customStyle?.forgotPassword?.common,
        }}
        color="primary"
      >
        {t('forgotPassword.heading')}
      </Typography>
      <CommonComponents.Alerts
        errorCode={(data && 'PROTECTION_FORGOT_PWD_VALIDATE_SUCCESS') || error}
      />
      <Typography
        data-testid="forgotPassword-action-subHeading"
        variant="body1"
        sx={customStyle?.forgotPassword?.subHeading}
      >
        {t('forgotPassword.subHeading')}
      </Typography>
      <ForgotPasswordActionForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        initialValues={{
          REGEX: configStoreData?.REGEX,
        }}
      />
    </SmallSectionContainer>
  )

  return render()
}

ForgotPasswordAction.propTypes = propTypes
ForgotPasswordAction.defaultProps = defaultProps

export default ForgotPasswordAction
