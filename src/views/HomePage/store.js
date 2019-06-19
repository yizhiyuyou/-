import { observable, computed, action, flow } from 'mobx'

// import { getList } from './service'
import { TIME_LIST, PERSON_LIST } from '@/views/HomePage/const'

class HomePageStore {
  @observable isLoading = false

  // 客流中的所有选择项
  @observable personSelect = new Map(
    PERSON_LIST.map((type, index) => [
      type,
      { active: !index, timeType: TIME_LIST.get('今日').value },
    ])
  )

  // @action.bound
  // getList = flow(function*() {
  //   this.isLoading = true

  //   const params = this.getParams()

  //   const res = yield getList(params)

  //   if (res.code === 0) {
  //     this.list = res.list

  //     // 纠正分页信息（增加修改total或者减少修改current）
  //     const { total, pageCount } = res

  //     const pagination = { total, current: params.pageIndex }

  //     if (pageCount !== 0 && params.pageIndex > pageCount) {
  //       Object.assign(pagination, { current: pageCount })
  //     }

  //     this.setPagination(pagination)
  //   }

  //   this.isLoading = false

  //   return res
  // })

  @action.bound
  setState(state) {
    Object.assign(this, state)
  }

  @action.bound
  changeActiveByPersonType(personType) {
    const newPersonSelect = [...this.personSelect].reduce(
      (prev, [perType, item]) => [...prev, [perType, { ...item, active: personType === perType }]],
      []
    )

    this.personSelect = new Map(newPersonSelect)
  }

  @action.bound
  changeTimeType(timeType) {
    this.personSelect.set('客流量趋势', { ...this.personSelect.get('客流量趋势'), timeType })
  }
}

export default new HomePageStore()
