/**
 * Axios扩展
 * 1. 浏览器端页面弹出网络异常提示
 * 2. 用户会话超时重定向至登录页
 * 可调整的配置项：
 * timeout
 * waringMsg
 * sessionTimeoutMsgPath
 * sessionTimeoutMsg
 * loginPage
 */
import Axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

import { stores } from '@/stores'
import history from './history'

import { getPropVal, compose } from './objectUtil'
import { restData, pages } from '@/config'

import { USER_STATUS } from '@/const'

// 网络请求超时时长
const timeout = restData.timeout

// 网络请求异常的统一提示信息
const waringMsg = restData.waringMsg

// 会话过期消息取值路径
const sessionTimeoutCodePath = restData.sessionTimeoutCodePath

// 会话过期判定消息
const sessionTimeoutCode = restData.sessionTimeoutCode

// 登录页地址
const loginPagePath = pages.login.path

/**
 * @description                    整理格式化相应的数据
 * @param     {Objet}   res        响应数据
 * @return    {Object}             整理后的数据
 */
function resFormat(res) {
  const { code, msg, respBody, respList, page } = res.data

  const temp = { code, msg }

  // 返回数据为list
  if (page) {
    let data = {
      list: page.list,
      pageIndex: page.currPage, // 当前页
      pageSize: page.pageSize, // 当前页条数
      pageCount: page.pages, // 总页数
      total: page.totalCount, // 总条数
    }

    Object.assign(temp, data)
  } else if (respList) {
    temp.list = respList
  } else if (respBody) {
    temp.data = { ...respBody }
  }

  return temp
}

/**
 * @description                       session 超时时的处理（不是请求超时）
 * @param  {Object}                   响应
 * @return {Object}                   响应数据或者是错误对象
 */
function sessionTimeout(res) {
  // 会话超时情况下，跳转至登录页并携带来时页面地址
  // 如果不是去往登录页或公开页，则执行跳转
  if (getPropVal(res, sessionTimeoutCodePath) === sessionTimeoutCode) {
    if (!history.location.pathname.startsWith(loginPagePath)) {
      stores.rootStore.clearUser()

      stores.rootStore.setTimestamp(`${Date.now()}`)

      stores.rootStore.setLoginStatus(USER_STATUS.get('已注销').status)
    }
  }

  return res
}

/**
 * @description                       统一的错误处理
 * @param  {Error}                    错误对象
 */
function catchError(e) {
  message.warning(waringMsg, 1.5)

  return Promise.reject(new Error(waringMsg))
}

// 相应处理（compose 从右往左执行）
const resProcess = compose(
  sessionTimeout,
  resFormat
)

export function get(url, data, config) {
  // 组装配置
  const conf = {
    ...config,
    method: 'get',
    url,
    params: data || null,
  }

  return request(conf)
}

export function post(url, data, config) {
  // 组装配置
  const conf = {
    transformRequest(data) {
      return qs.stringify(data)
    },
    ...config,
    method: 'post',
    url,
    data: data || null,
  }

  return request(conf)
}

async function request(config) {
  try {
    // 发起网络请求
    const res = await Axios.request(config)

    return await resProcess(res)
  } catch (e) {
    return catchError(e)
  }
}

// 网络请求拦截处理
Axios.defaults.timeout = timeout
Axios.defaults.headers.common['ProductInfo-Name'] = process.env.VUE_APP_NAME
Axios.defaults.headers.common['ProductInfo-Version'] = process.env.VUE_APP_VERSION

export default {
  get,
  post,
}
