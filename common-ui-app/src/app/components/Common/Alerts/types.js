import PropTypes from 'prop-types'

export const propTypes = {
  errorCode: PropTypes.string,
  display: PropTypes.bool,
  message: PropTypes.any,
  severity: PropTypes.string,
}

export const defaultProps = {
  errorCode: '',
  display: false,
  message: '',
  severity: '',
}
