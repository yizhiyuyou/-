import React, { useEffect, useContext } from 'react'

import { useObserver } from 'mobx-react-lite'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import BaseInfo from './components/BaseInfo'
import DealResult from './components/DealResult'
import TimeLine from './components/TimeLine'

import styles from './index.module.less'

export default ({ match }) => {
  const store = useContext(StoreContext)

  const { setParams } = useFetch(store.EventDetailsStore.getBaseEventInfoById)

  useEffect(() => {
    setParams(match.params.id)
  }, [match.params.id])

  useEffect(() => {
    store.dicStore.getDictionaryByType('eventType')

    store.dicStore.getDictionaryByType('eventState')

    store.dicStore.getDictionaryByType('processType')
  }, [])

  return useObserver(() => {
    const { baseInfoCtd, processListCtd, stateCtd, timeUsage } = store.EventDetailsStore

    return (
      <div className={styles['event-details']}>
        <div className={styles.left}>
          <BaseInfo {...baseInfoCtd} />
          <div className={styles.result}>
            {processListCtd.map((item, index) => <DealResult key={index} {...item} />).reverse()}
          </div>
        </div>
        <div className={styles.right}>
          <TimeLine state={stateCtd} timeUsage={timeUsage} list={processListCtd} />
        </div>
      </div>
    )
  })
}
