import React, { useMemo } from 'react'

import { matchPath } from 'react-router'
import { withRouter, Link } from 'react-router-dom'

import { Breadcrumb } from 'antd'

import pathToRegexp from 'path-to-regexp'

import { flatConfigToBreadcrumb } from '@/router/config'

import { matchRoutes } from '@/utils/router'

import { pages } from '@/config'

import * as imgs from './imgs'

import styles from './index.module.less'

// 获得能够整个链路中显示的路由项
function getConfigByHideInMenu(config) {
  return config.filter(([path, { meta: { hideInMenu } }], index, self) => {
    // 最后一项一定需要显示
    if (self.length - 1 === index) {
      return true
    }

    return !hideInMenu
  })
}

// 获取该路由项 meta 中的 name
function getRouteMetaName({ meta: { name }, ...rest }, pathname) {
  const type = typeof name

  if (type === 'function') {
    return name(matchPath(pathname, rest))
  }

  return name
}

// 根据路由找出需要显示的内容
function useBreadcrumb(pathname) {
  return useMemo(() => {
    const findObj = matchRoutes(flatConfigToBreadcrumb, pathname)

    if (!findObj) {
      return null
    }

    // 过滤掉不需要显示的部分
    const filterRoutes = getConfigByHideInMenu(findObj[1])

    // 处理非首页内容添加首页
    return pathToRegexp(pathname).test(pages.home.path) ||
      pathToRegexp(pages.home.path).test(pathname)
      ? [...filterRoutes]
      : [
          ...getConfigByHideInMenu(matchRoutes(flatConfigToBreadcrumb, pages.home.path)[1]), // 首页配置信息
          ...filterRoutes,
        ]
  }, [pathname])
}

export default withRouter(({ location }) => {
  const BreadcrumbItmes = useBreadcrumb(location.pathname)

  return useMemo(() => {
    if (!BreadcrumbItmes) {
      return null
    }

    const meta =
      BreadcrumbItmes.length === 1 ? BreadcrumbItmes[0][1].meta : BreadcrumbItmes[1][1].meta

    return (
      <Breadcrumb separator=">">
        {BreadcrumbItmes.map(([path, config], index, self) => {
          const name = getRouteMetaName(config, location.pathname)

          return (
            <Breadcrumb.Item key={index}>
              {[
                index === 0 && (
                  <img
                    src={imgs[meta.icon]}
                    className={styles['img-icon']}
                    alt={meta.name}
                    key="1"
                  />
                ),
                self.length - 1 !== index ? (
                  <Link to={path} key="2">
                    {name}
                  </Link>
                ) : (
                  name
                ),
              ]}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    )
  }, [BreadcrumbItmes])
})
