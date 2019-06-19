import React from 'react'

import { useLine } from '../index'

import styles from './index.module.less'

export default () => {
  const { domRef } = useLine({})

  return <div ref={domRef} className={styles['chart-line']} />
}
