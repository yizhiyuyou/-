import md5 from 'md5'

import request from '@/utils/request'
import { restData } from '@/config'

// 用于页面登录
export function pageLogin (params) {
  const {
    username,
    password,
  } = params

  return request.post(restData.checkLoginUrl, {
    username,
    password: params.md5 ? password : md5(password),
  })
}

// 用于页面注销
export function pageLogout () {
  return request.post(restData.logoutUrl)
}

// 获取字典数据
export async function getDicData ({ type }) {
  const res = await request.get(restData.dictUrl)

  if (res.code === 0) {
    res.data = res.data[type].map(({ value, code }) => ({ text: value, value: +code }))
  }

  return res
}