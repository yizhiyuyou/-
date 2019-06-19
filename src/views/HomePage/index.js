import React from 'react'

import Card from './components/Card/index'
import ChartPerson from './components/ChartPerson/index'

import styles from './index.module.less'

export default () => {
  return (
    <div className={styles.home}>
      <div className={styles['card-box']}>
        <div className={styles['card-item']}>
          <Card icon="carNum" title="车流量" count="10" />
        </div>
        <div className={styles['card-item']}>
          <Card icon="personNum" title="客流量" count="199" />
        </div>
        <div className={styles['card-item']}>
          <Card icon="saleNum" title="销售额" count="990" />
        </div>
        <div className={styles['card-item']}>
          <Card icon="eventNum" title="事件上报数" count="1200" />
        </div>
      </div>
      <ChartPerson />
    </div>
  )
}
