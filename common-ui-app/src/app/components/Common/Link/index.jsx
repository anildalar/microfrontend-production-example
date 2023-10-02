import React from 'react'
import * as MUI from '@mui/material'
import * as ReactRouterDom from 'react-router-dom'
import { defaultProps, propTypes } from './types'

const Link = ({
  children, noRenderBox, variant, ...restProps
}) => (noRenderBox ? (
  <MUI.Link component={ReactRouterDom.Link} {...restProps}>
    <MUI.Typography variant={variant} component="span">{children}</MUI.Typography>
  </MUI.Link>
) : (
  <MUI.Box {...restProps}>
    <MUI.Link component={ReactRouterDom.Link} {...restProps}>
      <MUI.Typography variant={variant} component="span">{children}</MUI.Typography>
    </MUI.Link>
  </MUI.Box>
))

Link.propTypes = propTypes
Link.defaultProps = defaultProps

export default Link
