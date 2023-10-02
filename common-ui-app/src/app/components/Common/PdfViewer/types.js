import PropTypes from 'prop-types'

export const propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isLargeScreen: PropTypes.bool,
}

export const defaultProps = {
  isLargeScreen: false,
}
