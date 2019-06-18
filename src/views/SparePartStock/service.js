import { get, post } from '@/utils/request'

// 列表
export function getList(params) {
  // 理应对用户未填写或未选择的数据过滤掉，不用传给后端
  // const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
  //   if (!value) {
  //     return { ...prev }
  //   }

  //   return { ...prev, [key]: value }
  // }, {})

  return get('/rest/sparepart/sparepartmanagement/list', params)
}

// 删除
export function deleteItemById(params) {
  return post('/rest/sparepart/sparepartmanagement/delete', params)
}

// 保存 or 编辑
export function saveData(params) {
  const url = params.id
    ? '/rest/sparepart/sparepartmanagement/update'
    : '/rest/sparepart/sparepartmanagement/save'

  return post(url, params)
}
