import md5 from 'md5'

import { get, post } from '@/utils/request'

// 用户信息
export async function getUserInfo({ id }) {
  const res = await get(`/rest/sys/user/info/${id}`)

  if (res.code === 0) {
    const { realname, username, deptId, post, mobile, roleIdList, status } = res.data

    res.data = {
      realname,
      username,
      deptId,
      post,
      mobile,
      roleIdList,
      status,
    }
  }

  return res
}

const TYPE_MAPPING_CONFIG = new Map([
  ['dept', { url: '/rest/sys/dept/deptlist', props: ['name', 'deptId'] }],
  ['role', { url: '/rest/sys/role/select', props: ['roleName', 'roleId'] }],
])

// 部门列表
export async function getDataByType(type) {
  if (!TYPE_MAPPING_CONFIG.has(type)) {
    throw new Error('参数类型不合法')
  }

  const {
    url,
    props: [textProp, valueProp],
  } = TYPE_MAPPING_CONFIG.get(type)

  const res = await get(url)

  if (res.code === 0) {
    res.list = res.list.map(({ [textProp]: text, [valueProp]: value }) => ({ text, value }))
  }

  return res
}

// 保存
export function saveUserInfo({ id, password, ...rest }) {
  const newParams = id ? { ...rest, userId: id } : { ...rest, password: md5(password) }

  return post(id ? '/rest/sys/user/update' : '/rest/sys/user/save', {
    entity: JSON.stringify(newParams),
  })
}

// 校验用户名
export function validateUserName(params) {
  return get('/rest/sys/user/isexist', params).then(
    res => {
      if (res.code === 0) {
        return
      } else {
        return Promise.reject(new Error(res.msg || '用户名校验失败'))
      }
    },
    () => {
      return Promise.reject(new Error('用户名校验失败'))
    }
  )
}
