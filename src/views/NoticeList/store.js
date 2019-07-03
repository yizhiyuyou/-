import { observable, action, flow } from 'mobx'

import { getList, deleteItemById, saveData } from './service'

class NoticeListStore {
  @observable isLoading = false

  @observable search = { rangePicker: [], noticeTitle: '' }

  @observable pagination = {
    // 当前页
    current: 1,
    // 一夜多少
    pageSize: 10,
    // 总个数
    total: 0,
  }

  @observable list = []

  @action.bound
  getList = flow(function*() {
    this.isLoading = true

    const params = this.getParams()

    const res = yield getList(params)

    if (res.code === 0) {
      this.list = res.list

      // 纠正分页信息（增加修改total或者减少修改current）
      const { total, pageCount } = res

      const pagination = { total, current: params.pageIndex }

      if (pageCount !== 0 && params.pageIndex > pageCount) {
        Object.assign(pagination, { current: pageCount })
      }

      this.setPagination(pagination)
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
  setPagination(state) {
    Object.assign(this.pagination, state)
  }

  getParams() {
    const {
      pagination: { current: pageIndex, pageSize },
      search: { rangePicker, ...rest },
    } = this

    const params = { pageIndex, pageSize, ...rest }

    if (rangePicker.length === 2) {
      Object.assign(params, { startTime: rangePicker[0].unix(), endTime: rangePicker[1].unix() })
    }

    return params
  }
}

export default new NoticeListStore()
