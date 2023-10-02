/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styles, hooks } from 'tenerity-ui-toolkit'
import {
  CreditCenterStatus,
} from 'PROTECTION_CREDIT_CENTER_UI/protection-credit-center-ui/widgets/credit-center'

import CreditScoreRiskometerContainer from './CreditRiskoMeterWrapper'
import { defaultProps, propTypes } from './types'

const { LargeSectionContainer } = styles

const CreditCenterWidget = () => {
  const dispatch = useDispatch()
  const { getApiSchema, getBenefits } = hooks?.useConfigStoreHook()
  const [throwError] = hooks?.useErrorBoundary()
  const apiEndpoint = getApiSchema('creditScore')
  const creditScore = useSelector((state) => state?.creditScore)
  const { data, error } = creditScore
  const benefits = getBenefits()

  const creditScores = data?.creditScore?.reduce((acc, val) => ({
    ...acc,
    [val?.bureau.toLowerCase()]: val,
  }), {})

  const render = () => {
    if (data && benefits?.credit) {
      return (
        <LargeSectionContainer sx={{
          minHeight: '15rem', p: '1.5rem',
        }}
        >
          <CreditCenterStatus
            Wrapper={({ children }) => (
              <>
                {children}
              </>
            )}
            SuccessComponent={() => (
              <CreditScoreRiskometerContainer creditScores={creditScores} />
            )}
          />
        </LargeSectionContainer>
      )
    }
    return null
  }

  useEffect(() => {
    dispatch({
      type: 'creditScore/getCreditScore',
      payload: {
        data: {
          apiEndpoint,
        },
      },
    })
  }, [dispatch, apiEndpoint])

  useEffect(() => {
    if (error) {
      throwError(error)
    }
  }, [throwError, error])

  return render()
}

CreditCenterWidget.propTypes = propTypes
CreditCenterWidget.defaultProps = defaultProps

export default CreditCenterWidget
