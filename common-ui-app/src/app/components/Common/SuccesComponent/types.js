import PropTypes from 'prop-types'

export const propTypes = {
  to: PropTypes.string,
  isAction: PropTypes.bool,
  dataTestId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
}

export const defaultProps = {
  dataTestId: 'test-success',
  pageId: 'test',
}
