import React, { useCallback, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { Menu } from 'antd'

import { navMenuConfig } from '@/router/config'

import styles from './NavMenu.module.less'

const { SubMenu, Item } = Menu

// 获取该用户能够显示的导航栏
function getNavMenuByUserRole(navMenuConfig) {
  return navMenuConfig.reduce((prev, item) => {
    // 外层没权限直接不显示
    if (!item.meta.hasRoute()) {
      return prev
    }

    if (item.children) {
      const navMenu = getNavMenuByUserRole(item.children)

      const newItem = Object.assign({ ...item }, navMenu.length ? { children: navMenu } : {})

      return [...prev, newItem]
    }

    return [...prev, item]
  }, [])
}

function getNavMenuByConfig(config) {
  return config.reduce((prev, item) => {
    if (!item.children) {
      return [
        ...prev,
        <Item key={item.meta.path || item.path}>
          {item.meta.icon && (
            <img
              src={`/static/img/layout/${item.meta.icon}.png`}
              alt={item.meta.name}
              className={styles['img-icon']}
            />
          )}
          <span>{item.meta.name}</span>
        </Item>,
      ]
    }

    return [
      ...prev,
      <SubMenu
        key={item.path}
        title={
          <span>
            <img
              src={`/static/img/layout/${item.meta.icon}.png`}
              alt={item.meta.name}
              className={styles['img-icon']}
            />
            <span>{item.meta.name}</span>
          </span>
        }
      >
        {getNavMenuByConfig(item.children)}
      </SubMenu>,
    ]
  }, [])
}

export const NavMenu = ({ history, location }) => {
  const [config] = useState(() => {
    return getNavMenuByUserRole(navMenuConfig)
  })

  const [openKeys, setOpenKeys] = useState([])

  const handleClick = useCallback(({ key }) => {
    if (/\^.*\$/.test(key)) {
      const url = /\^(.*)\$/.exec(key)[1]

      url && window.open(url, '_blank')
    } else {
      history.push(key)
    }
  }, [])

  const handleOpenChange = useCallback(openKeys => {
    setOpenKeys(openKeys.length > 1 ? openKeys.slice(-1) : openKeys)
  })

  // defaultSelectedKeys={[location.pathname]}
  console.log(1, config)
  return (
    <Menu
      onClick={handleClick}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      mode="inline"
      theme="dark"
      className={styles['menu-container']}
    >
      {getNavMenuByConfig(config)}
      {/* <Item key="/home">
        <img src="/static/img/layout/home.png" alt="首页图标" className={styles['img-icon']} />
        <span>首页</span>
      </Item>
      <SubMenu
        key="sub1"
        title={
          <span>
            <img
              src="/static/img/layout/eventMana.png"
              alt="事件管理图标"
              className={styles['img-icon']}
            />
            <span>事件管理</span>
          </span>
        }
      >
        <Item key="/eventMana">事件列表</Item>
        <Item key="/eventMana/myTask">我的待办</Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <img
              src="/static/img/layout/infoMana.png"
              alt="信息管理图标"
              className={styles['img-icon']}
            />
            <span>信息管理</span>
          </span>
        }
      >
        <Item key="/infoMana">通知公告</Item>
        <Item key="/infoMana/setNotice">查询及信息发布</Item>
      </SubMenu>
      <Item key="/uniteMonitor">
        <img
          src="/static/img/layout/uniteMonitor.png"
          alt="统一监控图标"
          className={styles['img-icon']}
        />
        <span>统一监控</span>
      </Item>
      <SubMenu
        key="sub3"
        title={
          <span>
            <img
              src="/static/img/layout/eventMana.png"
              alt="信息管理图标"
              className={styles['img-icon']}
            />
            <span>能耗管理</span>
          </span>
        }
      >
        <Item key="/energyAnalysis">能耗分析</Item>
        <Item key="/energyAnalysis/energyDetail">能耗明细</Item>
      </SubMenu>
      <Item key="^https://www.baidu.com$">
        <img
          src="/static/img/layout/realTimePositioning.png"
          alt="实时定位图标"
          className={styles['img-icon']}
        />
        <span>实时定位</span>
      </Item> */}
    </Menu>
  )
}

export default withRouter(NavMenu)
