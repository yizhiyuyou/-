import { observable, action, flow } from 'mobx'

import moment from 'moment'

import { getData } from './service'

class EnergyAnalysisStore {
  @observable isLoading = false

  @observable search = { rangePicker: [moment().subtract(1, 'years'), moment()] }

  @observable lineChart = []

  @observable maxMinData = []

  @action.bound
  getData = flow(function*() {
    this.isLoading = true

    const params = this.getParams()

    const res = yield getData(params)

    if (res.code === 0) {
      const { lineChart, maxMinData } = res.data

      Object.assign(this, { lineChart, maxMinData })
    }

    this.isLoading = false

    return res
  })

  @action.bound
  setSearch(state) {
    Object.assign(this.search, state)
  }

  getParams() {
    const [start, end] = this.search.rangePicker

    const params = {}

    if (start) {
      Object.assign(params, { startYear: start.year(), startMonth: start.month() + 1 })
    }

    if (end) {
      Object.assign(params, { endYear: end.year(), endMonth: end.month() + 1 })
    }

    return params
  }
}

export default new EnergyAnalysisStore()
