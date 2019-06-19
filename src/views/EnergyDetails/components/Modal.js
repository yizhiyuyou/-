import React from 'react'

import { useObserver } from 'mobx-react-lite'

import { Modal, Descriptions } from 'antd'

import styles from './Modal.module.less'

function EnergyDetailsModal({ value = {}, ...rest }) {
  return useObserver(() => (
    <Modal title="能耗详情" width="640px" footer={null} {...rest}>
      <Descriptions column={2} className={styles.descriptions}>
        <Descriptions.Item label="所属区域">{value.position}</Descriptions.Item>
        <Descriptions.Item label="能耗类型">{value.typeText}</Descriptions.Item>
        <Descriptions.Item label="上次读表数据">{value.lastMeterNumber}</Descriptions.Item>
        <Descriptions.Item label="本次读表数据">{value.meterNumber}</Descriptions.Item>
        <Descriptions.Item label="能耗计算数据">{value.meterData}</Descriptions.Item>
        <Descriptions.Item label="上报时间">{value.createTime}</Descriptions.Item>
        <Descriptions.Item label="上报人">{value.creator}</Descriptions.Item>
        <Descriptions.Item label="联系方式">{value.phone || '暂无'}</Descriptions.Item>
        <Descriptions.Item label="仪表拍图" span={2}>
          {value.imgList && value.imgList.length
            ? value.imgList.map((url, index) => (
                <img key={index} src={url} alt="仪表拍图" draggable="false" />
              ))
            : '暂无'}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  ))
}

export default EnergyDetailsModal
