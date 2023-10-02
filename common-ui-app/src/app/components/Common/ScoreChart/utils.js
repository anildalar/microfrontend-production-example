/* eslint-disable no-unused-vars */
import { seriesCommonProps, chartOptions } from './constants'

export const formatTooltip = (sData, selected) => {
  const selectedNode = new Set(selected)
  const [experian, transUnion, equifax] = sData
  const title = experian?.axisValueLabel
    || transUnion?.axisValueLabel
    || equifax?.axisValueLabel
    || 'Values'

  return `<div><p style="margin:0;margin-bottom :1px; text-align:left">${title}</p><div>${experian && selectedNode.has(experian?.seriesName?.toLowerCase()) ? `<p style="margin:0;margin-bottom:1px;text-align:left"><strong style="margin:0;margin-right:24px;">${experian?.seriesName}</strong>${experian?.value}</p>` : ''} ${transUnion && selectedNode.has(transUnion?.seriesName?.toLowerCase()) ? `<p style="margin:0;margin-bottom:1px;text-align:left"><strong style="margin:0;margin-right:3px;">${transUnion?.seriesName}</strong> ${transUnion?.value} </p>` : ''}${equifax && selectedNode.has(equifax?.seriesName?.toLowerCase()) ? `<p style="margin:0;margin-bottom :1px;text-align:left"><strong style="margin:0; margin-right:23px;">${equifax?.seriesName}</strong>${equifax?.value}</p>` : ''}</div></div>`
}

export const prepareOptions = (
  {
    series,
    xLabels,
    chartType,
    symbolSize,
    symbolIcons,
    iconType,
    dataMin,
    dataMax,
    seriesColors,
    toolTipFormatter,
    showXLine,
    showYLine,
    tooltipTriggerOn,
    disabledColor,
  },
  selected,
  containerWidth,
  tools = {},
) => {
  const chartConfig = structuredClone(chartOptions)
  const lineColors = Object.keys(seriesColors)
    .map((el) => (selected?.includes(el) ? seriesColors[el] : disabledColor))
  const seriesData = series?.map((el) => {
    let icon = symbolIcons?.[el?.name?.toLowerCase()] || 'circle'
    if (tools?.checkboxs) {
      const status = selected?.includes(el?.name?.toLowerCase()) ? 'active' : 'disabled'
      icon = symbolIcons?.[status]?.[el?.name?.toLowerCase()] || 'circle'
    }
    const iconPath = iconType === 'sign' ? icon : `image://${icon}`
    return {
      type: chartType,
      symbolSize,
      symbol: iconPath,
      ...el,
      ...seriesCommonProps,
    }
  })
  chartConfig.color = lineColors
  chartConfig.series = seriesData
  chartConfig.xAxis.data = xLabels
  chartConfig.xAxis.splitLine = {
    show: showXLine,
  }
  chartConfig.yAxis.splitLine = {
    show: showYLine,
  }
  chartConfig.yAxis.min = dataMin
  chartConfig.yAxis.max = dataMax
  chartConfig.xAxis.axisLabel = {
    ...chartConfig.xAxis.axisLabel,
    interval: 0,
    rotate: containerWidth > 450 ? 0 : -90,
  }
  chartConfig.tooltip.formatter = (params) => toolTipFormatter(params, selected)
  chartConfig.tooltip.triggerOn = tooltipTriggerOn
  return chartConfig
}
