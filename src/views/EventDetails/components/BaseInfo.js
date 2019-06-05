import React, { useState, useCallback } from 'react'

import { Descriptions } from 'antd'

import HeaderTitle from './HeaderTitle'
import PreviewImage from './PreviewImage'

import styles from './BaseInfo.module.less'

const { Item } = Descriptions

export default props => {
  let { imgList } = props
  imgList = Array.isArray(imgList) ? imgList : []

  const [url, setUrl] = useState('')

  const handleClose = useCallback(() => {
    setUrl('')
  }, [])

  return (
    <div className={styles['base-info']}>
      <div className={styles.header}>
        <HeaderTitle title="基本信息" />
        <span className={styles['header-right']}>编号：{props.eventNum}</span>
      </div>
      <div className={styles.main}>
        <Descriptions>
          <Item label="填&ensp;报&ensp;人">{props.creator}</Item>
          <Item label="联系方式">{props.phone}</Item>
          <Item label="填报时间">{props.createTime}</Item>
          <Item label="事件类型">{props.eventType}</Item>
          <Item label="区域位置" span={2}>
            {props.position}
          </Item>
          <Item label="抄&ensp;送&ensp;人" span={3}>
            {props.copyListName}
          </Item>
          <Item label="描&emsp;&emsp;述" span={3}>
            {props.markNote}
          </Item>
          <Item label="照&emsp;&emsp;片" span={3}>
            {imgList.length
              ? imgList.map(url => (
                  <img key={url} src={url} alt="照片" onClick={() => setUrl(url)} />
                ))
              : '未录入照片'}
          </Item>
        </Descriptions>
      </div>
      <div className={styles.footer}>
        <span>处理人：</span>
        <span>{props.handlerListName}</span>
      </div>
      <PreviewImage url={url} onClose={handleClose} />
    </div>
  )
}
