import React from 'react'

import styles from './HeaderTitle.module.less'

export default ({ color = '#ec703a', title }) => {
  return (
    <div className={styles['header-title']} style={{ color }}>
      <span className={styles['icon']} style={{ backgroundColor: color }} />
      <span>{title}</span>
    </div>
  )
}
