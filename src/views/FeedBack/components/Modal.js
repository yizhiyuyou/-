import React from 'react'

import { Modal, Descriptions } from 'antd'

import styles from './Modal.module.less'

function FeedBackModal({ value, ...rest }) {
  return (
    <Modal title="查看详情" width="640px" footer={null} {...rest}>
      <Descriptions column={2} className={styles.descriptions}>
        <Descriptions.Item label="反馈时间" children={value.createTime} />
        <Descriptions.Item label="类型" children={value.scoreText} />
        <Descriptions.Item label="联系电话" span={2} children={value.createPhone} />
        <Descriptions.Item label="反馈内容" span={2} children={value.content} />
      </Descriptions>
    </Modal>
  )
}

export default FeedBackModal
