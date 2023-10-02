import React from 'react'
import { Navigate } from 'react-router-dom'
import { global } from 'tenerity-ui-toolkit'

import AppLayout from '../AppLayout'

const AuthGuardRoute = () => {
  const privateRoute = () => (!global?.appUtils?.getAuthStatus()
    ? <Navigate to="/secure/login" replace />
    : <AppLayout isSideNavBarActivated />)
  return privateRoute()
}

export default AuthGuardRoute
