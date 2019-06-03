import React, { Suspense, useEffect, useState } from 'react'
import { Spin } from 'antd'

export const Loading = props => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin {...props} />
  </div>
)

const DefaultLoading = props => {
  const [tip, setTip] = useState(props.tip || '加载中...')

  const { delay, delayTip, ...rest } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      setTip(delayTip || '数据过多，正在火速处理中...')
    }, delay || 2000)

    return () => clearTimeout(timer)
  })

  return <Loading {...rest} tip={tip} />
}

export default DefaultLoading

export function withWaiting(WrappedComponent, fallback = <DefaultLoading />) {
  return props => <Suspense fallback={fallback} children={<WrappedComponent {...props} />} />
}
