import React from 'react'

import { useBar } from '../index'

import styles from './index.module.less'

export default () => {
  const { domRef } = useBar()

  return <div ref={domRef} className={styles['chart']} />
}
