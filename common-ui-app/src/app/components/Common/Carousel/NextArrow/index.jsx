import React from 'react'
import { useTheme } from '@mui/material'
import DynamicSVG from '../../DynamicSVG'
import { defaultProps, propTypes } from './types'

const NextArrow = React.memo((props) => {
  const { artifacts } = useTheme()

  return (
    <DynamicSVG
      {...props}
      path={artifacts?.appIcons?.navigation_arrow_forward_icon?.url}
    />
  )
})

NextArrow.propTypes = propTypes
NextArrow.defaultProps = defaultProps
NextArrow.displayName = 'NextArrow'

export default NextArrow
