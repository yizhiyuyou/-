import React, { useContext } from 'react'

import { Redirect } from 'react-router-dom'

import { useObserver } from 'mobx-react-lite'

import { StoreContext } from '@/stores'

import context from '@/utils/MetaContext'

import PageLoading from '@/components/PageLoading'

import { USER_STATUS } from '@/const'

export const Authorized = props => {
  const store = useContext(StoreContext)

  return useObserver(() => {
    const { loginStatus, appLogin } = store.rootStore
    const meta = useContext(context)

    if (loginStatus === USER_STATUS.get('已登录').status) {
      const {
        match: { path },
      } = props

      if (!meta.hasRoute(path)) {
        return <Redirect to="/403" />
      }

      return props.children
    }

    if (loginStatus === USER_STATUS.get('已注销').status) {
      return <Redirect to="/login" />
    }

    if (loginStatus === USER_STATUS.get('未登录').status) {
      appLogin()
    }

    // 未登录 | 登陆中
    return <PageLoading />
  })
}

export function withAuthorized(WrappedComponent) {
  return props => <Authorized {...props} children={<WrappedComponent {...props} />} />
}

export default Authorized
