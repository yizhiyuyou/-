import React from 'react'

import { usePie } from '../index'

import styles from './index.module.less'

export default () => {
  const { domRef } = usePie()

  return <div ref={domRef} className={styles['chart']} />
}
