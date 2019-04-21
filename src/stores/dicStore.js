import { observable, action, runInAction } from 'mobx'
// computed
import { getDicData } from '@/services'

function getDicFn () {
  const map = new Map()

  return async function (type, isUpload) {
    const dic = map.get(type)

    // Promise 处理同时加载相同的字典
    if (dic && dic.then) {
      await dic

      map.delete(type)
      
      return this[type]
    }

    // 如果已经获取且不需要强制请求，则从数据中取
    if (Array.isArray(dic) && dic.length && !isUpload) { return dic }

    const fetchPro = getDicData({ type })
    
    map.set(type, fetchPro)

    const res = await fetchPro

    if (res.code === 0) {
      runInAction(() => {
        this[type] = res.data
      })
    }

    return this[type]
  }
}

class DicStore {
  @observable eventType = []
  @observable eventState = []

  @action
  getDictionaryByType = getDicFn()
}

export default new DicStore()
