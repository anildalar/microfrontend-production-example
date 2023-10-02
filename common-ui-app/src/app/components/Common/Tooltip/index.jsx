import React, { useState } from 'react'
import { Tooltip as MUITooltip } from '@mui/material'

import { defaultProps, propTypes } from './types'

const Tooltip = React.memo(({
  message, children, Component, ...restProps
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const toggleTooltip = () => setShowTooltip(!showTooltip)

  return (
    <MUITooltip
      title={message}
      open={showTooltip}
      leaveDelay={2000}
      onOpen={() => setShowTooltip(true)}
      onClose={() => setShowTooltip(false)}
      data-testid="tooltip-icon"
      {...restProps}
    >
      <Component onClick={toggleTooltip}>
        {children}
      </Component>
    </MUITooltip>
  )
})

Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps
Tooltip.displayName = 'Tooltip'
export default Tooltip
