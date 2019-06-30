import React, { useCallback, forwardRef } from 'react'

import classnames from 'classnames'

import { Form, Input, Button, InputNumber, Modal } from 'antd'

import DeptCascader from './DeptCascader'

import styles from './DeptForm.module.less'

const DeptCascaderForward = forwardRef(DeptCascader)

function SearchForm({ form, onSubmit, className, isEdit, isLoading }) {
  const { getFieldDecorator, validateFields } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    validateFields((errors, values) => {
      if (!errors) {
        Modal.confirm({
          title: `是否${isEdit ? '修改' : '新增'}该部门信息？`,
          onOk() {
            onSubmit(values)
          },
        })
      }
    })
  }, [])

  return (
    <Form
      className={classnames(className, styles['form-container'])}
      onSubmit={handleSubmit}
      layout="vertical"
    >
      <Form.Item label="部门名称">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '部门名称不能为空' }],
        })(<Input allowClear placeholder="请输入部门名称" />)}
      </Form.Item>
      <Form.Item label="上级部门">
        {getFieldDecorator('parentId', {
          rules: [{ required: true, message: '上级部门不能为空' }],
        })(<DeptCascaderForward />)}
      </Form.Item>
      <Form.Item label="排序号">
        {getFieldDecorator('orderNum')(
          <InputNumber placeholder="请输入排序号(仅限数字)" style={{ width: '100%' }} />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {isEdit ? '修改' : '新增'}
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedSearchForm = Form.create({
  mapPropsToFields({ value }) {
    return Object.entries(value).reduce(
      (prev, [key, value]) => ({
        ...prev,
        [key]: Form.createFormField({ value }),
      }),
      {}
    )
  },
  onValuesChange({ onChange }, changedValues, { ...rest }) {
    onChange({ ...rest })
  },
})(SearchForm)

export default WrappedSearchForm
