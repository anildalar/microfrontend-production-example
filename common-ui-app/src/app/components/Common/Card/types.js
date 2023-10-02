import PropTypes from 'prop-types'

export const propTypes = {
  cardData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
}

export const defaultProps = {}
