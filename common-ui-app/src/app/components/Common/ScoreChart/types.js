import PropTypes from 'prop-types'
import { formatTooltip } from './utils'

export const propTypes = {
  series: PropTypes.array.isRequired,
  xLabels: PropTypes.array.isRequired,
  chartType: PropTypes.string,
  iconType: PropTypes.oneOf(['url', 'sign']),
  symbolSize: PropTypes.number,
  symbolIcons: PropTypes.object,
  dataMin: PropTypes.number,
  dataMax: PropTypes.number,
  seriesColors: PropTypes.object.isRequired,
  toolTipFormatter: PropTypes.func,
  onZoomOut: PropTypes.func,
  onZoomIn: PropTypes.func,
  loading: PropTypes.bool,
  showXLine: PropTypes.bool,
  showYLine: PropTypes.bool,
  toolbox: PropTypes.object,
  disabledColor: PropTypes.string,
  tooltipTriggerOn: PropTypes.oneOf(['click', 'mousemove']),
}

export const defaultProps = {
  chartType: 'line',
  iconType: 'sign',
  symbolSize: 10,
  dataMin: 300,
  dataMax: 850,
  toolTipFormatter: formatTooltip,
  symbolIcons: {},
  loading: false,
  onZoomOut: () => { },
  onZoomIn: () => { },
  showXLine: true,
  showYLine: true,
  tooltipTriggerOn: 'mousemove',
  disabledColor: '#ccc',
  toolbox: {
    checkboxs: true,
    zoomable: true,
  },
}
