/* eslint-disable import/no-unresolved */
import React from 'react'
import { useTheme } from '@mui/material'
import DynamicSVG from '../../DynamicSVG'
import { defaultProps, propTypes } from './types'

const PrevArrow = React.memo((props) => {
  const { artifacts } = useTheme()

  return (
    <DynamicSVG
      {...props}
      path={artifacts?.appIcons?.navigation_arrow_back_icon?.url}
    />
  )
})

PrevArrow.propTypes = propTypes
PrevArrow.defaultProps = defaultProps
PrevArrow.displayName = 'PrevArrow'

export default PrevArrow
