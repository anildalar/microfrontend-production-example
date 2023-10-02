import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getErrorType } from '../constants/globalConstants'

const useErrorBoundary = (errorCode = null) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, throwError] = React.useState(errorCode)
  const [errorScreenCallBackAction, setErrorScreenCallBackAction] = React.useState('')

  React.useEffect(() => {
    const errorType = getErrorType()?.[error]
    if (error && (errorType?.type === 'screen' || !errorType)) {
      /* istanbul ignore next */
      if (Array.isArray(errorScreenCallBackAction)) {
        errorScreenCallBackAction.forEach((errActionObj) => {
          dispatch({ type: errActionObj })
        })
      } else if (errorScreenCallBackAction) {
        dispatch({ type: errorScreenCallBackAction })
      }
      if (Array.isArray(errorScreenCallBackAction) || errorScreenCallBackAction) {
        setErrorScreenCallBackAction('')
      }

      throwError('')
      if (errorType?.route) {
        navigate(errorType?.route, {
          state: { errorCode: error, ...{ ...errorType?.params } },
        })
      } else {
        navigate('/error/generic',
          {
            state: { errorCode: error, ...{ ...errorType?.params } },
          })
      }
    }
  }, [error, navigate, errorScreenCallBackAction, dispatch])

  return [throwError, setErrorScreenCallBackAction]
}

export default useErrorBoundary
