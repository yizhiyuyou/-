import React, { useCallback } from 'react'

import { toJS } from 'mobx'

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

    // toJS 为了处理空数组时，antd RangePicker 访问数组 0，1 时，mobx 警告信息的问题
    return {
      rangePicker: Form.createFormField({ value: toJS(rangePicker) }),
      noticeTitle: Form.createFormField({ value: noticeTitle }),
    }
  },
  onValuesChange({ onChange }, changedValues, { ...rest }) {
    onChange({ ...rest })
  },
})(SearchForm)

export default WrappedSearchForm
