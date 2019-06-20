import React from 'react'

import ChartLine from '../Chart/ChartLine/index'
import ChartRing from '../Chart/ChartRing/index'
import TypeSelect from '../TypeSelect/index'

import styles from './index.module.less'

export default function({ value, onChange, dataLine, dataRing }) {
  return (
    <div className={styles['car-num']}>
      <TypeSelect value={value} onChange={onChange} className={styles.select} />
      <div className={styles.line}>
        <ChartLine data={dataLine} />
      </div>
      <div className={styles.ring}>
        <ChartRing data={dataRing} />
      </div>
    </div>
  )
}
