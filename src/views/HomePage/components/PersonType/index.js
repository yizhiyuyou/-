import React from 'react'

import ChartPie from '../Chart/ChartPie/index'
import ChartBar from '../Chart/ChartBar/index'

import styles from './index.module.less'

export default function() {
  return (
    <div className={styles['person-type']}>
      <div className={styles.item}>
        <span className={styles.title}>年龄分布</span>
        <ChartBar />
      </div>
      <div className={styles.item}>
        <span className={styles.title}>男女比例</span>
        <ChartPie />
      </div>
    </div>
  )
}
