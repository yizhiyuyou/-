/*
 * @Description: 将有相同布局的路由配置合并 path => string|string[]
 * 解决问题：循环生成路由配置后，会因为 key 不同,造成整个路由刷新
 * 解决思路：将具有相同布局的配置，合并
 * 解决方法：react-router-dom  path 属性可以为 string 也可以为 string[]
 * 只考虑外层，暂不考虑内层，我实在没找到这种场景（你想一下会有吗？）
 * 如果想，递归一下就行了（也就再添加三四行代码）
 * @Author: Duan Yu (949267840@qq.com)
 * @Date: 2019-05-29 15:39:09
 * @LastEditors: Duan Yu (949267840@qq.com)
 * @LastEditTime: 2019-06-05 10:10:58
 */
import pathToRegexp from 'path-to-regexp'

/**
 * @description              将有相同布局的路由配置合并
 * @param  {Array}           路由配置
 * @return {Array}           格式化后的路由配置
 */
function routeMerge(routes = []) {
  const config = routes.reduce((prev, item) => {
    const { component } = item

    if (!isLayoutCompontent(item)) {
      return [...prev, { ...item }]
    }

    // 是布局组件就需要查找 prev 是否有相同布局，如果有就合并，否则就添加进去
    const findIndex = prev.findIndex(item => {
      if (!isLayoutCompontent(item)) {
        return false
      }

      // 通过对比引用来判断是否相同
      return component === item.component
    })

    // 没有相同布局，就添加进去
    if (findIndex === -1) {
      return [
        ...prev,
        {
          ...item,
          path: [item.path],
          pathToHasRoute: [[item.path, item.meta.hasRoute]],
          pathToHas: [[item.path, item.meta.has]],
        },
      ]
    }

    // 有相同布局，就合并
    return prev.map((curr, index) => {
      if (findIndex === index) {
        return {
          ...curr,
          path: [...curr.path, item.path],
          children: [...curr.children, ...item.children],
          pathToHasRoute: [...curr.pathToHasRoute, [item.path, item.meta.hasRoute]],
          pathToHas: [...curr.pathToHas, [item.path, item.meta.has]],
        }
      }

      return curr
    })
  }, [])

  return config.map(({ pathToHasRoute, pathToHas, ...rest }) => ({
    ...rest,
    hasRoute: getNewFn(pathToHasRoute),
    has: getNewFn(pathToHas),
  }))
}

function getNewFn(pathToFn = []) {
  return pathname => {
    console.log(321, pathToFn, pathname)
    const reg = pathToRegexp(pathname)

    const findObj = pathToFn.find(([path]) => reg.test(path))

    if (!findObj) {
      return false
    }

    return findObj[1]()
  }
}

// 有 component 且有 children 说明是布局组件(不要故意弄个空数组骗我)
function isLayoutCompontent({ component, children }) {
  return component && Array.isArray(children)
}

export default routeMerge
