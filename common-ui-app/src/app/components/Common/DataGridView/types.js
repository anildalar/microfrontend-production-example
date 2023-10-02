import PropTypes from 'prop-types'

export const propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  actionClick: PropTypes.any,
}

export const defaultProps = {
  actionClick: null,
}

export const propTypesNoRow = {
  icon: PropTypes.any,
  text: PropTypes.string,
}

export const defaultPropsNoRow = {
  icon: null,
  text: '',
}
