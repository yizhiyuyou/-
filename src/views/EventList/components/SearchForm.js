import React, { useCallback } from 'react'

import { Form, DatePicker, Button, Select } from 'antd'

import styles from './SearchForm.module.less'

const { Option } = Select

const STATUS = [
  { text: '待处理', value: '1' },
  { text: '处置中', value: '2' },
  { text: '待验收', value: '3' },
  { text: '已结束', value: '4' },
]

const TYPE = [
  { text: '保洁', value: '1' },
  { text: '维修', value: '2' },
  { text: '其他', value: '3' },
]

function SearchForm ({ form, onSubmit }) {
  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  return (
    <Form className={styles['form-container']} onSubmit={handleSubmit} layout="inline">
      <Form.Item label="上报时间">
        {getFieldDecorator('timePicker', { initialValue: [] })(
          <DatePicker.RangePicker showTime />
        )}
      </Form.Item>
      <Form.Item label="状态">
        {getFieldDecorator('state', { initialValue: '' })(
          <Select placeholder="请选择状态" style={{ width: 140 }} allowClear>
            {
              STATUS.map(({ text, value }) => <Option key={value} value={value}>{text}</Option>)
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="类型">
        {getFieldDecorator('type', { initialValue: '' })(
          <Select placeholder="请选择类型" style={{ width: 140 }} allowClear>
            {
              TYPE.map(({ text, value }) => <Option key={value} value={value}>{text}</Option>)
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">查询</Button>
      </Form.Item>
    </Form>
  )
}

const WrappedSearchForm = Form.create()(SearchForm)

export default WrappedSearchForm