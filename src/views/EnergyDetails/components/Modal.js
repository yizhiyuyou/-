import React from 'react'

import { useObserver } from 'mobx-react-lite'

import { Modal, Descriptions } from 'antd'

import styles from './Modal.module.less'

function EnergyDetailsModal({ value = {}, ...rest }) {
  return useObserver(() => (
    <Modal title="能耗详情" width="640px" footer={null} {...rest}>
      <Descriptions column={2} className={styles.descriptions}>
        <Descriptions.Item label="所属区域" children={value.position} />
        <Descriptions.Item label="能耗类型" children={value.typeText} />
        <Descriptions.Item label="上次读表数据" children={value.lastMeterNumber} />
        <Descriptions.Item label="本次读表数据" children={value.meterNumber} />
        <Descriptions.Item label="能耗计算数据" children={value.meterData} />
        <Descriptions.Item label="上报时间" children={value.createTime} />
        <Descriptions.Item label="上报人" children={value.creator} />
        <Descriptions.Item label="联系方式" children={value.phone || '暂无'} />
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
