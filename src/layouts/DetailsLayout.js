import React from 'react'

import styles from './DetailsLayout.module.less'

export default ({ children }) => {
  return (
    <div className={styles.details}>
      <div className={styles['detail-header']}>
        <span>查看详情</span>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  )
}
