import React, { useCallback } from 'react'

import { Form, DatePicker, Button, Select } from 'antd'

import { STATUS, TYPE } from '../const'

import styles from './SearchForm.module.less'

const { Option } = Select

function SearchForm ({ form, onSubmit }) {
  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  return (
    <Form className={styles['form-container']} onSubmit={handleSubmit} layout="inline">
      <Form.Item label="上报时间">
        {getFieldDecorator('timePicker')(
          <DatePicker.RangePicker showTime />
        )}
      </Form.Item>
      <Form.Item label="状态">
        {getFieldDecorator('state')(
          <Select allowClear placeholder="请选择状态" style={{ width: 140 }} >
            {
              STATUS.map(({ text, value }) => <Option key={value} value={value}>{text}</Option>)
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="类型">
        {getFieldDecorator('type')(
          <Select allowClear placeholder="请选择类型" style={{ width: 140 }}>
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