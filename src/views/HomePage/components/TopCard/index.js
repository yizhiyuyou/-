import React, { useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { StoreContext } from '@/stores'

import { useFetch } from '@/utils/use'

import Card from '../Card/index'

import styles from './index.module.less'

export default () => {
  const { HomePageStore } = useContext(StoreContext)
  const { getTopData } = HomePageStore

  useEffect(() => {
    getTopData()
  }, [])

  return useObserver(() => {
    const { topData, isLoading } = HomePageStore

    return (
      <div className={styles['card-box']}>
        <div className={styles['card-item']}>
          <Card loading={isLoading} icon="carNum" title="车流量" count={topData.trafficCount} />
        </div>
        <div className={styles['card-item']}>
          <Card loading={isLoading} icon="personNum" title="客流量" count={topData.personCount} />
        </div>
        <div className={styles['card-item']}>
          <Card loading={isLoading} icon="saleNum" title="销售额" count={topData.salesVolume} />
        </div>
        <div className={styles['card-item']}>
          <Card loading={isLoading} icon="eventNum" title="事件上报数" count={topData.eventCount} />
        </div>
      </div>
    )
  })
}
