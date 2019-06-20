import React from 'react'

import classnames from 'classnames'

import { TIME_LIST } from '@/views/HomePage/const'

import styles from './index.module.less'

const list = [...TIME_LIST].map(([text, { value }]) => ({ value, text }))

export default ({ value, onChange, className }) => {
  return (
    <div className={classnames(className, styles.select)}>
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
  )
}
