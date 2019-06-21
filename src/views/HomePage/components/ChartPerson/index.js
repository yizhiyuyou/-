import React, { useContext, useCallback, useEffect } from 'react'

import { autorun } from 'mobx'

import { useObserver } from 'mobx-react-lite'

import { Radio } from 'antd'

import classnames from 'classnames'

import { StoreContext } from '@/stores'

import ChartLineWithSelect from '../Chart/ChartLineWithSelect/index'
import PersonType from '../PersonType/index'

import { PERSON_LIST } from '@/views/HomePage/const'

import styles from './index.module.less'

export default ({ className }) => {
  const { HomePageStore } = useContext(StoreContext)
  const { changeActiveByPersonType, changePersonTimeType, getPersonData } = HomePageStore

  const handleChange = useCallback(e => {
    changeActiveByPersonType(e.target.value)
  }, [])

  useEffect(() => {
    const clean = autorun(() => {
      const { personSelect } = HomePageStore

      personSelect.get('客流量趋势').active && getPersonData()
    })

    return clean
  }, [])

  return useObserver(() => {
    const [value] = [...HomePageStore.personSelect].find(([key, { active }]) => active)

    return (
      <div className={classnames(className, styles['chart-person'])}>
        <Radio.Group value={value} onChange={handleChange} buttonStyle="solid">
          {PERSON_LIST.map(value => (
            <Radio.Button key={value} value={value}>
              {value}
            </Radio.Button>
          ))}
        </Radio.Group>
        <div className={styles.main}>
          {HomePageStore.personSelect.get('客流类型').active ? (
            <PersonType />
          ) : (
            <ChartLineWithSelect
              value={HomePageStore.personSelect.get('客流量趋势').timeType}
              onChange={changePersonTimeType}
              data={HomePageStore.passengerFlowTrend}
            />
          )}
        </div>
      </div>
    )
  })
}
