import React from 'react'
import { Typography } from '@mui/material'
import { EmptyGridContainer } from '../../../styles/styles'
import { defaultProps, propTypes } from './types'

const NoDataAvailable = ({ content }) => (
  <EmptyGridContainer>
    <Typography>{ content || '' }</Typography>
  </EmptyGridContainer>
)

NoDataAvailable.propTypes = propTypes
NoDataAvailable.defaultProps = defaultProps

export default NoDataAvailable
