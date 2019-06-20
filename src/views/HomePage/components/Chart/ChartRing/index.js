import React from 'react'

import { useRing } from '../index'

import styles from './index.module.less'

export default ({ data }) => {
  const { domRef } = useRing(data)

  return <div ref={domRef} className={styles['chart']} />
}
