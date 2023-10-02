export const seriesCommonProps = {
  smooth: true,
  emphasis: {
    itemStyle: {
      shadowBlur: 5,
      shadowOffsetX: 0,
    },
  },
}
export const chartOptions = {
  tooltip: {
    trigger: 'axis',
    triggerOn: 'click',
  },
  color: [],
  grid: {
    left: '1rem',
    top: '2%',
    right: '1%',
    bottom: '1%',
    containLabel: true,
    show: true,
  },

  xAxis: {
    type: 'category',
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: {
      show: true,
    },
    axisLabel: {
      fontFamily: 'Poppins',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.33',
      letterSpacing: '0.4',
      margin: 20,
    },
  },
  yAxis: {
    type: 'value',
    splitNumber: 5,
    splitLine: {
      show: true,
    },
  },
}
