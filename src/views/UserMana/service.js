import { get, post } from '@/utils/request'

import { formatDateTime } from '@/utils/objectUtil.js'

import { STATUS } from './const'

// 列表
export async function getList(params) {
  // 理应对用户未填写或未选择的数据过滤掉，不用传给后端(该出后端处理错误，前端不传用户没有输入的字段，后端莫名报错)
  // const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
  //   if (!value) {
  //     return { ...prev }
  //   }

  //   return { ...prev, [key]: value }
  // }, {})

  const res = await get('/rest/sys/user/list', params)

  if (res.code === 0) {
    res.list = res.list.map(({ status, userId, createTime, ...rest }) => {
      const { text, color } = STATUS.has(status) ? STATUS.get(status) : { text: '', color: '' }

      return {
        ...rest,
        id: userId,
        statusText: text,
        statusColor: color,
        createTime: formatDateTime(new Date(+createTime), 'yyyy-MM-dd HH:mm:ss'),
      }
    })
  }

  return res
}

// 删除
export function deleteItemById(params) {
  return post('/rest/sys/user/delete', params)
}
