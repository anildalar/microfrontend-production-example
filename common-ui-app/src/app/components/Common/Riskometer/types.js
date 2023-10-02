import PropTypes from 'prop-types'

export const propTypes = {
  riskLevel: PropTypes.number,
  riskConfig: PropTypes.object,
  hideScore: PropTypes.bool,
  hideRangeText: PropTypes.bool,
  renderInfo: PropTypes.node,
}

export const defaultProps = {
  riskLevel: 0,
  riskConfig: {
    lowerRiskLimit: 300,
    upperRiskLimit: 850,
    maxAngle: 180,
  },
  hideScore: false,
  hideRangeText: false,
}
