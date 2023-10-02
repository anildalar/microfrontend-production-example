/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import * as CommonComponents from 'COMMON_UI/common/Components'
import { hooks, global } from 'tenerity-ui-toolkit'

import RegistrationActionForm from '../../../Shared/RegistrationActionForm'
import { defaultProps, propTypes } from './types'
import sagaActions from '../../../../redux/actions'
import * as enrollmentReducer from '../../../../redux/reducers/enrollment'
import { SELF_REGISTRATION } from '../../../../constants/js/globalConstants'
import TrialTermMessage from '../TrialTermMessage'

const SelfRegistrationAction = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [throwError, setErrorScreenCallBackAction] = hooks?.useErrorBoundary()
  const userEnrollment = useSelector((state) => state?.userEnrollment)
  const { data, error, isLoading } = userEnrollment

  const [searchParams] = useSearchParams()
  const solicitationId = searchParams.get('sid')
  const campaignId = searchParams.get('ci')

  const {
    getConfigStoreData,
    getThemeConfigData,
    getApiSchema,
  } = hooks?.useConfigStoreHook()
  const apiEndpoint = getApiSchema('enrollment')
  const { artifacts } = getThemeConfigData()
  const configStoreData = getConfigStoreData()
  const { setUnMountAction } = hooks?.useUnmount()
  const defaultCountryCode = global?.utils?.getCountryCode(
    configStoreData?.validation?.phone?.defaultCountryCode,
    configStoreData?.validation?.phone?.supportedCountryCodes,
    'country',
  )

  // when api will break then redirects it to the Error page
  useEffect(() => {
    if (error || data?.error?.code) {
      setErrorScreenCallBackAction(enrollmentReducer.setReset.type)
      throwError(error || `PROTECTION_ENROLL_ERR_${data?.error?.code}`)
    }
  }, [throwError, error, data, setErrorScreenCallBackAction])
  const handleSubmit = (values) => {
    dispatch({
      type: sagaActions.POST_ENROLLMENT,
      payload: {
        data: {
          formValues: {
            ...values,
            solicitationId,
            campaignId,
          },
          configStoreData,
          apiEndpoint,
        },
      },
    })
  }

  useEffect(() => {
    setUnMountAction([
      enrollmentReducer.setReset.type,
    ])
  }, [setUnMountAction])

  const render = () => (
    <>
      <TrialTermMessage />
      <Typography align="left" color="primary" data-testid="signup-action-heading" variant="h1" sx={error ? { pb: '2rem' } : { pb: '2.5rem' }}>
        {t('registration.heading')}
      </Typography>
      <CommonComponents.Alerts errorCode={error} />
      <Typography align="left" color="text.primary" data-testid="signup-action-subHeading1" variant="h2" sx={{ pb: '2.5rem' }}>
        {t('registration.subHeading1')}
      </Typography>
      <Typography align="left" color="text.primary" data-testid="signup-action-subHeading2" variant="body1" sx={{ pb: '2.5rem' }}>
        {t('registration.subHeading2')}
      </Typography>
      <RegistrationActionForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        phoneData={configStoreData?.validation?.phone}
        initialValues={{
          type: SELF_REGISTRATION,
          isBilling: true,
          countryCode: defaultCountryCode?.code,
          REGEX: configStoreData?.REGEX,
          validation: configStoreData?.validation,
        }}
        appIcons={artifacts?.appIcons}
      />
    </>
  )

  return render()
}

SelfRegistrationAction.propTypes = propTypes
SelfRegistrationAction.defaultProps = defaultProps

export default SelfRegistrationAction
