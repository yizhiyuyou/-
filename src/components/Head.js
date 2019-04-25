import React, { useContext, useCallback, useRef } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Badge, Menu, Dropdown, Icon } from 'antd'

import { StoreContext } from '@/stores'

import styles from './Head.module.less'

export const Head = () => {
  const store = useContext(StoreContext)

  const fnsRef = useRef({
    logout: store.rootStore.pageLogout,
  })

  const handleClick = useCallback(({ key }) => {
    const fn = fnsRef.current[key]

    fn && fn()
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
      <div>首页</div>
      <div className={styles['head-right']}>
        <Badge count={0} overflowCount={99}>
          <img
            src="/static/img/layout/info.png"
            alt="信息"
            title="信息"
            className={styles.pointer}
          />
        </Badge>
        <span className={styles['vertical-line']} />
        <img src="/static/img/layout/user.png" className={styles['user-icon']} alt="头像" />
        <Dropdown overlay={WithMenu} className={styles['the-dropdown']}>
          <div className={styles.pointer}>
            {store.rootStore.username}
            <Icon type="down" />
          </div>
        </Dropdown>
      </div>
    </div>
  ))
}

export default Head
