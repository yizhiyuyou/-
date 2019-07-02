import { get } from '@/utils/request'

// 列表
export async function getList(params) {
  const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
    if (!value) {
      return { ...prev }
    }

    return { ...prev, [key]: value }
  }, {})

  const res = await get('/rest/sys/log/list', filterParams)

  if (res.code === 0) {
    res.list = res.list.map(({ id, username, operation, ip, createDate }) => ({
      id,
      username,
      operation,
      ip,
      createDate,
    }))
  }

  return res
}
