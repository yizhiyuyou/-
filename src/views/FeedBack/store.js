import { observable, computed, action, flow } from 'mobx'

import dicStore from '@/stores/dicStore'

import { getList, getChartList } from './service'

class FeedBackStore {
  @observable isLoading = false

  @observable isLoadingByChart = false

  @observable search = { rangePicker: [], score: '' }

  @observable pagination = {
    // 当前页
    current: 1,
    // 一夜多少
    pageSize: 6,
    // 总个数
    total: 0,
  }

  @observable list = []

  @computed get listCtd() {
    return this.list.map(({ score, ...rest }) => {
      const findObj = dicStore.manyidu.find(({ value }) => +value === +score)

      return {
        ...rest,
        score,
        scoreText: findObj ? findObj.text : '',
      }
    })
  }

  // 图表数据
  @observable chartList = []

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
  getChartList = flow(function*() {
    this.isLoadingByChart = true

    const params = this.getParams()

    const res = yield getChartList(params)

    if (res.code === 0) {
      this.chartList = res.list
    }

    this.isLoadingByChart = false

    return res
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

export default new FeedBackStore()
