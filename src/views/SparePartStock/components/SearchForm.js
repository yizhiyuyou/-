import React, { useCallback, useContext } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Form, Input, Button, Select } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import styles from './SearchForm.module.less'

const { Option } = Select

function SearchForm({ form, onSubmit }) {
  const { sparepartType, getDictionaryByType } = useContext(StoreContext).dicStore

  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  const { isLoading } = useFetch(getDictionaryByType, () => {}, null, 'sparepartType')

  return useObserver(() => (
    <Form className={styles['form-container']} onSubmit={handleSubmit} layout="inline">
      <Form.Item label="备件类型">
        {getFieldDecorator('type')(
          <Select
            allowClear
            placeholder="请选择备件类型"
            style={{ width: 140 }}
            loading={isLoading}
          >
            {sparepartType.map(({ text, value }) => (
              <Option key={value} value={value}>
                {text}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="名称">
        {getFieldDecorator('name')(
          <Input allowClear placeholder="请输入名称" style={{ width: 140 }} />
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
    const { type, name } = props.value

    return {
      type: Form.createFormField({ value: type === '' ? undefined : type }),
      name: Form.createFormField({ value: name }),
    }
  },
  onValuesChange({ onChange }, changedValues, { type = '', ...rest }) {
    onChange({ ...rest, type })
  },
})(SearchForm)

export default WrappedSearchForm
