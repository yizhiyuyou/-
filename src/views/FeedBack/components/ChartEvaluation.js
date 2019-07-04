import React, { useContext } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Spin } from 'antd'

import classnames from 'classnames'

import { StoreContext } from '@/stores'

import ChartBar from './Chart/ChartBar'
import ChartPie from './Chart/ChartPie'

import styles from './ChartEvaluation.module.less'

function withSpin(WarpComponent) {
  return ({ isLoading, title, ...rest }) => (
    <Spin wrapperClassName={classnames(styles.item)} spinning={isLoading}>
      <span className={styles.title}>{title}</span>
      <WarpComponent {...rest} />
    </Spin>
  )
}

const WarpSpinChartBar = withSpin(ChartBar)
const WarpSpinChartPie = withSpin(ChartPie)

export default ({ className }) => {
  const { FeedBackStore } = useContext(StoreContext)

  return useObserver(() => (
    <div className={classnames(className, styles.container)}>
      <WarpSpinChartBar
        title="评价数量"
        isLoading={FeedBackStore.isLoadingByChart}
        data={FeedBackStore.chartList}
      />
      <WarpSpinChartPie
        title="评价比例"
        isLoading={FeedBackStore.isLoadingByChart}
        data={FeedBackStore.chartList}
      />
    </div>
  ))
}
