import PropTypes from 'prop-types'

export const propTypes = {
  showToggleSwitch: PropTypes.bool,
  meta: PropTypes.any,
}

export const defaultProps = {
  showToggleSwitch: true,
  meta: {
    touched: false,
    invaild: false,
    error: false,
  },
}
