import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'

import { Menu } from 'antd'

import styles from './NavMenu.module.less'

const { SubMenu, Item } = Menu

export const NavMenu = ({ history, location, match }) => {
  const handleClick = useCallback(({ key }) => {
    if (/\^.*\$/.test(key)) {
      const url = /\^(.*)\$/.exec(key)[1]

      url && window.open(url, '_blank')
    } else {
      history.push(key)
    }
  }, [])

  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      theme="dark"
      className={styles['menu-container']}
    >
      <Item key="/home">
        <img src="/static/img/layout/home.png" alt="首页图标" className={styles['img-icon']} />
        <span>首页</span>
      </Item>
      <SubMenu key="sub1" title={<span><img src="/static/img/layout/eventMana.png" alt="事件管理图标" className={styles['img-icon']} /><span>事件管理</span></span>}>
        <Item key="/eventMana">事件列表</Item>
        <Item key="/eventMana/myTask">我的待办</Item>
      </SubMenu>
      <SubMenu key="sub2" title={<span><img src="/static/img/layout/infoMana.png" alt="信息管理图标" className={styles['img-icon']} /><span>信息管理</span></span>}>
        <Item key="/infoMana">通知公告</Item>
        <Item key="/infoMana/setNotice">查询及信息发布</Item>
      </SubMenu>
      <Item key="/uniteMonitor">
      <img src="/static/img/layout/uniteMonitor.png" alt="统一监控图标" className={styles['img-icon']} />
        <span>统一监控</span>
      </Item>
      <SubMenu key="sub3" title={<span><img src="/static/img/layout/eventMana.png" alt="信息管理图标" className={styles['img-icon']} /><span>能耗管理</span></span>}>
        <Item key="/energyAnalysis">能耗分析</Item>
        <Item key="/energyAnalysis/energyDetail">能耗明细</Item>
      </SubMenu>
      <Item key="^https://www.baidu.com$">
        <img src="/static/img/layout/realTimePositioning.png" alt="实时定位图标" className={styles['img-icon']} />
        <span>实时定位</span>
      </Item>
    </Menu>
  )
}

export default withRouter(NavMenu)