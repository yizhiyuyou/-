function routeMerge(routes) {
  return routes.reduce((prev, item) => {
    const { component, children } = item

    // 有名字，切有子组件说明这是一个布局组件
    if (!component || !component.name || !Array.isArray(children)) {
      return [...prev, { ...item }]
    }

    const findIndex = prev.findIndex(item => {
      const { component: com, children } = item

      if (!com || !com.name || !Array.isArray(children)) {
        return false
      }

      return com.name === component.name
    })

    if (findIndex === -1) {
      return [...prev, { ...item, path: [item.path] }]
    }

    return prev.map((curr, index) => {
      if (findIndex === index) {
        return {
          ...curr,
          path: [...curr.path, item.path],
          children: [...curr.children, ...item.children],
        }
      }

      return curr
    })
  }, [])
}

export default routeMerge
