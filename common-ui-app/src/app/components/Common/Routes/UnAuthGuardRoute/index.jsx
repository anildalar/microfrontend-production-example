import React from 'react'
import { Navigate } from 'react-router-dom'
import { global } from 'tenerity-ui-toolkit'

import AppLayout from '../AppLayout'

const UnAuthGuardRoute = () => {
  const publicRoute = () => (global?.appUtils?.getAuthStatus()
    ? <Navigate to="/dashboard" replace />
    : <AppLayout />)
  return publicRoute()
}

export default UnAuthGuardRoute
