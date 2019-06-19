import React from 'react'

import { Skeleton } from 'antd'

import * as imgs from './imgs.js'

import styles from './index.module.less'

const paragraphProps = {
  rows: 2,
}

export default ({ loading, icon, src, title, count, skeleton }) => {
  return (
    <Skeleton
      loading={!loading}
      avatar={true}
      active={true}
      className={styles.skeleton}
      paragraph={paragraphProps}
      title={false}
      {...skeleton}
    >
      <div className={styles.card}>
        <img src={icon ? imgs[icon] : src} alt="图标" />
        <div className={styles.content}>
          <span>{title}</span>
          <span className={styles.count}>{count}</span>
        </div>
      </div>
    </Skeleton>
  )
}
