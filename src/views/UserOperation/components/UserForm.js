import React, { useCallback, useState } from 'react'

import classnames from 'classnames'

import { Form, Input, Button, Select, Radio, AutoComplete, Modal } from 'antd'

import { useFetch } from '@/utils/use'

import { getDataByType, validateUserName } from '../service'

import styles from './UserForm.module.less'

const Option = Select.Option

const POST_LIST = ['保安', '保洁', '主任']

function useData(request, params) {
  const [data, setData] = useState([])

  const { isLoading } = useFetch(
    request,
    res => {
      if (res.code === 0) {
        setData(res.list)
      }
    },
    [],
    params
  )

  return {
    isLoading,
    data,
  }
}

function SearchForm({ form, onSubmit, className, isEdit, isLoading }) {
  const { getFieldDecorator, validateFields } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    validateFields((errors, values) => {
      if (!errors) {
        Modal.confirm({
          title: `是否${isEdit ? '修改' : '新增'}该用户信息？`,
          onOk() {
            onSubmit(values)
          },
        })
      }
    })
  }, [])

  const { isLoading: isLoadingWithDept, data: deptList } = useData(getDataByType, 'dept')

  const { isLoading: isLoadingWithRole, data: roleList } = useData(getDataByType, 'role')

  return (
    <Form
      className={classnames(className, styles['form-container'])}
      onSubmit={handleSubmit}
      layout="vertical"
    >
      <Form.Item label="真实姓名">
        {getFieldDecorator('realname', {
          rules: [{ required: true, message: '真实姓名不能为空' }],
        })(<Input allowClear placeholder="请输入真实姓名" />)}
      </Form.Item>
      <Form.Item label="用户名">
        {getFieldDecorator('username', {
          rules: [
            { required: true, message: '用户名不能为空' },
            {
              validator(rule, value, cb, source, options) {
                if (!value || isEdit) {
                  cb()

                  return
                }

                return validateUserName({ username: value })
              },
            },
          ],
        })(<Input allowClear={!isEdit} disabled={isEdit} placeholder="请输入用户名" />)}
      </Form.Item>
      <Form.Item label="所属部门">
        {getFieldDecorator('deptId', {
          rules: [{ required: true, message: '所属部门不能为空' }],
        })(
          <Select allowClear placeholder="请选择所属部门" loading={isLoadingWithDept}>
            {deptList.map(({ text, value }) => (
              <Option key={value} value={value}>
                {text}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="密码" required={true}>
        {isEdit ? (
          <Input defaultValue="******" disabled={true} />
        ) : (
          getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空' }],
          })(<Input.Password allowClear placeholder="请输入密码" />)
        )}
      </Form.Item>
      <Form.Item label="职务">
        {getFieldDecorator('post', {
          rules: [{ required: true, message: '职务不能为空' }],
        })(
          <AutoComplete
            allowClear
            dataSource={POST_LIST}
            placeholder="请选择职务"
            filterOption={true}
          />
        )}
      </Form.Item>
      <Form.Item label="手机号">
        {getFieldDecorator('mobile', {
          rules: [{ required: true, message: '手机号不能为空' }],
        })(<Input allowClear placeholder="请输入手机号" />)}
      </Form.Item>
      <Form.Item label="角色">
        {getFieldDecorator('roleIdList', {
          rules: [{ required: true, message: '角色不能为空' }],
        })(
          <Select allowClear mode="multiple" placeholder="请选择角色" loading={isLoadingWithRole}>
            {roleList.map(({ text, value }) => (
              <Option key={value} value={value}>
                {text}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="状态">
        {getFieldDecorator('status', {
          rules: [{ required: true, message: '状态不能为空' }],
        })(
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={2}>禁用</Radio>
          </Radio.Group>
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
        [key]: Form.createFormField({
          value: key === 'deptId' && value === '' ? undefined : value,
        }),
      }),
      {}
    )
  },
  onValuesChange({ onChange }, changedValues, { deptId, ...rest }) {
    onChange({ ...rest, deptId: deptId === undefined ? '' : deptId })
  },
})(SearchForm)

export default WrappedSearchForm
