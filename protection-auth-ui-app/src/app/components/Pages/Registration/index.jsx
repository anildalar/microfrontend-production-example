/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { Container, useTheme } from '@mui/material'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as CommonComponents from 'COMMON_UI/common/Components'

import { hooks } from 'tenerity-ui-toolkit'
import { defaultProps, propTypes } from './types'
import sagaActions from '../../../redux/actions'

const Registration = React.memo(() => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { getApiSchema } = hooks?.useConfigStoreHook()
  const apiEndpoint = getApiSchema('solicitation')
  const userEnrollment = useSelector((state) => state?.userEnrollment)
  const { data } = userEnrollment

  const [searchParams] = useSearchParams()
  const solicitationId = searchParams.get('sid')
  const campaignId = searchParams.get('ci')

  useEffect(() => {
    if (data?.membershipNumber && data?.kba && !data?.error) {
      navigate(
        '/kba',
        {
          state: {
            kbaQuestionsData: data,
          },
        },
      )
    }
  }, [data, navigate])

  useEffect(() => {
    dispatch({
      type: sagaActions.GET_SOL_DETAILS,
      payload: {
        data: {
          solicitationId,
          campaignId,
          apiEndpoint,
        },
      },
    })
  }, [dispatch, solicitationId, campaignId, apiEndpoint])

  const renderContent = () => {
    if ((data?.membershipNumber && !data?.error && !data?.kba)) {
      return (
        <CommonComponents.SuccesComponent
          isAction
          to="/dashboard"
          dataTestid="registration_success"
          pageId="registration"
        />
      )
    }

    return <Outlet />
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        ...theme?.customStyle?.registration?.container,
      }}
    >
      {renderContent()}
    </Container>
  )
})

Registration.propTypes = propTypes
Registration.defaultProps = defaultProps
Registration.displayName = 'Registration'

export default Registration
