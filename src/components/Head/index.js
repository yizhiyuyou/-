import React, { useContext, useCallback, useRef, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Badge, Menu, Dropdown, Icon } from 'antd'

import history from '@/utils/history'

import { StoreContext } from '@/stores'

import Breadcrumb from '../Breadcrumb'

import styles from './index.module.less'

export const Head = () => {
  const { rootStore } = useContext(StoreContext)

  const fnsRef = useRef({
    logout: rootStore.pageLogout,
    go: () => history.push('/eventMana/myTask'),
  })

  const handleClick = useCallback(({ key }) => {
    const fn = fnsRef.current[key]

    fn && fn()
  }, [])

  useEffect(() => {
    rootStore.getMyTaskNum()
  }, [])

  const WithMenu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="logout">注销</Menu.Item>
      <Menu.Item key="updatePassword">修改密码</Menu.Item>
      <Menu.Item key="userInfo">个人信息</Menu.Item>
    </Menu>
  )

  return useObserver(() => (
    <div className={styles['the-head']}>
      <div>
        <Breadcrumb />
      </div>
      <div className={styles['head-right']}>
        <Badge
          count={rootStore.myTaskNum}
          overflowCount={99}
          onClick={fnsRef.current.go}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="/static/img/layout/info.png"
            alt="待办数量"
            title="我的待办"
            className={styles.pointer}
          />
        </Badge>
        <span className={styles['vertical-line']} />
        <img src="/static/img/layout/user.png" className={styles['user-icon']} alt="头像" />
        <Dropdown overlay={WithMenu} className={styles['the-dropdown']}>
          <div className={styles.pointer}>
            {rootStore.username}
            <Icon type="down" />
          </div>
        </Dropdown>
      </div>
    </div>
  ))
}

export default Head
