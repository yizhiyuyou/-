import React, { useContext, useEffect, useRef } from 'react'

import { autorun } from 'mobx'

import { useObserver } from 'mobx-react-lite'

import { Table } from 'antd'

import echarts from 'echarts'

import { StoreContext } from '@/stores'

import WrappedSearchForm from './components/SearchForm'

import styles from './index.module.less'

import * as imgs from './imgs'

const columns = [
  {
    title: '类型',
    key: 'type',
    align: 'center',
    render(value, { consumeType, text }) {
      return (
        <div className={styles.type}>
          <img src={imgs[consumeType]} className={styles.icon} alt="类型图标" />
          <span>{text}</span>
        </div>
      )
    },
  },
  {
    title: '年月',
    align: 'center',
    dataIndex: 'yearAndMonth',
  },
  {
    title: '数值',
    align: 'center',
    key: 'num',
    render(value, { numColor, num }) {
      return <span style={{ color: numColor }}>{num}</span>
    },
  },
  {
    title: '填报时间',
    align: 'center',
    dataIndex: 'reportTime',
  },
]

function getOption(lineChart = []) {
  const { xAxisData, electricData, waterData } = lineChart.reduce(
    ({ xAxisData, electricData, waterData }, { month, water, electric }) => ({
      xAxisData: [...xAxisData, month],
      electricData: [...electricData, electric],
      waterData: [...waterData, water],
    }),
    { xAxisData: [], electricData: [], waterData: [] }
  )

  return {
    grid: { bottom: 50 },
    tooltip: {
      trigger: 'axis',
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
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
        name: '用电量(度)',
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
      {
        type: 'value',
        position: 'right',
        name: '用水量(吨)',
        nameLocation: 'end',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        nameTextStyle: {
          color: '#3890f2',
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
    ],
    legend: {
      top: 10,
      left: 'center',
      data: ['用电量', '用水量'],
    },
    series: [
      {
        name: '用电量',
        type: 'line',
        yAxisIndex: 0,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          color: '#ffac53',
          width: 4,
        },
        itemStyle: {
          color: '#ffac53',
        },
        data: electricData,
      },
      {
        name: '用水量',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          color: '#3890f2',
          width: 4,
        },
        itemStyle: {
          color: '#3890f2',
        },
        data: waterData,
      },
    ],
  }
}

function useEchart() {
  const domRef = useRef(null)

  const { energyAnalysisStore } = useContext(StoreContext)

  useEffect(() => {
    const myChart = echarts.init(domRef.current)

    window.addEventListener('resize', myChart.resize)

    const clean = autorun(() => {
      myChart.setOption(getOption(energyAnalysisStore.lineChart))
    })

    return () => {
      window.removeEventListener('resize', myChart.resize)

      myChart.dispose()

      clean()
    }
  }, [])

  return domRef
}

export default () => {
  const { energyAnalysisStore } = useContext(StoreContext)

  const { setSearch, getConsumeData } = energyAnalysisStore

  useEffect(() => {
    getConsumeData()
  }, [])

  const domRef = useEchart()

  return useObserver(() => (
    <div className={styles['energy-analysis']}>
      <WrappedSearchForm
        value={energyAnalysisStore.search}
        onChange={setSearch}
        onSubmit={getConsumeData}
      />
      <div className={styles.main}>
        <div className={styles.chart} ref={domRef} />
        <div className={styles.line} />
        <Table
          dataSource={energyAnalysisStore.maxMinData}
          columns={columns}
          pagination={false}
          className={styles.table}
          bordered={true}
          rowKey="text"
        />
      </div>
    </div>
  ))
}
