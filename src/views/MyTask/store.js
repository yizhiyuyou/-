import { observable, computed, action, flow } from 'mobx'

import dicStore from '@/stores/dicStore'

import { getList } from './service'

import { STATUS_MAPPING_INFO } from './const'

class MyTaskStore {
  @observable list = []

  @computed get listCtd() {
    return this.list.map(({ state, eventType, ...rest }) => {
      const findObjType = dicStore.eventType.find(({ value }) => value === eventType)
      const findObjState = dicStore.eventState.find(({ value }) => +value === +state)
      const hasState = STATUS_MAPPING_INFO.has(state)

      return {
        ...rest,
        eventTypeText: findObjType ? findObjType.text : '',
        stateText: findObjState ? findObjState.text : '',
        color: hasState ? STATUS_MAPPING_INFO.get(state).color : '',
      }
    })
  }

  @action.bound
  getList = flow(function*(params) {
    const res = yield getList(params)

    if (res.code === 0) {
      this.list = res.list
    }

    return res
  })
}

export default new MyTaskStore()
