import PropTypes from 'prop-types'

export const propTypes = {
  item: PropTypes.any,
  onClickCB: PropTypes.func,
}

export const defaultProps = {
  item: {},
  onClickCB: () => null,
}
