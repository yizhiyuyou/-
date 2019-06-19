import { get, post } from '@/utils/request'

// 列表
export async function getList(params) {
  // 理应对用户未填写或未选择的数据过滤掉，不用传给后端
  const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
    if (!value) {
      return { ...prev }
    }

    return { ...prev, [key]: value }
  }, {})

  const res = await get('/rest/energy/energyconsu/list', filterParams)

  if (res.code === 0) {
    res.list = res.list.map(
      ({
        lastMeterNumber,
        phone,
        createTime,
        type,
        position,
        meterNumber,
        meterData,
        creator,
        id,
        imgList,
      }) => ({
        createTime,
        type,
        position,
        meterNumber,
        meterData,
        creator,
        id,
        lastMeterNumber,
        phone,
        imgList: imgList ? imgList.map(({ url }) => url) : [],
      })
    )
  }

  return res
}

// 删除
export function deleteItemById({ ids }) {
  return post('/rest/energy/energyconsu/delete', { ids: JSON.stringify(ids) })
}

// 保存 or 编辑
export function saveData(params) {
  const url = params.id
    ? '/rest/sparepart/sparepartmanagement/update'
    : '/rest/sparepart/sparepartmanagement/save'

  return post(url, params)
}
