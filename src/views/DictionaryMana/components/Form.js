import React, { useEffect, forwardRef } from 'react'

import { Form, Input } from 'antd'

function DictionaryManaForm({ form }, ref) {
  const { getFieldDecorator } = form

  useEffect(() => {
    ref.current = form
  }, [form])

  return (
    <Form>
      <Form.Item label="字典名称">
        {getFieldDecorator('value', {
          rules: [{ required: true, message: '字典名称不能为空' }],
        })(<Input allowClear placeholder="请输入字典名称" />)}
      </Form.Item>
    </Form>
  )
}

const DictionaryManaFormForwardRef = forwardRef(DictionaryManaForm)

export default Form.create({
  mapPropsToFields(props) {
    return {
      ...Object.entries(props.value).reduce((prev, [key, value]) => {
        return {
          ...prev,
          [key]: Form.createFormField({ value }),
        }
      }, {}),
    }
  },
})(DictionaryManaFormForwardRef)
