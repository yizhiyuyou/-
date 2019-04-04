import React, { useState } from 'react'

import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import moment from 'moment'
import 'moment/locale/zh-cn'

import RouterCofig from './router'
import { Context } from './utils/userInfoContext'
import './App.css'

moment.locale('zh-cn')

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
    <GlobalInfoProvider>
      <RouterCofig />
    </GlobalInfoProvider>
  )
}
