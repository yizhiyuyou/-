import { observable, action, flow } from 'mobx'

import { getList, deleteItemById, saveData } from './service'

class DictionaryManaStore {
  @observable isLoading = false

  @observable search = { name: '' }

  @observable list = []

  @observable activeKey = []

  @action.bound
  getList = flow(function*() {
    this.isLoading = true

    const res = yield getList(this.search)

    if (res.code === 0) {
      this.list = res.list
    }

    this.isLoading = false

    return res
  })

  @action.bound
  deleteItemById = flow(function*(params) {
    this.isLoading = true

    const res = yield deleteItemById(params)

    this.isLoading = false

    return res
  })

  @action.bound
  saveData = flow(function*(params) {
    return yield saveData(params)
  })

  @action.bound
  setState(state) {
    Object.assign(this, state)
  }

  @action.bound
  setSearch(state) {
    Object.assign(this.search, state)
  }

  @action.bound
  setActiveKey(state) {
    this.activeKey = state
  }
}

export default new DictionaryManaStore()
