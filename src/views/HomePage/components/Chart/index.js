import { useEffect, useRef } from 'react'

import echarts from 'echarts'

import { debounce } from '@/utils/objectUtil'

function useEchart() {
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

function getLineOption({ xAxisData, yAxisName, series: [first, secode], axisLabelRotate }) {
  return {
    tooltip: { trigger: 'axis' },
    legend: {
      top: 0,
      left: 110,
    },
    xAxis: {
      data: xAxisData,
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
        rotate: axisLabelRotate,
      },
    },
    yAxis: {
      type: 'value',
      position: 'left',
      name: yAxisName,
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
        data: first.data,
        name: first.name,
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
        data: secode.data,
        name: secode.name,
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

export function useEchartWithOption(data, getOption, type) {
  const { domRef, myChartRef } = useEchart()

  const setOptionWithDebounceRef = useRef(null)

  useEffect(() => {
    setOptionWithDebounceRef.current = debounce((...rest) => {
      const { current: myChart } = myChartRef

      myChart.isDisposed() || myChart.setOption(...rest)
    })
  }, [])

  useEffect(() => {
    setOptionWithDebounceRef.current(getOption(data))
  }, [data, getOption])

  return { domRef, myChartRef }
}

// 男女比例饼图-配置模板
function getSexPieOption() {
  return {
    color: ['#ff7426', '#529efb'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {d}%',
      // formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      show: true,
      orient: 'vertical',
      itemWidth: 18,
      itemHeight: 35,
      data: [
        {
          name: '男',
          icon: 'image://https://fuwuqu.trial.hndfsj.net/static/img/man.png',
        },
        {
          name: '女',
          icon: 'image://https://fuwuqu.trial.hndfsj.net/static/img/woman.png',
        },
      ],
      top: '35%',
      left: '70%',
      itemGap: 30,
    },
    series: [
      {
        name: '男女比例',
        startAngle: 135,
        type: 'pie',
        radius: '55%',
        center: ['34%', '50%'],
        data: [{ value: 310, name: '女' }, { value: 690, name: '男' }],
        label: {
          show: true,
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

export function useLine(data) {
  return useEchartWithOption(data, getLineOption, 'line')
}

export function usePie(data) {
  return useEchartWithOption(data, getSexPieOption)
}

// 年龄分柱状图-布配置模板
function getAgeBarOption() {
  return {
    tooltip: { trigger: 'axis' },
    legend: {
      show: false,
      itemWidth: 4,
      itemHeight: 18,
      textStyle: { color: '#666666', fontStyle: 15 },
      data: ['年龄分布'],
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#d3d3d3',
        },
      },
      axisLabel: { color: '#999', fontSize: 14 },
      data: ['19岁以下', '20-29岁', '30-39岁', '40-49岁', '50-59岁', '60岁以上'],
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
        name: '年龄分布',
        type: 'bar',
        itemStyle: {
          color: '#4c98e9',
          barBorderRadius: 2,
        },
        barWidth: 25,
        data: [342, 616, 2741, 2055, 753, 364],
      },
    ],
  }
}

export function useBar(data) {
  return useEchartWithOption(data, getAgeBarOption)
}

// 客车货车比例
function getCarRingOption({ title, series }) {
  console.log(123123, title)
  return {
    title: {
      text: title,
      top: '36%',
      left: '42%',
      textStyle: {
        color: '#666',
        fontSize: 18,
      },
    },
    color: ['#529efb', '#ff7426'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {d}%',
    },
    legend: {
      bottom: 50,
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '55%'],
        center: ['50%', '40%'],
        label: {
          formatter: '{b} : {d}%',
        },
        labelLine: {
          length: 8,
          length2: 8,
        },
        data: series,
      },
    ],
  }
}

export function useRing(data) {
  return useEchartWithOption(data, getCarRingOption)
}
