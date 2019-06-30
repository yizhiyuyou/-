import React, { useCallback, useState } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Modal, Form, Input, Select, Row, Col } from 'antd'

import { useFetch } from '@/utils/use'

import { getDataByType } from '@/views/UserOperation/service'

import styles from './Modal.module.less'

const { Option } = Select

const { TextArea } = Input

const formItemCol = {
  labelCol: { span: 7 },
  wrapperCol: { span: 14 },
}

const btnProps = {
  size: 'large',
}

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

function SparePartModal({ form, onOk, value, ...rest }) {
  const { getFieldDecorator, getFieldsValue, validateFields } = form

  const { isLoading, data: deptList } = useData(getDataByType, 'dept')

  const handleOk = useCallback(() => {
    validateFields(err => {
      if (err) {
        return
      }

      onOk(Object.assign({}, value, getFieldsValue()))
    })
  }, [onOk, value])

  return useObserver(() => (
    <Modal
      title={value.id ? '编辑' : '新增角色'}
      width="640px"
      okButtonProps={btnProps}
      cancelButtonProps={btnProps}
      onOk={handleOk}
      {...rest}
    >
      <Form className={styles['form-container']} {...formItemCol}>
        <Row>
          <Col span={11} offset={1}>
            <Form.Item label="角色名称">
              {getFieldDecorator('roleName', {
                rules: [{ required: true, message: '角色名称不能为空' }],
              })(<Input allowClear size="large" placeholder="请输入角色名称" />)}
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item label="所属部门">
              {getFieldDecorator('deptId', {
                rules: [{ required: true, message: '所属部门不能为空' }],
              })(
                <Select allowClear size="large" placeholder="请选择所属部门" loading={isLoading}>
                  {deptList.map(({ text, value }) => (
                    <Option key={value} value={value}>
                      {text}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.textarea}>
          <Col>
            <Form.Item label="备注">
              {getFieldDecorator('remark')(
                <TextArea rows={5} size="large" placeholder="请输入备注" />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  ))
}

export default Form.create({
  mapPropsToFields(props) {
    return {
      ...Object.entries(props.value).reduce((prev, [key, value]) => {
        return {
          ...prev,
          [key]: Form.createFormField({ value }),
        }
      }, {}),
    }
  },
})(SparePartModal)
