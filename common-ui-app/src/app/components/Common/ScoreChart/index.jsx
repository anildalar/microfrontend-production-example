import React, { useState, useRef, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import useResizeObserver from 'use-resize-observer'
import {
  FormControlLabel, Checkbox, Grid, useTheme, Button,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { propTypes, defaultProps } from './types'
import { prepareOptions } from './utils'
import DynamicSVG from '../DynamicSVG'

const ScoreChart = (props) => {
  const {
    loading, toolbox, onZoomIn, onZoomOut, ...chartProps
  } = props
  const [selected, setSelected] = useState([])
  const { ref, width = 1 } = useResizeObserver()
  const checkboxsRef = useRef(false)
  const { artifacts } = useTheme()
  const { t } = useTranslation()

  const handleSelect = ({ target }) => {
    const { checked, value } = target
    const opts = new Set(selected)
    if (!checked && opts.size === 1) {
      return
    }
    if (!checked) {
      opts.delete(value)
    }
    if (checked) {
      opts.add(value)
    }
    setSelected([...opts])
  }
  useEffect(() => {
    if (chartProps?.series?.length && !checkboxsRef.current) {
      setSelected(chartProps?.series?.map((el) => el?.name?.toLowerCase()))
      checkboxsRef.current = true
    }
  }, [chartProps?.series])

  const options = prepareOptions(chartProps, selected, width, toolbox)

  return (
    <Grid container ref={ref} direction="column">
      <Grid container mb={3}>
        <Grid item md={7} xs={12}>
          <Grid container flexWrap="nowrap" gap={2}>
            {toolbox?.checkboxs && chartProps?.series?.map((el) => (
              <Grid key={el?.name?.toLowerCase()} container flexDirection="column" flexBasis="10%" alignItems="center">
                <FormControlLabel
                  control={<Checkbox inputProps={{ 'data-testid': `graph_series_checkbox_${el?.name?.toLowerCase()}` }} />}
                  label={el?.name}
                  value={el?.name?.toLowerCase()}
                  onChange={handleSelect}
                  checked={selected?.includes(el?.name?.toLowerCase())}
                  data-testid={`graph_series_checkbox_label_${el?.name?.toLowerCase()}`}
                />
                <DynamicSVG path={artifacts?.appIcons?.[`${el?.name?.toLowerCase()}_line`]?.url} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item md={5} xs={12} alignItems="flex-end">
          {toolbox?.zoomable && (
          <Grid container justifyContent="end">
            <Button
              size="medium"
              variant="text"
              color="primary"
              onClick={onZoomIn}
              data-testid="graph_zoom_in"
              endIcon={<DynamicSVG path={artifacts?.appIcons?.zoom_in_icon?.url} />}
            >
              {t('creditCenter.zoom_in')}
            </Button>
            <Button
              size="medium"
              variant="text"
              onClick={onZoomOut}
              data-testid="graph_zoom_out"
              endIcon={<DynamicSVG path={artifacts?.appIcons?.zoom_out_icon?.url} />}
            >
              {t('creditCenter.zoom_out')}
            </Button>
          </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item mb={5} md={12} xs={12}>
        <ReactEcharts
          notMerge
          lazyUpdate
          option={options}
          showLoading={loading}
          autoResize
          style={{ width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </Grid>
    </Grid>
  )
}
ScoreChart.propTypes = propTypes
ScoreChart.defaultProps = defaultProps
ScoreChart.displayName = 'ScoreChart'

export default ScoreChart
