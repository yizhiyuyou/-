import React, { useContext, useCallback, useMemo, useRef } from 'react'

import { Badge, Menu, Dropdown, Icon, message } from 'antd'

import { useFetch } from '@/utils/use'

import { pageLogout } from '@/services'

import { StoreContext } from '@/stores'

import styles from './Head.module.less'

function MenuComponent ({ handleClick }) {
  return (
    <Menu onClick={handleClick} selectable={false}>
      <Menu.Item key="logout">注销</Menu.Item>
      <Menu.Item key="updatePassword">修改密码</Menu.Item>
      <Menu.Item key="userInfo">个人信息</Menu.Item>
    </Menu>
  )
}

export const Head = (props) => {
  const store = useContext(StoreContext)

  const { setParams: logout } = useFetch(pageLogout, res => {
    if (res.code === 0) {
      message.success('注销成功', 2)

      store.rootStore.setUser({ username: "", loaded: false })
    } else {
      message.warning(res.msg || '注销失败', 2)
    }
  })

  const fnsRef = useRef({
    logout () { logout({}) },
  })

  const handleClick = useCallback(({ key }) => {
    const fn = fnsRef.current[key]

    fn && fn()
  }, [])

  const WithMenu = useMemo(() => <MenuComponent handleClick={handleClick} />, [])

  return (
    <div className={styles['the-head']}>
      <div>首页</div>
      <div className={styles['head-right']}>
        <Badge count={0} overflowCount={99}>
          <img src="/static/img/layout/info.png" alt="信息" title="信息" className={styles.pointer} />
        </Badge>
        <span className={styles['vertical-line']}></span>
        <img src="/static/img/layout/user.png" className={styles['user-icon']} alt="头像"/>
        <Dropdown overlay={WithMenu} className={styles['the-dropdown']}>
          <div className={styles.pointer}>{store.rootStore.username}<Icon type="down" /></div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Head
