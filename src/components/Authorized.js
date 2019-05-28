import React, { useContext } from 'react'

import { Redirect } from 'react-router-dom'

import { useObserver } from 'mobx-react-lite'

import { StoreContext } from '@/stores'

import PageLoading from '@/components/PageLoading'

import { USER_STATUS } from '@/const'

export const Authorized = props => {
  const store = useContext(StoreContext)

  return useObserver(() => {
    const { loginStatus, appLogin } = store.rootStore

    if (loginStatus === USER_STATUS.get('已登录').status) {
      return props.children
    }

    if (loginStatus === USER_STATUS.get('已注销').status) {
      return <Redirect to="/login" />
    }

    if (loginStatus === USER_STATUS.get('未登录').status) {
      appLogin()
    }

    return <PageLoading />
  })
}

export default Authorized
