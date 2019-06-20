import { get } from '@/utils/request'

import { PASSENGER_FLOW_TREND, CAR_FLOW, CAR_NUM_LINE } from './const'

export async function getTopData() {
  const res = await get('/rest/traffic/remotting/getcurrent')

  if (res.code === 0) {
    const {
      TrafficCount: trafficCount,
      PersonCount: personCount,
      SalesVolume: salesVolume,
      EventCount: eventCount,
    } = res.data

    res.data = { trafficCount, personCount, salesVolume, eventCount }
  }

  return res
}
// 车流量
export async function getCarData(params) {
  const res = await get('/rest/traffic/remotting/trafficcount', params)

  if (res.code === 0) {
    res.data = res.list.reduce(
      (
        { series: [first, secode], xAxisData, axisLabelRotate, ...rest },
        { entercount, exitcount, xdate }
      ) => {
        return {
          ...rest,
          series: [
            { ...first, data: [...first.data, entercount] },
            { ...secode, data: [...secode.data, exitcount] },
          ],
          xAxisData: [...xAxisData, xdate],
          axisLabelRotate: params.type === 3 ? 45 : axisLabelRotate,
        }
      },
      CAR_FLOW
    )
  }

  return res
}
// 车型数量
export async function getCarTypeData(params) {
  const res = await get('/rest/traffic/remotting/traffictype', params)

  if (res.code === 0) {
    res.data = res.list.reduce(
      (
        { series: [first, secode], xAxisData, axisLabelRotate, ...rest },
        { carcount, truckcount, xdate }
      ) => {
        return {
          ...rest,
          series: [
            { ...first, data: [...first.data, carcount] },
            { ...secode, data: [...secode.data, truckcount] },
          ],
          xAxisData: [...xAxisData, xdate],
          axisLabelRotate: params.type === 3 ? 45 : axisLabelRotate,
        }
      },
      CAR_NUM_LINE
    )
  }

  return res
}

// 客流类型
export async function getPersonData(params) {
  const res = await get('/rest/traffic/remotting/personflow', params)

  if (res.code === 0) {
    res.data = res.list.reduce(
      (
        { series: [first, secode], xAxisData, axisLabelRotate, ...rest },
        { entercount, exitcount, xdate }
      ) => {
        return {
          ...rest,
          series: [
            { ...first, data: [...first.data, entercount] },
            { ...secode, data: [...secode.data, exitcount] },
          ],
          xAxisData: [...xAxisData, xdate],
          axisLabelRotate: params.type === 3 ? 45 : axisLabelRotate,
        }
      },
      PASSENGER_FLOW_TREND
    )
  }

  return res
}
