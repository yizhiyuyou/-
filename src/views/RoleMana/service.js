import { get, post } from '@/utils/request'

// 列表
export async function getList(params) {
  // 理应对用户未填写或未选择的数据过滤掉，不用传给后端(该出后端处理错误，前端不传用户没有输入的字段，后端莫名报错)
  // const filterParams = Object.entries(params).reduce((prev, [key, value]) => {
  //   if (!value) {
  //     return { ...prev }
  //   }

  //   return { ...prev, [key]: value }
  // }, {})

  const res = await get('/rest/sys/role/list', params)

  if (res.code === 0) {
    res.list = res.list.map(({ roleName, createTime, deptName, remark, deptId, roleId: id }) => ({
      roleName,
      createTime,
      deptName,
      remark,
      deptId,
      id,
    }))
  }

  return res
}

// 删除
export function deleteItemById({ id }) {
  return post('/rest/sys/role/delete', { roleId: id })
}

// 保存
export function saveData({ id, ...rest }) {
  const newParams = id ? { ...rest, roleId: id } : { ...rest }

  return post(id ? '/rest/sys/role/update' : '/rest/sys/role/save', newParams)
}
