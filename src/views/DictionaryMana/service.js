import { get, post } from '@/utils/request'

// 列表
export async function getList(params) {
  const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
    if (!value) {
      return { ...prev }
    }

    return { ...prev, [key]: value }
  }, {})

  const res = await get('/rest/sys/dict/list-type', filterParams)

  if (res.code === 0) {
    res.list = res.list.map(({ name, type, typeList }) => {
      const list = typeList.reduce((prev, { id, value }, index) => {
        const newItem = { text: value, code: id }
        const i = index % 4

        if (!i) {
          return [...prev, [newItem]]
        }

        prev[prev.length - 1][i] = newItem

        return prev
      }, [])

      const headerList = list.slice(0, 1)

      return {
        name,
        type,
        headerList: headerList.length ? headerList[0] : headerList,
        contentList: list.slice(1),
      }
    })
  }

  return res
}

// 保存
export function saveData(params) {
  return post('/rest/sys/dict/save', params)
}

// 删除
export function deleteItemById(id) {
  return post('/rest/sys/dict/delete', { id })
}
