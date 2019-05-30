import React, { useCallback, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { Menu } from 'antd'

import pathToRegexp from 'path-to-regexp'

import { navMenuConfig, flatConfig } from '@/router/config'

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

// 根据用户能够访问的导航配置，获取 jsx
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

// 获得默认打开内容
function getDefaultOpen(location) {
  const reg = pathToRegexp(location.pathname)

  const findObj = flatConfig.find(([path]) => reg.test(path))

  if (!findObj) {
    return {
      openKeys: [],
      defaultSelectedKeys: [],
    }
  }

  const select = findObj[1]

  if (select.length === 1) {
    return {
      openKeys: [],
      defaultSelectedKeys: [findObj[0]],
    }
  }

  return {
    openKeys: select.reduce((prev, [path], index, self) => {
      return self.length - 1 !== index ? [...prev, path] : [...prev]
    }, []),
    defaultSelectedKeys: [findObj[0]],
  }
}

export const NavMenu = ({ history, location }) => {
  const [config] = useState(() => {
    return getNavMenuByUserRole(navMenuConfig)
  })

  const [menuProp, setMenuProp] = useState(() => {
    return getDefaultOpen(location)
  })

  const handleClick = useCallback(({ key }) => {
    if (/\^.*\$/.test(key)) {
      const url = /\^(.*)\$/.exec(key)[1]

      url && window.open(url, '_blank')
    } else {
      history.push(key)
    }
  }, [])

  const handleOpenChange = useCallback(openKeys => {
    setMenuProp(state => {
      return {
        ...state,
        openKeys: openKeys.length > 1 ? openKeys.slice(-1) : openKeys,
      }
    })
  }, [])

  return (
    <Menu
      onClick={handleClick}
      onOpenChange={handleOpenChange}
      mode="inline"
      theme="dark"
      className={styles['menu-container']}
      {...menuProp}
    >
      {getNavMenuByConfig(config)}
    </Menu>
  )
}

export default withRouter(NavMenu)
