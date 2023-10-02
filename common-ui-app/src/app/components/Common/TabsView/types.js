import PropTypes from 'prop-types'

export const propTypes = {
  items: PropTypes.shape({}),
  activeTabIndex: PropTypes.number,
  variant: PropTypes.string,
  centered: PropTypes.bool,
}

export const defaultProps = {
  activeTabIndex: 0,
}
