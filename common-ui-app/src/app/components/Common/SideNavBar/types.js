import PropTypes from 'prop-types'

export const propTypes = {
  isSideNavBarActivated: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  isOpen: PropTypes.bool,
}

export const defaultProps = {
  isSideNavBarActivated: false,
  toggleDrawer: () => null,
  isOpen: false,
}
