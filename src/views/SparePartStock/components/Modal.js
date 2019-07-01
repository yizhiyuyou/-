import React, { useMemo, useRef, useCallback } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Modal } from 'antd'

import Form from './Form'

const btnProps = {
  size: 'large',
}

function SparePartModal({ onOk, value, ...rest }) {
  const formRef = useRef(null)

  const handleOk = useCallback(() => {
    const {
      current: { validateFields, getFieldsValue },
    } = formRef

    validateFields(err => {
      if (err) {
        return
      }

      onOk(Object.assign({}, value, getFieldsValue()))
    })
  }, [onOk, value])

  const MemoForm = useMemo(() => <Form value={value} wrappedComponentRef={formRef} />, [value])

  return useObserver(() => (
    <Modal
      title={value.id ? '编辑' : '设备入库'}
      width="960px"
      destroyOnClose={true}
      okButtonProps={btnProps}
      cancelButtonProps={btnProps}
      onOk={handleOk}
      {...rest}
    >
      {MemoForm}
    </Modal>
  ))
}

export default SparePartModal
