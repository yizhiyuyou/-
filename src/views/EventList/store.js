import { observable, action, flow } from 'mobx'

import { getEventList, deleteEventById } from './service'

class EventListStore {
  @observable list = []

  @action.bound
  getEventList = flow(function* (params) {
    const res = yield getEventList(params)

    if (res.code === 0) {
      this.list = res.list
    }

    return res
  })

  @action
  deleteEventById (params) {
    return deleteEventById(params)
  }
}

export default new EventListStore()

