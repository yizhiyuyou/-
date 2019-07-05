import React, { useCallback, useContext } from 'react'

import { toJS } from 'mobx'
import { useObserver } from 'mobx-react-lite'

import { Form, Select, Button, DatePicker } from 'antd'

import classnames from 'classnames'

import { StoreContext } from '@/stores'

import { useFetch } from '@/utils/use'

import styles from './SearchForm.module.less'

const { Option } = Select

function SearchForm({ form, onSubmit, className }) {
  const {
    dicStore,
    dicStore: { getDictionaryByType },
  } = useContext(StoreContext)

  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  const { isLoading } = useFetch(getDictionaryByType, () => {}, null, 'manyidu')

  return useObserver(() => (
    <Form
      className={classnames(className, styles.container)}
      onSubmit={handleSubmit}
      layout="inline"
    >
      <Form.Item label="反馈时间">
        {getFieldDecorator('rangePicker')(<DatePicker.RangePicker showTime />)}
      </Form.Item>
      <Form.Item label="满意度">
        {getFieldDecorator('noticeTitle')(
          <Select allowClear placeholder="请选择满意度" style={{ width: 140 }} loading={isLoading}>
            {dicStore.manyidu.map(({ text, value }) => (
              <Option key={value} value={value}>
                {text}
              </Option>
            ))}
          </Select>
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
