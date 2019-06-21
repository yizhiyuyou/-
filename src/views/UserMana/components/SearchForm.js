import React, { useCallback } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Form, Input, Button } from 'antd'

import styles from './SearchForm.module.less'

function SearchForm({ form, onSubmit }) {
  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  return useObserver(() => (
    <Form className={styles['form-container']} onSubmit={handleSubmit} layout="inline">
      <Form.Item label="用户名">
        {getFieldDecorator('name')(
          <Input allowClear placeholder="请输入用户名" style={{ width: 140 }} />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  ))
}

const WrappedSearchForm = Form.create({
  mapPropsToFields(props) {
    const { name } = props.value

    return {
      name: Form.createFormField({ value: name }),
    }
  },
  onValuesChange({ onChange }, changedValues, { ...rest }) {
    onChange({ ...rest })
  },
})(SearchForm)

export default WrappedSearchForm
