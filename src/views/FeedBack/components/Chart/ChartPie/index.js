import React from 'react'

import { useEchartWithOption } from '@/utils/use'

import styles from './index.module.less'

// 配置模板
function getOption(data = []) {
  return {
    color: ['#e64a19', '#ff5a00', '#ff7300', '#fb982b', '#ffc66c'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {d}%',
    },
    legend: {
      show: true,
      orient: 'vertical',
      itemWidth: 14,
      itemHeight: 12,
      data: data.map(({ name }) => name),
      top: '10%',
      left: '70%',
      itemGap: 30,
    },
    series: [
      {
        name: '评价数量比例',
        startAngle: 135,
        type: 'pie',
        radius: '55%',
        center: ['34%', '50%'],
        data,
        label: {
          show: false,
          position: 'inside',
          formatter: '{d}%',
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
}

export default ({ data }) => {
  const { domRef } = useEchartWithOption(data, getOption)

  return <div ref={domRef} className={styles['chart']} />
}
