import React from 'react'

import classnames from 'classnames/bind'

import TopCard from './components/TopCard/index'
import ChartPerson from './components/ChartPerson/index'
import ChartCar from './components/ChartCar/index'

import styles from './index.module.less'

const cx = classnames.bind(styles)

const classNames = cx('m-t-10', 'f-g-1')

export default () => {
  return (
    <div className={styles.container}>
      <TopCard />
      <ChartPerson className={classNames} />
      <ChartCar className={classNames} />
    </div>
  )
}
