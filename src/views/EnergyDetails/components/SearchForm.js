import React, { useCallback, useContext } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Form, Button, Select } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import styles from './SearchForm.module.less'

const { Option } = Select

function SearchForm({ form, onSubmit }) {
  const { energyType, elecMeter, waterMeter, getDictionaryByType } = useContext(
    StoreContext
  ).dicStore

  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  const { isLoading } = useFetch(getDictionaryByType, () => {}, null, 'energyType')

  const { isLoading: isLoadingByElecMeter } = useFetch(
    getDictionaryByType,
    () => {},
    null,
    'elecMeter'
  )

  const { isLoading: isLoadingByWaterMeter } = useFetch(
    getDictionaryByType,
    () => {},
    null,
    'waterMeter'
  )

  return useObserver(() => (
    <Form className={styles['form-container']} onSubmit={handleSubmit} layout="inline">
      <Form.Item label="类型">
        {getFieldDecorator('type')(
          <Select allowClear placeholder="请选择类型" style={{ width: 140 }} loading={isLoading}>
            {energyType.map(({ text, value }) => (
              <Option key={value} value={value}>
                {text}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="区域">
        {getFieldDecorator('position')(
          <Select
            allowClear
            placeholder="请选择区域"
            style={{ width: 140 }}
            loading={isLoadingByElecMeter && isLoadingByWaterMeter}
          >
            {[...elecMeter, ...waterMeter].map(({ text }) => (
              <Option key={text} value={text}>
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
    const { type, position } = props.value

    return {
      type: Form.createFormField({ value: type === '' ? undefined : type }),
      position: Form.createFormField({ value: position === '' ? undefined : position }),
    }
  },
  onValuesChange({ onChange }, changedValues, { type = '', position = '', ...rest }) {
    onChange({ ...rest, type, position })
  },
})(SearchForm)

export default WrappedSearchForm
