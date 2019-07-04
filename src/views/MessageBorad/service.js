import { get } from '@/utils/request'

// 列表
export async function getList(params) {
  const res = await get('/rest/wxoa/wxpfeedback/list', params)

  if (res.code === 0) {
    res.list = res.list.map(({ id, nickname, createTime, city, content }) => ({
      id,
      nickname,
      createTime,
      city,
      content,
    }))
  }

  return res
}
