import React from 'react'

import { configure } from 'mobx'

import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import moment from 'moment'
import 'moment/locale/zh-cn'

import RouterCofig from './router'

import './App.css'

import { StoreContext, stores } from '@/stores'

moment.locale('zh-cn')

configure({ enforceActions: 'observed' })

const GlobalProvider = props => {
  return (
    <LocaleProvider locale={zh_CN}>
      <StoreContext.Provider value={stores}>{props.children}</StoreContext.Provider>
    </LocaleProvider>
  )
}

export default () => {
  return (
    <GlobalProvider>
      <RouterCofig />
    </GlobalProvider>
  )
}
