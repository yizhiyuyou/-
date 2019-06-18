import { get } from '@/utils/request'

// 列表
export async function getList(params) {
  const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
    if (key === 'timePicker') {
      if (value && value.length) {
        const [start, end] = value

        return {
          ...prev,
          startTime: Math.floor(start.valueOf() / 1000),
          endTime: Math.floor(end.valueOf() / 1000),
        }
      }

      return prev
    }

    return value ? { ...prev, [key]: value } : prev
  }, {})

  const res = await get('/rest/event/eventinfo/todo-list', filterParams)

  if (res.code === 0) {
    res.list = res.list.map(({ id, eventNum, eventType, creator, state, createTime }) => ({
      id,
      eventNum,
      eventType,
      creator,
      state,
      createTime,
    }))
  }

  return res
}
