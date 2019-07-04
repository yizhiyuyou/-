import React from 'react'

import { useEchartWithOption } from '@/utils/use'

import styles from './index.module.less'

// 配置模板
function getOption(data = []) {
  const { xAxisData, seriesData } = data.reduce(
    ({ xAxisData, seriesData }, { value, name }) => ({
      xAxisData: [...xAxisData, name],
      seriesData: [...seriesData, value],
    }),
    {
      xAxisData: [],
      seriesData: [],
    }
  )

  return {
    tooltip: { trigger: 'axis' },
    legend: {
      show: false,
      itemWidth: 4,
      itemHeight: 18,
      textStyle: { color: '#666666', fontStyle: 15 },
      data: ['评价数量'],
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#d3d3d3',
        },
      },
      axisLabel: { color: '#999', fontSize: 14 },
      data: xAxisData,
    },
    yAxis: {
      name: '数量',
      nameTextStyle: { color: '#999' },
      splitLine: { show: false },
      axisLabel: { color: '#999' },
      axisLine: {
        lineStyle: {
          color: '#d3d3d3',
        },
      },
    },
    series: [
      {
        name: '评价数量',
        type: 'bar',
        itemStyle: {
          color: '#4c98e9',
          barBorderRadius: 2,
        },
        barWidth: 25,
        data: seriesData,
      },
    ],
  }
}

export default ({ data }) => {
  const { domRef } = useEchartWithOption(data, getOption)

  return <div ref={domRef} className={styles['chart']} />
}
