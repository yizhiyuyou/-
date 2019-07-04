import React from 'react'

import { Result, Button } from 'antd'

import styles from './index.module.less'

export default ({ history }) => {
  const RESULT_PROPS = {
    status: '404',
    title: '404',
    subTitle: '抱歉,你访问的页面不存在.',
    extra: (
      <Button type="primary" onClick={() => history.replace('/home/')}>
        回首页
      </Button>
    ),
  }

  return (
    <div className={styles.container}>
      <Result {...RESULT_PROPS} className={styles.result} />
    </div>
  )
}
