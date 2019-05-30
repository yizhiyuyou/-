import React, { useMemo } from 'react'

import { withRouter, Link } from 'react-router-dom'

import { Breadcrumb } from 'antd'

import pathToRegexp from 'path-to-regexp'

import { flatConfig } from '@/router/config'

function useBreadcrumb(pathname) {
  return useMemo(() => {
    const reg = pathToRegexp(pathname)

    const findObj = [...flatConfig].reverse().find(([path]) => reg.test(path))

    if (!findObj) {
      return null
    }

    const BreadcrumbItmes = findObj[1].map(([path, config], index, self) => {
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
