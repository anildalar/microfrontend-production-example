/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { hooks } from 'tenerity-ui-toolkit'
import ECSFailureMessage from './ECSFailureMessage'
import KBAFailureMessage from './KBAFailureMessage'
import sagaActions from '../../../../../redux/actions'

const CreditCenterStatus = ({ Wrapper = React.Fragment, SuccessComponent = React.Fragment }) => {
  const creditScore = useSelector((state) => state?.creditScore)
  const { data, error, isLoading } = creditScore
  const dispatch = useDispatch()
  const { getApiSchema } = hooks?.useConfigStoreHook()
  const apiEndpoint = getApiSchema('remainingTrial')
  const remainingTrial = useSelector((state) => state?.remainingTrial)

  const ecsStatusInactive = data?.ecsStatus?.toLowerCase() === 'inactive'
  const kbaStatusInactive = data?.kbaStatus?.toLowerCase() === 'inactive'

  useEffect(() => {
    if (ecsStatusInactive || kbaStatusInactive) {
      dispatch({
        type: sagaActions.GET_REMAINING_TRIAL,
        payload: {
          data: {
            apiEndpoint,
          },
        },
      })
    }
  }, [dispatch, apiEndpoint, ecsStatusInactive, kbaStatusInactive])

  const render = () => (
    isLoading || error ? <Wrapper>{null}</Wrapper>
      : ecsStatusInactive
        ? (
          <Wrapper>
            <ECSFailureMessage termDaysLeft={remainingTrial?.data?.remainingDays} />
          </Wrapper>
        )
        : kbaStatusInactive
          ? (
            <Wrapper>
              <KBAFailureMessage
                kbaAttempCount={data?.kbaAttemptCount}
                termDaysLeft={remainingTrial?.data?.remainingDays}
              />
            </Wrapper>
          ) : (
            <>
              <SuccessComponent />
            </>
          ))

  return render()
}

export default CreditCenterStatus
