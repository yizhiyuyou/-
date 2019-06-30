import { observable, action, flow } from 'mobx'

import { getList, deleteItemById } from './service'

class DeptManaStore {
  @observable isLoading = false

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
  setState(state) {
    Object.assign(this, state)
  }

  @action.bound
  setPagination(state) {
    Object.assign(this.pagination, state)
  }

  getParams() {
    const { current: pageIndex, pageSize } = this.pagination

    return { pageIndex, pageSize }
  }
}

export default new DeptManaStore()
