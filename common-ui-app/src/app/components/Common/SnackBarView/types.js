import PropTypes from 'prop-types'

export const propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  code: PropTypes.any,
  display: PropTypes.bool,
  message: PropTypes.any,
  severity: PropTypes.string,
  'data-testid': PropTypes.string,
}

export const defaultProps = {
  isVisible: false,
  onClose: () => null,
  code: null,
  display: false,
  message: '',
  severity: 'success',
  'data-testid': 'test',
}
