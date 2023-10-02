import PropTypes from 'prop-types'

export const propTypes = {
  itemLeft: PropTypes.any,
  itemRight: PropTypes.any,
  containerSX: PropTypes.any,
  itemSX: PropTypes.any,
  disableMobile: PropTypes.bool,
}

export const defaultProps = {
  itemLeft: null,
  itemRight: null,
  containerSX: {},
  itemSX: {},
  disableMobile: false,
}
