import React from 'react'

import Head from '../components/Head'
import NavMenu from '../components/NavMenu'

import styles from './BaseLayout.module.less'

function BaseLayout({ children }) {
  return (
    <div className={styles['home-layout']}>
      <div className={styles['layout-left']}>
        <div className={styles['header-title']}>
          <img src="/static/img/login/logo.png" alt="logo" />
          <span>郑州东服务区</span>
        </div>
        <NavMenu />
      </div>
      <div className={styles['layout-right']}>
        <Head />
        {children}
      </div>
    </div>
  )
}

export default BaseLayout
