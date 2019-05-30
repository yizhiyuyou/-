import React, { useMemo } from 'react'

import { withRouter, Link } from 'react-router-dom'

import { Breadcrumb } from 'antd'

import pathToRegexp from 'path-to-regexp'

import { flatConfig } from '@/router/config'

import { pages } from '@/config'

function useBreadcrumb(pathname) {
  return useMemo(() => {
    const reg = pathToRegexp(pathname)

    const findObj = [...flatConfig].reverse().find(([path]) => reg.test(path))

    if (!findObj) {
      return null
    }

    // 处理非首页内容添加首页
    const arr = reg.test(`${pages.home.path}/`)
      ? [...findObj[1]]
      : [
          ...[flatConfig.find(([path]) => pathToRegexp(path).test(`${pages.home.path}/`))[1][0]],
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
