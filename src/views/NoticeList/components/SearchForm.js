import React, { useCallback } from 'react'

import { Form, Input, Button, DatePicker } from 'antd'

import styles from './SearchForm.module.less'

function SearchForm({ form, onSubmit }) {
  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  return (
    <Form className={styles['form-container']} onSubmit={handleSubmit} layout="inline">
      <Form.Item label="发布时间">
        {getFieldDecorator('rangePicker')(<DatePicker.RangePicker showTime />)}
      </Form.Item>
      <Form.Item label="关键字">
        {getFieldDecorator('noticeTitle')(
          <Input allowClear placeholder="请输入关键字" style={{ width: 140 }} />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedSearchForm = Form.create({
  mapPropsToFields(props) {
    const { rangePicker, noticeTitle } = props.value

    return {
      rangePicker: Form.createFormField({ value: rangePicker }),
      noticeTitle: Form.createFormField({ value: noticeTitle }),
    }
  },
  onValuesChange({ onChange }, changedValues, { ...rest }) {
    onChange({ ...rest })
  },
})(SearchForm)

export default WrappedSearchForm
