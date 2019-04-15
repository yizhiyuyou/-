import { observable, action, computed } from 'mobx'

import { getDicData } from '@/services'

class DicStore {
  @observable eventType = []

  @computed
  get eventTypeDic () {
    const { eventType } = this

    return Array.isArray(eventType) ? eventType : []
  }

  @action.bound
  async sendGetDicReq (params) {
    // 调用获取字典接口
    const res = await getDicData(params)

    const { code } = res

    // 成功则修改字典
    if (code === 0) {
      const data = res.list.map(({ name, value, parentName, typeId }) =>
        ({ value, text: name, parentName, typeId }))

      this[params.type] = data

      return data
    }
  }

  @action.bound
  getDictionaryByType (type, isUpload) {
    const { [type]: dic = [] } = this

    // 如果已经获取且不需要强制请求，则从数据中取
    if (Array.isArray(dic) && dic.length && !isUpload) { return dic }

    // Promise 处理同时加载相同的字典
    if (dic && dic.then) { return dic }

    const fetchPro = this.sendGetDicReq({ type })

    this[type] = fetchPro

    // 否则发送请求从后端获取
    return fetchPro
  }
}

export default new DicStore()
