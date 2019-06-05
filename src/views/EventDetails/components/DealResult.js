import React, { useState, useCallback, useMemo } from 'react'

import classnames from 'classnames'

import { Descriptions } from 'antd'

import HeaderTitle from './HeaderTitle'
import PreviewImage from '@/components/PreviewImage'

import styles from './DealResult.module.less'

const { Item } = Descriptions

export default props => {
  let { imgList } = props
  imgList = Array.isArray(imgList) ? imgList : []

  const [url, setUrl] = useState('')

  const handleClose = useCallback(() => {
    setUrl('')
  }, [])

  const topClassName = useMemo(() => {
    return classnames(styles['real-result'], props.className)
  }, [styles['real-result'], props.className])

  return (
    <div className={topClassName}>
      <div className={styles.header}>
        <HeaderTitle title={props.title} />
        <span className={styles['header-right']}>{props.handleTime}</span>
      </div>
      <div className={styles.main}>
        <Descriptions>
          <Item label="处&ensp;理&ensp;人">{props.handler}</Item>
          <Item label="联系方式" span={2}>
            {props.phone}
          </Item>
          <Item label="描&emsp;&emsp;述" span={3}>
            {props.markNote}
          </Item>
          <Item label="照&emsp;&emsp;片" span={3}>
            {imgList.length
              ? imgList.map(url => (
                  <img
                    key={url}
                    src={url}
                    onClick={() => setUrl(url)}
                    alt="照片"
                    draggable="false"
                  />
                ))
              : '未录入照片'}
          </Item>
        </Descriptions>
      </div>
      <PreviewImage url={url} onClose={handleClose} />
    </div>
  )
}
