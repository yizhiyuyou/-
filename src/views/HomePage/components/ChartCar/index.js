import React, { useContext, useCallback, useEffect } from 'react'

import { autorun } from 'mobx'

import { useObserver } from 'mobx-react-lite'

import { Radio } from 'antd'

import classnames from 'classnames'

import { StoreContext } from '@/stores'

import ChartLineWithSelect from '../Chart/ChartLineWithSelect/index'
import CarNum from '../CarNum/index'

import { CAR_LIST } from '@/views/HomePage/const'

import styles from './index.module.less'

export default ({ className }) => {
  const { HomePageStore } = useContext(StoreContext)
  const { changeActiveByCarType, changeCarTimeType, getCarData, getCarTypeData } = HomePageStore

  const handleChange = useCallback(e => {
    changeActiveByCarType(e.target.value)
  }, [])

  useEffect(() => {
    const clean = autorun(() => {
      const { carSelect } = HomePageStore

      if (carSelect.get('车流量').active) {
        getCarData()
      } else if (carSelect.get('车型数量').active) {
        getCarTypeData()
      }
    })

    return clean
  }, [])

  return useObserver(() => {
    const [value] = [...HomePageStore.carSelect].find(([key, { active }]) => active)

    return (
      <div className={classnames(className, styles['chart-person'])}>
        <Radio.Group value={value} onChange={handleChange} buttonStyle="solid">
          {CAR_LIST.map(value => (
            <Radio.Button key={value} value={value}>
              {value}
            </Radio.Button>
          ))}
        </Radio.Group>
        <div className={styles.main}>
          {HomePageStore.carSelect.get('车流量').active ? (
            <ChartLineWithSelect
              value={HomePageStore.carSelect.get('车流量').timeType}
              onChange={changeCarTimeType}
              data={HomePageStore.carFlow}
            />
          ) : (
            <CarNum
              value={HomePageStore.carSelect.get('车型数量').timeType}
              onChange={changeCarTimeType}
              dataLine={HomePageStore.carNumLine}
              dataRing={HomePageStore.carNumRing}
            />
          )}
        </div>
      </div>
    )
  })
}
