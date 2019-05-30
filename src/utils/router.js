import { stores } from '@/stores'

/**
 * @description                              为每一个层级路由添加 404 和 403 路由
 * @param  {RouteConfig[]}  routes           路由对象
 * @param  {Component}      notPermission    组件对象
 * @param  {Component}      notFind          组件对象
 * @return {RouteConfig[]}                   包装过的路由对象
 */
export function addNotFindAndNotPermission(routes, notPermissionComponent, notFindComponent) {
  return routes.reduce((prevRoutes, route, index, source) => {
    const currentRoutes = []
    const { children } = route

    if (children) {
      currentRoutes.push({
        ...route,
        children: addNotFindAndNotPermission(children, notPermissionComponent, notFindComponent),
      })
    } else {
      currentRoutes.push(route)
    }

    // 如果到了同级的最后，就添加 403 和 *
    if (source.length - 1 === index) {
      currentRoutes.push(
        {
          path: '403',
          component: notPermissionComponent,
          meta: { authority: false },
        },
        {
          path: '*',
          component: notFindComponent,
          meta: { authority: false },
        }
      )
    }

    return [...prevRoutes, ...currentRoutes]
  }, [])
}

/**
 * @description                     通过 routes 获取导航栏配置
 * @param  {Array}         routes   路由
 * @return {Array}                  导航栏配置
 */
export function getNavMenuConfig(routes, prop = 'name') {
  return routes.reduce((prevAll, route) => {
    const {
      [prop]: val = '',
      meta: { hideInMenu = false, hideChildrenInMenu = false } = {},
      children = [],
    } = route

    // 隐藏自身 显示子代
    if (hideInMenu && !hideChildrenInMenu) {
      if (children.length) {
        return [...prevAll, ...getNavMenuConfig(children, prop)]
      }
    } else if (!hideInMenu && hideChildrenInMenu) {
      // 显示自身 隐藏子代
      return [...prevAll, { [prop]: val, meta: { ...route.meta } }]
    } else if (!hideInMenu && !hideChildrenInMenu) {
      // 显示自身 显示子代
      if (children.length) {
        return [
          ...prevAll,
          {
            [prop]: val,
            meta: { ...route.meta },
            children: getNavMenuConfig(children, prop),
          },
        ]
      } else {
        return [...prevAll, { [prop]: val, meta: { ...route.meta } }]
      }
    }

    return prevAll
  }, [])
}

/**
 * @description                     对 routes 数据进行初始化
 * @param  {Array}         routes   路由
 * @return {Array}                  meta规整过得路由
 */
export function initRoutesMeta(routes) {
  return routes.reduce((prevRoutes, route) => {
    const {
      children,
      meta: { authority = false, hideInMenu = false, hideChildrenInMenu = false } = {},
    } = route

    const newRoute = {
      ...route,
      meta: {
        ...route.meta,
        hideInMenu,
        hideChildrenInMenu,
        authority: Array.isArray(authority) && !authority.length ? true : authority, // 将空数组转为 true
      },
    }

    children && Object.assign(newRoute, { children: initRoutesMeta(children) })

    return [...prevRoutes, newRoute]
  }, [])
}

/**
 * @description                      获取当前用户是否有该权限
 * @param  {boolean|Array} authority 权限信息
 * @return {Function}                校验函数
 */
function hasPermission(authority) {
  let cache = new Map()
  let timestamp = null

  return (permission, fn) => {
    // 自定义查询函数（函数是find的回调）
    const state = stores.rootStore

    // 不同就清除缓存（重新登录或者刷新时会不同）
    if (timestamp !== state.timestamp) {
      cache = new Map()

      timestamp = state.timestamp
    }

    if (cache.has(permission)) {
      return cache.get(permission)
    } else {
      const { roles } = state

      // 如果不是数组，是数组但没有元素，或者用户没有传入权限名就退出
      if (!Array.isArray(authority) || !roles.length || !permission) {
        return false
      }

      // 过滤掉元素不是数组的，配置的角色和当前用户所具有的角色没有一个匹配的，配置不规范的
      const filterAuthority = authority.filter(
        item => Array.isArray(item) && roles.find(id => id === item[0]) && item.length === 2
      )

      // 根据用户是否传入自定义查询函数，找搜索是否有权限
      const findObj = fn
        ? filterAuthority.find(fn)
        : filterAuthority.find(([, permissionArr]) => permissionArr.includes(permission))

      cache.set(permission, !!findObj)

      return !!findObj
    }
  }
}

/**
 * @description                      当前用户是否具有访问当前路由的权限
 * @param  {boolean|Array} authority 权限信息
 * @return {Function}                校验函数
 */
function hasRoute(authority) {
  let has = null
  let timestamp = null

  return () => {
    const state = stores.rootStore

    // 不同就清除缓存（重新登录或者刷新时会不同）
    if (timestamp !== state.timestamp) {
      has = null

      timestamp = state.timestamp
    }

    // 重新对比
    if (has === null) {
      const { roles } = state

      if (typeof authority === 'boolean') {
        has = true
      } else {
        const findObj = roles.find(role =>
          authority.map(item => (Array.isArray(item) ? item[0] : item)).includes(role)
        )

        // const findObj = roles.find((role) => {
        //   let arr = authority.map(item => {
        //     return Array.isArray(item) ? item[0] : item
        //   })
        //   console.log(999, role, arr.includes(role))
        //   return arr.includes(role)
        // })
        // console.log(999, role, arr.includes(role))
        // return arr.includes(role)
        // })
        // console.log(222333, findObj)
        // console.log(11111111111111, authority)

        has = !!findObj
      }

      return has
    } else {
      // 说明可以使用之前的缓存
      return has
    }
  }
}

/**
 * @description                     从下向上归并 authority
 *                                  在权限的路径中不应该出现无权限的配置
 *                                  同样在无权限的路径中也不应该出现权限的配置
 * @param  {Array}         routes   路由
 * @return {Array}                  meta规整过得路由
 */
export function downToUpReduceMetaAuthority(routes) {
  return innerDownToUpReduceMetaAuthority(routes)[0]

  function innerDownToUpReduceMetaAuthority(routes) {
    return routes.reduce(
      (prev, route) => {
        const { children } = route
        let {
          meta: { authority },
        } = route

        const newRoute = {
          ...route,
          meta: {
            has: hasPermission(authority),
            hasRoute: hasRoute(authority),
            ...route.meta,
          },
        }

        if (children) {
          let [downChildren, downAuthority] = innerDownToUpReduceMetaAuthority(children)

          authority = getAuthority(authority, downAuthority)

          Object.assign(newRoute, {
            children: downChildren,
            meta: {
              has: hasPermission(authority),
              hasRoute: hasRoute(authority),
              ...route.meta,
              authority,
            },
          })
        }

        return [
          [...prev[0], newRoute],
          prev[1] === undefined ? authority : getAuthority(authority, prev[1]),
        ]
      },
      [[]]
    )
  }

  function getAuthority(authority, downAuthority) {
    if (authority === true || downAuthority === true) {
      return true
    } else if (authority === false || downAuthority === false) {
      return downAuthority
    } else {
      const reduceAuthority = [...authority, ...downAuthority].reduce(
        (all, item) => (Array.isArray(item) ? [...all, item[0]] : [...all, item]),
        []
      )

      return [...new Set(reduceAuthority)]
    }
  }
}

// 获取打平的配置，主要用于 navMenu 刷新初始化，和面包屑展示
export function getFlatData(config, before = []) {
  return config.reduce((prev, item) => {
    const { children } = item
    const line = [item.path, [...before, [item.path, item]]]

    if (!children) {
      return [...prev, line]
    }

    return [...prev, line, ...getFlatData(children, [...before, [item.path, item]])]
  }, [])
}

export default {
  initRoutesMeta,
  getNavMenuConfig,
  getFlatData,
  addNotFindAndNotPermission,
  downToUpReduceMetaAuthority,
}
