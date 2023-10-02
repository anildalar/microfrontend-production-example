import React from 'react'
import { styles } from 'tenerity-ui-toolkit'

import { defaultProps, propTypes } from './types'

const { CreditSlider } = styles

function valuetext(value) {
  return `${value}%`
}

const SimulatorSlider = React.memo(({ dataTestId, defaultValue, range }) => (
  <CreditSlider
    data-testid={dataTestId}
    defaultValue={defaultValue}
    getAriaValueText={valuetext}
    marks={range}
    valueLabelDisplay="on"
    valueLabelFormat={valuetext}
  />
))

SimulatorSlider.displayName = 'SimulatorSlider'
SimulatorSlider.propTypes = propTypes
SimulatorSlider.defaultProps = defaultProps

export default SimulatorSlider
