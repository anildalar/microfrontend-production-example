/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import { hooks, styles } from 'tenerity-ui-toolkit'
import { useDispatch, useSelector } from 'react-redux'
import * as CommonComponents from 'COMMON_UI/common/Components'

import { useTheme } from '@emotion/react'
import ResetPasswordActionForm from './ResetPasswordActionForm'
import sagaActions from '../../../../redux/actions'
import * as resetPasswordReducer from '../../../../redux/reducers/resetPassword'
import * as resetPasswordApprovalReducer from '../../../../redux/reducers/resetPasswordApproval'
import { defaultProps, propTypes } from './types'

const { SmallSectionContainer } = styles

const ResetPasswordAction = () => {
  const { customStyle } = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getConfigStoreData, getApiSchema } = hooks?.useConfigStoreHook()
  const [throwError, setErrorScreenCallBackAction] = hooks?.useErrorBoundary()
  const configStoreData = getConfigStoreData()
  const apiEndpoint = getApiSchema('resetPassword')
  const { resetPasswordId } = useParams()
  const resetPassword = useSelector((state) => state?.resetPassword)
  const resetPasswordApproval = useSelector((state) => state?.resetPasswordApproval)
  const { error, isLoading } = resetPassword
  const { error: resetPasswordApprovalError } = resetPasswordApproval

  useEffect(() => {
    if (error) {
      setErrorScreenCallBackAction(resetPasswordReducer.setReset.type)
      throwError(error)
    }
  }, [throwError, error, setErrorScreenCallBackAction])

  useEffect(() => {
    if (resetPasswordApprovalError) {
      setErrorScreenCallBackAction(resetPasswordApprovalReducer.setReset.type)
      throwError(resetPasswordApprovalError)
    }
  }, [throwError, resetPasswordApprovalError, setErrorScreenCallBackAction])

  useEffect(() => {
    dispatch({
      type: sagaActions.GET_RESET_PASSWORD_APPROVAL,
      payload: {
        data: {
          apiEndpoint,
          key: resetPasswordId,
        },
      },
    })
  }, [resetPasswordId, dispatch, apiEndpoint])

  const handleSubmit = (values) => {
    dispatch({
      type: sagaActions.POST_RESET_PASSWORD,
      payload: {
        data: {
          formValues: values,
          configStoreData,
          apiEndpoint,
          key: resetPasswordId,
          username: resetPasswordApproval?.data?.username,
        },
      },
    })
  }

  const render = () => (
    <SmallSectionContainer data-testid="reset-password-small-section-container">
      <Typography
        data-testid="create-resetPassword-heading"
        variant="h1"
        sx={customStyle?.resetPassword?.heading}
        color="primary"
      >
        {t('resetPassword.heading')}
      </Typography>
      <CommonComponents.Alerts errorCode={error} />
      <Typography
        data-testid="create-resetPassword-subHeading"
        variant="body1"
        sx={customStyle?.resetPassword?.heading}
      >
        {t('resetPassword.subHeading')}
      </Typography>
      <ResetPasswordActionForm
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

ResetPasswordAction.propTypes = propTypes
ResetPasswordAction.defaultProps = defaultProps

export default ResetPasswordAction
