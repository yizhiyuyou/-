import request from '@/utils/request'

// 列表
export async function getList(params) {
  const res = await request.get('/rest/event/eventinfo/list', params)

  if (res.code === 0) {
  }

  return res
}

// 删除
export async function deleteItemById(params) {
  return request.post('/rest/event/eventinfo/delete', params)
}
