import React, { useState } from 'react'

import { configure } from 'mobx'

import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import moment from 'moment'
import 'moment/locale/zh-cn'

import RouterCofig from './router'
import { Context } from './utils/userInfoContext'
import './App.css'

import { StoreContext, stores } from '@/stores'

moment.locale('zh-cn')

configure({ enforceActions: 'observed' })

const GlobalInfoProvider = (props) => {
  const [globalData, setGlobalData] = useState({ loaded: false, userInfo: {} })

  return (
    <LocaleProvider locale={zh_CN}>
      <Context.Provider value={{globalData, setGlobalData}}>
        { props.children }
      </Context.Provider>
    </LocaleProvider>
  )
}

export default () => {
  return (
    <StoreContext.Provider value={stores}>
      <GlobalInfoProvider>
        <RouterCofig />
      </GlobalInfoProvider>
    </StoreContext.Provider>
  )
}
