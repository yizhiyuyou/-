import React, { useCallback, forwardRef } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Form, Button } from 'antd'

import MonthPicker from './MonthPicker'

import styles from './SearchForm.module.less'

const MonthPickerForward = forwardRef(MonthPicker)

function SearchForm({ form, onSubmit }) {
  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  return useObserver(() => (
    <Form className={styles['form-container']} onSubmit={handleSubmit} layout="inline">
      <Form.Item label="发布时间">
        {getFieldDecorator('rangePicker')(<MonthPickerForward />)}
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
    const { rangePicker } = props.value

    return {
      rangePicker: Form.createFormField({ value: rangePicker }),
    }
  },
  onValuesChange({ onChange }, changedValues, { ...rest }) {
    onChange({ ...rest })
  },
})(SearchForm)

export default WrappedSearchForm
