import React from 'react'

import { useLine } from '../index'

import TypeSelet from '../../TypeSelect'

import styles from './index.module.less'

export default ({ data, value, onChange }) => {
  const { domRef } = useLine(data)

  return (
    <div className={styles['chart-line-select']}>
      <div ref={domRef} className={styles['chart-container']} />
      <TypeSelet value={value} onChange={onChange} className={styles.select} />
    </div>
  )
}
