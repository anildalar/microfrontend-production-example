import PropTypes from 'prop-types'

export const propTypes = {
  meta: PropTypes.any,
  options: PropTypes.array,
  renderOption: PropTypes.func,
  getOptionLabel: PropTypes.func,
  filterOptions: PropTypes.func,
}

export const defaultProps = {
  meta: {
    touched: false,
    invaild: false,
    error: false,
  },
  options: [
    { country: 'uk', code: '+44' },
  ],
}
