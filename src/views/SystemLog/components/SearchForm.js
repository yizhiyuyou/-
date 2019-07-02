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
      <Form.Item label="关键词">
        {getFieldDecorator('searchString')(
          <Input allowClear placeholder="请输入用户名,用户操作" style={{ width: 140 }} />
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
    const { searchString } = props.value

    return {
      searchString: Form.createFormField({ value: searchString }),
    }
  },
  onValuesChange({ onChange }, changedValues, { type = '', ...rest }) {
    onChange({ ...rest, type })
  },
})(SearchForm)

export default WrappedSearchForm
