import md5 from 'md5'

import { get, post } from '@/utils/request'
import { restData } from '@/config'

// 用于页面登录
export function pageLogin(params) {
  const { username, password } = params

  return post(restData.checkLoginUrl, {
    username,
    password: params.md5 ? password : md5(password),
  })
}

// 用于页面注销
export function pageLogout() {
  return post(restData.logoutUrl)
}

// 获取字典数据
export async function getDicData({ type }) {
  const res = await get(restData.dictUrl)

  if (res.code === 0) {
    res.data = res.data[type].map(({ value, code }) => ({ text: value, value: code }))
  }

  return res
}

// session登录
export function appSessionLogin() {
  return get(restData.checkUserInfoUrl)
}

// 我的代办信息
export function getMyTaskNum() {
  return get('/rest/statistic/event/myunfinishedevents')
}

// 信息管理-信息发布
export function goInfoRelease() {
  return get('/rest/v1/token')
}
