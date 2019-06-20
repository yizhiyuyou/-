export const TIME_LIST = new Map([
  ['今日', { value: 1 }],
  ['近七日', { value: 2 }],
  ['近30天', { value: 3 }],
])

export const PERSON_LIST = ['客流类型', '客流量趋势']

export const CAR_LIST = ['车流量', '车型数量']

// 客流量趋势初始数据
export const PASSENGER_FLOW_TREND = {
  series: [{ name: '进客人数', data: [] }, { name: '离客人数', data: [] }],
  yAxisName: '数量(人)',
  xAxisData: [],
  axisLabelRotate: 0,
}

// 车流量初始数据
export const CAR_FLOW = {
  series: [{ name: '入口车流量', data: [] }, { name: '出口车流量', data: [] }],
  yAxisName: '数量(辆)',
  xAxisData: [],
  axisLabelRotate: 0,
}

// 车辆统计折线初始数据
export const CAR_NUM_LINE = {
  series: [{ name: '客车', data: [] }, { name: '货车', data: [] }],
  yAxisName: '数量(辆)',
  xAxisData: [],
  axisLabelRotate: 0,
}

// 车辆统计环形初始数据
export const CAR_NUM_RING = {
  series: [{ name: '客车', value: 0 }, { name: '货车', value: 0 }],
  title: '客货比',
}
