import PropTypes from 'prop-types'

export const propTypes = {
  pageName: PropTypes.string.isRequired,
  headerTitle: PropTypes.string,
  headerSubtitle: PropTypes.string,
  headerSubtitleInfo: PropTypes.string,
  iconSource: PropTypes.string,
  components: PropTypes.object,
  fullHeight: PropTypes.bool,
}

export const defaultProps = {
  pageName: 'page-header',
}
