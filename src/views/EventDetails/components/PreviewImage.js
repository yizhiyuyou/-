import React, { useState, useLayoutEffect, useCallback } from 'react'

import { Modal } from 'antd'

const bodyStyle = { padding: 0 }

export default ({ url, onClose }) => {
  const [innerUrl, setInnerUrl] = useState('')

  useLayoutEffect(() => {
    url && setInnerUrl(url)
  }, [url])

  const afterClose = useCallback(() => {
    setInnerUrl('')
  }, [])

  return (
    <Modal
      width="40%"
      closable={false}
      visible={!!url}
      footer={null}
      onCancel={onClose}
      afterClose={afterClose}
      bodyStyle={bodyStyle}
      centered={true}
    >
      <img width="100%" src={innerUrl} alt="预览照片" />
    </Modal>
  )
}
