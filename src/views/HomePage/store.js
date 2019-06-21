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
  setState(state) {
    Object.assign(this, state)
  }

  changeTimeType(prop, timeType) {
    const [key, value] = [...this[prop]].find(([key, { active }]) => active)

    this[prop].set(key, { ...value, timeType })
  }

  @action.bound
  changePersonTimeType(timeType) {
    this.changeTimeType('personSelect', timeType)
  }

  @action.bound
  changeCarTimeType(timeType) {
    this.changeTimeType('carSelect', timeType)
  }

  changeActiveByType(prop, type) {
    const newData = [...this[prop]].reduce(
      (prev, [itemType, item]) => [...prev, [itemType, { ...item, active: type === itemType }]],
      []
    )

    this[prop] = new Map(newData)
  }

  @action.bound
  changeActiveByCarType(carType) {
    this.changeActiveByType('carSelect', carType)
  }

  @action.bound
  changeActiveByPersonType(personType) {
    this.changeActiveByType('personSelect', personType)
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
}

export default new HomePageStore()
