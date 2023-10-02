import React from 'react'
import { Alert, useTheme } from '@mui/material'
import { errorMappings } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

const Alerts = React.memo(({
  errorCode, display, message, severity,
}) => {
  const theme = useTheme()
  const errorMessage = errorMappings(errorCode)
  return (
    errorMessage?.display || display
      ? (
        <Alert
          data-testid={`alert-message-${errorCode || 'item'}`}
          severity={errorMessage?.severity || severity}
          sx={{ ...theme?.customStyle?.alertStyle }}
        >
          {errorMessage?.content || message}
        </Alert>
      )
      : null
  )
})

Alerts.propTypes = propTypes
Alerts.defaultProps = defaultProps
Alerts.displayName = 'Alerts'

export default Alerts
