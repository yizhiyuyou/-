import { get } from '@/utils/request'

function getfilterParams(params) {
  return Object.entries(params).reduce((prev, [key, value]) => {
    if (!value) {
      return { ...prev }
    }

    return { ...prev, [key]: value }
  }, {})
}

// 列表
export async function getList(params) {
  const res = await get('/rest/feedback/wxpfeedback/list', getfilterParams(params))

  if (res.code === 0) {
    res.list = res.list.map(({ id, createTime, createPhone, score, content }) => ({
      id,
      createTime,
      createPhone,
      score,
      content,
    }))
  }

  return res
}

export async function getChartList(params) {
  const res = await get('/rest/feedback/wxpfeedback/statistic', getfilterParams(params))

  if (res.code === 0) {
    res.list = res.list.map(({ count, value }) => ({ value: count, name: value }))
  }

  return res
}
