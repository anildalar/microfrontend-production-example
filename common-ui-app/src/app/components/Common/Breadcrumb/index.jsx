import React from 'react'
import { Breadcrumbs, useTheme } from '@mui/material'

import { defaultProps, propTypes } from './types'

const Breadcrumb = ({ children }) => {
  const theme = useTheme()
  return (
    theme?.isMobileOrTablet
      ? (
        <Breadcrumbs sx={theme?.customStyle?.common?.breadCrumb?.sx}>
          {children}
        </Breadcrumbs>
      )
      : null
  )
}

Breadcrumb.propTypes = propTypes
Breadcrumb.defaultProps = defaultProps

export default Breadcrumb
