import PropTypes from 'prop-types'

export const propTypes = {
  showToggleSwitch: PropTypes.bool,
  maskingCharacter: PropTypes.string,
  meta: PropTypes.any,
}

export const defaultProps = {
  showToggleSwitch: true,
  maskingCharacter: '•',
  meta: {
    touched: false,
    invaild: false,
    error: false,
  },
}
