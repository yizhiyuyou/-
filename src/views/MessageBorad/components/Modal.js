import React from 'react'

import { useObserver } from 'mobx-react-lite'

import { Modal, Descriptions } from 'antd'

import styles from './Modal.module.less'

function MessageBoradModal({ value = {}, ...rest }) {
  return useObserver(() => (
    <Modal title="详情" width="640px" footer={null} {...rest}>
      <Descriptions column={2} className={styles.descriptions}>
        <Descriptions.Item label="微信昵称" children={value.nickname} span={2} />
        <Descriptions.Item label="创建时间" children={value.createTime} />
        <Descriptions.Item label="所属地区" children={value.city} />
        <Descriptions.Item label="留言内容" children={value.content} />
      </Descriptions>
    </Modal>
  ))
}

export default MessageBoradModal
