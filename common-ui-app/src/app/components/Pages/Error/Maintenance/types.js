import PropTypes from 'prop-types'

export const propTypes = {
  isInDev: PropTypes.bool,
  isInMaintenance: PropTypes.bool,
  isPageNotFound: PropTypes.bool,
  title: PropTypes.string,
}

export const defaultProps = {
  isInDev: false,
  isPageNotFound: false,
  isInMaintenance: false,
  title: '',
}
