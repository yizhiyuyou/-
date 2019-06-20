import { observable, computed, action, flow } from 'mobx'

import { getTopData, getPersonData, getCarData, getCarTypeData } from './service'
import {
  TIME_LIST,
  PERSON_LIST,
  PASSENGER_FLOW_TREND,
  CAR_LIST,
  CAR_FLOW,
  CAR_NUM_LINE,
  CAR_NUM_RING,
} from '@/views/HomePage/const'

class HomePageStore {
  @observable isLoading = false

  @observable topData = {
    trafficCount: 0,
    personCount: 0,
    salesVolume: 0,
    eventCount: 0,
  }

  // 客流中的所有选择项
  @observable personSelect = new Map(
    PERSON_LIST.map((type, index) => [
      type,
      { active: !index, timeType: TIME_LIST.get('今日').value },
    ])
  )

  // 客流中的所有选择项
  @observable carSelect = new Map(
    CAR_LIST.map((type, index) => [type, { active: !index, timeType: TIME_LIST.get('今日').value }])
  )

  // 客流量趋势数据
  @observable passengerFlowTrend = PASSENGER_FLOW_TREND

  // 车流量数据
  @observable carFlow = CAR_FLOW

  // 车流量数据
  @observable carNumLine = CAR_NUM_LINE

  // 车流量环形数据
  @computed get carNumRing() {
    // 客车，货车
    const [{ data: bus }, { data: truck }] = this.carNumLine.series

    const [busInit, truckInit] = CAR_NUM_RING.series

    return {
      ...CAR_NUM_RING,
      series: [
        { ...busInit, value: bus.reduce((count, curr) => count + curr, 0) },
        { ...truckInit, value: truck.reduce((count, curr) => count + curr, 0) },
      ],
    }
  }

  @action.bound
  getTopData = flow(function*() {
    this.isLoading = true

    const res = yield getTopData()

    if (res.code === 0) {
      this.topData = res.data
    }

    this.isLoading = false

    return res
  })

  @action.bound
  getPersonData = flow(function*() {
    const type = this.personSelect.get('客流量趋势').timeType

    const res = yield getPersonData({ type })

    if (res.code === 0) {
      this.passengerFlowTrend = res.data
    }

    return res
  })

  @action.bound
  getCarData = flow(function*() {
    const type = this.carSelect.get('车流量').timeType

    const res = yield getCarData({ type })

    if (res.code === 0) {
      this.carFlow = res.data
    }

    return res
  })

  @action.bound
  getCarTypeData = flow(function*() {
    const type = this.carSelect.get('车型数量').timeType

    const res = yield getCarTypeData({ type })

    if (res.code === 0) {
      this.carNumLine = res.data
    }

    return res
  })

  @action.bound
  setState(state) {
    Object.assign(this, state)
  }

  @action.bound
  changeActiveByPersonType(personType) {
    const newPersonSelect = [...this.personSelect].reduce(
      (prev, [perType, item]) => [...prev, [perType, { ...item, active: personType === perType }]],
      []
    )

    this.personSelect = new Map(newPersonSelect)
  }

  @action.bound
  changeTimeType(timeType) {
    this.personSelect.set('客流量趋势', { ...this.personSelect.get('客流量趋势'), timeType })
  }

  @action.bound
  changeActiveByCarType(personType) {
    const newCarSelect = [...this.carSelect].reduce(
      (prev, [perType, item]) => [...prev, [perType, { ...item, active: personType === perType }]],
      []
    )

    this.carSelect = new Map(newCarSelect)
  }

  @action.bound
  changeCarTimeType(timeType) {
    const [key, value] = [...this.carSelect].find(([key, { active }]) => active)

    this.carSelect.set(key, { ...value, timeType })
  }
}

export default new HomePageStore()
