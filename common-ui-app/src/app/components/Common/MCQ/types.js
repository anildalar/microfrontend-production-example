import PropTypes from 'prop-types'

const OptionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}).isRequired

export const propTypes = {
  label: PropTypes.element,
  componentProps: PropTypes.object,
  options: PropTypes.arrayOf(OptionShape).isRequired,
}

export const defaultProps = {
}
