import PropTypes from 'prop-types'

export const propTypes = {
  icon: PropTypes.string,
  description: PropTypes.string,
  submitButtonLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

export const defaultProps = {
  color: '',
}
