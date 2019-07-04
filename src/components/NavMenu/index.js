import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'

import { Menu } from 'antd'

import { navMenuConfig, flatConfigToNavMenu } from '@/router/config'

import { matchRoutes } from '@/utils/router'

import { goInfoRelease } from '@/services'

import * as imgs from './imgs'

import styles from './index.module.less'

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
function getNavMenuByConfig(config, activePath) {
  return config.reduce((prev, item) => {
    const imgSrc = item.path === activePath ? imgs[item.meta.icon] : imgs[`${item.meta.icon}Black`]

    if (!item.children) {
      return [
        ...prev,
        <Item key={item.meta.path || item.path}>
          {item.meta.icon && (
            <img src={imgSrc} alt={item.meta.name} className={styles['img-icon']} />
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
            <img src={imgSrc} alt={item.meta.name} className={styles['img-icon']} />
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
function useMenu(matchPath) {
  const [menuProp, setMenuProp] = useState({
    openKeys: [],
    defaultSelectedKeys: [],
  })

  useEffect(() => {
    // 处理还在相同的布局，但是在导航栏中不显示时。
    if (!matchPath) {
      return
    }

    // 只要没匹配到，就取消任何选中状态
    // if (!matchPath) {
    //   setMenuProp({
    //     openKeys: [],
    //     selectedKeys: [],
    //   })

    //   return
    // }

    const select = matchPath[1]

    if (select.length === 1) {
      setMenuProp({
        openKeys: [],
        selectedKeys: [matchPath[0]],
      })

      return
    }

    setMenuProp({
      openKeys: select.reduce((prev, [path], index, self) => {
        return self.length - 1 !== index ? [...prev, path] : [...prev]
      }, []),
      selectedKeys: [matchPath[0]],
    })
  }, [matchPath])

  return [menuProp, setMenuProp]
}

export const NavMenu = ({ history, location: { pathname } }) => {
  const [config] = useState(() => {
    return getNavMenuByUserRole(navMenuConfig)
  })

  const matchPath = useMemo(() => matchRoutes(flatConfigToNavMenu, pathname), [pathname])
  const [menuProp, setMenuProp] = useMenu(matchPath)

  const handleClick = useCallback(async ({ key }) => {
    // 外链的
    if (/\^.*\$/.test(key)) {
      // 信息发布
      if (key === '^infoRelease$') {
        const {
          data: { urlWithParam },
        } = await goInfoRelease()

        window.open(urlWithParam, 'infoRelease')

        return
      }

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

  return useMemo(() => {
    return (
      <Menu
        onClick={handleClick}
        onOpenChange={handleOpenChange}
        mode="inline"
        theme="dark"
        className={styles['menu-container']}
        {...menuProp}
      >
        {getNavMenuByConfig(config, matchPath && matchPath[1][0][0])}
      </Menu>
    )
  }, [menuProp, config])
}

export default withRouter(NavMenu)
