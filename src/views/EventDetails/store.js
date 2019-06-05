import { observable, computed, action, flow } from 'mobx'

import dicStore from '@/stores/dicStore'

import { getBaseEventInfoById } from './service'

class EventDetailsStore {
  @observable baseInfo = {}

  @observable processList = []

  @observable state = ''

  @observable timeUsage = ''

  @computed get baseInfoCtd() {
    const {
      baseInfo,
      baseInfo: { eventType },
    } = this

    const findObj = dicStore.eventType.find(({ value }) => value === eventType)

    return {
      ...baseInfo,
      eventType: findObj ? findObj.text : '',
    }
  }

  @computed get processListCtd() {
    const { processList } = this
    const { processType: processTypeDic } = dicStore

    return processList.map(({ processType, handler, ...rest }) => {
      const findObj = processTypeDic.find(({ value }) => +value === +processType)
      const text = findObj ? findObj.text : ''

      return {
        ...rest,
        handler,
        title: text,
        discription: `${handler} ${text}`,
      }
    })
  }

  @computed get stateCtd() {
    const { state } = this

    const findObj = dicStore.eventState.find(({ value }) => +value === +state)

    return findObj ? findObj.text : ''
  }

  @action.bound
  getBaseEventInfoById = flow(function*(params) {
    const res = yield getBaseEventInfoById(params)

    if (res.code === 0) {
      const { baseInfo, processList, state, timeUsage } = res.data

      Object.assign(this, { baseInfo, processList, state, timeUsage })
    }

    return res
  })
}

export default new EventDetailsStore()
