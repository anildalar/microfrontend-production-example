import PropTypes from 'prop-types'

export const propTypes = {
  stepLabels: PropTypes.array,
  activeStep: PropTypes.number,
}

export const defaultProps = {
  stepLabels: [],
  activeStep: 0,
}
