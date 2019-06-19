import React, { useContext, useCallback } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Radio } from 'antd'

import { StoreContext } from '@/stores'

import ChartLineWithSelect from '../Chart/ChartLineWithSelect/index'

import { PERSON_LIST } from '@/views/HomePage/const'

import styles from './index.module.less'

export default () => {
  const { HomePageStore } = useContext(StoreContext)
  const { changeActiveByPersonType, changeTimeType } = HomePageStore

  const handleChange = useCallback(e => {
    changeActiveByPersonType(e.target.value)
  }, [])

  return useObserver(() => {
    const [value] = [...HomePageStore.personSelect].find(([key, { active }]) => active)

    return (
      <div className={styles['chart-person']}>
        <Radio.Group value={value} onChange={handleChange} buttonStyle="solid">
          {PERSON_LIST.map(value => (
            <Radio.Button key={value} value={value}>
              {value}
            </Radio.Button>
          ))}
        </Radio.Group>
        <div className={styles.main}>
          {HomePageStore.personSelect.get('客流类型').active ? (
            <div>客流类型</div>
          ) : (
            <ChartLineWithSelect
              value={HomePageStore.personSelect.get('客流量趋势').timeType}
              onChange={changeTimeType}
            />
          )}
        </div>
      </div>
    )
  })
}
