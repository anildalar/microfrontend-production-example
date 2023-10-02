import React from 'react'
import { Skeleton, Grid } from '@mui/material'
import { defaultProps, propTypes } from './types'

const GridWrapper = ({
  children, loading, sxt, sx = {}, ...restProps
}) => (
  <Grid sx={(loading ? sxt : sx)} {...restProps}>
    {
      loading
        ? <Skeleton animation="wave" />
        : children
    }
  </Grid>
)

GridWrapper.propTypes = propTypes
GridWrapper.defaultProps = defaultProps

export default GridWrapper
