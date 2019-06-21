import React from 'react'

import { pages } from '@/config'

import {
  initRoutesMeta,
  getNavMenuConfig,
  downToUpReduceMetaAuthority,
  getFlatData,
} from '@/utils/router'

import BaseLayout from '@/layouts/BaseLayout'
import DetailsLayout from '@/layouts/DetailsLayout'

import NoPermission from '@/components/NoPermission'
import NoFind from '@/components/NoFind'

const HomePage = React.lazy(() => import('../views/HomePage'))

const EventList = React.lazy(() => import('../views/EventList'))
const MyTask = React.lazy(() => import('../views/MyTask'))

const UserMana = React.lazy(() => import('../views/UserMana'))
const DeptMana = React.lazy(() => import('../views/DeptMana'))
const RoleMana = React.lazy(() => import('../views/RoleMana'))
const UserAdd = React.lazy(() => import('../views/UserAdd'))
const DeptAdd = React.lazy(() => import('../views/DeptAdd'))
const DictionaryMana = React.lazy(() => import('../views/DictionaryMana'))
const SystemLog = React.lazy(() => import('../views/SystemLog'))

const NoticeList = React.lazy(() => import('../views/NoticeList'))
const FeedBack = React.lazy(() => import('../views/FeedBack'))
const MessageBorad = React.lazy(() => import('../views/MessageBorad'))
const NoticeAdd = React.lazy(() => import('../views/NoticeAdd'))

const EnergyAnalysis = React.lazy(() => import('../views/EnergyAnalysis'))
const EnergyDetails = React.lazy(() => import('../views/EnergyDetails'))

const SparePartStock = React.lazy(() => import('../views/SparePartStock'))

const EventDetails = React.lazy(() => import('../views/EventDetails'))

const UniteMonitor = React.lazy(() => import('../views/UniteMonitor'))

const LoginPage = React.lazy(() => import('../views/LoginPage'))

const routes = [
  {
    path: pages.home.path,
    component: BaseLayout,
    meta: { hideInMenu: true },
    children: [
      {
        path: `${pages.home.path}/`,
        exact: true,
        component: HomePage,
        meta: {
          name: '首页',
          title: '首页',
          icon: pages.home.name,
          authority: true,
        },
      },
    ],
  },
  {
    // 权限：服务区系统管理员、监管办主任、监管员、经营总负责人
    path: '/systemMana',
    component: BaseLayout,
    meta: {
      name: '系统管理',
      icon: 'set',
    },
    children: [
      {
        path: '/systemMana/',
        component: UserMana,
        exact: true,
        meta: {
          name: '用户管理',
          title: '用户管理',
          authority: ['1', 'f5a5125103be40719b1da76f79d8381d'],
        },
      },
      {
        path: '/systemMana/deptMana',
        component: DeptMana,
        exact: true,
        meta: {
          name: '部门管理',
          title: '部门管理',
          authority: ['1'],
        },
      },
      {
        path: '/systemMana/roleMana',
        component: RoleMana,
        exact: true,
        meta: {
          name: '角色管理',
          title: '角色管理',
          authority: ['1'],
        },
      },
      {
        path: '/systemMana/userAdd',
        component: UserAdd,
        exact: true,
        meta: {
          hideInMenu: true,
          name: '新增用户',
          title: '新增用户',
          authority: ['1'],
        },
      },
      {
        path: '/systemMana/deptAdd',
        component: DeptAdd,
        exact: true,
        meta: {
          hideInMenu: true,
          name: '新增部门',
          title: '新增部门',
        },
      },
      {
        path: '/systemMana/dictionaryMana',
        component: DictionaryMana,
        exact: true,
        meta: {
          name: '字典管理',
          title: '字典管理',
          authority: ['1'],
        },
      },
      {
        path: '/systemMana/systemLog',
        component: SystemLog,
        exact: true,
        meta: {
          name: '系统日志',
          title: '系统日志',
          authority: ['1'],
        },
      },
    ],
  },
  {
    path: '/eventMana',
    component: BaseLayout,
    meta: { name: '事件管理', icon: 'eventMana' },
    children: [
      {
        path: '/eventMana/',
        exact: true,
        component: EventList,
        meta: {
          name: '事件列表',
          title: '事件列表',
          authority: true,
        },
      },
      {
        path: '/eventMana/myTask',
        exact: true,
        component: MyTask,
        meta: {
          name: '我的待办',
          title: '我的待办',
          authority: true,
        },
      },
    ],
  },
  {
    path: '/infoMana',
    component: BaseLayout,
    meta: { name: '信息管理', icon: 'infoMana' },
    children: [
      {
        path: '/infoMana/',
        exact: true,
        component: NoticeList,
        meta: {
          name: '通知公告',
          title: '通知公告',
          authority: true,
        },
      },
      {
        path: '/infoMana/feedback',
        exact: true,
        component: FeedBack,
        meta: {
          name: '公众反馈',
          title: '公众反馈',
          authority: true,
        },
      },
      {
        path: '/infoMana/messageBorad',
        component: MessageBorad,
        meta: {
          name: '公众留言',
          title: '公众留言',
          authority: true,
        },
      },
      {
        path: '/infoMana/noticeAdd',
        component: NoticeAdd,
        meta: {
          hideInMenu: true,
          name: '新建通知',
          title: '新建通知',
        },
      },
      {
        path: 'infoRelease',
        meta: {
          name: '信息发布',
          title: '信息发布',
          path: '^https://fuwuqu-t.trial.hndfsj.net/zhfwq-touch/rest/default/welcome$',
        },
      },
    ],
  },
  {
    path: '/energyAnalysis',
    component: BaseLayout,
    meta: { name: '能耗管理', icon: 'energy' },
    children: [
      {
        path: '/energyAnalysis/',
        exact: true,
        component: EnergyAnalysis,
        meta: {
          name: '能耗分析',
          title: '能耗分析',
          authority: true,
        },
      },
      {
        path: '/energyAnalysis/EnergyDetails',
        exact: true,
        component: EnergyDetails,
        meta: {
          name: '能耗明细',
          title: '能耗明细',
          authority: true,
        },
      },
    ],
  },
  {
    path: '/sparePartStock',
    component: BaseLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: '/sparePartStock/',
        exact: true,
        component: SparePartStock,
        meta: {
          name: '备件库存',
          title: '备件库存',
          icon: 'infoMana',
          authority: true,
        },
      },
    ],
  },
  {
    path: '/uniteMonitor',
    component: BaseLayout,
    meta: { hideInMenu: true },
    children: [
      {
        path: '/uniteMonitor/',
        component: UniteMonitor,
        meta: {
          name: '统一监控',
          title: '统一监控',
          icon: 'uniteMonitor',
          authority: true,
        },
      },
    ],
  },
  {
    path: 'outsideLink',
    meta: {
      name: '实时定位',
      icon: 'realTimePositioning',
      path: '^http://www.gsm110.com/mygpsonline/gpsonline/jsp/monitor/main.jsp$',
    },
  },
  {
    // 权限：服务区系统管理员、监管办主任、监管员、经营总负责人、日常经管领班经理
    path: 'dataVisualization',
    meta: {
      name: '数据可视化',
      icon: 'dataVisualization',
      authority: [
        '1',
        '21e4b3941c4d4c44b944dd0417d0a32a',
        '5933d119dc2c4d2dbe298364fb8fde4e',
        'f5a5125103be40719b1da76f79d8381d',
        '8548348fa4f04d25a4f5b58d6072b76f',
      ],
      path: '^https://datav.aliyun.com/share/29c87af5175fd94e32b15d93de174a32$',
    },
  },
  {
    path: '/detail',
    component: DetailsLayout,
    meta: {
      title: '查看详情',
      hideInMenu: true,
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: '/detail/event/:id',
        exact: true,
        component: EventDetails,
        meta: {
          authority: true,
        },
      },
    ],
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: '/403',
    exact: true,
    component: NoPermission,
    meta: {
      hideInMenu: true,
      title: '你没有权限访问该页面',
    },
  },
  {
    path: '/',
    exact: true,
    redirect: '/home/',
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: '*',
    component: NoFind,
    meta: {
      hideInMenu: true,
      title: '没找到你要访问的页面',
    },
  },
]

const reduceRoute = downToUpReduceMetaAuthority(initRoutesMeta(routes))

export const navMenuConfig = getNavMenuConfig(reduceRoute, 'path')

export const flatConfig = getFlatData(navMenuConfig)

export default reduceRoute
