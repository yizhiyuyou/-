import { useEffect, useRef } from 'react'

import echarts from 'echarts'

export function useEchart() {
  const myChartRef = useRef(null)
  const domRef = useRef(null)

  useEffect(() => {
    const myChart = echarts.init(domRef.current)

    myChartRef.current = myChart

    return () => {
      window.removeEventListener('resize', myChart.resize)

      myChart.dispose()
    }
  }, [])

  return { domRef, myChartRef }
}

export function useLine({ data, xAxisName }) {
  const { domRef, myChartRef } = useEchart()

  useEffect(() => {
    myChartRef.current.setOption(getOption(data, xAxisName))
  }, [data, xAxisName])

  return { domRef, myChartRef }
}

export function getOption() {
  return {
    tooltip: { trigger: 'axis' },
    legend: {
      top: 0,
      left: 110,
      data: ['进客人数', '离客人数'],
    },
    xAxis: {
      data: [
        '0:00',
        '1:00',
        '2:00',
        '3:00',
        '4:00',
        '5:00',
        '6:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ],
      axisLine: {
        lineStyle: {
          color: '#999',
        },
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        show: true,
      },
      axisLabel: {
        rotate: 0,
      },
    },
    yAxis: {
      type: 'value',
      position: 'left',
      name: '人数',
      nameLocation: 'end',
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      nameTextStyle: {
        color: '#ffac53',
        fontSize: 14,
        fontWeight: 'bold',
        align: 'left',
      },
      axisLine: {
        lineStyle: {
          color: '#999',
        },
      },
    },
    series: [
      {
        data: [
          75,
          73,
          60,
          65,
          80,
          81,
          120,
          128,
          225,
          231,
          345,
          355,
          561,
          545,
          610,
          625,
          340,
          319,
          260,
          225,
          190,
          121,
          60,
          55,
        ],
        name: '进客人数',
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          color: '#ffac53',
          width: 4,
        },
        itemStyle: {
          color: '#ffac53',
        },
      },
      {
        data: [
          55,
          52,
          80,
          80,
          79,
          79,
          109,
          102,
          155,
          133,
          225,
          241,
          390,
          352,
          650,
          618,
          310,
          310,
          280,
          220,
          120,
          116,
          60,
          47,
        ],
        name: '离客人数',
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          color: '#3890f2',
          width: 4,
        },
        itemStyle: {
          color: '#3890f2',
        },
      },
    ],
  }
}
