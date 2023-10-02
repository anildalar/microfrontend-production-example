import PropTypes from 'prop-types'

export const propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  ariaDescribedby: PropTypes.string,
  ariaLabelBy: PropTypes.string,
}

export const defaultProps = {
  handleClose: () => null,
  open: false,
  ariaDescribedby: '',
  ariaLabelBy: '',
}
