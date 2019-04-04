import request from '@/utils/request'
const list = [{
  id: '201902290012',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290013',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290014',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290015',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290016',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290017',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290018',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290019',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290020',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290021',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290022',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}, {
  id: '201902290023',
  type: '保洁',
  createPeople: '张一一',
  currentPeople: '王怡仁',
  status: '待确认',
  reportTimeString: '上报时间',
}]

export function getEventListData (params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 'success',
        list,
        total: 40,
        pageIndex: params.pageIndex,
      })
    }, 3000)
  })
}

export function deleteEventById (params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 'success',
      })
    }, 3000)
  })
}

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
export async function deleteData (params) {
  return request.post('/rest/event/eventinfo/delete', params)
}
