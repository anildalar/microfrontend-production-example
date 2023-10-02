import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { defaultProps, propTypes } from './types'
import Maintenance from '../Maintenance'

const GenericError = ({ isInDev, isInMaintenance, isPageNotFound }) => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const onClick = () => navigate(-1)

  useEffect(() => {
    if (!isInDev && !isInMaintenance && !isPageNotFound && !state?.errorCode) {
      navigate('/')
    }
  }, [isInDev, isInMaintenance, isPageNotFound, state, navigate])

  const render = () => <Maintenance state={state} onClick={onClick} />
  return render()
}

GenericError.propTypes = propTypes
GenericError.defaultProps = defaultProps

export default GenericError
