import request from '@/utils/request'

// 列表
export function getList(params) {
  // const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
  //   if (!value) {
  //     return { ...prev }
  //   }

  //   return { ...prev, [key]: value }
  // }, {})

  return request.get('/rest/sparepart/sparepartmanagement/list', params)
}

// 删除
export function deleteItemById(params) {
  return request.post('/rest/sparepart/sparepartmanagement/delete', params)
}

// 保存 or 编辑
export function saveData(params) {
  const url = params.id
    ? '/rest/sparepart/sparepartmanagement/update'
    : '/rest/sparepart/sparepartmanagement/save'

  return request.post(url, params)
}
