import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getContentStackData as getContentStackDataHook, global, hooks, styles,
} from 'tenerity-ui-toolkit'

import * as commPrefReducer from '../../../redux/reducers/commPref'
import OTPAction from './OTPAction'
import { defaultProps, propTypes } from './types'

const { PageLayout, SmallPageContainer } = styles

const OTP = React.memo(() => {
  const navigate = useNavigate()
  const getContentStackData = getContentStackDataHook?.default
  const { getConfigStoreData } = hooks?.useConfigStoreHook()
  const [throwError] = hooks?.useErrorBoundary()
  const { setUnMountAction } = hooks?.useUnmount()
  const configStoreData = getConfigStoreData()

  const otp = useSelector((state) => state?.otp)
  const { data: otpData } = otp

  const commPref = useSelector((state) => state?.commPref)
  const { data, isLoading, error } = commPref
  const generateOtp = useSelector((state) => state?.generateOtp)
  const { error: generateOtpError } = generateOtp
  const cookies = global?.appUtils?.getAllCookies()

  useEffect(() => {
    if (otpData?.status) {
      global?.appUtils?.setAuthData({
        refresh_token: otpData?.refresh_token || global.appUtils.getAllCookies()?.ref_token,
      })
      global?.appUtils?.clearCookie('ref_token')
      navigate('/dashboard')
    }
  }, [otpData, navigate])

  useEffect(() => {
    if (!cookies?.memberId || (!data && !isLoading)) {
      navigate('/')
    }
  }, [cookies, data, isLoading, navigate])

  useEffect(() => {
    if (error || generateOtpError) {
      throwError(error || generateOtpError)
    }
  }, [throwError, error, generateOtpError])

  useEffect(() => {
    setUnMountAction([
      commPrefReducer.setReset.type,
    ])
  }, [setUnMountAction])

  const cmsDataCall = () => getContentStackData(configStoreData, {
    contentId: 'protection_web_app_otp_v1',
    pageId: 'otp',
  })

  const render = () => (
    <PageLayout data-testid="otp-verification-page-layout">
      <SmallPageContainer data-testid="otp-verification-small-page-container">
        {!isLoading && !error && (
          <OTPAction
            cmsDataCall={cmsDataCall}
            onErrorCallback={() => null}
            onSuccessCallback={() => null}
            pageId="otp"
            supportingData={{
              mobile: data?.commMobile,
              email: data?.commEmail,
              maskedData: {
                mobile: data?.commMobile?.replace(new RegExp(configStoreData?.REGEX.MOBILE_MASKING, 'g'), '*'),
                email: data?.commEmail?.replace(new RegExp(configStoreData?.REGEX.EMAIL_MASKING, 'g'), '*'),
              },
              primary: data?.primary,
              switchOptions: { mobile: 'email', email: 'mobile' },
              showSwitchLink: true,
            }}
            type="Login"
          />
        )}
      </SmallPageContainer>
    </PageLayout>
  )
  return render()
})

OTP.propTypes = propTypes
OTP.defaultProps = defaultProps
OTP.displayName = 'OTP'

export default OTP
