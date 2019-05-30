import React, { useCallback, useState, useEffect } from 'react'
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

// 设置 menu 显示内容
function useMenu(pathname) {
  const [menuProp, setMenuProp] = useState({
    openKeys: [],
    defaultSelectedKeys: [],
  })

  useEffect(() => {
    const reg = pathToRegexp(pathname)

    const findObj = flatConfig.find(([path], index, self) => {
      const match = reg.test(path)

      if (!match) {
        return false
      }
      // 以下的处理都是为了处理 如/a 能够匹配 /a 和 /a/
      // /a 按着顺序会先匹配到/a，但是导航栏上的是/a ，就会造成/a不会激活
      if (index === self.length - 1) {
        return true
      }

      if (reg.test(self[index + 1][0])) {
        return false
      }

      return true
    })

    if (!findObj) {
      setMenuProp({
        openKeys: [],
        selectedKeys: [],
      })

      return
    }

    const select = findObj[1]

    if (select.length === 1) {
      setMenuProp({
        openKeys: [],
        selectedKeys: [findObj[0]],
      })

      return
    }

    setMenuProp({
      openKeys: select.reduce((prev, [path], index, self) => {
        return self.length - 1 !== index ? [...prev, path] : [...prev]
      }, []),
      selectedKeys: [findObj[0]],
    })
  }, [pathname])

  return [menuProp, setMenuProp]
}

export const NavMenu = ({ history, location }) => {
  const [config] = useState(() => {
    return getNavMenuByUserRole(navMenuConfig)
  })

  const [menuProp, setMenuProp] = useMenu(location.pathname)

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
