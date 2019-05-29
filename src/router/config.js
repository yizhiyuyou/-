import { pages } from '@/config'

import { initRoutesMeta, getNavMenuConfig, downToUpReduceMetaAuthority } from '@/utils/router'

import BaseLayout from '../layouts/BaseLayout'

import HomePage from '@/views/HomePage'
import EventList from '@/views/EventList'
import MyTask from '@/views/MyTask'
import UniteMonitor from '@/views/UniteMonitor'
import LoginPage from '@/views/LoginPage'
import NoticeList from '@/views/NoticeList'
import SetNotice from '@/views/SetNotice'
import EnergyAnalysis from '@/views/EnergyAnalysis'
import EnergyDetail from '@/views/EnergyDetail'
import NoPermission from '@/components/NoPermission'
import NoFind from '@/components/NoFind'

const routes = [
  {
    path: '/home',
    component: BaseLayout,
    meta: { hideInMenu: true },
    children: [
      {
        path: '/home',
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
        path: '/infoMana/setNotice',
        exact: true,
        component: SetNotice,
        meta: {
          name: '公众反馈',
          title: '公众反馈',
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
        path: '/energyAnalysis/energyDetail',
        exact: true,
        component: EnergyDetail,
        meta: {
          name: '能耗明细',
          title: '能耗明细',
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
      path: 'http://www.gsm110.com/mygpsonline/gpsonline/jsp/monitor/main.jsp',
    },
  },
  {
    // 权限：服务区系统管理员、监管办主任、监管员、经营总负责人、日常经管领班经理
    path: 'dataVisualization',
    meta: {
      name: '数据可视化',
      icon: 'dataVisualization',
      path: 'datav',
      authority: [
        '1',
        '21e4b3941c4d4c44b944dd0417d0a32a',
        '5933d119dc2c4d2dbe298364fb8fde4e',
        'f5a5125103be40719b1da76f79d8381d',
        '8548348fa4f04d25a4f5b58d6072b76f',
      ],
      // path: 'https://datav.aliyun.com/share/29c87af5175fd94e32b15d93de174a32?spm=datav.10712494.0.0.38b14a9axAAMAh',
    },
  },
  {
    path: '/detail',
    component: BaseLayout,
    meta: {
      title: '查看详情',
      hideInMenu: true,
    },
    children: [
      {
        path: '/detail/event/:id',
        exact: true,
        component: EnergyAnalysis,
      },
    ],
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/403',
    exact: true,
    component: NoPermission,
  },
  {
    path: '/',
    exact: true,
    redirect: '/home',
  },
  {
    path: '*',
    component: NoFind,
  },
]

const reduceRoute = downToUpReduceMetaAuthority(initRoutesMeta(routes))

export const navMenuConfig = getNavMenuConfig(reduceRoute)

export default reduceRoute
