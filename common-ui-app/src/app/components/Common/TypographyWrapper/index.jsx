import React from 'react'
import { Skeleton, Typography } from '@mui/material'
import { defaultProps, propTypes } from './types'

const TypographyWrapper = ({
  children, loading, sxt, ...restProps
}) => (
  <Typography {...restProps}>
    {
      loading
        ? <Skeleton animation="wave" sx={(sxt || { width: '98%', margin: 'auto' })} />
        : children
    }
  </Typography>
)

TypographyWrapper.propTypes = propTypes
TypographyWrapper.defaultProps = defaultProps

export default TypographyWrapper
