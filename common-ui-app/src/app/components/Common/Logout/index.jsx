import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { global } from 'tenerity-ui-toolkit'

const Logout = React.memo(() => {
  const navigate = useNavigate()

  const onLogoutSuccess = useCallback(() => {
    global?.appUtils?.clearAuthData()
    navigate('/secure/login')
  }, [navigate])

  useEffect(() => {
    onLogoutSuccess()
  }, [onLogoutSuccess])

  return null
})

Logout.displayName = 'Logout'

export default Logout
