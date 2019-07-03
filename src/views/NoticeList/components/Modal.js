import React, { useMemo } from 'react'

import { Modal } from 'antd'

import styles from './Modal.module.less'

function SparePartModal({ onOk, value, ...rest }) {
  const noticeContent = useMemo(
    () => ({
      __html: value.noticeContent,
    }),
    [value.noticeContent]
  )

  return (
    <Modal title="查看详情" destroyOnClose={true} {...rest}>
      <div className={styles.title}>{value.noticeTitle}</div>
      <div className={styles.info}>
        <span>发布人：{value.creator}</span>
        <span>发布时间：{value.createTime}</span>
      </div>
      <div dangerouslySetInnerHTML={noticeContent} />
    </Modal>
  )
}

export default SparePartModal
