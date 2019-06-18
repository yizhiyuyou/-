import { observable, action, flow } from 'mobx'

import { message } from 'antd'

import { pageLogin, pageLogout, appSessionLogin, getMyTaskNum } from '@/services'

import injectUser from '@/utils/injectUser'

import { USER_STATUS } from '@/const'

class RootStore {
  @observable id = ''
  @observable post = ''
  @observable mobile = ''
  @observable realname = ''
  @observable username = ''
  @observable roles = []
  @observable loginStatus = USER_STATUS.get('未登录').status
  @observable timestamp = `${Date.now()}`

  // 我的代办数量
  @observable myTaskNum = 0

  @action
  setUser(user) {
    Object.assign(this, user)
  }

  @action
  setLoginStatus(loginStatus) {
    this.loginStatus = loginStatus
  }

  @action
  setTimestamp(timestamp) {
    this.timestamp = timestamp
  }

  @action
  clearUser() {
    Object.assign(this, {
      id: '',
      post: '',
      mobile: '',
      realname: '',
      username: '',
      roles: [],
    })
  }

  @action.bound
  async pageLogout() {
    const { code, msg } = await pageLogout()

    if (code === 0) {
      message.success('注销成功,请重新登陆', 2)

      // 不知道为什么就是想让你看一下我的注销效果600
      await (time => new Promise(resolve => void setTimeout(resolve, time)))(600)

      this.clearUser()

      this.setTimestamp(`${Date.now()}`)

      this.setLoginStatus(USER_STATUS.get('已注销').status)
    } else {
      message.warning(msg || '注销失败，请重新注销', 2)
    }

    return { code, msg }
  }

  @action.bound
  async pageLogin(params) {
    this.setLoginStatus(USER_STATUS.get('登陆中').status)

    const res = await pageLogin(params)

    const { code, msg } = this.injectUser(res)

    if (code === 'success') {
      message.success('登陆成功正在为你跳转', 2)

      // 不知道为什么就是想让你看一下我的登录效果600
      await (time => new Promise(resolve => void setTimeout(resolve, time)))(800)

      this.setLoginStatus(USER_STATUS.get('已登录').status)

      this.setTimestamp(`${Date.now()}`)
    } else {
      this.setLoginStatus(USER_STATUS.get('已注销').status)

      message.warning(msg || '登录失败，请重新登录', 2)

      // 不知道为什么就是想让你看一下我的登录效果600
      await (time => new Promise(resolve => void setTimeout(resolve, time)))(800)
    }

    return { code, msg }
  }

  @action.bound
  async appLogin() {
    this.setLoginStatus(USER_STATUS.get('登陆中').status)

    const res = await appSessionLogin()

    const { code, msg } = this.injectUser(res)

    if (code === 'success') {
      this.setLoginStatus(USER_STATUS.get('已登录').status)

      this.setTimestamp(`${Date.now()}`)
    } else {
      this.setLoginStatus(USER_STATUS.get('已注销').status)
    }

    return { code, msg }
  }

  @action
  injectUser(res) {
    if (res.code === 0) {
      const info = injectUser(res)

      if (typeof info !== 'boolean') {
        this.setUser(info.user)
      }

      return info ? { code: 'success' } : { code: 'error', msg: '用户信息注入失败' }
    }

    return {
      code: res.code || 'error',
      msg: res.msg || '登录失败了',
    }
  }

  @action.bound
  getMyTaskNum = flow(function*() {
    const res = yield getMyTaskNum()

    if (res.code === 0) {
      this.myTaskNum = res.data.myCount
    }

    return res
  })
}

export default new RootStore()
