import PropTypes from 'prop-types'

export const propTypes = {
  meta: PropTypes.any,
}

export const defaultProps = {
  meta: {
    dirty: false,
    invaild: false,
    error: false,
  },
}
