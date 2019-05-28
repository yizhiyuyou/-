/** 开发模式 */
export const devMode = false

/** 产品信息 */
// 产品信息放到了 .env

/** 后端服务对接相关配置 */
export const restData = {
  // 用户登录校验接口地址
  checkLoginUrl: '/rest/default/login',

  // 用户注销登录接口地址
  logoutUrl: '/rest/default/logout',

  // 获取用户信息(检查会话状态)的接口地址
  checkUserInfoUrl: '/rest/sys/user/info',

  // 字典的接口地址
  dictUrl: '/rest/sys/dict/list',

  // 返回数据中用户对象配置的路径
  authUserPath: 'data',

  // 返回数据中会话超时信息路径
  sessionTimeoutCodePath: 'code',

  // 服务端返回的用户会话超时判定信息
  // sessionTimeoutMsg: 'hndfsj_app_session_timeout',
  sessionTimeoutCode: 401,

  // 网络请求异常的统一提示信息
  waringMsg: '数据服务通信异常',

  // 网络请求超时时长
  timeout: 19000,
}

// 系统内置角色名称定义(与后端对应)
export const roleNames = {
  // 大队长
  ddz: 'JDYW_E_CHANICAL_HEADER',
}

/** 系统关键路由 */
export const pages = {
  // 登录页
  login: {
    path: '/login',
    name: 'login',
  },

  // 主页
  home: {
    path: '/home',
    name: 'home',
  },
}

export default {
  devMode,
  restData,
  pages,
}
