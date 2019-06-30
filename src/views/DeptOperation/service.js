import md5 from 'md5'

import { get, post } from '@/utils/request'

// 部门信息
export async function getInfo({ id }) {
  const res = await get(`/rest/sys/dept/info/${id}`)

  if (res.code === 0) {
    const { name, parentId, orderNum } = res.data

    res.data = { name, parentId, orderNum }
  }

  return res
}

// 保存
export function saveInfo({ id, ...rest }) {
  const newParams = id ? { ...rest, deptId: id } : { ...rest }

  return post(id ? '/rest/sys/dept/update' : '/rest/sys/dept/save', {
    entity: JSON.stringify(newParams),
  })
}

function formatter(arr = []) {
  return arr.map(({ deptId: code, name: text, childList }) => {
    const item = { code, text }

    if (Array.isArray(childList) && childList.length) {
      Object.assign(item, { children: formatter(childList) })
    }

    return item
  })
}

// 部门树形结构接口
export async function getDeptTree() {
  const res = await get('/rest/sys/dept/tree-dept')

  if (res.code === 0) {
    res.list = formatter([res.data])
  }

  return res
}
