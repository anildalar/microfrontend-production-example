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
import { GROUP_CODE_REGISTRATION } from '../../../../constants/js/globalConstants'

const GroupCodeRegistrationAction = () => {
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
  const validateAccesssCodeApiEndpoint = getApiSchema('accessCode')
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

  const asyncValidateCode = (values) => {
    dispatch({
      type: sagaActions.POST_VALIDATE_CODE,
      payload: {
        data: {
          code: values?.accessCode,
          solicitationId,
          configStoreData,
          apiEndpoint: validateAccesssCodeApiEndpoint,
        },
        formData: {
          formName: 'RegistrationActionForm',
          fieldError: {
            accessCode: 'form_field_items.accessCode_invalid',
          },
        },
      },
    })
  }

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
      <Typography align="left" color="primary" data-testid="signup-action-groupCodeHeading" variant="h1" sx={error ? { pb: '2rem' } : { pb: '2.5rem' }}>
        {t('registration.group_code_sub_heading')}
      </Typography>
      <CommonComponents.Alerts errorCode={error} />
      <Typography align="left" color="text.primary" data-testid="signup-action-groupCodesubHeading1" variant="h2" sx={{ pb: '2.5rem' }}>
        {t('registration.group_code_sub_heading1')}
        {' '}
        {'< Name Here >'}
      </Typography>
      <Typography align="left" color="text.primary" data-testid="signup-action-groupCodesubHeading2" variant="body1" sx={{ pb: '2.5rem' }}>
        {t('registration.group_code_sub_heading2')}
      </Typography>
      <Typography align="left" color="text.primary" data-testid="signup-action-groupCodesubHeading3" variant="body1" sx={{ pb: '2.5rem' }}>
        {t('registration.group_code_sub_heading3')}
      </Typography>
      <RegistrationActionForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        phoneData={configStoreData?.validation?.phone}
        asyncValidateCode={asyncValidateCode}
        initialValues={{
          type: GROUP_CODE_REGISTRATION,
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

GroupCodeRegistrationAction.propTypes = propTypes
GroupCodeRegistrationAction.defaultProps = defaultProps

export default GroupCodeRegistrationAction
