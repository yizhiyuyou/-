import { observable, action } from 'mobx'

import { message } from 'antd'

import { pageLogin, pageLogout } from '@/services'

import injectUser from '@/utils/injectUser'

class RootStore {
  @observable id = ''
  @observable post = ''
  @observable mobile = ''
  @observable realname = ''
  @observable username = ''
  @observable roles = []
  @observable loaded = false

  @action
  setUser(user) {
    Object.assign(this, user)
  }

  @action
  setLoaded(loaded) {
    this.loaded = loaded
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

      // 不知道为什么就是想让你看一下我的登录效果600
      await (time => new Promise(resolve => void setTimeout(resolve, time)))(800)

      this.clearUser()

      this.setLoaded(false)
    } else {
      message.warning(msg || '注销失败，请重新注销', 2)
    }

    return { code, msg }
  }

  @action.bound
  async pageLogin(params) {
    const res = await pageLogin(params)

    const { code, msg } = this.injectUser(res)

    if (code === 'success') {
      message.success('登陆成功正在为你跳转', 2)

      // 不知道为什么就是想让你看一下我的登录效果600
      await (time => new Promise(resolve => void setTimeout(resolve, time)))(800)

      this.setLoaded(true)
    } else {
      message.warning(msg || '登录失败，请重新登录', 2)

      // 不知道为什么就是想让你看一下我的登录效果600
      await (time => new Promise(resolve => void setTimeout(resolve, time)))(800)
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
}

export default new RootStore()
