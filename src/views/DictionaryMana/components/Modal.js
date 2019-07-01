import React, { useMemo, useRef, useCallback } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Modal } from 'antd'

import Form from './Form'

const btnProps = {
  size: 'large',
}

const BODY_STYLE = {
  padding: '30px 80px',
}

function DictionaryManaModal({ onOk, value, ...rest }) {
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
      title="添加字典"
      width="640px"
      destroyOnClose={true}
      okButtonProps={btnProps}
      cancelButtonProps={btnProps}
      onOk={handleOk}
      bodyStyle={BODY_STYLE}
      {...rest}
    >
      {MemoForm}
    </Modal>
  ))
}

export default DictionaryManaModal
