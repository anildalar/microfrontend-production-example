import PropTypes from 'prop-types'

const OptionShape = PropTypes.shape({
  country: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
}).isRequired

export const propTypes = {
  option: OptionShape,
  restProps: PropTypes.any,
}

export const defaultProps = {}
