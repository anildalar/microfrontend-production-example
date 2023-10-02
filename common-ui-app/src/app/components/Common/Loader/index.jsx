import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Typography, useTheme } from '@mui/material'
import { defaultProps, propTypes } from './types'

const Loader = ({ loadermessage, thickness, size }) => {
  const theme = useTheme()
  return (
    <Box sx={{
      ...theme?.customStyle?.loaderStyle,
    }}
    >
      <CircularProgress thickness={thickness} size={size} />
      <Typography variant="h6">{loadermessage}</Typography>
    </Box>
  )
}

Loader.propTypes = propTypes
Loader.defaultProps = defaultProps
Loader.displayName = 'Loader'

export default Loader
