import PropTypes from 'prop-types'

export const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  selectedCountryCode: PropTypes.any,
  dataTestId: PropTypes.string.isRequired,
}
export const defaultProps = {
  selectedCountryCode: '',
  label: '',
  placeholder: '',
}
