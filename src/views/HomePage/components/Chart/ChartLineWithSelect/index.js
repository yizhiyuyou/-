import React from 'react'

import classnames from 'classnames'

import { TIME_LIST } from '@/views/HomePage/const'

import { useLine } from '../index'

import styles from './index.module.less'

const list = [...TIME_LIST].map(([text, { value }]) => ({ value, text }))

export default ({ data, xAxisName, value, onChange }) => {
  const { domRef } = useLine({ data, xAxisName })

  return (
    <div className={styles['chart-line-select']}>
      <div ref={domRef} className={styles['chart-container']} />
      <div className={styles.select}>
        {list.map(({ text, value: val }) => (
          <span
            key={val}
            onClick={() => onChange(val)}
            className={classnames(val === value && styles.active)}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
