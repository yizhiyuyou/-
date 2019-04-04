import request from '@/utils/request'

// 列表
export async function getEventList (params) {
  const filterParams = Object.entries(params)
    .reduce((prev, [key, value]) => {
      if (key === 'timePicker') {
        if (value.length) {
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

  return request.get('/rest/event/eventinfo/list', filterParams)
}

// 删除
export async function deleteEventById (params) {
  const filterParams = { ids: JSON.stringify([params.id]) }

  return request.post('/rest/event/eventinfo/delete', filterParams)
}
