import React from 'react'
import {
  Snackbar, useTheme,
} from '@mui/material'

import { defaultProps, propTypes } from './types'
import Alerts from '../Alerts'

const SnackBarView = React.memo(({
  onClose, isVisible, message, severity, code, ...restProps
}) => {
  const theme = useTheme()
  return (
    <Snackbar
      sx={{
        padding: theme?.isMobile ? '0px 3px 0 3px' : `calc(${theme?.customStyle?.header?.height} - 10px)`,
        width: '100%',
        left: { xs: '50%', md: 'calc(50% - 150px)' },
        transform: 'translateX(-50%)',
        marginLeft: { md: '300px' },
      }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      data-testid={`snack-bar-${restProps['data-testid']}`}
      open={isVisible}
      autoHideDuration={4000}
      onClose={onClose}
    >
      <Alerts
        errorCode={code}
        display={isVisible}
        message={message}
        severity={severity}
      />
    </Snackbar>
  )
})

SnackBarView.propTypes = propTypes
SnackBarView.defaultProps = defaultProps
SnackBarView.displayName = 'SnackBarView'
export default SnackBarView
