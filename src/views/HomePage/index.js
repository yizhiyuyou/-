import React from 'react'

import classnames from 'classnames/bind'

import TopCard from './components/TopCard/index'
import ChartPerson from './components/ChartPerson/index'
import ChartCar from './components/ChartCar/index'

import styles from './index.module.less'

const cx = classnames.bind(styles)

export default () => {
  return (
    <div className={styles.home}>
      <TopCard />
      <ChartPerson className={styles['m-t-10']} />
      <ChartCar className={cx('m-t-10', 'm-b-10')} />
    </div>
  )
}
