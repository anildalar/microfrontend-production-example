import PropTypes from 'prop-types'

const OptionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}).isRequired

export const propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(OptionShape).isRequired,
}

export const defaultProps = {
}
