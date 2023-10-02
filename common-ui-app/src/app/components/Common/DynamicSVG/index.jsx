import { Skeleton } from '@mui/material'
import React from 'react'
import SVG from 'react-inlinesvg'
import { defaultProps, propTypes } from './types'

const DynamicSVG = ({
  loading, small, path, ...restProps
}) => (loading
  ? (
    <Skeleton
      variant="circular"
      style={{
        margin: small ? 0 : 'auto',
        maxWidth: small ? 40 : 150,
        maxHeight: small ? 40 : 150,
        minWidth: small ? 40 : 140,
        minHeight: small ? 40 : 140,
      }}
    />
  )
  : <SVG role="presentation" src={(path?.indexOf('http') >= 0) ? path : `${window.location.origin}/${path}`} {...restProps} />)

DynamicSVG.propTypes = propTypes
DynamicSVG.defaultProps = defaultProps

export default DynamicSVG
