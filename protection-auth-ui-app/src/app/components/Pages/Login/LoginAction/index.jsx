/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks, styles, global } from 'tenerity-ui-toolkit'

import LoginActionForm from './LoginActionForm'
import sagaActions from '../../../../redux/actions'
import * as loginReducer from '../../../../redux/reducers/login'
import { defaultProps, propTypes } from './types'

const { SmallSectionContainer } = styles

const LoginAction = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [throwError] = hooks?.useErrorBoundary()
  const { getConfigStoreData, getApiSchema } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const { setUnMountAction } = hooks?.useUnmount()

  const apiEndpoint = getApiSchema('login')
  const apicommPrefEndpoint = getApiSchema('commPref')
  const userLogin = useSelector((state) => state?.userLogin)
  const { data, error, isLoading } = userLogin

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      if (data?.memberId) {
        if (data?.access_token && !data?.mfaEnabled) {
          global?.appUtils?.setAuthData(data)
          navigate('/dashboard')
        } else {
          global?.appUtils?.setAuthData({
            memberId: data?.memberId,
            access_token: data?.access_token,
            ref_token: data?.refresh_token,
          })
          dispatch({
            type: sagaActions.GET_COMM_PREF,
            payload: {
              data: {
                apiEndpoint: apicommPrefEndpoint,
              },
            },
          })
          navigate('/secure/tfa')
        }
      }
    }
  }, [apicommPrefEndpoint, data, dispatch, navigate])

  useEffect(() => {
    if (error) {
      throwError(error)
    }
  }, [throwError, error])

  useEffect(() => {
    setUnMountAction([
      loginReducer.setReset.type,
    ])
  }, [setUnMountAction])

  const handleSubmit = (values) => {
    dispatch({
      type: sagaActions.POST_LOGIN,
      payload: {
        data: {
          formValues: values,
          configStoreData,
          apiEndpoint,
          apicommPrefEndpoint,
        },
      },
    })
  }

  const render = () => (
    <SmallSectionContainer data-testid="login-small-section-container">
      <Typography data-testid="login-action-heading" color="primary" variant="h1" sx={error ? { pb: '2rem' } : { pb: '4.06rem' }}>
        {t('login.heading')}
      </Typography>
      <CommonComponents.Alerts errorCode={error} />
      <LoginActionForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        initialValues={{
          REGEX: configStoreData?.REGEX,
        }}
      />
      <CommonComponents.Link data-testid="forgot-password-link" variant="body2" to="/secure/forgot-password" name="forgot-password" sx={{ mb: '2rem' }}>
        {t('action_items.forgotPassword_label')}
      </CommonComponents.Link>
      <Typography data-testid="login-action-submit" variant="h4" as="p" sx={{ mb: '2rem' }} />
    </SmallSectionContainer>
  )

  return render()
}

LoginAction.propTypes = propTypes
LoginAction.defaultProps = defaultProps

export default LoginAction
