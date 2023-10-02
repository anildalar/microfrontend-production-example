import PropTypes from 'prop-types'

export const propTypes = {
  data: PropTypes.object,
}

export const defaultProps = {
  data: {},
}

export const propTypesActions = {
  deleteRow: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
}
