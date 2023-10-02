/* eslint-disable import/no-unresolved */
import React, {
  useCallback, useEffect, useMemo, useRef,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import { Alerts } from 'COMMON_UI/common/Components'
import { hooks } from 'tenerity-ui-toolkit'

import KbaActionForm from '../KbaActionForm'
import sagaActions from '../../../../redux/actions'
import * as postKbaReducer from '../../../../redux/reducers/kba/postKba'
import { defaultProps, propTypes } from './types'
import { LargeSectionContainer } from '../../../../styles/styles'

const KbaAction = React.memo(() => {
  const { t } = useTranslation()
  const { state } = useLocation()
  const dispatch = useDispatch()
  const { getApiSchema } = hooks?.useConfigStoreHook()
  const [throwError, setErrorScreenCallBackAction] = hooks?.useErrorBoundary()
  const apiEndpoint = getApiSchema('postKba')
  const postKba = useSelector((store) => store?.postKba)
  const { isLoading, error: postKbaError } = postKba
  const kbaData = useMemo(() => state?.kbaQuestionsData?.kba?.map((questionData) => ({
    ...questionData,
    answerOptionList: questionData?.answerOptionList?.map((k) => ({
      label: k?.answer,
      value: k?.answerNumber,
    })),
  })), [state])
  const kbaTimer = useRef(null)

  useEffect(() => {
    if (postKbaError) {
      setErrorScreenCallBackAction(postKbaReducer.setReset.type)
      throwError(postKbaError)
    }
  }, [throwError, postKbaError, setErrorScreenCallBackAction])

  const handleSubmit = useCallback((values) => {
    const data = Object.keys(values)?.map((value) => ({
      questionNumber: value.split('-')[1],
      answerNumber: values[value],
    }))

    dispatch({
      type: sagaActions.POST_KBA,
      payload: {
        formValues: data,
        apiEndpoint,
        memberId: state?.kbaQuestionsData?.authTokenResponse?.memberId,
      },
    })
    clearTimeout(kbaTimer.current)
  }, [dispatch, apiEndpoint, state])

  // timer functionality after 5 min navigate to error page
  useEffect(() => {
    if (kbaData) {
      kbaTimer.current = setTimeout(() => {
        throwError('PROTECTION_ERR_AUTH_FAILURE')
      }, 300000)
    }
    return () => clearTimeout(kbaTimer.current)
  }, [kbaData, throwError])

  const render = () => (
    state
      ? (
        <LargeSectionContainer maxWidth="md">
          <Typography
            data-testid="kba-heading"
            variant="h1"
            color="primary"
            sx={{ pb: '2.5rem' }}
          >
            {t('kba.heading')}
          </Typography>
          <Alerts severity="warning" display message={t('kba.importantNote')} />
          {
            kbaData && (
              <KbaActionForm
                onSubmit={handleSubmit}
                isSubmitting={isLoading}
                kbaData={kbaData}
              />
            )
          }
        </LargeSectionContainer>
      )
      : <Navigate to="/secure/login" />
  )

  return render()
})

KbaAction.propTypes = propTypes
KbaAction.defaultProps = defaultProps

KbaAction.displayName = 'KbaAction'

export default KbaAction
