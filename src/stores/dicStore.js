import { observable, action, flow } from 'mobx'

// computed
import { getDicData } from '@/services'

class DicStore {
  map = new Map()

  // 事件类型
  @observable eventType = []
  // 事件状态
  @observable eventState = []
  // 过程类型
  @observable processType = []
  // 备件类型
  @observable sparepartType = []

  @observable loading = {}

  @action.bound
  getDictionaryByType = flow(function*(type, isUpload) {
    const map = this.map

    const dic = map.get(type)

    this.loading[type] = true

    // Promise 处理同时加载相同的字典
    if (dic && dic.then) {
      yield dic

      map.delete(type)

      return this[type]
    }

    // 如果已经获取且不需要强制请求，则从数据中取
    if (Array.isArray(dic) && dic.length && !isUpload) {
      return dic
    }

    const fetchPro = getDicData({ type })

    map.set(type, fetchPro)

    const res = yield fetchPro

    if (res.code === 0) {
      this[type] = res.data
    }

    this.loading[type] = false

    return this[type]
  })
}

export default new DicStore()
