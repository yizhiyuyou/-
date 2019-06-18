import { observable, action, flow } from 'mobx'

import { getConsumeData } from './service'

class EnergyAnalysisStore {
  @observable search = { rangePicker: [null, null] }

  @observable lineChart = []

  @observable maxMinData = []

  @action.bound
  getConsumeData = flow(function*() {
    const params = this.getParams()

    const res = yield getConsumeData(params)

    if (res.code === 0) {
      const { lineChart, maxMinData } = res.data

      Object.assign(this, { lineChart, maxMinData })
    }

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
