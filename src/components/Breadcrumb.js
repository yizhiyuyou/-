import React, { useMemo } from 'react'

import { withRouter, Link } from 'react-router-dom'

import { Breadcrumb } from 'antd'

import pathToRegexp from 'path-to-regexp'

import { flatConfig } from '@/router/config'

import { pages } from '@/config'

function useBreadcrumb(pathname) {
  return useMemo(() => {
    const reg = pathToRegexp(pathname)

    const findObj = flatConfig.find(([path], index, self) => {
      const match = reg.test(path)

      if (!match) {
        return false
      }
      // 以下的处理都是为了处理 如/a 能够匹配 /a 和 /a/
      // /a 按着顺序会先匹配到/a，会造成缺失显示默认下层内容
      if (index === self.length - 1) {
        return true
      }

      if (reg.test(self[index + 1][0])) {
        return false
      }

      return true
    })

    if (!findObj) {
      return null
    }

    // 处理非首页内容添加首页
    const arr = reg.test(`${pages.home.path}/`)
      ? [...findObj[1]]
      : [
          ...[flatConfig.find(([path]) => pathToRegexp(path).test(`${pages.home.path}/`))[1][0]], // 首页配置信息
          ...findObj[1],
        ]

    const BreadcrumbItmes = arr.map(([path, config], index, self) => {
      const { name } = config.meta

      return (
        <Breadcrumb.Item key={index}>
          {self.length - 1 !== index ? <Link to={path}>{name}</Link> : name}
        </Breadcrumb.Item>
      )
    })

    return <Breadcrumb separator=">">{BreadcrumbItmes}</Breadcrumb>
  }, [pathname])
}

export default withRouter(({ location }) => useBreadcrumb(location.pathname))
