/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Typography, Link } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from 'redux-form'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks, styles } from 'tenerity-ui-toolkit'

import OTPActionForm from './OTPActionForm'
import sagaActions from '../../../../redux/actions'
import * as otpReducer from '../../../../redux/reducers/otp'
import * as generateOtpReducer from '../../../../redux/reducers/otp/generate'
import { defaultProps, propTypes } from './types'

const { SmallSectionContainer } = styles

const OTPAction = ({
  cmsDataCall, type, pageId, supportingData,
}) => {
  const [primary, setPrimary] = useState(supportingData?.primary?.toLowerCase())
  const { i18n, t } = useTranslation()
  const dispatch = useDispatch()
  const { getConfigStoreData, getApiSchema } = hooks?.useConfigStoreHook()
  const configStoreData = getConfigStoreData()
  const otp = useSelector((state) => state?.otp)
  const { data, error, isLoading } = otp
  const generateOtp = useSelector((state) => state?.generateOtp)
  const {
    data: generateOtpData, error: generateOtpError, isLoading: generateOtpIsLoading,
  } = generateOtp
  const { setUnMountAction } = hooks?.useUnmount()

  const generateOtpCall = (isSwitchCall, callback) => {
    dispatch(reset('OTPActionForm'))
    dispatch({ type: otpReducer.setReset.type })
    dispatch({
      type: sagaActions.POST_GENERATE_OTP,
      payload: {
        data: {
          formValues: {
            type,
            medium: isSwitchCall ? supportingData?.switchOptions?.[primary] : primary,
            primary: isSwitchCall ? supportingData?.switchOptions?.[primary] : primary,
            username: supportingData?.email,
            mobile: supportingData?.mobile,
          },
          configStoreData,
          apiEndpoint: getApiSchema('otpGeneration'),
          callback,
        },
      },
    })
  }

  const switchPrimary = (callback) => {
    const medium = primary === 'mobile' ? 'email' : 'mobile'
    generateOtpCall(true, () => {
      callback()
      setPrimary(medium)
    })
  }

  useEffect(() => {
    if (cmsDataCall && typeof cmsDataCall === 'function') { cmsDataCall() }
  }, [cmsDataCall])

  useEffect(() => {
    setUnMountAction([
      otpReducer.setReset.type,
      generateOtpReducer.setReset.type,
    ])
  }, [setUnMountAction])

  const handleSubmit = (values) => {
    dispatch({
      type: sagaActions.POST_OTP,
      payload: {
        data: {
          formValues: values,
          configStoreData,
          apiEndpoint: getApiSchema('otpVerification'),
        },
      },
    })
  }

  const timedOutErrorCall = (errorCode) => {
    dispatch({
      type: sagaActions.SET_OTP_ERROR,
      payload: errorCode,
    })
  }

  const render = () => (
    <SmallSectionContainer data-testid={`${type}-otp-verification-small-section-container`}>
      <Typography
        data-testid={`${type}-otp-action-heading`}
        variant="h1"
        sx={data || error ? { pb: '2rem' } : { pb: '4.06rem' }}
        color="primary"
      >
        {i18n?.exists(`${pageId}.heading`) && t(`${pageId}.heading`)}
      </Typography>
      <CommonComponents.Alerts
        // eslint-disable-next-line no-nested-ternary
        errorCode={(data?.status ? 'PROTECTION_OTP_VALIDATE_SUCCESS' : typeof data === 'string' ? data : error || generateOtpError)}
      />
      <Typography
        data-testid={`${type}-otp-action-subHeading`}
        variant="body1"
        sx={{ pb: '2rem' }}
      >
        {
          i18n?.exists(`${pageId}.subHeading_${generateOtpData?.status ? 'new_' : ''}${primary}`)
          && (
            <Trans
              i18nKey={t(`${pageId}.subHeading_${generateOtpData?.status ? 'new_' : ''}${primary}`)
                ?.replace('@value@', supportingData?.maskedData?.[primary])}
              components={{ br: <br /> }}
            />
          )
        }
      </Typography>
      <OTPActionForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        initialValues={{
          type,
          REGEX: configStoreData?.REGEX,
          validation: configStoreData?.validation,
          primary: supportingData?.switchOptions?.[primary],
          username: supportingData?.email,
          isSwitchLoading: generateOtpIsLoading,
          showSwitchLink: supportingData?.showSwitchLink,
          isTimedOutConnectedWithTimer: true,
          switchPrimary,
          generateOtpCall,
          timedOutErrorCall,
        }}
        valueInSeconds={30}
        targetDate={null}
      />

      <CommonComponents.Tooltip
        message={(
          <Typography
            data-testid={`${type}-otp-action-subHeading`}
            variant="h6"
          >
            {t(`${pageId}.help`)}
          </Typography>
        )}
        placement="right"
        arrow
        Component={Link}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link component="button" type="button" data-testid="need-help-link" variant="body2" name="need-help">
          {t('action_items.need_help_label')}
        </Link>
      </CommonComponents.Tooltip>
    </SmallSectionContainer>
  )

  return render()
}

OTPAction.propTypes = propTypes
OTPAction.defaultProps = defaultProps

export default OTPAction
