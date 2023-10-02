import PropTypes from 'prop-types'

export const propTypes = {
  isSideNavBarActivated: PropTypes.bool,
  hamburgerCallBack: PropTypes.func,
  isOpen: PropTypes.bool,
}

export const defaultProps = {
  isSideNavBarActivated: false,
  hamburgerCallBack: () => null,
  isOpen: false,
}
